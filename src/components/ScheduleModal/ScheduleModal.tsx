import { useState, useEffect } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, VStack, Text
} from '@chakra-ui/react';
import { useAppContext } from '../../context/AppContext';

// Interface Task definida localmente
interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
  subtasks?: any[];
  dueDate?: string;
}

interface ScheduleModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleModal({ task, isOpen, onClose }: ScheduleModalProps) {
  const { setTaskDueDate } = useAppContext();
  const [date, setDate] = useState('');

  useEffect(() => {
    if (task?.dueDate) {
      const formattedDate = new Date(task.dueDate).toISOString().slice(0, 16);
      setDate(formattedDate);
    } else {
      setDate('');
    }
  }, [task, isOpen]);

  if (!task) {
    return null;
  }

  const handleSubmit = () => {
    setTaskDueDate(task.id, date ? new Date(date).toISOString() : null);
    onClose();
  };
  
  const handleRemoveDueDate = () => {
    setTaskDueDate(task.id, null);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agendar Lembrete</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text>Defina uma data e hora para ser lembrado da tarefa <Text as="b">"{task.text}"</Text>.</Text>
            <FormControl>
              <FormLabel>Data e Hora do Lembrete</FormLabel>
              <Input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button colorScheme="red" variant="ghost" onClick={handleRemoveDueDate}>Remover Data</Button>
          <Button colorScheme="teal" onClick={handleSubmit}>Guardar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}