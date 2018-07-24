"use strict";
cc._RF.push(module, 'e7aaajpGBdAAaGaUimU4MnH', 'scoreItemTemplate');
// Script/scoreItemTemplate.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        itemScore: cc.Label,
        itemTime: cc.Label
    },

    // use this for initialization
    onLoad: function onLoad() {},
    init: function init(data) {
        this.itemScore.string = '积分：' + data.score;
        this.itemTime.string = '时间：' + data.time;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

cc._RF.pop();