function initGame() {
    const width = 30;
    const height = 12;
    
    // 1. Pick a random starting point (avoiding the 0 and Max index)
    const startX = Math.floor(Math.random() * (width - 2)) + 1;
    const startY = Math.floor(Math.random() * (height - 2)) + 1;
    
    playerPos = { x: startX, y: startY };

    // 2. Roll for floor tiles
    const randMaxFloorTiles = Math.floor(Math.random() * (250 - 90 + 1)) + 90;
    
    // 3. Generate map using that random start point
    mapData = generateRandomMap(width, height, randMaxFloorTiles, startX, startY);

    let monsterCount, lootCount;

    if (randMaxFloorTiles > 150) {
        monsterCount = Math.floor(Math.random() * (5 - 4 + 1)) + 4;
        lootCount = (monsterCount === 5) ? 3 : 2;
    } else {
        monsterCount = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
        lootCount = (monsterCount === 3) ? 2 : 1;
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