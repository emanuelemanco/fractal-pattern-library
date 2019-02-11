import {TweenLite} from 'gsap/TweenLite';
import {TimelineLite} from 'gsap/TimelineLite';

import './_test.scss';

TweenLite.to('test', 0.5, {autoAlpha: 0});

console.log('testing');