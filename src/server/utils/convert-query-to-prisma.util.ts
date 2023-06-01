import { Prisma } from '@prisma/client';

export function convertQueryToPrismaUtil(query: any, modelName: string) {
  let body: any = {};
  if (query) {
    if (query.id) {
      body.where = { id: query.id };
    }
    if (query.relations) {
      body = { ...body, include: { _count: { select: {} } } };
      if (Array.isArray(query.relations)) {
        query.relations.forEach((relation: string) => {
          if (relation.includes('.count')) {
            const rel = relation.replace('.count', '');
            if (isOneToMany(modelName, rel)) {
              body.include._count.select[rel] = true;
            } else {
              body.include[rel] = true;
            }
          } else {
            body.include[relation] = true;
          }
        });
      } else {
        if (query.relations.includes('.count')) {
          const rel = query.relations.replace('.count', '');
          if (isOneToMany(modelName, rel)) {
            body.include._count.select[rel] = true;
          } else {
            body.include[rel] = true;
          }
        } else {
          body.include[query.relations] = true;
        }
      }
      if (Object.keys(body.include._count.select).length === 0) {
        delete body.include._count;
      }
    }
  }
  return body;
}

function isOneToMany(modelName: string, relation: string) {
  const model = Prisma.dmmf.datamodel.models.find((model) => model.name === modelName);
  const relations = model.fields.filter((field) => field.relationName);
  const r = relations.find((rel) => rel.name === relation);
  return r.isList && r.kind === 'object';
}
