import { PageHero } from '@/components/site-pages';
import { LeadForm } from '@/components/site-interactions';
import { pageMeta } from '@/lib/content';

export const metadata = pageMeta('/enrol', 'Join a Communication Coaching Course', 'Choose your communication course in English. Enquire about enrolment, confirm a suitable schedule and discuss your next step. Courses from €50.');
export default function EnrolPage() {
  return <main id="main"><PageHero eyebrow="COURSE ENROLMENT" title="Your next step. With a plan." description="Choose your course and tell us when you can join. We’ll confirm the fit, schedule and complete fee before you decide."/><section className="wrap section split"><div className="prose"><h2>Bring the conversation<br/>you want to change.</h2><p>An interview. A presentation. A pitch. A room where you want your ideas to carry more weight.</p><ol><li>Choose a course and share your goal.</li><li>Discuss a suitable cohort and local-time schedule.</li><li>Review the final fee and terms before enrolling.</li></ol><p>Live online practice. Approximately 6 learners. The same trainer throughout, with monthly alumni practice after your course.</p><p>Course fees cover the stated duration; they are not recurring subscriptions.</p><a href="/pricing">Compare the course fees</a> · <a href="/legal/terms">Read the terms</a></div><div><LeadForm enrol/></div></section></main>;
}
