import React, { useLayoutEffect, useState } from 'react'
import "../Styles/Leaderboard.css"
import { getAllPlayersData } from '../../ApiHandler'


let pi;

function quickSort(arr, low, high) {

    if (low < high) {
        pi = partition(arr, low, high)

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

function partition(arr, low, high) {
    let pivot = parseInt(arr[high - 1].Score.S);

    let i = low - 1;

    for (var j = low; j < high - 1; j++) {
        if (parseInt(arr[j].Score.S) >= pivot) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j]
            arr[j] = temp;
        }
    }

    let temp2 = arr[high - 1];
    arr[high - 1] = arr[i + 1];
    arr[i + 1] = temp2;

    return i + 1
}

function Leaderboard({ amount }) {



    useLayoutEffect(() => {
        let nameList = document.querySelector(".name_list");
        let scoreList = document.querySelector(".score_list");

        getAllPlayersData(amount)
            .then((res) => {

                let arr = res.data.response;
                quickSort(arr, 0, arr.length);
                for (var i = 0; i < arr.length; i++) {
                    let nameLi = document.createElement("li");
                    let scoreLi = document.createElement("li");
                    nameLi.innerText = arr[i].PlayerName.S;
                    scoreLi.innerText = arr[i].Score.S;
                    nameList.append(nameLi);
                    scoreList.append(scoreLi);
                }
            });

    })


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
                            
                        </ul>
                    </div>

                    <div className='score_container'>
                        <h2>Score</h2>

                        <ul className='score_list'>
                         
                        </ul>




                    </div>

                </div>
            </div>
        </>
    )
}


export default Leaderboard
