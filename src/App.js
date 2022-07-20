import { useLayoutEffect } from 'react';
import GamePage from './Components/Pages/GamePage';
import Leaderboard from './Components/Pages/Leaderboard';

import Game from './Game/Main/Game';

function App() {

    useLayoutEffect(() => {
        new Game().run();
    })

    return (
        <>
            <GamePage />
            <Leaderboard amount={10}/>
        </>
    )
}

export default App;