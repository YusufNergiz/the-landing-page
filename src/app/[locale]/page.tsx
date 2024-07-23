import Home from "@/app/[locale]/home/page";

type Locale = 'en' | 'pl';

interface MainProps {
    params: {
        locale: Locale;
    };
}

export default async function Main({ params: { locale } }: MainProps) {

    return (
            <Home />
    );
}
