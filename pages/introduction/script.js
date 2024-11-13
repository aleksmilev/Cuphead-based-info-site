export class Introduction {
    constructor(
        Router
    ) {
        console.log('Introduction loaded');

        const video = document.getElementById('introductionBackgroundVideo');
        const start = document.getElementById('startButton');
        
        this.loadYouTubeFallback(video, "https://www.youtube.com/embed/TLBRO5AdqAM")

        const loadSafes = () => {
            removeListeners();
            Router.render('safes');
        };

        const removeListeners = () => {
            video.removeEventListener('ended', loadSafes);
            document.removeEventListener('click', loadSafes);
            document.removeEventListener('keypress', loadSafes);
        };

        start.addEventListener('click', () => {
            start.style.display = 'none';
            video.style.display = 'block';
            video.play();

            const documentEl = document.documentElement;

            const requestFullscreen = documentEl.requestFullscreen 
                                    || documentEl.mozRequestFullScreen 
                                    || documentEl.webkitRequestFullscreen 
                                    || documentEl.msRequestFullscreen;

            if (requestFullscreen) {
                requestFullscreen.call(documentEl);
            }

            setTimeout(() => {
                video.addEventListener('ended', loadSafes);
                document.addEventListener('click', loadSafes);
                document.addEventListener('keypress', loadSafes);
            }, Router.beta ? 0 : 10000);
        });
    }

    loadYouTubeFallback(video, backupYouTubeUrl) {
        const iframe = document.createElement('iframe');
        iframe.src = backupYouTubeUrl + "?autoplay=1";
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.style.objectFit = "cover";
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.display = "block";
        iframe.style.pointerEvents = "none";
        iframe.style.position = "absolute";

        video.parentNode.replaceChild(iframe, video);
    };
}
