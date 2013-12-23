// ==UserScript==
// @name smilify
// @namespace http://www.palpatim.com/
// @version 1.0.0
// @include http://www.amazon.com/*
// @include https://www.amazon.com/*
// @copyright 2013 Tim Schmelter
// @license MIT; http://opensource.org/licenses/MIT
// ==/UserScript==

'use strict';

var addStyles = function() {
  var css,
      head,
      style;

  head = document.getElementsByTagName('head')[0];
  if (! head) {
    return;
  }

  css = '#smilifyContainer {' +
    'background: none;' +

    'width: 100%;' +
    'position: fixed;' +
    'top: 0;' +
    'z-index: 999;' +
  '}' +

  '#smilifyPushdown {' +
    'background: rgba(252, 252, 194, .8);' +

    'max-width: 500px;' +

    'border: 1px solid #FCDCC2;' +
    'margin: 0 auto 8px auto;' +
    'padding: 4px;' +

    'font-size: 16px;' + 
    'color: #aaa;' +
    'text-align: center;' +
  '}' +

  '#smilifyLink {' +
    'font-weight: bold;' +
  '}' +

  '#smilifyClose {' +
    'display: block;' +
    'float: right;' +
    'font-size: 11px;' +
    'color: #ccc;' +
    'text-decoration: none;' +
  '}';

  style = document.createElement('style');
  style.innerHTML = css;
  head.appendChild(style);
}

var addPushDown = function(smileUrl) {
  var pushdownDiv,
      pushdownRect,
      prevPadding;

  pushdownDiv = '<div id="smilifyContainer">' +
    '<div id="smilifyPushdown">' +
    'Go to <a id="smilifyLink" href="__REPLACEMENT_URL__">Smile?</a>' +
    '<a id="smilifyClose" href="#">[X]</a>' +
    '</div>' +
    '</div>';
  pushdownDiv = pushdownDiv.replace('__REPLACEMENT_URL__', smileUrl);

  if (document.body) {
    document.body.insertAdjacentHTML('afterbegin', pushdownDiv);
    pushdownRect = document.getElementById('smilifyContainer').getBoundingClientRect();
    document.body.style.paddingTop = pushdownRect.height + 'px';
  }
}

var dismissPushdown = function(prevPadding) {
  var smilifyPushdown;

  smilifyPushdown = document.getElementById('smilifyPushdown');
  smilifyPushdown.style.display = 'none';
  document.body.style.paddingTop = prevPadding;
}

var registerCloseListeners = function(prevPadding) {
  var smilifyClose,
      smilifyPushdown;

  smilifyPushdown = document.getElementById('smilifyPushdown');
  smilifyClose = document.getElementById('smilifyClose');

  smilifyPushdown.addEventListener('click', function() { dismissPushdown(prevPadding); });
  smilifyClose.addEventListener('click', function() { dismissPushdown(prevPadding); });

}

var displayPushdown = function(smileUrl) {
  var smilifyPushdown,
      smileUrl,
      prevPadding;

  prevPadding = document.body.style.paddingTop;

  addStyles();

  smileUrl = window.location.href.replace("www.amazon.com", "smile.amazon.com");
  addPushDown(smileUrl);

  registerCloseListeners(prevPadding);
}

console.log('smilify running');
displayPushdown();