// src/components/ProtectedRoute/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Spinner, Center } from '@chakra-ui/react';

export function ProtectedRoute() {
  const { currentUser, authLoading } = useAppContext();

  // Se ainda estiver a verificar a autenticação, mostra um spinner
  if (authLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // Se a verificação terminou e não há utilizador, redireciona para o login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Se há um utilizador, mostra o conteúdo da página protegida
  return <Outlet />;
}