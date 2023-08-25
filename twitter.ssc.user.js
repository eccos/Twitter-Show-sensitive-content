// ==UserScript==
// @name         Show sensitive content
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Auto clicks "Show" button for "Content warning: Sensitive content" overlay
// @author       eccos
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @grant        none
// @downloadURL  https://github.com/eccos/Twitter-Show-sensitive-content/raw/main/twitter.ssc.user.js
// @updateURL    https://github.com/eccos/Twitter-Show-sensitive-content/raw/main/twitter.ssc.user.js
// ==/UserScript==

(function () {
    'use strict';

    function autoClickShow() {
        let btns = document.querySelectorAll("div[role='button']");
        btns.forEach((btn) => {
            if (btn.textContent != "Show") return;
            btn.click();
        });
    }
    let ticking = false;
    document.addEventListener('scroll', function (e) {
        if (ticking) return;
        window.requestAnimationFrame(function () {
            autoClickShow();
            ticking = false;
        });
        ticking = true;
    });
})();
