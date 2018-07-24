(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/hero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3f0ccHUefxOLK9+K5/zp2v4', 'hero', __filename);
// Script/hero.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: function properties() {
        return {
            blowupani: {
                default: null,
                type: cc.Prefab,
                tooltip: '爆炸动画'
            },

            gameOverClip: cc.AudioClip,
            main: {
                default: null,
                type: require('main')
            },
            bulletGroup: {
                default: null,
                type: require('bulletGroup')
            }
        };
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.eState = D.commonInfo.gameState.none;
        cc.director.getCollisionManager().enabled = true;
        this.onDrag();
    },

    //添加拖动监听
    onDrag: function onDrag() {
        this.node.on('touchmove', this.dragMove, this);
    },
    //去掉拖动监听
    offDrag: function offDrag() {
        this.node.off('touchmove', this.dragMove, this);
    },
    //拖动
    dragMove: function dragMove(event) {
        var locationv = event.getLocation();
        var location = this.node.parent.convertToNodeSpaceAR(locationv);
        //飞机不移出屏幕 
        var minX = -this.node.parent.width / 2 + this.node.width / 2;
        var maxX = -minX;
        var minY = -this.node.parent.height / 2 + this.node.height / 2;
        var maxY = -minY;
        if (location.x < minX) {
            location.x = minX;
        }
        if (location.x > maxX) {
            location.x = maxX;
        }
        if (location.y < minY) {
            location.y = minY;
        }
        if (location.y > maxY) {
            location.y = maxY;
        }
        this.node.setPosition(location);
    },
    //碰撞监测
    onCollisionEnter: function onCollisionEnter(other, self) {
        if (other.node.group == 'ufo') {
            if (other.node.name == 'ufoBullet') {
                this.bulletGroup.changeBullet(other.node.name);
            } else if (other.node.name == 'ufoBomb') {
                this.main.getUfoBomb();
            }
        } else if (other.node.group == 'enemy') {
            //播放动画
            var po = this.node.getPosition();
            var blowup = cc.instantiate(this.blowupani);
            this.node.parent.addChild(blowup);
            blowup.setPosition(po);
            var animation = blowup.getComponent(cc.Animation);
            animation.on('finished', this.onFinished, blowup);
            //播放音效
            cc.audioEngine.playEffect(this.gameOverClip, false);
            //清除节点
            this.node.destroy();
            //更新分数 
            this.main.gameOver();
        } else {
            return false;
        }
    },

    onFinished: function onFinished(event) {
        //动画结束后
        this.destroy();
        //cc.director.pause();
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=hero.js.map
        