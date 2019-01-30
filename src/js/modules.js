import {TweenLite} from 'gsap/TweenLite';
import {TimelineLite} from 'gsap/TimelineLite';

TweenLite.to('test', 0.5, {autoAlpha: 0});

console.log('testing');
// (function () {
//     'use strict';
//     /* global window, document */
//
//     var CLIENT = window.CLIENT || {};
//
//     CLIENT.navigation = {
//         init: function () {
//
//             console.log('navigation');
//
//         }
//     };
//
//     window.CLIENT = CLIENT;
//
//     document.addEventListener('DOMContentLoaded', function () {
//         CLIENT.navigation.init();
//     });
//
// }());

(function () {
    'use strict';
    /* global window, document, Cookies */

    let CLIENTNAMESPACE = window.CLIENTNAMESPACE || {};

    CLIENTNAMESPACE.cookieNotification = {
        init: function () {

            let cookieName = 'accept-cookies';
            let cookieMessage = document.querySelector('.cookie-message');
            let button = document.querySelector('.js-cookie-button');
            let activeClass = 'is-open';
            let accepted = Cookies.get(cookieName);

            if (!cookieMessage || !button) {
                return;
            }

            if (accepted === undefined) {
                cookieMessage.classList.add(activeClass);
            }

            button.addEventListener('click', function (e) {
                e.preventDefault();
                cookieMessage.classList.remove(activeClass);
                Cookies.set(cookieName, true, {expires: 365});
            });

        }
    };

    window.CLIENTNAMESPACE = CLIENTNAMESPACE;

    document.addEventListener('DOMContentLoaded', function () {
        CLIENTNAMESPACE.cookieNotification.init();
    });

}());
