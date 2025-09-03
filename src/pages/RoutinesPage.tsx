import { useState } from 'react';
import { VStack, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, useToast, Box, HStack, IconButton, Spacer } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

// Interfaces definidas localmente
interface RoutineTemplate {
  id: number;
  name: string;
  items: string[];
}

export function RoutinesPage() {
  const { templates, addTemplate, deleteTemplate } = useAppContext();
  const [name, setName] = useState('');
  const [items, setItems] = useState('');
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !items.trim()) {
      toast({ title: 'Por favor, preencha o nome e pelo menos um item.', status: 'warning', duration: 3000, isClosable: true });
      return;
    }
    const itemsArray = items.split('\n').filter(item => item.trim() !== '');
    addTemplate(name, itemsArray);
    setName('');
    setItems('');
    toast({ title: 'Template de rotina criado!', status: 'success', duration: 3000, isClosable: true });
  };

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <VStack align="start">
        <Heading>Templates de Rotinas</Heading>
        {/* TEXTO DE INSTRUÇÃO ADICIONADO */}
        <Text color="gray.500">Crie listas de tarefas reutilizáveis para as suas rotinas diárias, semanais ou para qualquer outra finalidade.</Text>
      </VStack>

      <Box as="form" onSubmit={handleSubmit} p={6} bg="white" borderRadius="md" boxShadow="sm">
        <VStack spacing={4} align="stretch">
          <Heading size="md">Criar Nova Rotina</Heading>
          <FormControl isRequired>
            <FormLabel>Nome da Rotina</FormLabel>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Rotina da Manhã" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Itens da Rotina (um por linha)</FormLabel>
            <Textarea value={items} onChange={e => setItems(e.target.value)} placeholder="Tomar o pequeno-almoço\nMeditar por 5 minutos\nVerificar e-mails" />
          </FormControl>
          <Button type="submit" colorScheme="teal" alignSelf="flex-end">Criar Template</Button>
        </VStack>
      </Box>

      <VStack spacing={4} align="stretch">
        <Heading size="md">Minhas Rotinas</Heading>
        {templates.length > 0 ? (
          templates.map(template => (
            <Box key={template.id} p={4} bg="white" borderRadius="md" boxShadow="sm">
              <HStack>
                <Heading size="sm">{template.name}</Heading>
                <Spacer />
                <IconButton aria-label="Apagar template" icon={<FaTrashAlt />} size="sm" variant="ghost" colorScheme="red" onClick={() => deleteTemplate(template.id)} />
              </HStack>
              <VStack as="ul" align="stretch" mt={2} pl={4} styleType="none">
                {template.items.map((item, index) => (
                  <Text as="li" key={index}>- {item}</Text>
                ))}
              </VStack>
            </Box>
          ))
        ) : (
          <Text>Você ainda não criou nenhum template de rotina.</Text>
        )}
      </VStack>
    </VStack>
  );
}