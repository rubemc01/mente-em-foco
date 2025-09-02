import { Box, VStack, Heading, Button, Spacer, Text, Spinner, IconButton, useColorMode, HStack, Tooltip, Progress, Icon } from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaMusic, FaCog, FaTrophy, FaChartLine, FaSignOutAlt, FaSignInAlt, FaClipboardList, FaFirstAid, FaSun, FaMoon, FaShoppingCart, FaSmile, FaQuestionCircle } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const NavItem = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <RouterLink to={to} style={{ width: '100%' }}>
      <Button leftIcon={icon} justifyContent="start" w="100%" variant={isActive ? 'solid' : 'ghost'} colorScheme="teal">
        {children}
      </Button>
    </RouterLink>
  );
};

export function Sidebar() {
  const { currentUser, authLoading, userProfile } = useAppContext();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) { // <-- A CORREÇÃO ESTÁ AQUI
      console.error("Erro ao fazer logout:", error);
    }
  };

  const xpForNextLevel = 1000;
  const currentLevelXp = userProfile.xp % xpForNextLevel;
  const progressPercent = (currentLevelXp / xpForNextLevel) * 100;

  return (
    <Box
      as="nav"
      w="250px"
      h="100vh"
      p={4}
      borderRight="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
    >
      <Heading size="md" mb={6} color="teal.500">Mente em Foco</Heading>

      {currentUser && (
        <Box w="100%" p={3} bg="blackAlpha.200" borderRadius="md" mb={6}>
          <HStack>
            <Icon as={FaTrophy} color="yellow.400" />
            <Text fontWeight="bold" fontSize="sm">Nível {userProfile.level}</Text>
          </HStack>
          <Tooltip label={`${userProfile.xp % 1000} / 1000 XP para o próximo nível`}>
            <Progress value={progressPercent} size="sm" colorScheme="yellow" mt={2} borderRadius="sm" />
          </Tooltip>
        </Box>
      )}

      <VStack spacing={2} align="stretch">
        <NavItem to="/" icon={<FaHome />}>Dashboard</NavItem>
        <NavItem to="/progresso" icon={<FaChartLine />}>Progresso</NavItem>
        <NavItem to="/humor" icon={<FaSmile />}>Humor</NavItem>
        <NavItem to="/conquistas" icon={<FaTrophy />}>Conquistas</NavItem>
        <NavItem to="/compras" icon={<FaShoppingCart />}>Compras</NavItem>
        <NavItem to="/rotinas" icon={<FaClipboardList />}>Rotinas</NavItem>
        <NavItem to="/caixa-de-ferramentas" icon={<FaFirstAid />}>Caixa de Ferramentas</NavItem>
        <NavItem to="/sons" icon={<FaMusic />}>Sons de Ambiente</NavItem>
      </VStack>
      <Spacer />
      <VStack spacing={2} align="stretch">
        <HStack justifyContent="space-between">
          <Box flex="1">
            <NavItem to="/config" icon={<FaCog />}>Configurações</NavItem>
          </Box>
          <Tooltip label={colorMode === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'} placement="top">
            <IconButton
              aria-label="Alternar tema"
              icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
              onClick={toggleColorMode}
              variant="ghost"
            />
          </Tooltip>
        </HStack>

        <NavItem to="/ajuda" icon={<FaQuestionCircle />}>
          Ajuda
        </NavItem>
        
        <Box pt={2}>
          {authLoading ? ( <Spinner alignSelf="center" /> ) : currentUser ? (
            <VStack align="stretch" spacing={2}>
              <Text fontSize="sm" isTruncated>{currentUser.email}</Text>
              <Button leftIcon={<FaSignOutAlt />} onClick={handleLogout} colorScheme="red" variant="outline" size="sm">
                Logout
              </Button>
            </VStack>
          ) : (
            <RouterLink to="/login">
              <Button w="100%" colorScheme="teal" leftIcon={<FaSignInAlt />}>Login</Button>
            </RouterLink>
          )}
        </Box>
      </VStack>
    </Box>
  );
}