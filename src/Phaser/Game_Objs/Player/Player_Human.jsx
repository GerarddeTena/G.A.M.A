import Phaser from "phaser";
import {Hans} from "../NPC/Hans.jsx";
import {Skeleton} from "../NPC/Skeleton.jsx";
import {Dragon} from "../NPC/Dragon.jsx";

export class Human extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frames) {

        super(scene, x, y, texture, frames);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.collide(this, scene.platforms);
        this.body.setGravityY(300);
        this.playerHealth = 1000;
        this.currentAnim = null;
        this.isInvulnerable = false;

    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'human_Idle',
            frames: scene.anims.generateFrameNumbers('human_Idle', {start: 0, end: 4}),
            frameRate: 5,
            repeat: -1
        });
        scene.anims.create({
            key: 'human_Walk',
            frames: scene.anims.generateFrameNumbers('human_Walk', {start: 0, end: 8}),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key: 'human_Jump',
            frames: scene.anims.generateFrameNumbers('human_Jump', {start: 0, end: 4}),
            frameRate: 5,
            repeat: 0
        });
        scene.anims.create({
            key: 'human_Run',
            frames: scene.anims.generateFrameNumbers('human_Run', {start: 0, end: 4}),
            frameRate: 5,
            repeat: -1
        });
    }

    extractedMethods(cursors, onGround, shiftPressed, keys) {

        const speedConditionWalkOrRun = () => {
            if (keys[0].isDown) return this.body.setVelocityX(shiftPressed ? -150 : -80);
            if (keys[1].isDown) return this.body.setVelocityX(shiftPressed ? 150 : 80);

        };

        const runAnimation = () => {
            if (shiftPressed && onGround && this.currentAnim !== 'human_Run') {
                this.anims.play('human_Run', true);
                this.currentAnim = 'human_Run';
            } else if (!shiftPressed && onGround && this.currentAnim === 'human_Run') {
                this.anims.play('human_Walk', true);
            }
        }

        const walkAnimation = () => {
            if (onGround && this.currentAnim !== 'human_Walk') {
                this.anims.play('human_Walk', true);
                this.currentAnim = 'human_Walk';
            }
        }

        return {speedConditionWalkOrRun, runAnimation, walkAnimation};
    }

    handleAnimations(keys, cursors) {
        const onGround = this.body.blocked.down || this.body.touching.down;
        const shiftPressed = cursors.shift.isDown;
        const {
            speedConditionWalkOrRun,
            runAnimation,
            walkAnimation
        } = this.extractedMethods(cursors, onGround, shiftPressed, keys);

        if (shiftPressed && keys[0].isDown && this.currentAnim !== 'human_Run') {
            runAnimation();
            this.currentAnim = 'human_Run';
            this.flipX = true;
        } else if (shiftPressed && keys[1].isDown && this.currentAnim !== 'human_Run') {
            runAnimation();
            this.currentAnim = 'human_Run';
            this.flipX = false;
        }

        if (cursors.space.isDown && onGround) {
            this.body.setVelocityY(-500);

            if (this.currentAnim !== 'human_Jump') {
                this.anims.play('human_Jump');
                this.currentAnim = 'human_Jump';
            }
        } else if (cursors.space.isUp && !onGround) {
            if (this.currentAnim === 'human_Jump') {
                this.anims.play('human_Walk');
                this.currentAnim = 'human_Walk';
            }
        } else if (keys[0].isDown) {
            speedConditionWalkOrRun();
            runAnimation();
            walkAnimation();
            this.flipX = true;

        } else if (keys[1].isDown) {
            speedConditionWalkOrRun();
            walkAnimation();

            this.flipX = false;
        } else if (keys[0].isUp && keys[1].isUp) {
            this.body.setVelocityX(0);

            if (onGround && this.currentAnim !== 'human_Idle') {
                this.anims.play('human_Idle');
                this.currentAnim = 'human_Idle';
            }
        }
    }

    handlePlayerHit(enemy, livesText) {

        if (enemy instanceof Hans) {
            this.playerHealth -= 80;
        } else if (enemy instanceof Skeleton) {
            this.playerHealth -= 35;
        } else if (enemy instanceof Dragon) {
            this.playerHealth -= 15;
        }

        livesText.setText('Lives: ' + this.playerHealth);
        this.feedbackHit();
        this.isInvulnerable = true;
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.isInvulnerable = false;
            }
        });

    }
    feedbackHit() {
        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: 'Linear',
            duration: 100,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
                this.setAlpha(1);
            }
        });
    }
}