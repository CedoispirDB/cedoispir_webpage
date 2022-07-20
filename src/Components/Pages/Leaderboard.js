import React from 'react'
import "../Styles/Leaderboard.css"

function Leaderboard(amount) {
    return (
        <>
            <hr className='line1'></hr>
            <hr className='line2'></hr>
            <hr className='line3'></hr>
            <hr className='line4'></hr>
            <hr className='line5'></hr>
            <hr className='line6'></hr>
            <div className='leaderboard_container'>
                <h1 className='title'>Leaderboard</h1>
                <div className='leaderboard_box'>
                    <div className='name_container'>
                        <h2>Name</h2>
                        {/* Max chars in name: 9 */}
                        <ul className='name_list'>
                            <li>Marco</li>
                            <li>Bia</li>
                            <li>Julia</li>
                            <li>Natalia</li>
                            <li>Bianca</li>
                            <li>Luana</li>
                            <li>Augie</li>
                            <li>Dudu</li>
                            <li>Tata</li>
                            <li>Gigi</li>
                        </ul>
                    </div>

                    <div className='score_container'>
                        <h2>Score</h2>
                        <ul className='score_list'>
                            <li>10</li>
                            <li>9</li>
                            <li>8</li>
                            <li>7</li>
                            <li>6</li>
                            <li>5</li>
                            <li>4</li>
                            <li>3</li>
                            <li>2</li>
                            <li>1</li>
                        </ul>
                    </div>


                </div>

            </div>
        </>
    )
}

export default Leaderboard
