// src/pages/SettingsPage.tsx
import { VStack, Heading, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';

export function SettingsPage() {
  const { settings, updateSettings } = useAppContext();

  return (
    <VStack spacing={8} align="start" w="100%" maxW="600px">
      <Heading>Configurações</Heading>

      <FormControl>
        <FormLabel>Tempo de Foco (minutos)</FormLabel>
        <NumberInput 
          value={settings.focusDuration}
          min={1} 
          max={120}
          onChange={(valueString) => updateSettings({ focusDuration: Number(valueString) })}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      {/* Adicione inputs para Pausa Curta e Longa aqui no futuro, se desejar */}
    </VStack>
  );
}