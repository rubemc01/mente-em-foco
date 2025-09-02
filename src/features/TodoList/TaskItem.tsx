import { useState } from 'react';
import { Checkbox, HStack, IconButton, Text, Spacer, VStack, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, useDisclosure, Tooltip } from '@chakra-ui/react';
import { FaTrashAlt, FaBullseye, FaPlus, FaClock, FaRocket } from 'react-icons/fa'; // Adicionado FaRocket
import { useAppContext } from '../../context/AppContext';
import { ScheduleModal } from '../../components/ScheduleModal/ScheduleModal';
import { TaskUnblockerModal } from '../../components/TaskUnblocker/TaskUnblockerModal'; // Importa o novo modal

// Interfaces definidas localmente
interface Subtask { id: number; text: string; isCompleted: boolean; }
interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
  subtasks?: Subtask[];
  dueDate?: string;
  notified?: boolean;
}

interface TaskItemProps { 
  task: Task; 
}

export function TaskItem({ task }: TaskItemProps) {
  const { setActiveTask, activeTask, toggleTask, deleteTask, addSubtask, toggleSubtask } = useAppContext();
  
  // Um useDisclosure para cada modal
  const { isOpen: isScheduleOpen, onOpen: onScheduleOpen, onClose: onScheduleClose } = useDisclosure();
  const { isOpen: isUnblockerOpen, onOpen: onUnblockerOpen, onClose: onUnblockerClose } = useDisclosure();

  const [subtaskText, setSubtaskText] = useState('');
  const isCurrentlyActive = activeTask?.id === task.id;

  const handleAddSubtaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subtaskText.trim()) return;
    addSubtask(task.id, subtaskText);
    setSubtaskText('');
  };

  return (
    <>
      <Box w="100%" bg={isCurrentlyActive ? 'teal.50' : (task.isCompleted ? 'gray.100' : 'white')} borderRadius="md" boxShadow="sm" border="2px solid" borderColor={isCurrentlyActive ? 'teal.400' : 'transparent'}>
        <Accordion allowToggle w="100%">
          <AccordionItem border="none">
            <HStack p={4}>
              <Checkbox isChecked={task.isCompleted} onChange={() => toggleTask(task.id)} colorScheme="teal" size="lg" />
              <AccordionButton as="div" flex="1" textAlign="left" p={0} ml={3} _hover={{ bg: 'transparent' }}>
                <VStack align="start" spacing={1} flex="1">
                  <Text as={task.isCompleted ? 's' : undefined} color={task.isCompleted ? 'gray.500' : 'gray.800'} noOfLines={1}>
                    {task.text}
                  </Text>
                  {task.dueDate && (
                    <Text fontSize="xs" color="gray.500">
                      Lembrete: {new Date(task.dueDate).toLocaleString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Text>
                  )}
                </VStack>
                <AccordionIcon />
              </AccordionButton>
              <Spacer />
              
              {/* Botões de Ação */}
              {!task.isCompleted && (
                <Tooltip label="Destravar Tarefa">
                  <IconButton aria-label="Destravar Tarefa" icon={<FaRocket />} onClick={onUnblockerOpen} variant="ghost" colorScheme="purple" size="sm" />
                </Tooltip>
              )}
              {!task.isCompleted && (
                <Tooltip label="Agendar Lembrete">
                  <IconButton aria-label="Agendar Lembrete" icon={<FaClock />} onClick={onScheduleOpen} variant="ghost" colorScheme="blue" size="sm" />
                </Tooltip>
              )}
              {!task.isCompleted && (
                <IconButton aria-label="Focar nesta tarefa" icon={<FaBullseye />} onClick={() => setActiveTask(task)} variant="ghost" colorScheme="teal" isDisabled={isCurrentlyActive} size="sm" />
              )}
              <IconButton aria-label="Apagar tarefa" icon={<FaTrashAlt />} onClick={() => deleteTask(task.id)} variant="ghost" colorScheme="red" size="sm" />
            </HStack>
            <AccordionPanel pt={0} pb={4} px={4}>
              {/* ... (código das sub-tarefas continua o mesmo) ... */}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      
      {/* Os nossos dois modais, à espera de serem chamados */}
      <ScheduleModal task={task} isOpen={isScheduleOpen} onClose={onScheduleClose} />
      <TaskUnblockerModal task={task} isOpen={isUnblockerOpen} onClose={onUnblockerClose} />
    </>
  );
}