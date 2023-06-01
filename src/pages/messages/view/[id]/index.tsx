import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getMessageById } from 'apiSdk/messages';
import { Error } from 'components/error';
import { MessageInterface } from 'interfaces/message';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function MessageViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<MessageInterface>(
    () => (id ? `/messages/${id}` : null),
    () =>
      getMessageById(id, {
        relations: ['user_message_sender_idTouser', 'user_message_receiver_idTouser'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Message Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              content: {data?.content}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              sent_at: {data?.sent_at as unknown as string}
            </Text>
            {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <Text fontSize="md" fontWeight="bold">
                user_message_sender_idTouser:{' '}
                <Link href={`/users/view/${data?.user_message_sender_idTouser?.id}`}>
                  {data?.user_message_sender_idTouser?.id}
                </Link>
              </Text>
            )}
            {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <Text fontSize="md" fontWeight="bold">
                user_message_receiver_idTouser:{' '}
                <Link href={`/users/view/${data?.user_message_receiver_idTouser?.id}`}>
                  {data?.user_message_receiver_idTouser?.id}
                </Link>
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
  entity: 'message',
  operation: AccessOperationEnum.READ,
})(MessageViewPage);
