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

// Garanta que a palavra 'export' está aqui
export function QuickNotepad({ isOpen, onClose }: QuickNotepadProps) {
  const [note, setNote] = useState('');
  const toast = useToast();

  useEffect(() => {
    const savedNote = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, note);
    }, 500);

    return () => clearTimeout(saveTimeout);
  }, [note]);

  const handleClose = () => {
    toast({
      title: 'Nota guardada!',
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
            placeholder="Anote aqui as suas ideias, pensamentos e lembretes..."
            h="100%"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}