from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
import re,json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from xml.sax.saxutils import escape
p=Path('public/assets');fontdir=Path('public/fonts')
ink='#272422';wine='#174F46';paper='#F4F1EA';line='#D8D0C8'
source=Path('lib/icon-paths.ts').read_text()
paths=re.findall(r"'([^']+)'",source.split('export const monogramPaths = [')[1].split('];')[0])
mark=''.join(f'<path d="{d}" stroke="currentColor" stroke-width="{2.2 if i==0 else 1.3}" fill="none" stroke-linejoin="round"/>' for i,d in enumerate(paths))
fonts={n:TTFont(fontdir/(n+'.ttf')) for n in ['bodoni-regular','bodoni-italic','manrope-regular','manrope-medium','manrope-semibold']}
def text(value,x,y,size,font='manrope-regular',fill=ink,spacing=0):
 f=fonts[font];scale=size/f['head'].unitsPerEm;cmap=f.getBestCmap();glyphs=f.getGlyphSet();pieces=[];cursor=x
 for ch in value:
  glyph=cmap.get(ord(ch),'.notdef');pen=SVGPathPen(glyphs);glyphs[glyph].draw(pen)
  pieces.append(f'<path d="{pen.getCommands()}" transform="translate({cursor:.3f},{y}) scale({scale:.6f},-{scale:.6f})" fill="{fill}"/>')
  cursor+=glyphs[glyph].width*scale+spacing
 return ''.join(pieces)
def svg(body,w,h,unit=''):
 return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}{unit}" height="{h}{unit}" viewBox="0 0 {w} {h}">{body}</svg>'
def wordmark(x,y,scale=1,color=wine):
 return f'<g transform="translate({x} {y}) scale({scale})" color="{color}">{mark}</g>'+text('beyond',x+65*scale,y+34*scale,43*scale,'bodoni-regular',color)+text('FLUENCY LAB',x+68*scale,y+49*scale,5.5*scale,'manrope-medium',color,1.7*scale)
logo=svg(wordmark(18,20,2.1),520,145)
(p/'logo.svg').write_text(logo)
(p/'logo-reversed.svg').write_text(svg(f'<rect width="520" height="145" fill="{wine}"/>'+wordmark(18,20,2.1,paper),520,145))
(p/'mark.svg').write_text(svg(f'<g color="{wine}">{mark}</g>',48,48))
favicon=svg(f'<rect width="64" height="64" rx="4" fill="{wine}"/><g transform="translate(8 8)" color="{paper}">{mark}</g>',64,64)
(p/'favicon.svg').write_text(favicon);Path('public/favicon.svg').write_text(favicon)
card=f'<rect width="850" height="550" fill="{paper}"/>'+wordmark(55,42,1.9)+f'<path d="M55 174H795" stroke="{line}"/>'+text('[Full name]',55,256,40,'bodoni-regular')+text('[Role / title]',55,292,16,'manrope-medium',wine)+text('[Email address]  ·  [Phone number]',55,390,16)+text('[Verified website address]',55,421,16)+text('FLUENT IS ONLY THE BEGINNING.',55,497,10,'manrope-medium',wine,1.7)
(p/'business-card.svg').write_text(svg(card,850,550).replace('width="850" height="550"','width="85mm" height="55mm"'))
back=f'<rect width="850" height="550" fill="{wine}"/><g transform="translate(353 83) scale(3)" color="{paper}">{mark}</g>'+text('Fluent is only',190,337,54,'bodoni-regular',paper)+text('the beginning.',176,400,54,'bodoni-italic',paper)+text('BEYOND FLUENCY LAB',287,486,11,'manrope-medium',paper,2)
(p/'business-card-back.svg').write_text(svg(back,850,550).replace('width="850" height="550"','width="85mm" height="55mm"'))
letter=f'<rect width="794" height="1123" fill="{paper}"/>'+wordmark(65,50,1.45)+f'<path d="M65 150H729" stroke="{line}"/>'+text('[Date]',65,213,13)+text('[Recipient name]',65,273,13)+text('[Organisation / address]',65,297,13)+text('[Subject]',65,365,32,'bodoni-regular')+text('Dear [Name],',65,420,14)+text('[Letter content]',65,469,14)+text('Kind regards,',65,830,14)+text('[Name and role]',65,867,14)+f'<path d="M65 1000H729" stroke="{wine}"/>'+text('Fluent is only the beginning.',65,1030,18,'bodoni-italic',wine)+text('[Legal entity] · [Registered address] · [Registration number]',65,1058,9)+text('[Email] · [Phone] · [Website] · VAT ID: [TO BE CONFIRMED]',65,1078,9)
(p/'letterhead.svg').write_text(svg(letter,794,1123).replace('width="794" height="1123"','width="210mm" height="297mm"'))
# Keep a browser-editable document alongside the outlined SVG master.
html=(p/'letterhead.html').read_text().replace('#572B39',wine).replace('#F3F0EA',paper);html=html.replace('#f2f0eb',paper).replace('#292d29',ink).replace('#99563e',wine).replace('#d5d4cc',line).replace('font:12pt/1.6 Arial','font:11pt/1.8 Manrope,Arial').replace('font:22pt Georgia','font:24pt "Bodoni Moda",Georgia').replace('font:12pt Georgia','font:14pt "Bodoni Moda",Georgia')
css='@font-face{font-family:Manrope;src:url(fonts/manrope-regular.woff)}@font-face{font-family:"Bodoni Moda";src:url(fonts/bodoni-regular.woff)}'
# Site path uses sibling ../fonts, ZIP gets the same relative directory structure.
html=re.sub(r'@font-face\{[^}]+\}', '', html)
html=html.replace('<style>','<style>'+css.replace('url(fonts/','url(../fonts/'))
(p/'letterhead.html').write_text(html)
icons=dict(re.findall(r"^ (\w+):'([^']+)'",source,re.M));parts=[f'<rect width="1000" height="{160+((len(icons)+5)//6)*140}" fill="{paper}"/>',text('The Lab iconography',35,65,36,'bodoni-regular',wine),text('One stroke. A shared visual language.',37,100,13)]
for i,(name,d) in enumerate(icons.items()):
 x=45+(i%6)*160;y=145+(i//6)*140
 parts.append(f'<g transform="translate({x} {y}) scale(2)" fill="none" stroke="{wine}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="{d}"/></g>'+text(name,x,y+79,11))
 icon=svg(f'<path d="{d}" fill="none" stroke="{wine}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',24,24)
 (p/'icons').mkdir(exist_ok=True);(p/'icons'/(name+'.svg')).write_text(icon)
(p/'iconography.svg').write_text(svg(''.join(parts),1000,160+((len(icons)+5)//6)*140))
(p/'brand-guide.txt').write_text('Beyond Fluency Lab · Identity III\n\nTypography: Bodoni Moda regular and italic for headlines; Manrope for reading and UI. Self-hosted fonts with SIL Open Font Licences included.\nPalette: warm stone #F4F1EA; deep ink #272422; emerald #174F46; data blue-grey #7C8B91.\nLogo: original outlined Beyond monogram and custom typeset wordmark. Logo letters are vector paths for consistent rendering.\nIconography: 27 original 24px line icons, 1.4-unit rounded strokes, drawn and exported from one shared source.\nBusiness card: 85×55mm front/back concepts, no bleed. Letterhead: A4 SVG and editable printable HTML. Replace all placeholders before use.\nImagery: fictional AI-generated people and places, never presented as learners, trainers, premises or historical documentary photographs.\nMotion: entry reveals, photographic scale transition, drawn monogram and manual story chapter carousel. OS reduced-motion respected; page-level pause control included.\nSocial preview cards retain the original requested 1200×630 dimensions.\n')
# Raster reference solely for the image-generation social-card task.

with ZipFile(p/'beyond-fluency-brand-kit.zip','w',ZIP_DEFLATED) as z:
 for name in ['logo.svg','logo-reversed.svg','mark.svg','favicon.svg','business-card.svg','business-card-back.svg','letterhead.svg','letterhead.html','iconography.svg','og-home.png','og-course.png','og-blog.png','brand-guide.txt']:
  z.write(p/name,'assets/'+name)
 for icon in (p/'icons').glob('*.svg'):z.write(icon,'assets/icons/'+icon.name)
 for font in fontdir.glob('*'):
  if font.suffix in ['.woff','.txt']:z.write(font,'fonts/'+font.name)
print('Updated outlined identity, 27 icons, print templates, and kit.')
