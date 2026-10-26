import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

gsap.defaults({ ease: 'power3.out', duration: 1 });

export { gsap, ScrollTrigger, Flip, useGSAP };
