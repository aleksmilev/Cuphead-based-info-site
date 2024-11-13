import { BookPagesObject } from "/pages/book/bookPages.js";

export class Book {
    pages = BookPagesObject;
    preloadedPages = [];

    constructor(Router, GeneralHelper) {
        this.Router = Router;
        this.GeneralHelper = GeneralHelper;

        console.log('Book loaded');

        const bookBackgroundMusic = document.getElementById("bookBackgroundMusic");
        bookBackgroundMusic.play();

        const bookCanvas = document.getElementById("bookCanvas");
        let pageNumber = 0;

        this.preloadPages(() => {
            this.loadNewBookPage(bookCanvas, pageNumber);

            bookCanvas.addEventListener('click', () => {
                this.loadNewBookPage(bookCanvas, ++pageNumber);
            });
            document.addEventListener('keypress', () => {
                this.loadNewBookPage(bookCanvas, ++pageNumber);
            });
        });
    }

    preloadPages(callback) {
        let pagesLoaded = 0;

        this.pages.forEach((pageFrames, pageIndex) => {
            const frames = [];
            let framesLoaded = 0;

            pageFrames.forEach((framePath, frameIndex) => {
                const img = new Image();
                img.src = framePath;
                img.onload = () => {
                    frames[frameIndex] = img;
                    framesLoaded++;

                    // When all frames of a page are loaded, store them
                    if (framesLoaded === pageFrames.length) {
                        this.preloadedPages[pageIndex] = frames;
                        pagesLoaded++;

                        // Once all pages are loaded, execute the callback
                        if (pagesLoaded === this.pages.length) {
                            callback();
                        }
                    }
                };
            });
        });
    }

    loadNewBookPage(bookCanvas, pageNumber) {
        if (pageNumber >= this.pages.length - 1) {
            bookCanvas.removeEventListener('click', this.loadNewBookPage);
            document.removeEventListener('keypress', this.loadNewBookPage);

            setTimeout(() => {
                this.Router.render('safes');
            }, 3640);
        }

        const currentPageFrames = this.preloadedPages[pageNumber];
        if (currentPageFrames) {
            const imagePaths = currentPageFrames.map(img => img.src);

            this.GeneralHelper.generateAnimationByImages({
                canvas: bookCanvas,
                imagePaths: imagePaths,
                frameSpeed: 20,
                repeat: false,
            });
        }
    }
}
