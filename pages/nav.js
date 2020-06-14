import React from 'react'
import Link from 'next/link'
import './nav.module.css';

const links = [
  { href: '/', label: 'Мой список' },
  { href: '/indexSearch', label: 'Поиск видео' },
]

const Nav = () => (
<div class="topnav">
      {links.map(({ key, href, label }) => (
          <a key={key} href={href}>{label}</a>
      ))}
</div>
)

export default Nav
