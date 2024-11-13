export class GeneralHelper {
    static #loadImage(src) {
        const img = new Image();
        img.src = src;
        return img;
    }

    static #loadImages(imagePaths) {
        return imagePaths.map(path => GeneralHelper.#loadImage(path));
    }

    static generateAnimationByImages({
        canvas,
        imagePaths,
        frameSpeed = 100,
        repeat = true,
        delayBetweenLoops = 0,
        pingPong = false,
    }) {
        const ctx = canvas.getContext('2d');
        const images = GeneralHelper.#loadImages(imagePaths);
        let frameIndex = 0;
        let lastUpdateTime = 0;
        let loopComplete = false;
        let forward = true;
    
        const scaleFactor = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * scaleFactor;
        canvas.height = canvas.clientHeight * scaleFactor;
    
        ctx.scale(scaleFactor, scaleFactor);
    
        const animate = (time) => {
            if (!lastUpdateTime) lastUpdateTime = time;
            const deltaTime = time - lastUpdateTime;
    
            if (deltaTime > frameSpeed) {
                lastUpdateTime = time;
    
                if (forward) {
                    frameIndex++;
                } else {
                    frameIndex--;
                }
    
                if (frameIndex >= images.length) {
                    if (pingPong) {
                        forward = false;
                        frameIndex = images.length - 1;
                    } else if (repeat) {
                        frameIndex = 0;
                    } else {
                        frameIndex = images.length - 1;
                        loopComplete = true;
                    }
                } else if (frameIndex < 0) {
                    if (pingPong) {
                        forward = true;
                        frameIndex = 0;
                    } else {
                        frameIndex = images.length - 1;
                        loopComplete = true;
                    }
                }
            }
    
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            const image = images[frameIndex];
            const canvasAspect = canvas.width / canvas.height;
            const imageAspect = image.width / image.height;
    
            let drawWidth, drawHeight;
            
            if (canvasAspect > imageAspect) {
                drawWidth = canvas.width;
                drawHeight = drawWidth / imageAspect;
            } else {
                drawHeight = canvas.height;
                drawWidth = drawHeight * imageAspect;
            }
    
            const x = (canvas.width - drawWidth) / 2;
            const y = (canvas.height - drawHeight) / 2;
    
            ctx.drawImage(image, x, y, drawWidth, drawHeight);
    
            if (!loopComplete) {
                if (frameIndex === 0 && delayBetweenLoops > 0 && !forward) {
                    setTimeout(() => requestAnimationFrame(animate), delayBetweenLoops);
                } else {
                    requestAnimationFrame(animate);
                }
            }
        };
    
        requestAnimationFrame(animate);
    }

    static generateAnimationBySprites({
        canvas, 
        spritePath, 
        numFrames, 
        frameWidth, 
        frameHeight, 
        framesPerRow,    
        frameSpeed = 100, 
        repeat = true, 
        delayBetweenLoops = 0,
        pingPong = false,
        backgroundColors = ['#00A2E8'],
        position = { x: 100, y: 100 }
    }) {
        const ctx = canvas.getContext('2d');
        const spriteSheet = new Image();
        spriteSheet.src = spritePath;

        let exitAnimation = false;

        let frameIndex = 0;
        let lastUpdateTime = 0;
        let loopComplete = false;
        let forward = true;
        let animationFrameId = null;
        const backgroundRgbColors = backgroundColors.map(hexToRgb);
    
        spriteSheet.onload = () => {
            startAnimation();
        };
    
        function hexToRgb(hex) {
            let parsedHex = hex.replace('#', '');
            if (parsedHex.length === 3) {
                parsedHex = parsedHex.split('').map(char => char + char).join('');
            }
            const bigint = parseInt(parsedHex, 16);
            return {
                r: (bigint >> 16) & 255,
                g: (bigint >> 8) & 255,
                b: bigint & 255
            };
        }
    
        function removeBackground(imageData) {
            const pixels = imageData.data;
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                if (backgroundRgbColors.some(bgColor => r === bgColor.r && g === bgColor.g && b === bgColor.b)) {
                    pixels[i + 3] = 0;
                }
            }
            ctx.putImageData(imageData, position.x, position.y);
        }
    
        function updateFrame() {
            if (forward) {
                frameIndex++;
            } else {
                frameIndex--;
            }
    
            if (frameIndex >= numFrames) {
                if (pingPong) {
                    forward = false;
                    frameIndex = numFrames - 1;
                } else {
                    frameIndex = 0;
                    if (!repeat) loopComplete = true;
                }
            } else if (frameIndex < 0) {
                if (pingPong) {
                    forward = true;
                    frameIndex = 0;
                } else {
                    frameIndex = numFrames - 1;
                    if (!repeat) loopComplete = true;
                }
            }
        }
    
        function animate(time) {
            if(exitAnimation) return;

            if (!lastUpdateTime) lastUpdateTime = time;
            const deltaTime = time - lastUpdateTime;
    
            if (deltaTime > frameSpeed) {
                lastUpdateTime = time;
                updateFrame();
            }
    
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const row = Math.floor(frameIndex / framesPerRow);
            const col = frameIndex % framesPerRow;
    
            ctx.drawImage(
                spriteSheet,
                col * frameWidth,
                row * frameHeight,
                frameWidth,
                frameHeight,
                position.x,
                position.y,
                frameWidth,
                frameHeight
            );
    
            const imageData = ctx.getImageData(position.x, position.y, frameWidth, frameHeight);
            removeBackground(imageData);
    
            if (!loopComplete) {
                if (frameIndex === 0 && delayBetweenLoops > 0 && !forward) {
                    setTimeout(() => animationFrameId = requestAnimationFrame(animate), delayBetweenLoops);
                } else {
                    animationFrameId = requestAnimationFrame(animate);
                }
            }
        }
    
        function startAnimation() {
            cancelAnimation();
            exitAnimation = false;
            animationFrameId = requestAnimationFrame(animate);
        }
    
        function cancelAnimation() {
            exitAnimation = true;

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    
        return { cancelAnimation };
    }
}