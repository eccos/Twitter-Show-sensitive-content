// ==UserScript==
// @name         Show sensitive content
// @namespace    http://tampermonkey.net/
// @version      0.8
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
  'use strict';

  // on scroll, auto click sensitivity buttons and hide posts from blocked accounts
  // on scroll for main html document
  document.addEventListener('scroll', handleScroll);

  // on scroll for the conversation side panel that appears when an image is clicked instead of the post
  // observer is used because side panel is dynamically created
  const observer = new MutationObserver(() => {
    attachScrollListener();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

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

  function attachScrollListener() {
    const sidePanel = document.querySelector(
      '[aria-label="Timeline: Conversation"]'
    );
    const scrollable = sidePanel ? getScrollableParent(sidePanel) : null;
    if (scrollable) {
      scrollable.addEventListener('scroll', handleScroll, { passive: true });
    }
  }

  function getScrollableParent(element) {
    while (element && element !== document.body) {
      const style = getComputedStyle(element);
      const overflowY = style.overflowY;
      const isScrollable =
        (overflowY === 'auto' || overflowY === 'scroll') &&
        element.scrollHeight > element.clientHeight;
      if (isScrollable) return element;
      element = element.parentElement;
    }
    return null;
  }
})();
