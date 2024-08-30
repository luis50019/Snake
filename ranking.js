import { getPlayers,updateRecord } from './data.js';

const ranking = document.getElementById('ranking');

const showRankingPlayer = (players) => {
  while (ranking.firstChild) {
    ranking.removeChild(ranking.firstChild);
  }
  const listPlayers = players.map(player => {
    const li = document.createElement('li'); 
    const spanName = document.createElement('span');
    const spanScore = document.createElement('span');
    
    spanName.innerHTML = player.userName;
    spanScore.innerHTML = player.record;
    
    li.append(spanName, spanScore); 
    return li; 
  });
  
  ranking.append(...listPlayers); 
};


export const getRankingPlayers = async() => {
  try {
    const players = await getPlayers();
    showRankingPlayer(players.reverse());
  } catch (error) {
    console.log(error);
  }
};
export const updateRecordPlayer = async (appleCount) => {
  try {
    const player = JSON.parse(window.localStorage.getItem('player'));
    
    if (player && player.length > 0) {
      if (appleCount > player[0].record) {
        const data = {
          id: player[0].id,
          record: appleCount
        };
        const playerUpdate = await updateRecord(data);
        window.localStorage.setItem('player', JSON.stringify(playerUpdate));
      } else {
        window.localStorage.setItem('player', JSON.stringify(player));
      }
      await getRankingPlayers();
    } else {
      console.log('No se encontró el jugador en localStorage.');
    }

  } catch (e) {
    console.log(e);
  }
};

