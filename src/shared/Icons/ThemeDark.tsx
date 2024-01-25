import React from 'react';

export function ThemeDark({ className, id }: any) {

  return (
    <svg className={className} id={id} viewBox="0 0 12 12" width="12px" height="12px" aria-hidden="true">
      <g fill="none" stroke="#fff" strokeWidth="1" strokeLinejoin="round" transform="rotate(-45,6,6)">
        <path d="m9,10c-2.209,0-4-1.791-4-4s1.791-4,4-4c.304,0,.598.041.883.105-.995-.992-2.367-1.605-3.883-1.605C2.962.5.5,2.962.5,6s2.462,5.5,5.5,5.5c1.516,0,2.888-.613,3.883-1.605-.285.064-.578.105-.883.105Z" />
      </g>
    </svg>

  )
}
