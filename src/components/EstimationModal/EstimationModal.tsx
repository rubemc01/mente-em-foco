import { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper,
  NumberIncrementStepper, NumberDecrementStepper, VStack, Text
} from '@chakra-ui/react';
import { useAppContext } from '../../context/AppContext';

export function EstimationModal() {
  const { taskForEstimation, closeEstimationModal, handleSetPomos, setActiveTask } = useAppContext();
  const [pomos, setPomos] = useState(1);

  if (!taskForEstimation) {
    return null;
  }

  const handleSubmit = () => {
    handleSetPomos(taskForEstimation.id, pomos);
    setActiveTask(taskForEstimation);
    closeEstimationModal();
  };

  return (
    <Modal isOpen={!!taskForEstimation} onClose={closeEstimationModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Estimar Tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Text>Quantas sessões de foco (pomodoros) você acha que a tarefa <Text as="b">"{taskForEstimation.text}"</Text> vai levar?</Text>
            <FormControl>
              <FormLabel>Número de Pomodoros:</FormLabel>
              <NumberInput value={pomos} min={1} max={10} onChange={(_, valueAsNumber) => setPomos(valueAsNumber)}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={handleSubmit}>Começar Foco</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}