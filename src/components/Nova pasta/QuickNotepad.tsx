// src/components/QuickNotepad/QuickNotepad.tsx
import { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Textarea,
  useToast,
} from '@chakra-ui/react';

const LOCAL_STORAGE_KEY = 'mente-em-foco-notepad';

interface QuickNotepadProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickNotepad({ isOpen, onClose }: QuickNotepadProps) {
  // Estado para o texto da nota
  const [note, setNote] = useState('');
  const toast = useToast();

  // Efeito para carregar a nota do localStorage quando o componente é montado pela primeira vez
  useEffect(() => {
    const savedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedNote) {
      setNote(savedNote);
    }
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  // Efeito para salvar a nota no localStorage sempre que ela for alterada
  useEffect(() => {
    // Usamos um timeout para não salvar a cada letra digitada, mas sim quando o usuário para de digitar
    const saveTimeout = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, note);
    }, 500); // Salva 500ms após a última alteração

    // A função de limpeza cancela o timeout se o usuário continuar digitando
    return () => clearTimeout(saveTimeout);
  }, [note]); // Este efeito roda toda vez que a 'note' muda

  const handleClose = () => {
    toast({
      title: 'Nota salva!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Bloco de Notas Rápido</DrawerHeader>

        <DrawerBody>
          <Textarea
            placeholder="Anote aqui suas ideias, pensamentos e lembretes..."
            h="100%"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}