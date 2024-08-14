// components/ThemeToggle.js
'use client';

import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 ml-[400px] bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
    >
      {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
    </button>
  );
};

export default ThemeToggle;
