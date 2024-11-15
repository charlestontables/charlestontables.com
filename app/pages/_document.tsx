// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html>
            <Head>
                <Script
                    strategy="beforeInteractive"
                    type="module"
                    src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
                />
                <Script
                    strategy="beforeInteractive"
                    noModule
                    src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}