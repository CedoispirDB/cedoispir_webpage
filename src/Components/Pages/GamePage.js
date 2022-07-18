import React from 'react'
import "../Styles/GamePage.css"

function GamePage() {
    return (
        <div className="wrapper" style={{width: 0, height: 0}}>
            <div className="pause_button hide">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="icon pause_icon">
                    <path
                        d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="icon play_icon">
                    <path
                        d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                </svg>
            </div>
            <div className="pause_continue_msg hide">
                <p>&#60;Hover over the player to continue&#62;</p>
            </div>
            <div className="pause_menu hide">
                <ul className="pause_options_container"></ul>
            </div>
            <div className="current_score hide">0</div>
            <div className="total_score_wrapper hide">
                <div className="total_score">Total Score: </div>
                <button className="play_again_button">Play again</button>
                <div className="play_again_message hide"> &#60;Hover over the player to try again&#62;</div>
            </div>
            <div className="start_container hide">
                <button className="start_button text">Click here to begin</button>
            </div>

            <canvas id="canvas"></canvas>

        </div>
    )
}

export default GamePage
