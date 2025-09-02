import {
  VStack,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

export function HelpPage() {
  return (
    <VStack spacing={8} align="stretch" w="100%">
      <VStack align="start">
        <Heading>Como Usar o Mente em Foco</Heading>
        <Text color="gray.500">
          Um guia rápido para aproveitar ao máximo todas as ferramentas.
        </Text>
      </VStack>

      <Accordion allowMultiple w="100%">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Dashboard: O Timer Pomodoro e a Lista de Tarefas
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                **Para usar o Timer Pomodoro:** Primeiro, selecione uma tarefa na sua "Lista de Tarefas" clicando no ícone de alvo (🎯). O nome da tarefa irá aparecer em "FOCO ATUAL". Depois, clique em "Iniciar".
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                **Para adicionar uma tarefa:** Escreva o nome da sua tarefa no campo "Qual sua próxima tarefa?" e clique em "Adicionar".
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                **Para adicionar sub-tarefas:** Clique em qualquer parte de uma tarefa (exceto nos botões) para expandir e ver o campo para adicionar sub-tarefas.
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Templates de Rotinas
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Cansado de escrever as mesmas tarefas todos os dias? Use as Rotinas!
            <List spacing={3} mt={2}>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                **1. Crie um Template:** Vá para a página "Rotinas" no menu, dê um nome à sua rotina (ex: "Rotina da Manhã") e liste os itens (um por linha).
              </ListItem>
              <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                **2. Carregue o Template:** No Dashboard, use o menu "Carregar Rotina" para adicionar instantaneamente todas as tarefas do seu template à sua lista do dia.
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Caixa de Ferramentas para Crises
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Este é o seu espaço de apoio pessoal. Na página "Caixa de Ferramentas", você pode guardar recursos que o ajudam em momentos de stress. Adicione notas com exercícios de respiração, ou links para músicas e vídeos relaxantes.
          </AccordionPanel>
        </AccordionItem>
        
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight="bold">
                Registo de Humor e Progresso
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            Use a página "Humor" para registar como se sente todos os dias. Com o tempo, você pode visitar a página "Progresso" para ver gráficos que o ajudam a entender a relação entre o seu humor e a sua produtividade.
          </AccordionPanel>
        </AccordionItem>

      </Accordion>
    </VStack>
  );
}