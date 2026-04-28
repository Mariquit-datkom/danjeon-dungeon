function attemptDescent() {
    let monstersLeft = countMonsters();
    const transitionLayer = document.getElementById('transition-layer');

    if (monstersLeft === 0) {
        isTransitioning = true;

        transitionLayer.classList.add('no-transition');
        transitionLayer.classList.remove('active', 'exit');

        void transitionLayer.offsetWidth;

        transitionLayer.classList.remove('no-transition');
        transitionLayer.classList.add('active');

        setTimeout(() => {
            initCrawl(); 
            
            transitionLayer.classList.remove('active');
            transitionLayer.classList.add('exit');

            setTimeout(() => {
                transitionLayer.classList.add('no-transition');
                transitionLayer.classList.remove('exit');
                isTransitioning = false;                  
            }, 600);
        }, 700);

    } else {
        
    }
}