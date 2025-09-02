// src/components/TaskUnblocker/TaskUnblockerModal.tsx
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, VStack, Text, Textarea, Heading, useToast
} from '@chakra-ui/react';
import { useAppContext } from '../../context/AppContext';

// A interface Task definida localmente para este componente
interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
  subtasks?: any[];
}

interface TaskUnblockerModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TaskUnblockerModal({ task, isOpen, onClose }: TaskUnblockerModalProps) {
  const { setActiveTask } = useAppContext();
  const toast = useToast();

  if (!task) {
    return null;
  }

  const handleStartFocus = () => {
    setActiveTask(task);
    toast({
      title: "Ótimo!",
      description: "A tarefa foi definida como foco principal no Dashboard.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Vamos Destravar a Tarefa!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="start">
            <Text>Sua tarefa é: <Text as="b">"{task.text}"</Text></Text>
            
            <VStack align="start" w="100%">
              <Heading size="sm">1. Qual é o menor passo possível que você pode dar agora?</Heading>
              <Text fontSize="sm" color="gray.500">Não precisa ser produtivo, apenas um movimento. Ex: "Abrir o e-mail", "Pegar uma caneta", "Digitar a primeira palavra".</Text>
              <Textarea placeholder="Escreva aqui o seu primeiro passo..." />
            </VStack>

            <VStack align="start" w="100%">
              <Heading size="sm">2. Você consegue trabalhar nisso por apenas 2 minutos?</Heading>
              <Text fontSize="sm" color="gray.500">A "regra dos 2 minutos" diz que, se uma tarefa leva menos de dois minutos para ser feita, o melhor é fazê-la agora. Vamos tentar?</Text>
              <Button colorScheme="teal" onClick={handleStartFocus}>
                Sim, vamos focar!
              </Button>
            </VStack>

          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}