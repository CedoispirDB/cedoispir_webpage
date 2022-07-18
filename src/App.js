import { useLayoutEffect } from 'react';
import GamePage from './Components/Pages/GamePage';
import Game from './Game/Main/Game';

function App() {

    useLayoutEffect(() => {
        new Game().run();
    })

    return (
        <>
            <GamePage />
        </>
    )
}

export default App;