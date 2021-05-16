import NextHead from 'next/head'
import { GoogleFonts } from 'next-google-fonts'

const Head = () => (
    <>
        <GoogleFonts href="https://fonts.googleapis.com/css2?family=Redressed:wght@400;700&display=swap"/>
        <NextHead>
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <title>Safa Marwa. Welcome to our website. We sell Men, Women and Kids clothing, Household products, accessories etc.</title>
        </NextHead>
    </>
)

export default Head