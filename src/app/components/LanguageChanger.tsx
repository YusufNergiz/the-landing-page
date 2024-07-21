'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/../i18nConfig';

export default function LanguageChanger({ isSticky }) {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = e => {
        const newLocale = e.target.value;

        // Set cookie for next-i18n-router
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        // Redirect to the new locale path
        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
        setShowDropdown(false);
    };

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    return (
        <div className="language-changer">
            <button
                className={`language-btn ${isSticky ? 'text-black dark:text-white' : 'text-white'}`}
                onClick={toggleDropdown}
            >
                {currentLocale.toUpperCase()}
            </button>
            {showDropdown && (
                <div className="dropdown">
                    <button
                        className="dropdown-item"
                        value="en"
                        onClick={handleChange}
                    >
                        EN
                    </button>
                    <button
                        className="dropdown-item"
                        value="pl"
                        onClick={handleChange}
                    >
                        PL
                    </button>
                </div>
            )}
            <style jsx>{`
                .language-changer {
                    position: relative;
                    display: inline-block;
                }
                .language-btn {
                    border: none;
                    padding: 10px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                }
                .dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    z-index: 1000;
                }
                .dropdown-item {
                    display: block;
                    padding: 10px;
                    color: #333;
                    text-align: left;
                    border: none;
                    background: none;
                    cursor: pointer;
                    font-size: 16px;
                }
                .dropdown-item:hover {
                    background-color: #f1f1f1;
                }
            `}</style>
        </div>
    );
}
