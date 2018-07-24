(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemyGroup.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '703caNdSJBMG5jxYvPFwWvP', 'enemyGroup', __filename);
// Script/enemyGroup.js

'use strict';

//敌机组
var enemyG = cc.Class({
    name: 'enemyG',
    properties: {
        name: '',
        freqTime: 0,
        initPollCount: 0,
        prefab: cc.Prefab
    }
});

cc.Class({
    extends: cc.Component,

    properties: function properties() {
        return {
            enemyG: {
                default: [],
                type: enemyG
            },
            main: {
                default: null,
                type: require('main')
            }
        };
    },

    // use this for initialization
    onLoad: function onLoad() {
        //初始化敌机组
        this.eState = D.commonInfo.gameState.none;
        D.common.batchInitObjPool(this, this.enemyG);
    },
    startAction: function startAction() {

        this.eState = D.commonInfo.gameState.start;
        //定时生成敌机
        for (var ei = 0; ei < this.enemyG.length; ++ei) {
            var freqTime = this.enemyG[ei].freqTime;
            var fName = 'callback_' + ei;
            this[fName] = function (e) {
                this.getNewEnemy(this.enemyG[e]);
            }.bind(this, ei);
            this.schedule(this[fName], freqTime);
        }
    },
    //重新开始
    resumeAction: function resumeAction() {
        this.enabled = true;
        this.eState = D.commonInfo.gameState.start;
    },
    //暂停
    pauseAction: function pauseAction() {
        this.enabled = false;
        this.eState = D.commonInfo.gameState.pause;
    },
    //生成敌机
    getNewEnemy: function getNewEnemy(enemyInfo) {
        var poolName = enemyInfo.name + 'Pool';
        var newNode = D.common.genNewNode(this[poolName], enemyInfo.prefab, this.node);
        var newV2 = this.getNewEnemyPositon(newNode);
        newNode.setPosition(newV2);
        newNode.getComponent('enemy').init();
    },
    //敌机随机生成的位置
    getNewEnemyPositon: function getNewEnemyPositon(newEnemy) {
        //位于上方，先不可见
        var randx = cc.randomMinus1To1() * (this.node.parent.width / 2 - newEnemy.width / 2);
        var randy = this.node.parent.height / 2 + newEnemy.height / 2;
        return cc.v2(randx, randy);
    },
    enemyDied: function enemyDied(nodeinfo, score) {
        //回收节点
        D.common.backObjPool(this, nodeinfo);
        //增加分数
        if (parseInt(score) > 0) {
            this.main.gainScore(score);
        }
    },
    getScore: function getScore() {
        return this.main.getScore();
    }
    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {

    //},

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
        //# sourceMappingURL=enemyGroup.js.map
        