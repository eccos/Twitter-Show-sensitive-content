// ==UserScript==
// @name         Show sensitive content
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Auto clicks "Show" button for "Content warning: Sensitive content" overlay
// @author       eccos
// @match        https://twitter.com/*
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @grant        none
// @downloadURL  https://github.com/eccos/Twitter-Show-sensitive-content/raw/main/twitter.ssc.user.js
// @updateURL    https://github.com/eccos/Twitter-Show-sensitive-content/raw/main/twitter.ssc.user.js
// ==/UserScript==

(function () {
  'use strict';

  function autoClickShow() {
    const btns = document.querySelectorAll("div[role='button']");
    btns.forEach((btn) => {
      if (btn.textContent != 'Show') return;
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

  let ticking = false;
  document.addEventListener('scroll', (e) => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      autoClickShow();
      hideBlockedPosts();
      ticking = false;
    });
    ticking = true;
  });
})();
