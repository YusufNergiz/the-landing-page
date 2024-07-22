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
            className={`ud-header fixed left-0 top-0 w-full z-40 transition-all duration-300 ${isSticky ? 'bg-white bg-opacity-70 dark:bg-gray-800 dark:bg-opacity-80 shadow-lg' : 'bg-transparent'}`}
        >
            <div className="relative container flex justify-between items-center w-full px-4 py-3 lg:py-0">
                <div className="flex items-center justify-start w-[250px]">
                    <Link className={`p-5 font-bold ${isSticky ? 'text-black dark:text-white' : 'text-white'}`} href="/public">
                        Quick Launch Designs
                    </Link>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        id="navbarToggler"
                        className={`absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden ${isNavbarOpen ? 'navbarTogglerActive' : ''}`}
                        onClick={handleToggle}
                    >
                        <span className={`relative my-[6px] block h-[2px] w-[30px] ${isSticky ? 'bg-black dark:bg-white' : 'bg-white'}`}></span>
                        <span className={`relative my-[6px] block h-[2px] w-[30px] ${isSticky ? 'bg-black dark:bg-white' : 'bg-white'}`}></span>
                        <span className={`relative my-[6px] block h-[2px] w-[30px] ${isSticky ? 'bg-black dark:bg-white' : 'bg-white'}`}></span>
                    </button>
                    <nav
                        id="navbarCollapse"
                        className={`absolute right-4 top-full ${isNavbarOpen ? 'block' : 'hidden'} w-full max-w-[250px] rounded-lg py-5 bg-white shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none xl:px-6`}
                    >
                        <ul className="block lg:flex 2xl:ml-20">
                            {NavbarItems.map((item) => {
                                return (
                                    <li key={item.href} className="group relative">
                                        <a
                                            href={item.href}
                                            className={`ud-menu-scroll mx-8 flex py-2 text-base font-medium lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:group-hover:opacity-70 ${isSticky ? 'text-black dark:text-white' : 'text-white'}`}
                                        >
                                            {t(item.label)}
                                        </a>
                                    </li>
                                );
                            })}
                            {/* We'll need this in the future */}
                            {/*<li className="submenu-item group relative">*/}
                            {/*    <a*/}
                            {/*        className="ud-menu-scroll mx-8 flex py-2 text-base font-medium text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 lg:group-hover:opacity-70"*/}
                            {/*        onClick={handleSubmenuToggle}*/}
                            {/*    >*/}
                            {/*        Pages*/}
                            {/*        <svg*/}
                            {/*            className="ml-2 fill-current"*/}
                            {/*            width="16"*/}
                            {/*            height="20"*/}
                            {/*            viewBox="0 0 16 20"*/}
                            {/*            fill="none"*/}
                            {/*            xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        >*/}
                            {/*            <path*/}
                            {/*                d="M7.99999 14.9C7.84999 14.9 7.72499 14.85 7.59999 14.75L1.84999 9.10005C1.62499 8.87505 1.62499 8.52505 1.84999 8.30005C2.07499 8.07505 2.42499 8.07505 2.64999 8.30005L7.99999 13.525L13.35 8.25005C13.575 8.02505 13.925 8.02505 14.15 8.25005C14.375 8.47505 14.375 8.82505 14.15 9.05005L8.39999 14.7C8.27499 14.825 8.14999 14.9 7.99999 14.9Z"*/}
                            {/*            />*/}
                            {/*        </svg>*/}
                            {/*    </a>*/}
                            {/*    <div*/}
                            {/*        className={`submenu ${isSubmenuOpen ? 'block' : 'hidden'} absolute left-0 top-full w-[250px] rounded-sm bg-white dark:bg-black p-4 transition-[top] duration-300 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100`}*/}
                            {/*    >*/}
                            {/*        <a*/}
                            {/*            href="about.html"*/}
                            {/*            className="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"*/}
                            {/*        >*/}
                            {/*            About Page*/}
                            {/*        </a>*/}
                            {/*        <a*/}
                            {/*            href="pricing.html"*/}
                            {/*            className="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"*/}
                            {/*        >*/}
                            {/*            Pricing Page*/}
                            {/*        </a>*/}
                            {/*        <a*/}
                            {/*            href="contact.html"*/}
                            {/*            className="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"*/}
                            {/*        >*/}
                            {/*            Contact Page*/}
                            {/*        </a>*/}
                            {/*        <a*/}
                            {/*            href="blog-grids.html"*/}
                            {/*            className="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"*/}
                            {/*        >*/}
                            {/*            Blog Grid Page*/}
                            {/*        </a>*/}
                            {/*        <a*/}
                            {/*            href="blog-details.html"*/}
                            {/*            className="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"*/}
                            {/*        >*/}
                            {/*            Blog Details Page*/}
                            {/*        </a>*/}
                            {/*        <a*/}
                            {/*            href="signup.html"*/}
                            {/*            className="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"*/}
                            {/*        >*/}
                            {/*            Sign Up Page*/}
                            {/*        </a>*/}
                            {/*        <a*/}
                            {/*            href="signin.html"*/}
                            {/*            className="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"*/}
                            {/*        >*/}
                            {/*            Sign In Page*/}
                            {/*        </a>*/}
                            {/*        <a*/}
                            {/*            href="404.html"*/}
                            {/*            className="block rounded px-4 py-[10px] text-sm text-body-color hover:text-primary dark:text-dark-6 dark:hover:text-primary"*/}
                            {/*        >*/}
                            {/*            404 Page*/}
                            {/*        </a>*/}
                            {/*    </div>*/}
                            {/*</li>*/}
                        </ul>
                    </nav>
                </div>
                <div
                    className="flex items-center justify-end w-[200px] pr-16 lg:pr-0">
                    <ThemeToggle ref={themeSwitcherRef} isSticky={isSticky} />
                    <LanguageChanger isSticky={isSticky} />
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
