import React, { useContext, useState, useEffect } from 'react';
import { FiMenu, FiPlus, FiMessageSquare, FiMoon, FiSun } from 'react-icons/fi';
import { Context } from '../context/Context';
import logo from '../assets/logo.png';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    // Add dark mode state (this can be moved to Context if you want to share between components)
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    // Update theme in localStorage and apply to document when darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className={`h-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-800/20 overflow-hidden flex flex-col justify-between transition-all duration-300 ${extended ? 'w-72' : 'w-20'}`}>
            <div className="p-4">
                {/* Header with Menu Icon */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={() => setExtended(prev => !prev)}
                        className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center transition-all shadow-md dark:shadow-gray-800/30"
                    >
                        <FiMenu className="text-blue-600 dark:text-blue-400 text-xl" />
                    </button>

                    {/* Theme toggle button - only show when extended */}
                    {extended && (
                        <button 
                            onClick={toggleDarkMode} 
                            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all shadow-md dark:shadow-gray-800/30"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                        </button>
                    )}
                </div>

                {/* New Chat Button */}
                <button
                    onClick={newChat}
                    className={`flex items-center ${extended ? 'px-4 py-3 gap-3' : 'justify-center p-3'} w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 mb-6 transition-all shadow-md`}
                >
                    <FiPlus className="text-white text-lg" />
                    {extended && <span className="text-white text-sm font-medium">New Chat</span>}
                </button>

                {/* Recent Prompts */}
                {extended && (
                    <div className="mt-6">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 px-2">Recent Chats</h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 sidebar-scroll">
                            {prevPrompts.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => loadPrompt(item)}
                                    className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-blue-500 dark:hover:bg-blue-600 transition-all text-sm text-left group"
                                >
                                    <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/50 group-hover:bg-white dark:group-hover:bg-white transition-colors">
                                        <FiMessageSquare className="text-blue-500 dark:text-blue-400 group-hover:text-blue-600" />
                                    </div>
                                    <span className="truncate flex-1">{item.slice(0, 22)}...</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Collapsed view - show theme toggle at bottom when sidebar is collapsed */}
            {!extended && (
                <div className="p-4 mt-auto">
                    <button 
                        onClick={toggleDarkMode} 
                        className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center transition-all shadow-md dark:shadow-gray-800/30"
                        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        {darkMode ? <FiSun className="text-gray-700 dark:text-gray-300" /> : <FiMoon className="text-gray-700 dark:text-gray-300" />}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;

