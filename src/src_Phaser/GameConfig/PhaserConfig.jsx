import Phaser from 'phaser';
import {useEffect} from "react";

const PhaserConfig = () => {
    const SIZE_ADJUST = 80;


    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 1536,
            height: 720,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 900},
                    debug: false
                }
            },
            scene: {
                preload: function () {
                    // Platforms:

                    this.load.image('background', 'src/src_Phaser/assets/sprites/background/Cathedral_1.png');
                    this.load.image('platform', 'src/src_Phaser/assets/sprites/Platform.png');
                    this.load.image('block', 'src/src_Phaser/assets/sprites/PlatformBlock.png');

                    //Enemies:

                    this.load.spritesheet('HansIdle', 'src/src_Phaser/assets/sprites/Enemies/H_Idle.png', {
                        frameWidth: 32,
                        frameHeight: 48
                    });
                    this.load.spritesheet('Hans_Walk', 'src/src_Phaser/assets/sprites/Enemies/H_Walk_Right.png', {
                        frameWidth: 28,
                        frameHeight: 48
                    });
                    this.load.spritesheet('SkeletonIdle', 'src/src_Phaser/assets/sprites/Enemies/Skeleton_Idle.png', {
                        frameWidth: 32,
                        frameHeight: 48
                    });
                    this.load.spritesheet('Dragon', 'src/src_Phaser/assets/sprites/Enemies/ManiacDragon.png', {
                        frameWidth: 32,
                        frameHeight: 32
                    });
                },
                create: function () {
                    this.add.image(0, 0, 'background').setOrigin(0, 0);
                    const platforms = this.physics.add.staticGroup();
                    let platform1 = platforms.create(200, 750, 'platform').setScale(2);
                    platform1 = platforms.create(260, 750, 'block').setScale(2);
                    platform1.body.setSize(platform1.width, platform1.height - 20);
                    platform1.refreshBody();

                    let platform2 = platforms.create(1000, 400, 'block').setScale(2);
                    platform2.body.setSize(platform2.width, platform2.height - 20);
                    platform2.refreshBody();

                    this.anims.create({
                        key: 'Hans_Idle',
                        frames: this.anims.generateFrameNumbers('HansIdle', {start: 0, end: 6}),
                        frameRate: 10,
                        repeat: -1
                    });

                    this.anims.create({
                        key: 'Hans_Walk',
                        frames: this.anims.generateFrameNumbers('Hans_Walk', {start: 0, end: 8}),
                        scale: 2,
                        frameRate: 10,
                        repeat: -1

                    })
                    let Hans = this.physics.add.sprite(200, 100, 'HansIdle');
                    Hans.anims.play('HansIdle');
                    Hans.body.setSize(Hans.width, Hans.height - SIZE_ADJUST);
                    Hans.body.setOffset(0, 50);

                    let delay = Phaser.Math.Between(1000, 3000);
                    let isHansWalking = false;

                    this.time.addEvent({
                        delay: delay,
                        callback: () => {
                            if (!isHansWalking) {
                                Hans.anims.play('Hans_Walk');
                                Hans.setVelocityX(100);
                                isHansWalking = true;
                            } else {
                                Hans.once('animationcomplete', () => {
                                    Hans.anims.play('HansIdle');
                                })
                                Hans.setVelocityX(0);
                                isHansWalking = false;
                            }
                        },
                        loop: true
                    });

                    this.anims.create({
                        key: 'SkeletonIdle',
                        frames: this.anims.generateFrameNumbers('SkeletonIdle', {start: 0, end: 7}),
                        frameRate: 10,
                        repeat: -1
                    });
                    let Skeleton = this.physics.add.sprite(200, 200, 'SkeletonIdle');
                    Skeleton.play('SkeletonIdle');
                    Skeleton.body.setSize(Skeleton.width, Skeleton.height - SIZE_ADJUST);
                    Skeleton.body.setOffset(0, 50);

                    this.anims.create({
                        key: 'Dragon',
                        frames: this.anims.generateFrameNumbers('Dragon', {start: 0, end: 7}),
                        frameRate: 10,
                        repeat: -1
                    });
                    let Dragon = this.physics.add.sprite(300, 300, 'Dragon');
                    Dragon.play('Dragon');
                    Dragon.body.setSize(Dragon.width, Dragon.height - SIZE_ADJUST);
                    Dragon.body.setOffset(0, 50);

                    // Add colliders
                    this.physics.add.collider(Hans, platforms);
                    this.physics.add.collider(Skeleton, platforms);
                    this.physics.add.collider(Dragon, platforms);
                }
            }
        };

        const game = new Phaser.Game(config);

        return () => game.destroy(true);
    }, []);

    // return <div id='phaser-game'></div>
}

export default PhaserConfig;