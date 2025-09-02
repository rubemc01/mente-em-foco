// src/features/Soundscape/soundData.ts
// CORREÇÃO: Trocamos 'Fanoise' por 'FaWaveSquare'
import { FaCloudRain, FaTree, FaCoffee, FaWaveSquare, FaWater } from 'react-icons/fa';

// Este arquivo contém apenas os DADOS dos nossos sons.
// Para adicionar um novo som, você só precisará editar este arquivo.
export const sounds = [
  { name: 'Chuva', src: '/sounds/rain.mp3', icon: FaCloudRain },
  { name: 'Chuva-Leve', src: '/sounds/chuva-leve.mp3', icon: FaWater },
  { name: 'Floresta', src: '/sounds/forest.mp3', icon: FaTree },
  { name: 'Cafeteria', src: '/sounds/coffee.mp3', icon: FaCoffee },
  { name: 'Oceano', src: '/sounds/ocean.mp3', icon: FaWater },
  { name: 'Riacho', src: '/sounds/riacho.mp3', icon: FaWater },
  // CORREÇÃO: Usando o ícone correto FaWaveSquare
  { name: 'Ruido-Branco', src: '/sounds/ruido-branco.mp3', icon: FaWaveSquare },
  { name: 'Ruido-Marron', src: '/sounds/ruido-Marron.mp3', icon: FaWaveSquare },
];