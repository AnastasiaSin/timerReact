import React from 'react';

export function ThemeLight({className, id}:any) {

  return(
    <svg className={className} id={id} viewBox="0 0 12 12" width="12px" height="12px" aria-hidden="true">
    <g fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round">
      <circle cx="6" cy="6" r="2" />
      <g strokeDasharray="1.5 1.5">
        <polyline points="6 10,6 11.5" transform="rotate(0,6,6)" />
        <polyline points="6 10,6 11.5" transform="rotate(45,6,6)" />
        <polyline points="6 10,6 11.5" transform="rotate(90,6,6)" />
        <polyline points="6 10,6 11.5" transform="rotate(135,6,6)" />
        <polyline points="6 10,6 11.5" transform="rotate(180,6,6)" />
        <polyline points="6 10,6 11.5" transform="rotate(225,6,6)" />
        <polyline points="6 10,6 11.5" transform="rotate(270,6,6)" />
        <polyline points="6 10,6 11.5" transform="rotate(315,6,6)" />
      </g>
    </g>
  </svg>
    
  )
}
