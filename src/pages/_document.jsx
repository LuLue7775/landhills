import { ServerStyleSheet } from 'styled-components'
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App  {...props} />),
                })
            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }

    render() {
        return (
            <Html>
                <Head >
                    <link
                        rel="preload"
                        href="/fonts/circular-book.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin="anonymous"
                    />
                    <link
                        rel="preload"
                        href="/fonts/circular-medium.woff"
                        as="font"
                        type="font/woff"
                        crossOrigin="anonymous"
                    />

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}


