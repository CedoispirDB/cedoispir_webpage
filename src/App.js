import React from 'react'
import GamePage from './GamePage';
import Game from './Game/Main/Game';

function App() {
    window.onload = () => {
        new Game().run();
    }

    return (
        <>
            <GamePage />
        </>
    )
}

export default App;