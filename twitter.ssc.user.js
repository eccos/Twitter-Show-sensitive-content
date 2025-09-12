// ==UserScript==
// @name         Show sensitive content
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  Auto clicks "Show" & "View" buttons for "Sensitive content" overlays
// @author       eccos
// @match        https://twitter.com/*
// @match        https://x.com/*
// @icon         https://www.google.com/s2/favicons?domain=twitter.com
// @grant        none
// @downloadURL  https://github.com/eccos/Twitter-Show-sensitive-content/raw/main/twitter.ssc.user.js
// @updateURL    https://github.com/eccos/Twitter-Show-sensitive-content/raw/main/twitter.ssc.user.js
// ==/UserScript==

(function () {
  ('use strict');

  function autoClickShow() {
    const txtMatchList = ['show', 'view', 'yes, view profile'];
    document
      .querySelectorAll("div[role='button'],button[role='button']")
      .forEach((btn) => {
        if (txtMatchList.includes(btn.textContent.trim().toLowerCase())) {
          btn.click();
        }
      });
  }

  function hideBlockedPosts() {
    const blockStr = 'this post is from an account you blocked.';
    document.querySelectorAll("article[role='article']").forEach((post) => {
      post.querySelectorAll('span').forEach((span) => {
        if (span.textContent.trim().toLowerCase().includes(blockStr)) {
          post.style.display = 'none';
        }
      });
    });
  }

  // run on DOM changes for lazy insertion content
  const observer = new MutationObserver((mutations) => {
    autoClickShow();
    hideBlockedPosts();
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // run on load for initial content
  document.addEventListener('DOMContentLoaded', () => {
    autoClickShow();
    hideBlockedPosts();
  });
})();
