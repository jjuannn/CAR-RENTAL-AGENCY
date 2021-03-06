import React, {useEffect} from 'react';
import {Tr, Td, Text, HStack, Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {AiOutlineDelete, AiOutlineEdit, AiOutlineEye} from 'react-icons/ai';
import useClients from '../../hooks/useClients';
import {useHistory} from 'react-router';
export default function TableCell({name, surname, id}) {
  const {deleteClient, deleteClientError, deleteClientLoading, deleteClientSuccess} = useClients();
  const history = useHistory();

  useEffect(() => {
    if (deleteClientSuccess) {
      history.go(0);
    }
  }, [deleteClientSuccess]);

  return (
    <Tr>
      <Td>
        <Text fontWeight='600' textTransform='capitalize'>
          {name} {surname}
        </Text>
      </Td>
      <Td isNumeric>
        <HStack justifyContent='flex-end'>
          <Button
            disabled={deleteClientLoading}
            colorScheme='red'
            variant='outline'
            onClick={() => {
              deleteClient(id);
            }}
          >
            <AiOutlineDelete />
          </Button>
          <Button
            colorScheme='green'
            variant='outline'
            padding='0'
            isDisabled={deleteClientLoading}
          >
            <Link to={`/client/view/id=${id}`} style={{display: 'block', padding: '1em'}}>
              <AiOutlineEye />
            </Link>
          </Button>
          <Button colorScheme='blue' variant='outline' padding='0' isDisabled={deleteClientLoading}>
            <Link to={`/client/edit/id=${id}`} style={{display: 'block', padding: '1em'}}>
              <AiOutlineEdit />
            </Link>
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
