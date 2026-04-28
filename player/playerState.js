window.playerAccount = {
    currency: 500,       // For Gacha pulls
    inventory: [],      // Consumable "Moves" and Items
    roster: [],         // Every character owned
    activeParty: [null, null, null] // The 3 characters currently in the dungeon
};

window.savePlayerData = async function(slot) {
    const dataString = JSON.stringify(window.playerAccount);
    
    try {
        const response = await fetch('../data/saveGame.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                slot: slot,
                saveData: window.playerAccount
            })
        });

        const result = await response.json();
        console.log("Server says:", result.message);
    } catch (err) {
        console.error("Failed to save to server:", err);
    }
};

window.loadPlayerData = function() {
    const savedData = localStorage.getItem('danjeon_save_data');
    if (savedData) {
        window.playerAccount = JSON.parse(savedData);
        console.log("Player data loaded:", window.playerAccount);
        return true; // Success
    }
    return false; // No save found
};