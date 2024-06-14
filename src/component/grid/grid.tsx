import Cell from '../cell/cell';
import './grid.css';

export default function Grid() {
    return (
        <>
            <div className="grid-container">
                {Array.from({ length: 9 }).map((_, i) => (
                    <Cell id={i} />
                ))}
            </div>
        </>
    );
}
