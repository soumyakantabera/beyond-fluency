from pathlib import Path
import re,shutil
for name in ['app/premium.css','app/layout.tsx','scripts/brand-redesign.py','public/assets/letterhead.html','components/brand-page.tsx']:
 p=Path(name);s=p.read_text()
 for a,b in [('Bodoni Moda','Newsreader'),('Manrope','Inter'),('bodoni-','newsreader-'),('manrope-','inter-'),('typographic bf signature','original open-ladder mark'),('typographic bf','open-ladder'),('Identity V','Identity VI')]:s=s.replace(a,b)
 p.write_text(s)
p=Path('components/identity.tsx');s=p.read_text().replace('Beyond<span>FLUENCY LAB</span>','Beyond Fluency<span>Lab</span>');p.write_text(s)
p=Path('lib/icon-paths.ts');s=p.read_text().split('export const monogramPaths = [')[0]+"export const monogramPaths = ['M10 43 15 9H19L14 43Z','M30 43 35 3H39L34 43Z','M16 13H35L34.5 17H15.5Z','M14.5 24H33.5L33 28H14Z','M13 35H32L31.5 39H12.5Z'];\n";p.write_text(s)
p=Path('scripts/make-monogram.py');p.write_text('# The original open-ladder geometry is maintained in lib/icon-paths.ts.\n# Run scripts/brand-redesign.py to export the matching brand assets.\n')
p=Path('scripts/brand-redesign.py');s=p.read_text().replace("text('Beyond',x+65*scale,y+34*scale,43*scale","text('Beyond Fluency',x+60*scale,y+25*scale,27*scale").replace("text('FLUENCY LAB',x+68*scale,y+56*scale,8*scale,'inter-medium',color,1.7*scale)","text('Lab',x+61*scale,y+46*scale,18*scale,'newsreader-italic',color)");p.write_text(s)
p=Path('app/layout.tsx');s=p.read_text();s=s.replace(",address:{'@type':'PostalAddress',addressLocality:'Kolkata',addressCountry:'IN'}",'');p.write_text(s)
for name in ['lib/content.ts','public/llms.txt']:
 p=Path(name);s=p.read_text().replace('Based in Kolkata, India, it is from Learn With Smile and offers','From Learn With Smile, it offers').replace('India-based stories','Parent-academy stories').replace('India history','parent-academy history');p.write_text(s)
p=Path('components/site-pages.tsx');lines=p.read_text().splitlines();out=[]
for s in lines:
 if not s.startswith('export function AboutPage'):
  s=s.replace('learners in the India programmes','learners at the parent academy').replace('India-based programmes','established non-European programmes').replace('INDIA-BASED LEARNERS','PARENT-ACADEMY LEARNERS').replace('an Indian trainer','a trainer').replace('Based in Kolkata, India. Coaching live online for Europe.','Live online coaching for fluent speakers in Europe.')
 out.append(s)
p.write_text('\n'.join(out)+'\n')
p=Path('components/editorial-motion.tsx');p.write_text(p.read_text().replace('teaching in Kolkata and across India','developing its live teaching practice'))
p=Path('lib/editorial.ts');p.write_text(p.read_text().replace('Indian mentor','mentor').replace('Indian trainer','trainer'))
p=Path('lib/routes.ts');s=p.read_text().replace('India-based','Parent-academy').replace('Terms of Service','Terms & Conditions');p.write_text(s)
p=Path('components/legal-pages.tsx');s=p.read_text().replace('Terms of Service','Terms & Conditions').replace('Beyond Fluency Lab is the European sub-brand of Learn With Smile, an English-communication coaching academy based in Kolkata, India.','Beyond Fluency Lab is an independent English-communication coaching brand from Learn With Smile. Our background and operating origin are described on the About page.').replace('Beyond Fluency Lab operates as the European sub-brand of Learn With Smile, based in Kolkata, India.','Beyond Fluency Lab is an independent coaching brand from Learn With Smile. See the About page for our background.').replace('The academy is based in India and the hosting or email services may process information outside the EEA.','Programme delivery, hosting or email services may involve processing information outside the EEA.')
s=s.replace('<h2>What is expected of learners?</h2>','<h2>How may you use this website?</h2><p>You may browse the site, use the diagnostic for personal reflection and contact us about coaching. Do not misuse the forms, attempt unauthorised access, distribute malicious software or interfere with other visitors’ use of the service. You are responsible for providing accurate enquiry details.</p><h2>How are fees and payments handled?</h2><p>Prices are listed in euros for the complete course duration. We will confirm the total amount, applicable taxes and available payment method before you enrol. Payment-provider logos identify planned options only; no payment is collected on this website and no provider is presented as endorsing our coaching.</p><h2>What is expected of learners?</h2>')
s=s.replace('<h2>What law and dispute process apply?</h2>','<h2>What about availability and external links?</h2><p>We aim to keep course information accurate and the website available. Content and cohort availability may change; agreed enrolment terms take priority for an existing booking. External websites operate under their own terms and privacy notices.</p><h2>Can these terms change?</h2><p>Updates will be published on this page with a revised date. Changes do not retrospectively remove rights under an existing agreement. Nothing here excludes liability or consumer rights that cannot lawfully be excluded.</p><h2>What law and dispute process apply?</h2>');p.write_text(s)
Path('public/assets/payments').mkdir(exist_ok=True)
for n in ['stripe.svg','visa.png','mastercard.png']:shutil.copy('../payment-assets/'+n,'public/assets/payments/'+n)
