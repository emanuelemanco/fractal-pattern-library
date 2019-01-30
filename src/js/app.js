import {TweenLite} from 'gsap/TweenLite';
import {TimelineLite} from 'gsap/TimelineLite';

import 'modules';


const hello = () => {
    console.log('hello world');
}

const elements = document.querySelectorAll('.element');

[...elements].forEach(element => {
    console.log(element);
});

hello();