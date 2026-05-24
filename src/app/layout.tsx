import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://truenorthiul.com'
const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID

export const metadata: Metadata = {
  title: 'TrueNorth IUL — Is an IUL Right for You?',
  description:
    'Answer 6 quick questions and get a personalized IUL fit report in under 2 minutes. Educational content — no selling, no obligation.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TrueNorth IUL — Is an IUL Right for You?',
    description:
      'Answer 6 quick questions and get a personalized IUL fit report in under 2 minutes.',
    url: siteUrl,
    siteName: 'TrueNorth IUL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isProd = process.env.NODE_ENV === 'production'

  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`}>
      <head>
        {isProd && ga4Id && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4Id}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans bg-neutral-50 text-neutral-900 antialiased">
        <div className="page-shell">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
