import React, { createContext, useCallback, useEffect, useState } from 'react';

type Turn = 'x' | 'o';
type Winner = null | 'X' | 'O' | 'Draw';
type Status = 'running' | 'ended';
type Grid = Array<null | Turn>;

type GameContextType = {
    turn: Turn;
    winner: Winner;
    status: Status;
    grid: Grid;
    play: (id: number) => void;
    restart: () => void;
};

const defaults = {
    turn: 'x' as Turn,
    winner: null,
    status: 'running' as Status,
    grid: Array(9).fill(null),
    play: () => {},
    restart: () => {},
};

const GameContext = createContext<GameContextType>({ ...defaults });

function GameProvider({ children }: { children: React.ReactNode }) {
    const [turn, setTurn] = useState<Turn>(defaults.turn);
    const [status, setStatus] = useState<Status>(defaults.status);
    const [grid, setGrid] = useState<Grid>(defaults.grid);
    const [winner, setWinner] = useState<Winner>(defaults.winner);
    const toggleTurn = useCallback(() => {
        if (status !== 'running') return;
        setTurn(turn === 'x' ? 'o' : 'x');
    }, [status, turn]);

    const checkWin = useCallback(
        (grid: Grid) => {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
                    setWinner(grid[a] === 'x' ? 'X' : 'O');
                    setStatus('ended');
                    return;
                }
            }
            if (grid.every((v) => v)) {
                setWinner('Draw');
                setStatus('ended');
            }
            toggleTurn();
        },
        [toggleTurn]
    );

    const play = useCallback(
        (id: number) => {
            if (status !== 'running') return;
            if (grid[id]) return;
            const newGrid = grid.map((v, i) => (i === id ? turn : v));
            setGrid(newGrid);
            checkWin(newGrid);
        },
        [turn, status, grid, checkWin]
    );

    // computer plays on O's turn
    useEffect(() => {
        if (turn !== 'o') return;
        const available = [];
        for (let i = 0; i < 9; i++) {
            if (!grid[i]) available.push(i);
        }
        const id = available[Math.floor(Math.random() * available.length)];
        play(id);
    }, [turn, play, grid]);

    const restart = () => {
        setTurn(defaults.turn);
        setWinner(defaults.winner);
        setStatus(defaults.status);
        setGrid(defaults.grid);
    };

    return (
        <GameContext.Provider value={{ turn, status, grid, winner, play, restart }}>{children}</GameContext.Provider>
    );
}

export { GameContext, GameProvider };
