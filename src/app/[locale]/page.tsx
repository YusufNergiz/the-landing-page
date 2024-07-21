import Home from "@/app/components/home/page";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/app/TranslationsProvider";

const i18nNamespaces = ['hero', 'navbar'];

export default async function Main({ params: {locale} }) {

    const {t, resources} = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
            <Home/>
        </TranslationsProvider>
    );
}
