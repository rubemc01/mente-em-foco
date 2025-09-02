// src/pages/ProgressPage.tsx
import { useMemo } from 'react';
// NOVOS imports do Chakra UI para o novo card
import { VStack, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Box } from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function ProgressPage() {
  const { tasks } = useAppContext();

  // O cálculo das estatísticas foi expandido
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const tasksCompleted = tasks.filter(task => task.isCompleted);
    const tasksCompletedToday = tasksCompleted.filter(task => {
      const taskDate = new Date(task.id).toISOString().split('T')[0];
      return taskDate === today;
    });
    const totalPomosCompleted = tasks.reduce((sum, task) => sum + (task.actualPomos || 0), 0);

    // --- NOVO CÁLCULO DE PRECISÃO ---
    const tasksWithEstimation = tasksCompleted.filter(task => typeof task.estimatedPomos === 'number' && task.estimatedPomos > 0);
    const totalEstimatedPomos = tasksWithEstimation.reduce((sum, task) => sum + (task.estimatedPomos || 0), 0);
    const totalActualPomosForEstimatedTasks = tasksWithEstimation.reduce((sum, task) => sum + (task.actualPomos || 0), 0);
    
    let estimationAccuracy = 0;
    if (totalEstimatedPomos > 0) {
      const difference = Math.abs(totalActualPomosForEstimatedTasks - totalEstimatedPomos);
      estimationAccuracy = 100 - (difference / totalEstimatedPomos) * 100;
    }
    // --- FIM DO NOVO CÁLCULO ---

    return {
      totalTasksCompleted: tasksCompleted.length,
      tasksCompletedToday: tasksCompletedToday.length,
      totalPomosCompleted,
      estimationAccuracy: Math.max(0, estimationAccuracy), // Garante que a precisão não seja negativa
    };
  }, [tasks]);

  const chartData = useMemo(() => {
    const labels = [];
    const dataPoints = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split('T')[0];
      const dayLabel = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
      labels.push(dayLabel);
      
      const pomosOnDay = tasks.filter(task => new Date(task.id).toISOString().split('T')[0] === dateString)
                              .reduce((sum, task) => sum + (task.actualPomos || 0), 0);
      dataPoints.push(pomosOnDay);
    }
    return {
      labels,
      datasets: [{
        label: 'Sessões Pomodoro Concluídas',
        data: dataPoints,
        backgroundColor: 'rgba(56, 161, 105, 0.7)',
        borderColor: 'rgba(56, 161, 105, 1)',
        borderWidth: 1,
      }]
    };
  }, [tasks]);

  return (
    <VStack spacing={8} align="start" w="100%">
      <Heading>O Meu Progresso</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="100%">
        <Stat bg="white" p={6} borderRadius="md" boxShadow="sm">
          <StatLabel>Tarefas Concluídas (Total)</StatLabel>
          <StatNumber>{stats.totalTasksCompleted}</StatNumber>
        </Stat>
        <Stat bg="white" p={6} borderRadius="md" boxShadow="sm">
          <StatLabel>Tarefas Concluídas (Hoje)</StatLabel>
          <StatNumber>{stats.tasksCompletedToday}</StatNumber>
        </Stat>
        <Stat bg="white" p={6} borderRadius="md" boxShadow="sm">
          <StatLabel>Sessões Pomodoro (Total)</StatLabel>
          <StatNumber>{stats.totalPomosCompleted}</StatNumber>
        </Stat>
        
        {/* --- NOVO CARD DE ESTATÍSTICA --- */}
        <Stat bg="white" p={6} borderRadius="md" boxShadow="sm">
          <StatLabel>Taxa de Precisão (Estimativas)</StatLabel>
          <StatNumber>{stats.estimationAccuracy.toFixed(0)}%</StatNumber>
          <StatHelpText>
            <StatArrow type={stats.estimationAccuracy >= 75 ? 'increase' : 'decrease'} />
            Baseado em tarefas concluídas com estimativa.
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <Box w="100%" bg="white" p={6} borderRadius="md" boxShadow="sm">
        <Heading size="md" mb={4}>Atividade nos Últimos 7 Dias</Heading>
        <Bar 
          data={chartData} 
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' as const },
              title: { display: true, text: 'Sessões de Foco por Dia' }
            }
          }} 
        />
      </Box>
    </VStack>
  );
}