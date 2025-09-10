import { Box, VStack, Heading, Button, Spacer, Text, Spinner, IconButton, useColorMode, HStack, Tooltip, Progress, Icon, Image, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaMusic, FaCog, FaTrophy, FaChartLine, FaSignOutAlt, FaSignInAlt, FaClipboardList, FaFirstAid, FaSun, FaMoon, FaShoppingCart, FaSmile, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import appLogo from '../../assets/logo.png';

const NavItem = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <RouterLink to={to} style={{ width: '100%' }}>
      <Button leftIcon={icon} justifyContent="start" w="100%" variant={isActive ? 'solid' : 'ghost'} colorScheme="bluePrimary">
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
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  
  const xp = userProfile?.xp || 0;
  const level = userProfile?.level || 1;
  const xpForNextLevel = 1000;
  const currentLevelXp = xp % xpForNextLevel;
  const progressPercent = (currentLevelXp / xpForNextLevel) * 100;

  return (
    <Box
      as="nav"
      w="250px"
      h="full" // Garante que ocupa 100% da altura
      p={4}
      borderRight="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
    >
      <RouterLink to="/"> 
        <Image src={appLogo} alt="Mente em Foco Logo" width="100%" maxWidth="180px" mx="auto" mb={6} />
      </RouterLink>

      {currentUser && (
        <Box w="100%" p={3} bg="blackAlpha.200" borderRadius="md" mb={6}>
          <HStack>
            <Icon as={FaTrophy} color="yellow.400" />
            <Text fontWeight="bold" fontSize="sm">Nível {level}</Text>
          </HStack>
          <Tooltip label={`${currentLevelXp} / ${xpForNextLevel} XP para o próximo nível`}>
            <Progress value={progressPercent} size="sm" colorScheme="yellow" mt={2} borderRadius="sm" />
          </Tooltip>
        </Box>
      )}

      <VStack spacing={2} align="stretch">
        <NavItem to="/" icon={<FaHome />}>Dashboard</NavItem>
        <NavItem to="/progresso" icon={<FaChartLine />}>Progresso</NavItem>
        <NavItem to="/humor" icon={<FaSmile />}>Humor</NavItem>
        <NavItem to="/conquistas" icon={<FaTrophy />}>Conquistas</NavItem>
        <NavItem to="/calendario" icon={<FaCalendarAlt />}>Calendário</NavItem>
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
              <Button w="100%" colorScheme="bluePrimary" leftIcon={<FaSignInAlt />}>Login</Button>
            </RouterLink>
          )}
        </Box>
        
        <Box pt={4} textAlign="center">
          <Text fontSize="xs" color="gray.500">
            © 2025 - Rubem Cesar Terapias
          </Text>
          <Link href="https://rubemcesarterapias.com" isExternal fontSize="xs" color="blue.500">
            rubemcesarterapias.com
          </Link>
        </Box>
      </VStack>
    </Box>
  );
}