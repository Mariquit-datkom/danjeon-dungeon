<?php
include_once 'x-head.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Danjeon Dungeon</title>
    <link rel="stylesheet" href="gameInit/css/global.css">
    <link rel="stylesheet" href="gameInit/css/mainMenu.css">
</head>
<body>
    <div class="title-screen-container">
        <div class="game-title-container">
            <img src="gameInit/assets/game-title.png" class="game-title">
        </div>
        <div class="main-menu-container">
            <div id="continue-btn">
                <img src="gameInit/assets/continue-btn.png" class="main-menu-btn">
            </div>
            <div id="new-btn">
                <img src="gameInit/assets/new-btn.png" class="main-menu-btn">
            </div>
            <div id="load-btn">
                <img src="gameInit/assets/load-btn.png" class="main-menu-btn">
            </div>
        </div>
    </div>

    <div id="new-game-modal" style="display:none;" class="modal-overlay">
        <div class="modal-content">
            <div class="back-btn-container">
                <button id="back-btn"><i class="fas fa-hand-back-point-left"></i></button>
            </div>
            <div class="new-game-form">
                <h3>Enter Hero Name</h3>
                <input type="text" id="player-name-input" placeholder="Name your legend...">
                <button id="confirm-name-btn">Begin Adventure</button>
            </div>
        </div>
    </div>

    <script src="player/playerState.js"></script>
    <script src="data/js/dataManager.js"></script>
    <?php include_once 'gameInit/menuController.php'; ?>
</body>
</html>