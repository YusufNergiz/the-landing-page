'use client';

import { useState, useEffect, useRef } from 'react';
import ThemeToggle from '@/app/components/ThemeToggle';
import Link from 'next/link';
import LanguageChanger from "@/app/components/LanguageChanger";
import { useTranslation } from "react-i18next";
import { NavbarItems } from "@/app/utils/Navbar/navbar-items";

type RefElement = HTMLDivElement | null;

export default function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    const navbarRef = useRef<RefElement>(null);
    const backToTopRef = useRef<HTMLDivElement | null>(null);
    const themeSwitcherRef = useRef<HTMLDivElement | null>(null);

    const { t } = useTranslation();

    // Handle scroll event
    useEffect(() => {
        const handleScroll = () => {
            const udHeader = navbarRef.current;
            const sticky = udHeader?.offsetTop || 0;

            if (window.pageYOffset > sticky) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }

            if (backToTopRef.current) {
                backToTopRef.current.style.display = window.scrollY > 50 ? "flex" : "none";
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSticky]);

    // Handle theme switching
    useEffect(() => {
        const themeSwitcher = themeSwitcherRef.current;
        const userTheme = localStorage.getItem('theme');
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const applyTheme = () => {
            if (userTheme === 'dark' || (!userTheme && systemTheme)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        const switchTheme = () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        };

        applyTheme();
        if (themeSwitcher) {
            themeSwitcher.addEventListener('click', switchTheme);
        }

        return () => {
            if (themeSwitcher) {
                themeSwitcher.removeEventListener('click', switchTheme);
            }
        };
    }, []);

    // Toggle navbar
    const handleToggle = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    // Toggle submenu
    const handleSubmenuToggle = () => {
        setIsSubmenuOpen(!isSubmenuOpen);
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header
            ref={navbarRef}
            className={`ud-header fixed left-0 top-0 w-full z-40 transition-all duration-300 ${isSticky ? 'bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-80 shadow-lg' : 'bg-transparent dark:bg-transparent'}`}
        >
            <div className="relative container flex justify-between items-center w-full px-4 py-3 lg:py-0">
                <div className="flex items-center justify-start w-[250px]">
                    <Link className={`p-5 font-bold ${isSticky ? 'text-black dark:text-white' : 'text-white dark:text-white'}`} href="/public">
                        Quick Launch Designs
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        id="navbarToggler"
                        className={`absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden ${isNavbarOpen ? 'navbarTogglerActive' : ''}`}
                        onClick={handleToggle}
                    >
                        <span
                            className={`relative my-[6px] block h-[2px] w-[30px] ${isSticky ? 'bg-black dark:bg-white' : 'bg-white'}`}></span>
                        <span
                            className={`relative my-[6px] block h-[2px] w-[30px] ${isSticky ? 'bg-black dark:bg-white' : 'bg-white'}`}></span>
                        <span
                            className={`relative my-[6px] block h-[2px] w-[30px] ${isSticky ? 'bg-black dark:bg-white' : 'bg-white'}`}></span>
                    </button>
                    <nav
                        id="navbarCollapse"
                        className={`absolute right-4 top-full ${isNavbarOpen ? 'block' : 'hidden'} w-full max-w-[250px] rounded-lg py-5 bg-gray-800 shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent dark:lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none xl:px-6`}
                    >
                        <ul className="block lg:flex 2xl:ml-20">
                            {NavbarItems.map((item) => {
                                return (
                                    <li key={item.href} className="group relative">
                                        <a
                                            href={item.href}
                                            className={`ud-menu-scroll mx-8 flex py-2 text-base font-medium lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:group-hover:opacity-70 ${isSticky ? 'text-white dark:text-white lg:text-black' : 'text-white dark:text-white'}`}
                                        >
                                            {t(item.label)}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                </div>
                <div
                    className="flex items-center justify-end w-[200px] pr-16 lg:pr-0">
                    <ThemeToggle ref={themeSwitcherRef} isSticky={isSticky}/>
                    <LanguageChanger isSticky={isSticky}/>
                </div>
            </div>

            <div
                ref={backToTopRef}
                className="fixed bottom-4 right-4 p-2 bg-black text-white rounded-full cursor-pointer shadow-lg"
                onClick={scrollToTop}
            >
                <span className="text-xl">↑</span>
            </div>
        </header>
    );
}
