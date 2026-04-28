function openLoot(lootY, lootX) {

    mapData[lootY][lootX] = 1;
    drawMap();
}