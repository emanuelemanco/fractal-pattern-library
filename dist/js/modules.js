!function(e){function t(t){for(var n,c,u=t[0],a=t[1],s=t[2],f=0,p=[];f<u.length;f++)c=u[f],r[c]&&p.push(r[c][0]),r[c]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(l&&l(t);p.length;)p.shift()();return i.push.apply(i,s||[]),o()}function o(){for(var e,t=0;t<i.length;t++){for(var o=i[t],n=!0,u=1;u<o.length;u++){var a=o[u];0!==r[a]&&(n=!1)}n&&(i.splice(t--,1),e=c(c.s=o[0]))}return e}var n={},r={2:0},i=[];function c(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,c),o.l=!0,o.exports}c.m=e,c.c=n,c.d=function(e,t,o){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(c.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(o,n,function(t){return e[t]}.bind(null,n));return o},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var u=window.webpackJsonp=window.webpackJsonp||[],a=u.push.bind(u);u.push=t,u=u.slice();for(var s=0;s<u.length;s++)t(u[s]);var l=a;i.push([5,0]),o()}({5:function(e,t,o){"use strict";o.r(t),o(0).a.to("test",.5,{autoAlpha:0}),console.log("testing"),function(){let e=window.CLIENTNAMESPACE||{};e.cookieNotification={init:function(){let e=document.querySelector(".cookie-message"),t=document.querySelector(".js-cookie-button"),o=Cookies.get("accept-cookies");e&&t&&(void 0===o&&e.classList.add("is-open"),t.addEventListener("click",function(t){t.preventDefault(),e.classList.remove("is-open"),Cookies.set("accept-cookies",!0,{expires:365})}))}},window.CLIENTNAMESPACE=e,document.addEventListener("DOMContentLoaded",function(){e.cookieNotification.init()})}()}});