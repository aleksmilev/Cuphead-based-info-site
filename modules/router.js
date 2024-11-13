import { GeneralHelper } from '/modules/general_helper.js';

import { Shop } from '/pages/shop/script.js';
import { Introduction } from '/pages/introduction/script.js';
import { Safes } from '/pages/safes/script.js';
import { Bosses } from '/pages/bosses/script.js'
import { Book } from '/pages/book/script.js';

export class RenderScripts {
    static introduction() {
        new Introduction(Router);
    }

    static safes(){
        new Safes(Router);
    }

    static shop() {
        new Shop(Router, GeneralHelper);
    }

    static bosses(){
        new Bosses(Router, GeneralHelper);
    }
    static book(){
        new Book(Router, GeneralHelper);
    }
}

export class Router {
    static render(element) {
        const pageFrame = document.getElementById('pageFrame');
        if (!pageFrame) {
            console.error('Error: pageFrame element not found.');
            return;
        }
        pageFrame.innerHTML = '';

        const bodyPath = `/pages/${element}/index.html`;

        this.renderBody(bodyPath, pageFrame).then(() => {
            if (this.scriptMap[element]) {
                this.scriptMap[element]();
            } else {
                console.error(`Error: No script found for ${element}`);
            }
        }).catch(error => {
            console.error('Error loading page:', error);
        });
    }

    static async renderBody(path, pageFrame) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.text();
            pageFrame.innerHTML = data;

            Router.beta && Router.applyBeta();
        } catch (error) {
            console.error('Error loading HTML:', error);
        }
    }

    static scriptMap = {
        'introduction': RenderScripts.introduction,
        'safes': RenderScripts.safes,
        'shop': RenderScripts.shop,
        'bosses': RenderScripts.bosses,
        'book': RenderScripts.book,
    }

    static beta = false;

    static applyBeta() {
        const audios = [
            "introductionBackgroundVideo",
            "safesBackgroundMusic",
            "bookBackgroundMusic",
            "bossesBackgroundMusic",
            "shopBackgroundMusic",
            "shopWelcomeMusic",
            "shopGoodbyeMusic"
        ];
    
        audios.forEach(audio => {
            const audioElement = document.getElementById(audio);
            if (audioElement) audioElement.muted = true;
        });
    }
}
