from pathlib import Path
import re,runpy
runpy.run_path('scripts/brand-redesign.py')
origin='https://beyond-fluency-lab.sbera9901.chatgpt.site'
paths=['/','/courses','/who-its-for','/our-method','/about','/testimonials','/blog','/pricing','/faq','/contact','/diagnostic','/brand-kit','/legal/terms','/legal/privacy','/legal/cookies']
for s in re.findall(r"slug:'([^']+)'",Path('lib/content.ts').read_text()):
 paths.append(('/courses/' if s in ['speak-with-confidence','career-interview-intensive','professional-communication','executive-communication'] else '/who-its-for/')+s)
paths += ['/blog/'+s for s in re.findall(r"slug:'([^']+)'",Path('lib/articles.ts').read_text())]
Path('public/sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>'+origin+s+'</loc><lastmod>2026-09-06</lastmod></url>' for s in paths)+'</urlset>')
print('Generated brand kit and sitemap with',len(paths),'pages')
