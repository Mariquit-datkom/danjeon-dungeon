function initGame() {
    document.getElementById('ui').innerText = "Use WASD to move, Spacebar to interact";
    const width = 35;
    const height = 15;
    
    // 1. Pick a random starting point (avoiding the 0 and Max index)
    const startX = Math.floor(Math.random() * (width - 2)) + 1;
    const startY = Math.floor(Math.random() * (height - 2)) + 1;
    
    playerPos = { x: startX, y: startY };

    // 2. Roll for floor tiles
    const randMaxFloorTiles = Math.floor(Math.random() * (475 - 200 + 1)) + 200;
    
    // 3. Generate map using that random start point
    mapData = generateRandomMap(width, height, randMaxFloorTiles, startX, startY);

    let monsterCount, lootCount;

    if (randMaxFloorTiles > 300) {
        monsterCount = Math.floor(Math.random() * (6 - 4 + 1)) + 4;
        lootCount = (monsterCount === 7) ? 3 : 2;
    } else {
        monsterCount = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        lootCount = (monsterCount === 5) ? 2 : 1;
    }
    
    // Fill with stuff
    placeObjects(mapData, 2, monsterCount); //monsters
    placeObjects(mapData, 3, lootCount); //loot
    placeObjects(mapData, 4, 1); //staircase    

    discoveredTiles = Array.from({ length: height }, () => Array(width).fill(false));
    updateFogOfWar();
    
    drawMap();
}

initGame();