import { courses } from '@/lib/content';
import { LabIcon } from './lab-icon';

export function enrolmentHref(slug: string, source = 'course') {
  return '/enrol?course=' + encodeURIComponent(slug) + '&source=' + encodeURIComponent(source);
}

export function CourseInvitation({course, reason, source = 'course'}: {
  course: typeof courses[number]; reason?: string; source?: string;
}) {
  return <section className="course-invitation" aria-label={'Your next step: ' + course.name}>
    <div className="invitation-heading"><LabIcon name="craft" size={30}/><p className="eyebrow">TURN INSIGHT INTO PRACTICE</p></div>
    <h3>{course.name}</h3>
    <p>{reason || course.short}</p>
    <div className="invitation-fee"><strong>€{course.price}</strong><span>{course.duration}<br/>Complete course · listed fee</span></div>
    <ul>{course.outcomes.map(outcome => <li key={outcome}><LabIcon name="arrow" size={21}/>{outcome}</li>)}</ul>
    <a className="btn" href={enrolmentHref(course.slug, source)}>Join this course <LabIcon name="arrow"/></a>
    <a className="text-link" href={'/courses/' + course.slug}>See the course outline <LabIcon name="arrow"/></a>
    <p className="fine">Start with an enrolment enquiry. We confirm your schedule and total before payment. VAT treatment: [TO BE CONFIRMED].</p>
  </section>;
}

export function SiteInvitation() {
  return <section className="site-invitation wrap" aria-label="Take your next step">
    <div><p className="eyebrow">YOUR NEXT CONVERSATION STARTS HERE</p><h2>Make your next move<br/>a more convincing one.</h2><p>Public speaking, interviews and professional communication. Live practice in English, with feedback you can use.</p></div>
    <div className="invitation-actions"><a className="btn" href="/enrol">Join a course <LabIcon name="arrow"/></a><a className="text-link" href="/diagnostic">Find your plateau in 90 seconds <LabIcon name="compass"/></a><a className="text-link" href="/contact">Try a free session first <LabIcon name="arrow"/></a><p className="fine">Choose your next step. No payment is taken on this website.</p></div>
  </section>;
}
