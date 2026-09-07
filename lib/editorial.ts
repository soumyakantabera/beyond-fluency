export type EditorialPhoto = {src:string;alt:string;caption:string};
const photo=(name:string,alt:string,caption:string):EditorialPhoto=>({src:'/assets/'+name+'.webp',alt,caption});
export const photos={
 salon:photo('salon','Fictional professionals exchanging ideas in a light-filled study','The conversation is the classroom.'),
 mentoring:photo('mentoring','An illustrative mentor in conversation with an adult learner','Attention that stays with you.'),
 interview:photo('interview','An illustrative graduate answering a question in a professional interview','Experience, made articulate.'),
 presentation:photo('presentation','A fictional professional leading a focused small-room presentation','A point worth listening to.'),
 practice:photo('practice','Six fictional adults practising communication together','Small groups. Serious practice.'),
 notebook:photo('notebook','Hands and a notebook on an oak desk, an illustrative study detail','The work between conversations.'),
 heritage:photo('heritage','An AI-generated Kolkata-inspired courtyard, not academy premises','Kolkata-inspired illustration; not our premises.'),
 listening:photo('listening','Two fictional adults listening and exchanging perspectives','The quality of your attention matters.'),
 corporate:photo('corporate','Illustrative professional speaking with a colleague','Make your contribution visible.'),
 sme:photo('sme','Illustrative small-business owner discussing an offer','Give your expertise a clear voice.'),
 sales:photo('sales','Illustrative sales professional listening to a client','Move the conversation forward.'),
 student:photo('student','Illustrative adult graduate preparing with a notebook','Ready for the question after the exam.'),
 class:photo('class','Illustrative trainer leading an online class','Live teaching. A consistent trainer.'),
 hero:photo('hero','Fictional professionals in a small, thoughtful discussion','More than words exchanged.')
};
export function editorialPair(label:string,title:string):[EditorialPhoto,EditorialPhoto]{
 const t=title.toLowerCase(),l=label.toLowerCase();
 if(title.endsWith('?')) { if(l==='corporate professionals')return [photos.corporate,photos.notebook]; if(l==='small business & sme owners')return [photos.sme,photos.notebook]; if(l==='sales & marketing')return [photos.sales,photos.listening]; if(l==='graduating students')return [photos.student,photos.notebook]; }
 if(l==='legal')return t.includes('privacy')?[photos.notebook,photos.listening]:t.includes('cookie')?[photos.salon,photos.notebook]:[photos.notebook,photos.mentoring];
 if(l.includes('speak with'))return [photos.listening,photos.mentoring];
 if(l.includes('career &'))return [photos.interview,photos.notebook];
 if(l==='professional communication')return [photos.presentation,photos.practice];
 if(l==='executive communication')return [photos.salon,photos.listening];
 if(l==='corporate professionals')return [photos.corporate,photos.presentation];
 if(l==='small business & sme owners')return [photos.sme,photos.listening];
 if(l==='sales & marketing')return [photos.sales,photos.presentation];
 if(l==='graduating students')return [photos.student,photos.interview];
 if(l==='our method')return [photos.mentoring,photos.practice];
 if(l==='about us')return [photos.heritage,photos.mentoring];
 if(l==='testimonials')return [photos.notebook,photos.listening];
 if(l==='pricing')return [photos.practice,photos.notebook];
 if(l==='faq')return [photos.listening,photos.class];
 if(l.includes('contact'))return [photos.mentoring,photos.class];
 if(l.includes('diagnostic'))return [photos.listening,photos.notebook];
 if(l==='brand assets')return [photos.presentation,photos.salon];
 if(l==='the pillar report')return [photos.notebook,photos.presentation];
 if(l==='pressure performance')return [photos.listening,photos.interview];
 if(l==='register control')return [photos.salon,photos.mentoring];
 if(l==='blog & guides')return [photos.notebook,photos.salon];
 if(l==='who it’s for')return [photos.hero,photos.practice];
 return [photos.practice,photos.mentoring];
}
export const coursePhotos=[photos.listening,photos.interview,photos.presentation,photos.salon];
