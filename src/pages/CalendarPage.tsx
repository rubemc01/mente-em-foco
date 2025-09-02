// src/pages/CalendarPage.tsx
import { useMemo } from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useAppContext } from '../context/AppContext';

// Configuração da localização para Português (Brasil)
const locales = {
  'pt-BR': ptBR,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export function CalendarPage() {
  const { tasks } = useAppContext();

  // Transforma as nossas tarefas em "eventos" que o calendário entende
  const events = useMemo(() => {
    return tasks
      .filter(task => !!task.dueDate) // Filtra apenas tarefas que têm data
      .map(task => ({
        title: task.text,
        start: new Date(task.dueDate!),
        end: new Date(task.dueDate!), // Para eventos de um dia, start e end são iguais
        allDay: true, // Considera como um evento de dia inteiro
        resource: task, // Guarda a tarefa original para referência futura
      }));
  }, [tasks]);

  return (
    <VStack spacing={8} align="stretch" w="100%">
      <Heading>Calendário de Tarefas</Heading>
      <Box h="70vh" bg="white" p={4} borderRadius="md" boxShadow="sm">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          culture="pt-BR"
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia",
            agenda: "Agenda",
            date: "Data",
            time: "Hora",
            event: "Evento",
          }}
        />
      </Box>
    </VStack>
  );
}