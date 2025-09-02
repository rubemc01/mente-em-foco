import { useState, FormEvent } from 'react';
import { Button, Input, HStack } from '@chakra-ui/react';

interface AddTaskFormProps {
  onAddTask: (text: string) => void;
}

export function AddTaskForm({ onAddTask }: AddTaskFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTask(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <HStack width="100%">
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Qual sua próxima tarefa?" variant="filled" />
        <Button type="submit" colorScheme="teal" px={8}>
          Adicionar
        </Button>
      </HStack>
    </form>
  );
}