import Phaser from "phaser";

export class MapLvl1 extends Phaser.Scene {
    constructor() {
        super('MapLvl1');
    }

    preload() {
        this.load.image('background', 'src/assets/sprites/background/Cathedral_1.png');
        this.load.image('platform', 'src/assets/sprites/Platform.png');
        this.load.image('block', 'src/assets/sprites/PlatformBlock.png');
        this.load.image('rope', 'src/assets/sprites/Rope.png');
        this.load.image('stairs', 'src/assets/sprites/Stairs.png');
        this.load.image('columnGround', 'src/assets/sprites/ColumnGround.png');
        this.load.image('blocksChains', 'src/assets/sprites/BlocksChains.png');
        this.load.on('complete', () => {
            this.create();
        });
    }

    create() {
        this.platforms = this.physics.add.staticGroup();
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.platforms.create(400, 568, 'platform').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'block').setScale(2).refreshBody();
        this.scene.get('Game').events.once('spritesLoaded', () => {
            let Hans = this.physics.add.sprite(100, 100, 'HansIdle');
            Hans.anims.play('HansIdle');

            let Skeleton = this.physics.add.sprite(200, 200, 'SkeletonIdle');
            Skeleton.play('SkeletonIdle');

            let Dragon = this.physics.add.sprite(300, 300, 'Dragon');
            Dragon.play('Dragon');
        });
    }
}