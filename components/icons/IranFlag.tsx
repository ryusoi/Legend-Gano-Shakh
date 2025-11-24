import React from 'react';

const IranFlag: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" {...props}>
    <rect width="840" height="480" fill="#239f40"/>
    <rect width="840" height="320" y="80" fill="#fff"/>
    <rect width="840" height="160" y="160" fill="#d90000"/>
    <g fill="#d90000" transform="matrix(3.42857 0 0 3.42857 420 240)">
      <g id="c">
        <path id="t" d="M-20 0l6.18 18.09-16.18-11.18h20l-16.18 11.18z"/>
        <use href="#t" transform="scale(-1 1)"/>
      </g>
      <use href="#c" transform="rotate(72)"/>
      <use href="#c" transform="rotate(144)"/>
      <use href="#c" transform="rotate(216)"/>
      <use href="#c" transform="rotate(288)"/>
    </g>
  </svg>
);

export default IranFlag;
