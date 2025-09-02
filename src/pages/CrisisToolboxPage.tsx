// src/pages/CrisisToolboxPage.tsx
import { useState } from 'react';
import {
  VStack, Heading, Text, FormControl, FormLabel, Input, Button, useToast, Box,
  HStack, IconButton, SimpleGrid, Link, Select, Textarea
} from '@chakra-ui/react';
import { FaTrashAlt, FaLink, FaStickyNote } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

export function CrisisToolboxPage() {
  const { toolboxItems, addToolboxItem, deleteToolboxItem } = useAppContext();
  const [type, setType] = useState<'note' | 'link'>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast({ title: 'Por favor, preencha todos os campos.', status: 'warning' });
      return;
    }
    addToolboxItem({ type, title, content });
    setTitle('');
    setContent('');
    toast({ title: 'Ferramenta adicionada!', status: 'success' });
  };

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <VStack align="start">
        <Heading>Caixa de Ferramentas para Crises</Heading>
        <Text color="gray.500">
          Guarde aqui notas e links úteis para momentos de sobrecarga ou ansiedade.
        </Text>
      </VStack>

      <Box as="form" onSubmit={handleSubmit} p={6} bg="white" borderRadius="md" boxShadow="sm">
        <VStack spacing={4} align="stretch">
          <Heading size="md">Adicionar Nova Ferramenta</Heading>
          <FormControl>
            <FormLabel>Tipo de Ferramenta</FormLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as 'note' | 'link')}>
              <option value="note">Nota</option>
              <option value="link">Link</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Título</FormLabel>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder={type === 'note' ? "Ex: Exercício de Respiração" : "Ex: Música Relaxante"} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{type === 'note' ? 'Conteúdo da Nota' : 'URL do Link'}</FormLabel>
            {type === 'note' ? (
              <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Inspire por 4s, segure por 7s, expire por 8s..." />
            ) : (
              <Input type="url" value={content} onChange={e => setContent(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
            )}
          </FormControl>
          <Button type="submit" colorScheme="teal" alignSelf="flex-end">Adicionar</Button>
        </VStack>
      </Box>

      <VStack spacing={4} align="stretch">
        <Heading size="md">Minhas Ferramentas</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {toolboxItems.map(item => (
            <Box key={item.id} p={5} bg="white" borderRadius="md" boxShadow="sm" position="relative">
              <IconButton
                aria-label="Apagar item"
                icon={<FaTrashAlt />}
                size="sm"
                variant="ghost"
                colorScheme="red"
                position="absolute"
                top="0.5rem"
                right="0.5rem"
                onClick={() => deleteToolboxItem(item.id)}
              />
              <HStack mb={2}>
                <Icon as={item.type === 'note' ? FaStickyNote : FaLink} color="teal.500" />
                <Heading size="sm">{item.title}</Heading>
              </HStack>
              {item.type === 'note' ? (
                <Text whiteSpace="pre-wrap">{item.content}</Text>
              ) : (
                <Link href={item.content} isExternal color="blue.500">
                  Aceder ao link
                </Link>
              )}
            </Box>
          ))}
        </SimpleGrid>
        {toolboxItems.length === 0 && <Text>A sua caixa de ferramentas está vazia.</Text>}
      </VStack>
    </VStack>
  );
}