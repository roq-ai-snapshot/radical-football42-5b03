import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getPlayerTrainingPlanById } from 'apiSdk/player-training-plans';
import { Error } from 'components/error';
import { PlayerTrainingPlanInterface } from 'interfaces/player-training-plan';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function PlayerTrainingPlanViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<PlayerTrainingPlanInterface>(
    () => (id ? `/player-training-plans/${id}` : null),
    () =>
      getPlayerTrainingPlanById(id, {
        relations: ['player', 'training_plan'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Player Training Plan Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              start_date: {data?.start_date as unknown as string}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              end_date: {data?.end_date as unknown as string}
            </Text>
            {hasAccess('player', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <Text fontSize="md" fontWeight="bold">
                player: <Link href={`/players/view/${data?.player?.id}`}>{data?.player?.id}</Link>
              </Text>
            )}
            {hasAccess('training_plan', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <Text fontSize="md" fontWeight="bold">
                training_plan:{' '}
                <Link href={`/training-plans/view/${data?.training_plan?.id}`}>{data?.training_plan?.id}</Link>
              </Text>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'player_training_plan',
  operation: AccessOperationEnum.READ,
})(PlayerTrainingPlanViewPage);
