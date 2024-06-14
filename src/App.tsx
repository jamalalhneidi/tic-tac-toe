import './App.css';
import Grid from './component/grid/grid';
import useGameContext from './context/useGameContext';

function App() {
    const { turn, status, winner, restart } = useGameContext();
    let text: string;
    if (status === 'running') text = `${turn.toUpperCase()}'s Turn`;
    else {
        if (winner === 'Draw') text = 'Draw!';
        else text = `${winner} Won!`;
    }

    return (
        <>
            <div style={{ marginBottom: '8px' }}>{text}</div>
            <Grid />
            <button style={{ marginTop: '8px' }} onClick={restart}>
                Restart
            </button>
        </>
    );
}

export default App;
