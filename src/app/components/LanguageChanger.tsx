'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/../i18nConfig';
import {Locale} from "@/locales";
import {useLocale} from "use-intl";

interface LanguageChangerProps {
    isSticky?: boolean;
}

const LanguageChanger: React.FC<LanguageChangerProps> = ({ isSticky }) => {
    const router = useRouter();
    const locale = useLocale() as Locale;
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (newLocale: Locale) => {
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
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
                {locale.toUpperCase()}
            </button>
            {showDropdown && (
                <div className="dropdown">
                    <button
                        className="dropdown-item"
                        value="en"
                        onClick={() => handleChange("en")}
                    >
                        EN
                    </button>
                    <button
                        className="dropdown-item"
                        value="pl"
                        onClick={() => handleChange("pl")}
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

export default LanguageChanger;
