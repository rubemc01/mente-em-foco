import { useState } from 'react';
import { VStack, Heading, FormControl, FormLabel, Input, Button, useToast, Text, Link, HStack, Divider, Icon } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { FaGoogle } from 'react-icons/fa';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Por favor, preencha todos os campos.", status: "warning" });
      return;
    }
    setIsLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      toast({ title: 'Sucesso!', status: 'success' });
      navigate('/');
    } catch (error: any) {
      toast({ title: 'Erro na autenticação.', description: error.message, status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await FirebaseAuthentication.signInWithGoogle();
      toast({ title: 'Login com Google bem-sucedido!', status: 'success' });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Erro no login com Google.',
        description: 'Ocorreu um erro ou o login foi cancelado.',
        status: 'error',
      });
      console.error(error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <VStack spacing={4} w="100%" maxW="400px" mx="auto" p={8} bg="white" borderRadius="md" boxShadow="md">
      <Heading>{isLogin ? 'Login' : 'Criar Conta'}</Heading>
      
      <VStack as="form" onSubmit={handleEmailSubmit} spacing={4} w="100%">
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Senha</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
        </FormControl>
        <Button type="submit" colorScheme="bluePrimary" w="100%" isLoading={isLoading}>
          {isLogin ? 'Entrar' : 'Registar'}
        </Button>
      </VStack>

      <Text>
        {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
        <Link color="bluePrimary.500" onClick={() => setIsLogin(!isLogin)} ml={2} fontWeight="bold">
          {isLogin ? 'Crie uma agora' : 'Faça login'}
        </Link>
      </Text>

      <HStack w="100%" my={4}>
        <Divider />
        <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">OU</Text>
        <Divider />
      </HStack>

      <Button
        w="100%"
        colorScheme="red"
        variant="outline"
        leftIcon={<Icon as={FaGoogle} />}
        onClick={handleGoogleSignIn}
        isLoading={isGoogleLoading}
      >
        Entrar com o Google
      </Button>
    </VStack>
  );
}