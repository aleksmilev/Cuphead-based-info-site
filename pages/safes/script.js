export class Safes {
    constructor(
        Router
    ) {
        console.log('Safes loaded');

        const safesBackgroundMusic = document.getElementById("safesBackgroundMusic");
        safesBackgroundMusic.play();

        document.getElementById("renderBosses").addEventListener('click', () => { Router.render("bosses") })
        document.getElementById("renderShop").addEventListener('click', () => { Router.render("shop") })
        document.getElementById("renderBook").addEventListener('click', () => { Router.render("book") })
    }
}