import { BossList } from '/pages/bosses/boss.js'; 
import { BossesObject } from '/pages/bosses/bossesObject.js'

export class Bosses {
    constructor(
        Router, 
        GeneralHelper
    ) {
        this.GeneralHelper = GeneralHelper;

        console.log('Bosses loaded');

        const bossesBackgroundMusic = document.getElementById("bossesBackgroundMusic");
        bossesBackgroundMusic.play();

        this.loadBoss();

        const transitionAnimation = () => {
            this.loadTransition()
        }

        const nextButton = document.getElementById("nextButton");
        nextButton.addEventListener('click', () => {
            this.bossList.change('next', transitionAnimation);
        });

        const previousButton = document.getElementById("previousButton");
        previousButton.addEventListener('click', () => {
            this.bossList.change('previous', transitionAnimation);
        })

        const exitButton = document.getElementById("exitButton");
        exitButton.addEventListener('click', () => {
            setTimeout(() => {
                Router.render('safes');
            }, this.bossList.exitCurrentBoss() + 250);
        });
    }

    loadBoss() {
        const bossCanvas = document.getElementById("bossCanvas");
        const bossListObject = BossesObject(bossCanvas, this.GeneralHelper);

        this.bossList = BossList.createBossList(bossListObject); 
    }

    loadTransition() {
        const transitionCanvas = document.getElementById("transitionCanvas");
        const transitionPath = '/assets/bosses/transition.png';
        const transitionFrames = 17;
        const transitionWidth = 514;
        const transitionHeight = 290;
        const transitionFramesPerRow = 3;
        const transitionFrameSpeed = 30;
        const transitionRepeat = false;
        const transitionPingPong = false;
        const transitionBackgroundColors = ['#40AA83', '#40AA83', '#40AA83'];
        const transitionPosition = { x: 0, y: 0 };
        const duration = 510;

        if (this.currentAnimation) this.currentAnimation.cancelAnimation();
        this.currentAnimation = this.GeneralHelper.generateAnimationBySprites({
            canvas: transitionCanvas, 
            spritePath: transitionPath, 
            numFrames: transitionFrames, 
            frameWidth: transitionWidth, 
            frameHeight: transitionHeight, 
            framesPerRow: transitionFramesPerRow,
            frameSpeed: transitionFrameSpeed, 
            repeat: transitionRepeat,
            pingPong: transitionPingPong,
            backgroundColors: transitionBackgroundColors,
            position: transitionPosition
        });
            
        setTimeout(() => {
            this.currentAnimation.cancelAnimation();
        }, duration);

        return duration;
    }
}