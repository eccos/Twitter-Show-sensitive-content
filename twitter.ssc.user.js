// ==UserScript==
// @name         Show sensitive content
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Auto clicks "Show" button for "Content warning: Sensitive content" overlay
// @author       eccos
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function autoClickShow() {
        let btns = document.querySelectorAll("div[role='button']");
        for (let i in btns) {
            let btn = btns[i];
            if (btn.textContent != "Show") continue;
            btn.click();
        }
    }
    let ticking = false;
    document.addEventListener('scroll', function(e) {
        if (ticking) return;
        window.requestAnimationFrame(function() {
            autoClickShow();
            ticking = false;
        });
        ticking = true;
    });
})();
