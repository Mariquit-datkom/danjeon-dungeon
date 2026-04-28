document.getElementById('new-btn').addEventListener('click', () => {
    // Show the name input modal
    document.getElementById('new-game-modal').style.display = 'flex';
});

document.getElementById('back-btn').addEventListener('click', () => {    
    document.getElementById('new-game-modal').style.display = 'none';
})

document.getElementById('new-game-modal').addEventListener('click', () => {    
    document.getElementById('new-game-modal').style.display = 'none';
})

document.getElementById('confirm-name-btn').addEventListener('click', async () => {
    const playerName = document.getElementById('player-name-input').value;
    
    if (playerName.trim() === "") {
        alert("Please enter a name!");
        return;
    }

    // 1. Roll for the starter character (001 to 003)
    // Math.random() * 3 gives 0-2.99, floor makes it 0-2, +1 makes it 1-3.
    const randomID = Math.floor(Math.random() * 3) + 1;
    const starterID = "00" + randomID; 

    // 2. Setup the fresh player object
    window.playerAccount = {
        name: playerName,
        currency: 500,
        roster: [starterID], // Add the ID we just rolled
        activeParty: [starterID, null, null], // Put them in the first slot
        inventory: []
    };

    // 3. Save it to Slot 1 by default (or you can let them pick)
    await window.savePlayerData(1);

    // 4. Redirect to the Lobby
    window.location.href = 'lobby/lobby.php';
});