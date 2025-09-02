import { Box, ChakraProvider, CSSReset, extendTheme, Flex, IconButton, useDisclosure, Tooltip } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FaLightbulb } from 'react-icons/fa';

import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/Sidebar/Sidebar';
import { QuickNotepad } from './components/QuickNotepad/QuickNotepad';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

import { DashboardPage } from './pages/DashboardPage';
import { SonsAmbientePage } from './pages/SonsAmbientePage';
import { SettingsPage } from './pages/SettingsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProgressPage } from './pages/ProgressPage';
import { AuthPage } from './pages/AuthPage';
import { RoutinesPage } from './pages/RoutinesPage';
import { CrisisToolboxPage } from './pages/CrisisToolboxPage';
import { ShoppingListPage } from './pages/ShoppingListPage';
import { MoodTrackerPage } from './pages/MoodTrackerPage';
import { HelpPage } from './pages/HelpPage';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
});

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AppProvider>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <BrowserRouter>
          <Flex>
            <Sidebar />
            <Box as="main" flex="1" p={8} display="flex" justifyContent="center">
              <Routes>
                <Route path="/login" element={<AuthPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/progresso" element={<ProgressPage />} />
                  <Route path="/humor" element={<MoodTrackerPage />} />
                  <Route path="/conquistas" element={<AchievementsPage />} />
                  <Route path="/compras" element={<ShoppingListPage />} />
                  <Route path="/rotinas" element={<RoutinesPage />} />
                  <Route path="/caixa-de-ferramentas" element={<CrisisToolboxPage />} />
                  <Route path="/sons" element={<SonsAmbientePage />} />
                  <Route path="/config" element={<SettingsPage />} />
                  <Route path="/ajuda" element={<HelpPage />} />
                </Route>
              </Routes>
            </Box>
          </Flex>

          <Tooltip label="Abrir Bloco de Notas Rápido" fontSize="md" placement="left" hasArrow>
            <IconButton
              aria-label="Abrir Bloco de Notas"
              icon={<FaLightbulb />}
              colorScheme="yellow"
              isRound
              size="lg"
              position="fixed"
              bottom="2rem"
              right="2rem"
              onClick={onOpen}
              boxShadow="xl"
              zIndex="10"
            />
          </Tooltip>
          
          <QuickNotepad isOpen={isOpen} onClose={onClose} />
          
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
  );
}

export default App;