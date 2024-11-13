import { ItemShop, Item } from '/pages/shop/shop.js';
 
export class Shop {
    exit = false;
    currentAnimation = null;

    constructor(
        Router, 
        GeneralHelper
    ) {
        this.GeneralHelper = GeneralHelper;

        console.log('Shop loaded');

        this.loadShopItems();

        const shopBackgroundMusic = document.getElementById("shopBackgroundMusic");
        const shopWelcomeMusic = document.getElementById("shopWelcomeMusic");
        const shopGoodbyeMusic = document.getElementById("shopGoodbyeMusic");

        shopWelcomeMusic.play();
        setTimeout(() => {
            shopBackgroundMusic.play();
        }, 300);

        const coniCanvas = document.getElementById('coinsCanvas');
        const shopkeeperCanvas = document.getElementById('shopkeeperCanvas');

        this.loadCoinAnimation(coniCanvas);
        this.loadShopkeeperAnimation(shopkeeperCanvas);

        const exitButton = document.getElementById("exitButton");
        exitButton.addEventListener('click', () => {
            this.exitShopAnimation(shopkeeperCanvas, shopGoodbyeMusic);
            setTimeout(() => {
                Router.render('safes');
                return;
            }, Router.beta ? 0 : 2000);
        });
    
    }

    loadShopItems(){
        Item.reset();

        const door = document.getElementById('door');
        const itemsContainer = document.getElementById('itemList');
        const itemDescription = document.getElementById('display');

        const itemsList = [
            new Item("Chaser", "Chaos Orbit", "Long range with below-average damage. No aiming required.", "chaser.png"),
            new Item("Spread", "", "Short range with great damage -- if you can keep close to your target.", "spread.png"),
            new Item("Roundabout", "Jumbo Rebound", "Great coverage with average damage. Aim backward for maximum range.", "roundabout.png"),
            new Item("Heart", "", "Adds an additional hit point but lightly weakens your attack power.", "heart.png"),
            new Item("Smoke Bomb", "", "You will not take damage during a dash. A great defense maneuver..", "smoke_bomb.png"),            
        ]

        this.itemShop = new ItemShop(door, itemDescription, itemsList, itemsContainer);
    }

    loadCoinAnimation(coniCanvas) {
        const coinsPath = '/assets/shop/coins.png';
        const coinFrames = 8;
        const coinWidth = 120;
        const coinHeight = 124;
        const coinFramesPerRow = 8;

        if (this.currentAnimation) this.currentAnimation.cancelAnimation();
        this.currentAnimation = this.GeneralHelper.generateAnimationBySprites({
            canvas: coniCanvas, 
            spritePath: coinsPath, 
            numFrames: coinFrames, 
            frameWidth: coinWidth, 
            frameHeight: coinHeight, 
            framesPerRow: coinFramesPerRow
        });
    }

    loadShopkeeperAnimation(shopkeeperCanvas) {
        let shopkeepersPath = '/assets/shop/shopkeeper_welcome.png';
        let shopkeeperFrames = 27;
        const shopkeeperWidth = 477;
        const shopkeeperHeight = 480;
        let shopkeeperFramesPerRow = 9;

        if (this.currentAnimation) this.currentAnimation.cancelAnimation();
        this.currentAnimation = this.GeneralHelper.generateAnimationBySprites({
            canvas: shopkeeperCanvas, 
            spritePath: shopkeepersPath, 
            numFrames: shopkeeperFrames, 
            frameWidth: shopkeeperWidth, 
            frameHeight: shopkeeperHeight, 
            framesPerRow: shopkeeperFramesPerRow, 
            frameSpeed: 50, 
            repeat: false
        });

        setTimeout(() => {
            shopkeepersPath = '/assets/shop/shopkeeper_default.png';
            shopkeeperFrames = 6;
            shopkeeperFramesPerRow = 6;

            if (this.currentAnimation) this.currentAnimation.cancelAnimation();
            this.currentAnimation = this.GeneralHelper.generateAnimationBySprites({
                canvas: shopkeeperCanvas, 
                spritePath: shopkeepersPath, 
                numFrames: shopkeeperFrames, 
                frameWidth: shopkeeperWidth, 
                frameHeight: shopkeeperHeight, 
                framesPerRow: shopkeeperFramesPerRow, 
                frameSpeed: 50, 
                repeat: true, 
                delayBetweenLoops: 50, 
                pingPong: true
            });
        }, 1600);
    }

    exitShopAnimation(shopkeeperCanvas, shopGoodbyeMusic) {
        shopGoodbyeMusic.play();
        this.itemShop?.setDoor(false);

        const shopkeepersPath = '/assets/shop/shopkeeper_goodbye.png';
        const shopkeeperFrames = 37;
        const shopkeeperWidth = 517;
        const shopkeeperHeight = 440;
        const shopkeeperFramesPerRow = 9;

        if (this.currentAnimation) this.currentAnimation.cancelAnimation();
        this.currentAnimation = this.GeneralHelper.generateAnimationBySprites({
            canvas: shopkeeperCanvas, 
            spritePath: shopkeepersPath, 
            numFrames: shopkeeperFrames, 
            frameWidth: shopkeeperWidth, 
            frameHeight: shopkeeperHeight, 
            framesPerRow: shopkeeperFramesPerRow, 
            frameSpeed: 50, 
            repeat: false,
            position: { x: 100, y: 150 }
        });
    }
}