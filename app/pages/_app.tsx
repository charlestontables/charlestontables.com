// pages/_app.tsx
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main>
            <Component {...pageProps} />
        </main>
    );
}