import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import React from "react";
import {NextIntlClientProvider, useMessages} from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

type Props = {
    children: React.ReactNode;
    params: {
        locale: 'en' | 'pl'
    }
}

const RootLayout: React.FC<Props> = ({
                                         children,
                                         params: {locale}
                                     }) => {

    const messages = useMessages()

    return (
        <html lang={locale} suppressHydrationWarning>
        <body className={inter.className}>
        <ThemeProvider attribute="class">
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}

export default RootLayout;
