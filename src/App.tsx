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
import { CalendarPage } from './pages/CalendarPage';

// --- DEFINIÇÃO COMPLETA DO TEMA ---
const theme = extendTheme({
  colors: {
    // Cores baseadas no logo
    bluePrimary: {
      50: '#E6F0FF',
      100: '#BFD9FF',
      200: '#99C2FF',
      300: '#73ABFF',
      400: '#4D94FF',
      500: '#267DFF',
      600: '#0066E6',
      700: '#004DCC',
      800: '#0033B3',
      900: '#001A99',
    },
    grayCustom: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      200: '#E2E8F0',
      300: '#CBD5E0',
      400: '#A0AEC0',
      500: '#718096',
      600: '#4A5568',
      700: '#2D3748',
      800: '#1A202C',
      900: '#171923',
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'light' ? 'grayCustom.50' : 'grayCustom.800',
        color: props.colorMode === 'light' ? 'grayCustom.800' : 'grayCustom.50',
      },
    }),
  },
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg: props.colorScheme === 'bluePrimary' ? 'bluePrimary.500' : undefined,
          color: props.colorScheme === 'bluePrimary' ? 'white' : undefined,
          _hover: {
            bg: props.colorScheme === 'bluePrimary' ? 'bluePrimary.600' : undefined,
          },
        }),
        ghost: (props) => ({
          color: props.colorScheme === 'bluePrimary' ? 'bluePrimary.500' : undefined,
          _hover: {
            bg: props.colorMode === 'light' ? 'bluePrimary.50' : 'bluePrimary.700',
          },
        }),
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
                  <Route path="/calendario" element={<CalendarPage />} />
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
          
          {/* O EstimationModal foi removido daqui */}
          
        </BrowserRouter>
      </ChakraProvider>
    </AppProvider>
  );
}

export default App;