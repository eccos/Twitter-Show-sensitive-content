// ==UserScript==
// @name         Show sensitive content
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Auto clicks "Show" & "View" buttons for "Sensitive content" overlays
// @author       eccos
// @match        https://twitter.com/*
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @grant        none
// @downloadURL  https://github.com/eccos/Twitter-Show-sensitive-content/raw/main/twitter.ssc.user.js
// @updateURL    https://github.com/eccos/Twitter-Show-sensitive-content/raw/main/twitter.ssc.user.js
// @require      file://C:/Users/Eccos/Dev/repos/Twitter-Show-sensitive-content/twitter.ssc.user.js
// ==/UserScript==

(function () {
  'use strict';

  document.addEventListener('scroll', handleScroll);

  function handleScroll(e) {
    window.requestAnimationFrame(() => {
      autoClickShow();
      hideBlockedPosts();
    });
  }

  function autoClickShow() {
    const oldBtns = document.querySelectorAll("div[role='button']"); // twitter method of defining the button
    const newBtns = document.querySelectorAll("button[role='button']"); // x method of defining the button
    const btns = [...oldBtns, ...newBtns];
    const txtMatchList = ['show', 'view', 'yes, view profile'];

    btns.forEach((btn) => {
      const txt = btn.textContent.toLowerCase();
      if (!txtMatchList.includes(txt)) return;
      btn.click();
    });
  }

  function hideBlockedPosts() {
    const blockStr = 'This Post is from an account you blocked.';
    const posts = document.querySelectorAll("article[role='article']");
    posts.forEach((post) => {
      const spans = post.querySelectorAll('span');
      spans.forEach((span) => {
        if (span.textContent.includes(blockStr)) {
          post.style.display = 'none';
        }
      });
    });
  }
})();
