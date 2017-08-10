(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var s_public = {
  // 讀取中
  loading: function loading() {
    setTimeout(function () {
      $('.js-loading-mask').fadeOut(400);

      setTimeout(function () {
        $('.js-loading-mask').remove();
      }, 400);
    }, 800);
  },

  // 漣漪效果
  btnWaves: function btnWaves() {
    Waves.attach('.btn-waves', ['waves-button', 'waves-light']);
    Waves.init();
  }
};

$(window).on({
  load: function load() {
    s_public.loading(); // 讀取中
  }
});

$(function () {
  s_public.btnWaves(); // 漣漪效果
});

},{}]},{},[1]);
