import React, { useContext, useState, useEffect } from 'react';
import { FiSend, FiMoon, FiSun } from 'react-icons/fi';
import { FaGem } from 'react-icons/fa';
import { IoBulbOutline, IoCompassOutline, IoCodeSlash } from 'react-icons/io5';
import { Context } from '../context/Context';
import logo from '../assets/logo.png'; 
import bot from'../assets/bot.png';
import helper from './helper';

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        newChat
    } = useContext(Context);

    // Add dark mode state
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

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter'){
            await onSent();
        }
    };

    const handleSuggestion = async(prompt) => {
        await onSent(prompt);
    };

    const suggestions = [
        {
            prompt: "Where was Lord Krishna born?",
            icon: <IoCompassOutline className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
            bg: "bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/40"
        },
        {
            prompt: "What is the significance of Krishna's Raas Leela?",
            icon: <IoBulbOutline className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
            bg: "bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-800/40"
        },
        {
            prompt: "Tell me about Krishna's role in the Mahabharata",
            icon: <IoCodeSlash className="w-6 h-6 text-rose-500 dark:text-rose-400" />,
            bg: "bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:hover:bg-rose-800/40"
        },
        {
            prompt: "What lessons does the Bhagavad Gita teach?",
            icon: <IoCodeSlash className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />,
            bg: "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-800/40"
        }
    ];
    

    return (
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/80 dark:border-gray-700/80 shadow-sm dark:shadow-gray-800/20 px-6 py-3 flex items-center justify-between">
                {/* Left side with logo and title */}
                <div 
                    onClick={newChat}
                    className="flex items-center gap-4 cursor-pointer group active:scale-95 transition-transform"
                >
                    <div className="w-15 h-13 flex items-center justify-center">
                        <img 
                            src={bot} 
                            alt="RIVA Logo" 
                            className="w-full h-full object-contain transition-all scale-110 group-hover:scale-120" 
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-extrabold tracking-tight">
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
                                AI Model
                            </span>
                        </h1>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Fine Tuned On Lord Krishna Leelas
                        </p>
                    </div>
                </div>

                {/* Theme toggle button */}
                <button 
                    onClick={toggleDarkMode} 
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all"
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 dark:text-gray-200">
                {showResult ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* User Question */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-800/20 flex items-center justify-center flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                    <span className="text-blue-600 dark:text-blue-400 font-bold">U</span>
                                </div>
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 flex-1 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-800/20">
                                <p className="text-gray-800 dark:text-gray-200 font-medium">{recentPrompt}</p>
                            </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md flex items-center justify-center flex-shrink-0">
                                <FaGem className="text-white text-lg" />
                            </div>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-4 flex-1 min-h-32 border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-800/20">
                                {loading ? (
                                    <div className="space-y-3">
                                        <div className="flex space-x-2">
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                                                    style={{ animationDelay: `${i * 0.2}s` }}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                                            Processing your query...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: resultData }} />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto text-center py-8">
                        {/* Welcome Section */}
                        <div className="mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
                                Hello, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent">RIVA</span>
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">All Bhagwat Gita AI</p>
                        </div>

                        {/* Suggestions */}
                        <div className="mb-12">
                            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
                                Quick Suggestions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {suggestions.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestion(item.prompt)}
                                        className={`${item.bg} rounded-xl p-5 text-left group transition-all duration-300 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:shadow-gray-800/20`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors">
                                                {item.icon}
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {item.prompt}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Input Section */}
            <div className="sticky bottom-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-gray-800/20 py-4 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center bg-white/90 dark:bg-gray-800/90 rounded-full px-5 py-3 border border-gray-300 dark:border-gray-600 shadow-inner focus-within:border-blue-500 dark:focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-200 dark:focus-within:ring-blue-900 transition-all">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            onKeyPress={handleKeyPress}
                            type="text"
                            placeholder="Ask me anything about Krishna..."
                            className="flex-1 bg-transparent border-none outline-none text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-sm"
                        />
                        <button 
                            onClick={onSent}
                            disabled={!input.trim()}
                            className={`p-2 rounded-full ml-3 ${input.trim() ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'} transition-all`}
                        >
                            <FiSend className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                        RIVA may display inaccurate info. Please verify important details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;