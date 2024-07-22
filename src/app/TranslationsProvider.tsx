'use client';

import React, { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/i18n';
import { createInstance } from 'i18next';

interface TranslationsProviderProps {
    children: ReactNode;
    locale: string;
    namespaces: string[];
    resources?: Record<string, any>;
}

export default function TranslationsProvider({
                                                 children,
                                                 locale,
                                                 namespaces,
                                                 resources
                                             }: TranslationsProviderProps) {
    const i18n = createInstance();

    initTranslations(locale, namespaces, i18n, resources).then(({ i18n: initializedI18n }) => {
        i18n.init({
            lng: locale,
            resources,
            fallbackLng: 'en',
            defaultNS: namespaces[0],
            ns: namespaces,
        });
    });

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
