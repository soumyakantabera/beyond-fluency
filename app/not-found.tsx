import { PageHero } from '@/components/site-pages';
import { LabIcon } from '@/components/lab-icon';
export default function NotFound(){return <main id="main"><PageHero eyebrow="404 / PAGE NOT FOUND" title="Let’s find the right conversation." description="This page isn’t here. Explore the programmes or return to the Lab."><div className="actions"><a className="btn" href="/">Return home <LabIcon name="back" size={17}/></a><a className="btn outline" href="/courses">Explore courses <LabIcon name="arrow" size={17}/></a></div></PageHero></main>}
