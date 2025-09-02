// src/pages/ShoppingListPage.tsx
import { useState } from 'react';
import {
  VStack, Heading, Text, Input, Button, useToast, Box, HStack, IconButton, Spacer,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Checkbox
} from '@chakra-ui/react';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

export function ShoppingListPage() {
  const { shoppingLists, addShoppingList, deleteShoppingList, addShoppingItem, toggleShoppingItem, deleteShoppingItem } = useAppContext();
  const [newListName, setNewListName] = useState('');
  const [newItemText, setNewItemText] = useState<{ [key: number]: string }>({});
  const toast = useToast();

  const handleAddList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    addShoppingList(newListName);
    setNewListName('');
  };

  const handleAddItem = (listId: number) => {
    const text = newItemText[listId];
    if (!text || !text.trim()) return;
    addShoppingItem(listId, text);
    setNewItemText({ ...newItemText, [listId]: '' });
  };

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <Heading>Listas de Compras</Heading>

      <Box as="form" onSubmit={handleAddList} p={6} bg="white" borderRadius="md" boxShadow="sm">
        <HStack>
          <Input value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="Nova lista de compras (ex: Supermercado)" />
          <Button type="submit" colorScheme="teal">Criar Lista</Button>
        </HStack>
      </Box>

      <Accordion allowMultiple defaultIndex={[0]}>
        {shoppingLists.map(list => (
          <AccordionItem key={list.id} bg="white" borderRadius="md" boxShadow="sm" mb={4}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <Heading size="md">{list.name}</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="stretch">
                {list.items.map(item => (
                  <HStack key={item.id}>
                    <Checkbox isChecked={item.isCompleted} onChange={() => toggleShoppingItem(list.id, item.id)}>
                      <Text as={item.isCompleted ? 's' : 'span'}>{item.text}</Text>
                    </Checkbox>
                    <Spacer />
                    <IconButton aria-label="Apagar item" icon={<FaTrashAlt />} size="xs" variant="ghost" colorScheme="red" onClick={() => deleteShoppingItem(list.id, item.id)} />
                  </HStack>
                ))}
                <HStack as="form" onSubmit={(e) => { e.preventDefault(); handleAddItem(list.id); }}>
                  <Input 
                    value={newItemText[list.id] || ''}
                    onChange={e => setNewItemText({ ...newItemText, [list.id]: e.target.value })}
                    placeholder="Adicionar item..."
                    variant="flushed"
                  />
                  <IconButton type="submit" aria-label="Adicionar item" icon={<FaPlus />} size="sm" variant="ghost" colorScheme="teal" />
                </HStack>
              </VStack>
              <Button mt={4} size="sm" colorScheme="red" variant="outline" onClick={() => deleteShoppingList(list.id)}>
                Apagar Lista Inteira
              </Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      {shoppingLists.length === 0 && <Text>Crie a sua primeira lista de compras acima!</Text>}
    </VStack>
  );
}