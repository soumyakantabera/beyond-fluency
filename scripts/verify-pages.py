from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlparse
import json,xml.etree.ElementTree as ET
origin='https://beyond-fluency-lab.sbera9901.chatgpt.site'
urls=[x.text for x in ET.parse('public/sitemap.xml').findall('.//{*}loc')]
paths={urlparse(x).path for x in urls}
class Page(HTMLParser):
 def __init__(self): super().__init__();self.h1=0;self.links=[];self.assets=[];self.canonical=[];self.title=False;self.desc=False;self.schemas=[];self.schema=False;self.body='';self.in_main=False;self.raster=[]
 def handle_starttag(self,t,attrs):
  d=dict(attrs)
  if t=='main':self.in_main=True
  if t=='img' and self.in_main and d.get('src','').endswith('.webp'):self.raster.append(d['src'])
  if t=='h1':self.h1+=1
  if t=='a':self.links.append(d.get('href',''))
  if t in ['img','script'] and d.get('src'):self.assets.append(d['src'])
  if t=='link' and d.get('rel')=='stylesheet':self.assets.append(d['href'])
  if t=='link' and d.get('rel')=='canonical':self.canonical.append(d['href'])
  if t=='title':self.title=True
  if t=='meta' and d.get('name')=='description':self.desc=True
  if t=='script' and d.get('type')=='application/ld+json':self.schema=True;self.body=''
 def handle_data(self,s):
  if self.schema:self.body+=s
 def handle_endtag(self,t):
  if t=='main':self.in_main=False
  if t=='script' and self.schema:self.schemas.append(json.loads(self.body));self.schema=False
errors=[]
for url in urls:
 route=urlparse(url).path
 file=Path('dist/server/prerendered-routes')/('index.html' if route=='/' else route.strip('/')+'.html')
 if not file.exists():errors.append('Missing '+route);continue
 html=file.read_text();page=Page();page.feed(html)
 if len(set(page.raster))<2:errors.append(f'{route}: fewer than two distinct editorial images')
 if page.h1!=1:errors.append(f'{route}: {page.h1} h1s')
 if page.canonical!=[url]:errors.append(f'{route}: canonical {page.canonical}')
 if not(page.title and page.desc):errors.append(f'{route}: metadata')
 for link in page.links:
  if link.startswith('/'):
   target=urlparse(link).path
   if target not in paths and not (Path('dist/client')/target.lstrip('/')).exists():errors.append(f'{route}: broken {target}')
 for asset in page.assets:
  if asset.startswith('/') and not (Path('dist/client')/asset.lstrip('/')).exists():errors.append(f'{route}: asset {asset}')
 for schema in page.schemas:
  if '"Review"' in json.dumps(schema) or '"AggregateRating"' in json.dumps(schema):errors.append(f'{route}: prohibited rating schema')
 if route in ['/faq','/pricing']:
  schemas=[s for s in page.schemas if s.get('@type')=='FAQPage']
  assert len(schemas)==1
  q=[q for q in schemas[0]['mainEntity'] if q['name']=='Are you affiliated with my university?']
  assert q[0]['acceptedAnswer']['text']=="No. Beyond Fluency Lab is an independent programme — we are not partnered with, endorsed by, or officially connected to any specific university. If we ever do form a real partnership with a school, we'll state it clearly on this page, by name."
 if route.startswith('/courses/') and not any(s.get('@type')=='Course' for s in page.schemas):errors.append(route+': no Course schema')
 if '[TO BE CONFIRMED]' not in html:errors.append(route+': no visible legal placeholders')
assert not errors,'\n'.join(errors)
print(f'PASS: {len(urls)} pages; headings, canonicals, metadata, links, assets, course and FAQ schema, exact affiliation answer, no rating schema, visible legal placeholders, at least two distinct editorial images per page.')
