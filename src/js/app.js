//import {TweenLite} from 'gsap/TweenLite';
//import {TimelineLite} from 'gsap/TimelineLite';

const hello = () => {
    console.log('hello world');
}

const elements = document.querySelectorAll('.element');

[...elements].forEach(element => {
    console.log(element);
});

hello();


const getGSAP = async () => {
    const { default : TweenLite } = await import (/* webpackChunkName: "gsap", webpackPrefetch: true */ 'gsap/TweenLite');

    console.log('TweenLite has been loaded!');

    return TweenLite;
}

getGSAP().then(TweenLite => {
    TweenLite.to('body', 0.5, {autoAlpha:0});
})