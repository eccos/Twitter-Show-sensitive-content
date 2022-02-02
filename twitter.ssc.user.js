// ==UserScript==
// @name         Show sensitive content
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Auto clicks "Show" button for "Content warning: Sensitive content" overlay
// @author       eccos
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setInterval(autoClickShow, 300);
    function autoClickShow() {
        let btns = document.querySelectorAll("div[role='button']");
        for (let i in btns) {
            let btn = btns[i];
            if (btn.textContent != "Show") continue;
            btn.click();
        }
    }
})();
