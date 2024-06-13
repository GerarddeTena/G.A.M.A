import Phaser from "phaser";

export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.spritesheet('HansIdle', 'src/assets/sprites/Enemies/H_Idle.png', {
            frameWidth: 48,
            frameHeight: 64
        });
        this.load.spritesheet('SkeletonIdle', 'src/assets/sprites/Enemies/Skeleton_Idle.png', {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.spritesheet('Dragon', 'src/assets/sprites/Enemies/ManiacDragon.png', {
            frameWidth: 32,
            frameHeight: 32
        });

    }

    create() {
        this.anims.create({
            key: 'Hans_Idle',
            frames: this.anims.generateFrameNumbers('HansIdle', {start: 0, end: 6}),
            frameRate: 10,
            repeat: -1
        });
        let Hans = this.physics.add.sprite(100, 100, 'HansIdle');
        Hans.anims.play('HansIdle');

        this.anims.create({
            key: 'SkeletonIdle',
            frames: this.anims.generateFrameNumbers('SkeletonIdle', {start:0, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        let Skeleton = this.physics.add.sprite(200, 200, 'SkeletonIdle');
        Skeleton.play('SkeletonIdle');

        this.anims.create({
            key: 'Dragon',
            frames: this.anims.generateFrameNumbers('Dragon', {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        let Dragon = this.physics.add.sprite(300, 300, 'Dragon');
        Dragon.play('Dragon');

        this.events.emit('spritesLoaded');
    }
}