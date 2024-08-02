/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../css/Documentation.css';

const sections = [
  { title: 'Introduction', content: 'This is the introduction section.' },
  { title: 'How it works', content: 'Details on how it works.' },
  { title: 'Features', content: 'List of features.' },
  { title: 'Troubleshooting', content: 'Troubleshooting steps.' },
];

const Documentation = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <div className="documentation-page">
      <header className="header">
        <div className="logo">Logo</div>
        <div className="website-name">Website Name</div>
        <nav className="nav-menu">
          <a href="#">Docs</a>
          <a href="#">Git</a>
          <a href="#">User</a>
          <a href="#">Pricing</a>
          <div className="toggle-theme" onClick={toggleTheme}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </div>
        </nav>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <nav>
            <ul>
              {sections.map((section, index) => (
                <li key={index}><a href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}>{section.title}</a></li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="content">
          <div className="content-header">
            <h1>Project Documentation</h1>
          </div>
          {sections.map((section, index) => (
            <section key={index} id={section.title.toLowerCase().replace(/\s+/g, '-')} className="section">
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Documentation;
