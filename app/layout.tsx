import './globals.css';
import './premium.css';
import './conversion.css';
import { Header, Footer } from '@/components/site-shell';
import { ORIGIN, BUSINESS } from '@/lib/content';
export const metadata = { metadataBase: new URL(ORIGIN), title: { default: 'Beyond Fluency Lab', template: '%s | Beyond Fluency Lab' }, description: BUSINESS, icons: { icon: '/favicon.svg' } };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><head><link rel="preload" href="/fonts/inter-regular.woff" as="font" type="font/woff" crossOrigin="anonymous"/><link rel="preload" href="/fonts/newsreader-regular.woff" as="font" type="font/woff" crossOrigin="anonymous"/></head><body><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'Beyond Fluency Lab',url:ORIGIN,logo:ORIGIN+'/assets/logo.svg',description:BUSINESS,parentOrganization:{'@type':'Organization',name:'Learn With Smile',url:'https://www.learnwithsmile.app/'}})}}/></body></html> }
