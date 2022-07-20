import axios from "axios";

export async function savePlayerData(username, score) {
    console.log(username, score);
    return await axios.post(`https://eu-1.lolo.co/hCX1pE1uReAPXHt4aJmvpQ/addNewPlayer?username=${username}&score=${score}`)
   
}