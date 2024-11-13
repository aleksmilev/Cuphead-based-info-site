export class BossList {
    constructor(
        bosses
    ) {
        this.bosses = bosses;

        this.bosses[this.currentBoss].loadBoss();
    }

    currentBoss = 0;

    change(direction, transitionAnimation) {
        const deathDuration = this.exitCurrentBoss();

        setTimeout(() => {
            if (direction === 'next') {
                this.currentBoss++;
            } else if (direction === 'previous') {
                this.currentBoss--;
            }

            if (this.currentBoss < 0) {
                this.currentBoss = this.bosses.length - 1;
            } else if (this.currentBoss >= this.bosses.length) {
                this.currentBoss = 0;
            }

            const transitionDuration = transitionAnimation();

            setTimeout(() => {
                this.bosses[this.currentBoss].loadBoss();
            }, transitionDuration + deathDuration);
        }, deathDuration);
    }

    exitCurrentBoss() {
        return this.bosses[this.currentBoss].loadExitAnimation() + 400;
    }

    static createBossList(bossesObject) {
        return new BossList(bossesObject.map(bossConfig => {
            const bossInfo = new BossInfo(bossConfig.BossInfo);
    
            const bossAnimations = new BossAnimations({
                canvas: bossConfig.BossAnimations.canvas,
                birthAnimation: new BossAnimation(
                    {
                        ...bossConfig.BossAnimations.birthAnimation.animation
                    },
                    bossConfig.BossAnimations.birthAnimation.generalHelper,
                    bossConfig.BossAnimations.birthAnimation.duration
                ),
                lifeAnimation: new BossAnimation(
                    {
                        ...bossConfig.BossAnimations.lifeAnimation.animation
                    },
                    bossConfig.BossAnimations.lifeAnimation.generalHelper
                ),
                deathAnimation: new BossAnimation(
                    {
                        ...bossConfig.BossAnimations.deathAnimation.animation
                    },
                    bossConfig.BossAnimations.deathAnimation.generalHelper,
                    bossConfig.BossAnimations.deathAnimation.duration
                )
            });
    
            return new Boss(bossInfo, bossAnimations);
        }));
    }
}

export class Boss {
    constructor(
        info,
        animations,
    ) {
        this.info = info;
        this.animations = animations;
    }

    loadBoss() {
        if (BossAnimations.bossAnimationsLog) BossAnimations.bossAnimationsLog.forEach(animation => {
            animation.cancelAnimation();
        });;

        this.loadBackground(this.info.dirName); 
        this.loadInfo(this.info);

        setTimeout(() => {
            this.animations.loadBirthAnimation();

            setTimeout(() => {
                this.animations.loadLifeAnimation();
            }, this.animations.birthAnimation.duration);
        }, 250);
    }

    loadExitAnimation() {
        this.animations.loadDeathAnimation();
        return this.animations.deathAnimation.duration;
    }

    loadBackground(background) {
        const backgroundPath = `/assets/bosses/bosses/${background}/background.jpg`;

        document.getElementById("bosses").style.backgroundImage = `url('${backgroundPath}')`;
    }

    loadInfo(info) {
        document.querySelector("#bossDescription #name").innerHTML = `${info.name}`;
        document.querySelector("#bossDescription #phrase").innerHTML = `"${info.phrase}"`;
        document.querySelector("#bossDescription #description").innerHTML = `${info.description}`;
        document.querySelector("#bossDescription #difficulty").innerHTML = `<strong>Difficulty:</strong> ${info.difficulty}`;
        document.querySelector("#bossDescription #location").innerHTML = `<strong>Location:</strong> ${info.location}`;
        document.querySelector("#bossDescription #specialMove").innerHTML = `<strong>Special Move:</strong> ${info.specialMove}`;
    }
}

export class BossAnimations {
    constructor({
        canvas,
        birthAnimation,
        lifeAnimation,
        deathAnimation
    }) {
        this.canvas = canvas;

        this.birthAnimation = birthAnimation;
        this.lifeAnimation = lifeAnimation;
        this.deathAnimation = deathAnimation;
    }

    static bossAnimationsLog = [];

    loadBirthAnimation() {
        return this.loadAnimation(this.birthAnimation);
    }

    loadLifeAnimation() {
        return this.loadAnimation(this.lifeAnimation);
    }

    loadDeathAnimation() {
        return this.loadAnimation(this.deathAnimation);
    }

    loadAnimation(animationObject) {
        if (this.birthAnimation.currentAnimation) this.birthAnimation.currentAnimation.cancelAnimation();
        if (this.lifeAnimation.currentAnimation) this.lifeAnimation.currentAnimation.cancelAnimation();
        if (this.deathAnimation.currentAnimation) this.deathAnimation.currentAnimation.cancelAnimation();

        BossAnimations.bossAnimationsLog.push(
            this.currentAnimation = animationObject.loadAnimation(
                this.canvas,
                this.currentAnimation
            )
        );
    }
}

export class BossAnimation {
    constructor (
        {
            spritePath,
            numFrames,
            frameWidth,
            frameHeight,
            framesPerRow,
            frameSpeed,
            repeat,
            pingPong,
            backgroundColors,
            position,
        },
        GeneralHelper,
        duration = 0
    ) {
        this.GeneralHelper = GeneralHelper;
        this.duration = duration;

        this.spritePath = "/assets/bosses/bosses/" + spritePath;
        this.numFrames = numFrames;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.framesPerRow = framesPerRow;
        this.frameSpeed = frameSpeed;
        this.repeat = repeat;
        this.pingPong = pingPong;
        this.backgroundColors = backgroundColors;
        this.position = position;
    }

    loadAnimation(canvas, currentAnimation) {
        if (currentAnimation) currentAnimation.cancelAnimation();
        return this.GeneralHelper.generateAnimationBySprites({
            canvas: canvas, 
            spritePath: this.spritePath, 
            numFrames: this.numFrames, 
            frameWidth: this.frameWidth, 
            frameHeight: this.frameHeight, 
            framesPerRow: this.framesPerRow, 
            frameSpeed: this.frameSpeed, 
            repeat: this.repeat,
            pingPong: this.pingPong,
            backgroundColors: this.backgroundColors,
            position: this.position
        });
    }
}

export class BossInfo {
    constructor ({
        name,
        phrase,
        description,
        difficulty,
        location,
        specialMove,
        dirName
    }) {
        this.name = name;
        this.phrase = phrase;
        this.description = description;
        this.difficulty = difficulty;
        this.location = location;
        this.specialMove = specialMove;
        this.dirName = dirName;
    }
}