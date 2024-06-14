import { useEffect, useState } from 'react';
import OSVG from '../../assets/o.svg';
import XSVG from '../../assets/x.svg';
import useGameContext from '../../context/useGameContext';
import './cell.css';

export default function Cell({ id }: { id: number }) {
    const { play, grid } = useGameContext();
    const [svg, setSvg] = useState<null | 'x' | 'o'>(null);

    useEffect(() => {
        if (grid[id] === svg) return;
        setSvg(grid[id]);
    }, [id, svg, grid]);

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        play(id);
    };
    return (
        <>
            <div className="grid-item" onClick={onClick}>
                {svg ? createImg(svg) : null}
            </div>
        </>
    );
}

const createImg = (type: 'x' | 'o') => {
    return <img src={type === 'x' ? XSVG : OSVG} alt={type === 'x' ? 'X' : 'O'} />;
};
