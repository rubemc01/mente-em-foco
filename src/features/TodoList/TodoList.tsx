import { VStack, Heading, Box, Text } from '@chakra-ui/react';
import { AddTaskForm } from './AddTaskForm';
import { TaskItem } from './TaskItem';
import { useAppContext } from '../../context/AppContext';

export function TodoList() {
  const { tasks } = useAppContext();

  return (
    <VStack spacing={6} align="stretch" width="100%" maxW="600px">
      <Heading as="h2" size="lg" textAlign="center">
        Minhas Tarefas
      </Heading>
      <AddTaskForm />
      <VStack spacing={3} pt={4}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
            />
          ))
        ) : (
          <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
            <Text color="gray.500">Nenhuma tarefa por enquanto. Adicione uma acima!</Text>
          </Box>
        )}
      </VStack>
    </VStack>
  );
}