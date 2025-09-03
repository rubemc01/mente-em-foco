import { VStack, Divider, HStack, Button, Menu, MenuButton, MenuList, MenuItem, useToast, Text, Icon } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { PomodoroTimer } from '../features/Pomodoro/PomodoroTimer';
import { TodoList } from '../features/TodoList/TodoList';
import { useAppContext } from '../context/AppContext';
import { Link as RouterLink } from 'react-router-dom'; // Importa o Link para navegação
import { FaCog } from 'react-icons/fa'; // Importa o ícone de engrenagem

export function DashboardPage() {
  const { templates, loadTemplate } = useAppContext();
  const toast = useToast();

  const handleLoadTemplate = (templateId: number) => {
    loadTemplate(templateId);
    toast({
      title: "Rotina carregada!",
      description: "As tarefas do seu template foram adicionadas à lista.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} w="100%">
      <PomodoroTimer />

      {/* --- INDICATIVO ADICIONADO --- */}
      <HStack as={RouterLink} to="/config" spacing={2} opacity={0.7} _hover={{ opacity: 1, textDecoration: 'underline' }}>
        <Icon as={FaCog} w={3} h={3} />
        <Text fontSize="sm">
          Pode ajustar os tempos do timer nas Configurações.
        </Text>
      </HStack>
      {/* --- FIM DO INDICATIVO --- */}

      <Divider maxW="600px" />
      
      <HStack w="100%" maxW="600px" justify="flex-end">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} isDisabled={templates.length === 0} colorScheme="bluePrimary">
            Carregar Rotina
          </MenuButton>
          <MenuList>
            {templates.map(template => (
              <MenuItem key={template.id} onClick={() => handleLoadTemplate(template.id)}>
                {template.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
      
      <TodoList />
    </VStack>
  );
}