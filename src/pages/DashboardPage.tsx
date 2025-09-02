import { VStack, Divider, HStack, Button, Menu, MenuButton, MenuList, MenuItem, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { PomodoroTimer } from '../features/Pomodoro/PomodoroTimer';
import { TodoList } from '../features/TodoList/TodoList';
import { useAppContext } from '../context/AppContext';

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
      <Divider maxW="600px" />
      <HStack w="100%" maxW="600px" justify="flex-end">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} isDisabled={templates.length === 0}>
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