import { useContext } from 'react';
import { GameContext } from './gameContext';

export default function useGameContext() {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGameContext must be used within a GameProvider');
    return context;
}
