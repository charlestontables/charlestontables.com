// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Mrs+Saint+Delafield&display=swap"
                    rel="stylesheet"
                />
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