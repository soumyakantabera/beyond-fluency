import { Diagnostic, SharedResult } from '@/components/site-interactions';
import { PageHero } from '@/components/site-pages';
import { pageMeta } from '@/lib/content';
export const metadata=pageMeta('/diagnostic','Free English Communication Plateau Diagnostic','Find your plateau in 90 seconds. Seven situational questions, no grammar test, no email required. Get a named result and one relevant course recommendation.');
export default function Page(){return <main id="main"><PageHero eyebrow="THE PLATEAU DIAGNOSTIC" title="Where does your English stop working?" description="Find your plateau in 90 seconds. Seven real situations. Three dimensions. A useful place to start."/><section className="wrap section"><SharedResult/><Diagnostic/></section></main>}
