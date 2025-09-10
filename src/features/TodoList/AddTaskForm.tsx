import { useState } from 'react';
import { HStack, Input, Button } from '@chakra-ui/react';
import { useAppContext } from '../../context/AppContext';

export function AddTaskForm() {
  const [text, setText] = useState('');
  const { addTask } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <HStack>
        <Input 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Qual sua próxima tarefa?"
          variant="filled"
        />
        <Button type="submit" colorScheme="teal" px={8}>
          Adicionar
        </Button>
      </HStack>
    </form>
  );
}