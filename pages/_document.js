import {Head, Html, Main, NextScript} from 'next/document'

export default function Document() {
  return (
    <Html lang="fr" className={"h-screen w-screen bg-black"}>
        <Head/>
        <title>Twitter Clone </title>
        <body>
        <Main/>
        <NextScript/>
        </body>
    </Html>
  )
}
