window.gameData = {
    characters: {},
    moves: {},
    items: {},
    passives: {}
}

window.loadAllData = async function() {
    await Promise.all([
        loadCharacters()
    ]);
}

window.loadCharacters = async function() {
    try {
        const characterList = await fetch('data/json/characters.json');
        if (!characterList.ok) throw new Error("Could not load characters.json");

        window.gameData.characters = await characterList.json();
        console.log("Characters cached in gameData:", window.gameData.characters);
    } catch (err) {
        console.error("Data load error: ", err);
    }
}

loadAllData();