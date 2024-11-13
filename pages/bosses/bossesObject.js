export const BossesObject = (bossCanvas, GeneralHelper) => {
    return [
        {
            BossInfo: {
                name: 'Sal Spudder',
                phrase: 'You`re rootin` for a bruisin`!',
                description: 'Sal Spudder, the menacing potato of the Root Pack, is no ordinary vegetable! With his ferocious attacks and unpredictable moves, he’ll put any challenger’s skills to the ultimate test. Prepare yourself for a hearty battle in the depths of the garden!',
                difficulty: 'Medium',
                location: 'Inkwell Isle I - Botanic Panic!',
                specialMove: 'Dirt Blast',
                dirName: 'sal_spudder'
            },
            BossAnimations: {
                canvas: bossCanvas,
                birthAnimation: {
                    animation: {
                        spritePath: 'sal_spudder/birth.png', 
                        numFrames: 12, 
                        frameWidth: 520, 
                        frameHeight: 517, 
                        framesPerRow: 6, 
                        frameSpeed: 60, 
                        repeat: false,
                        pingPong: false,
                        backgroundColors: ['#008080'],
                        position: { x: 30, y: 800 - 517 /* (frameHeight) */ - 150 }
                    }, 
                    generalHelper: GeneralHelper,
                    duration: 720 /* (numFrames * frameSpeed) */
                },
                lifeAnimation: {
                    animation: {
                        spritePath: 'sal_spudder/alive.png', 
                        numFrames: 8, 
                        frameWidth: 520, 
                        frameHeight: 517, 
                        framesPerRow: 6, 
                        frameSpeed: 60, 
                        repeat: true,
                        pingPong: true,
                        backgroundColors: ['#008080'],
                        position: { x: 30, y: 800 - 517 /* (frameHeight) */ - 150 }
                    },
                    generalHelper: GeneralHelper
                },
                deathAnimation: {
                    animation: {
                        spritePath: 'sal_spudder/death.png', 
                        numFrames: 9, 
                        frameWidth: 308, 
                        frameHeight: 446, 
                        framesPerRow: 9, 
                        frameSpeed: 60, 
                        repeat: false,
                        pingPong: false,
                        backgroundColors: ['#008080'],
                        position: { x: 150, y: 800 - 446 /* (frameHeight) */ - 150 }
                    }, 
                    generalHelper: GeneralHelper, 
                    duration: 540 /* (numFrames * frameSpeed) */
                }
            }
        },

        {
            BossInfo: {
                name: 'Chauncey Chantenay',
                phrase: 'You’ll see visions of defeat!',
                description: 'Chauncey Chantenay is a cunning, psychic carrot who uses his telepathic powers to attack with mind-controlled carrots. His eerie presence and unpredictable moves will push any challenger to their limits. Can you handle his psychic assault?',
                difficulty: 'Medium',
                location: 'Inkwell Isle I - Botanic Panic!',
                specialMove: 'Hypno Beam',
                dirName: 'chauncey_chantenay'
            },            
            BossAnimations: {
                canvas: bossCanvas,
                birthAnimation: {
                    animation: {
                        spritePath: 'chauncey_chantenay/birth.png', 
                        numFrames: 25, 
                        frameWidth: 597, 
                        frameHeight: 555, 
                        framesPerRow: 8, 
                        frameSpeed: 60, 
                        repeat: false,
                        pingPong: false,
                        backgroundColors: ['#008080'],
                        position: { x: 30, y: 800 - 555 /* (frameHeight) */ - 150 }
                    }, 
                    generalHelper: GeneralHelper,
                    duration: 1380 /* (numFrames * frameSpeed) */
                },
                lifeAnimation: {
                    animation: {
                        spritePath: 'chauncey_chantenay/alive.png', 
                        numFrames: 22, 
                        frameWidth: 471, 
                        frameHeight: 515, 
                        framesPerRow: 10, 
                        frameSpeed: 60, 
                        repeat: true,
                        pingPong: true,
                        backgroundColors: ['#008080'],
                        position: { x: 30, y: 800 - 515 /* (frameHeight) */ - 150 }
                    },
                    generalHelper: GeneralHelper
                },
                deathAnimation: {
                    animation: {
                        spritePath: 'chauncey_chantenay/death.png', 
                        numFrames: 15, // + 1 empty frame
                        frameWidth: 328, 
                        frameHeight: 465, 
                        framesPerRow: 13, 
                        frameSpeed: 60, 
                        repeat: false,
                        pingPong: false,
                        backgroundColors: ['#008080'],
                        position: { x: 150, y: 800 - 465 /* (frameHeight) */ - 150 }
                    }, 
                    generalHelper: GeneralHelper, 
                    duration: 900 /* (numFrames * frameSpeed) */
                }
            }
        },

        {
            BossInfo: {
                name: 'Hot Dog',
                phrase: 'Grill and thrill!',
                description: 'Hot Dog, the fiery frankfurter, brings the heat with relentless attacks and spicy moves! Known for his scorching temper and sizzling style, he’s a hot-headed boss that will test your reflexes and timing to the max. Can you stand the heat?',
                difficulty: 'Hard',
                location: 'Inkwell Isle III - Fiery Franks!',
                specialMove: 'Flame Burst',
                dirName: 'hot_dog'
            },            
            BossAnimations: {
                canvas: bossCanvas,
                birthAnimation: {
                    animation: {
                        spritePath: 'hot_dog/birth.png', 
                        numFrames: 24, 
                        frameWidth: 559, 
                        frameHeight: 599, 
                        framesPerRow: 7, 
                        frameSpeed: 60, 
                        repeat: false,
                        pingPong: false,
                        backgroundColors: ['#00A2E8'],
                        position: { x: 30, y: 800 - 599 /* (frameHeight) */ - 50 }
                    }, 
                    generalHelper: GeneralHelper,
                    duration: 1440 /* (numFrames * frameSpeed) */
                },
                lifeAnimation: {
                    animation: {
                        spritePath: 'hot_dog/alive.png', 
                        numFrames: 10, 
                        frameWidth: 559, 
                        frameHeight: 599, 
                        framesPerRow: 7, 
                        frameSpeed: 60, 
                        repeat: true,
                        pingPong: true,
                        backgroundColors: ['#00A2E8'],
                        position: { x: 30, y: 800 - 599 /* (frameHeight) */ - 50 }
                    },
                    generalHelper: GeneralHelper
                },
                deathAnimation: {
                    animation: {
                        spritePath: 'hot_dog/death.png', 
                        numFrames: 10, // + 2 empty frames
                        frameWidth: 653, 
                        frameHeight: 712, 
                        framesPerRow: 6, 
                        frameSpeed: 60, 
                        repeat: false,
                        pingPong: false,
                        backgroundColors: ['#00A2E8'],
                        position: { x: 0, y: 800 - 712 /* (frameHeight) */ }
                    }, 
                    generalHelper: GeneralHelper, 
                    duration: 600 /* (numFrames * frameSpeed) */
                }
            }
        },

        {
            BossInfo: {
                name: 'Lord Gob Packer',
                phrase: 'You’re in for a sticky situation!',
                description: 'Lord Gob Packer, the regal gumball machine, rules his sugary domain with sticky precision and candy-coated attacks! His noble air is matched only by his relentless barrage of gumball minions and syrupy traps. Ready for a taste of defeat?',
                difficulty: 'Very Hard',
                location: 'Inkwell Isle IV - Sugar Siege!',
                specialMove: 'Gumdrop Rain',
                dirName: 'lord_gob_packer'
            },            
            BossAnimations: {
                canvas: bossCanvas,
                birthAnimation: {
                    animation: {
                        spritePath: 'lord_gob_packer/birth.png', 
                        numFrames: 8, 
                        frameWidth: 325, 
                        frameHeight: 322, 
                        framesPerRow: 8, 
                        frameSpeed: 60, 
                        repeat: true,
                        pingPong: true,
                        backgroundColors: ['#00A2E8', '#00ABF5'],
                        position: { x: 150, y: 800 - 322 /* (frameHeight) */ - 150 }
                    }, 
                    generalHelper: GeneralHelper,
                    duration: 480 /* (numFrames * frameSpeed) */
                },
                lifeAnimation: {
                    animation: {
                        spritePath: 'lord_gob_packer/alive.png', 
                        numFrames: 8, 
                        frameWidth: 325, 
                        frameHeight: 322, 
                        framesPerRow: 8, 
                        frameSpeed: 60, 
                        repeat: true,
                        pingPong: true,
                        backgroundColors: ['#00A2E8', '#00ABF5'],
                        position: { x: 150, y: 800 - 322 /* (frameHeight) */ - 150 }
                    },
                    generalHelper: GeneralHelper
                },
                deathAnimation: {
                    animation: {
                        spritePath: 'lord_gob_packer/death.png', 
                        numFrames: 66, // + 2 empty frames
                        frameWidth: 344, 
                        frameHeight: 322, 
                        framesPerRow: 5, 
                        frameSpeed: 60, 
                        repeat: false,
                        pingPong: false,
                        backgroundColors: ['#00A2E8'],
                        position: { x: 150, y: 800 - 322 /* (frameHeight) */ - 150 }
                    }, 
                    generalHelper: GeneralHelper, 
                    duration: 3960 /* (numFrames * frameSpeed) */
                }
            }
        },
    ];
};