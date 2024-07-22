/* page.tsx */
// app/[locale]/layout.tsx
import Home from "@/app/[locale]/home/page";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/TranslationsProvider";

type Locale = 'en' | 'pl';

const i18nNamespaces = ['hero', 'navbar'];

interface MainProps {
    params: {
        locale: Locale;
    };
}

export default async function Main({ params: { locale } }: MainProps) {
    const { t, resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
            <Home />
        </TranslationsProvider>
    );
}
