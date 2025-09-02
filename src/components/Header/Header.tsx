import { Box, Heading, Text } from '@chakra-ui/react';

export function Header() {
  return (
    <Box as="header" p={4} bg="teal.500" color="white" textAlign="center" boxShadow="md">
      <Heading as="h1" size="lg">
        Mente em Foco
      </Heading>
      <Text fontSize="md" opacity={0.9}>
        Sua ferramenta de apoio para um dia a dia mais calmo e produtivo.
      </Text>
    </Box>
  );
}