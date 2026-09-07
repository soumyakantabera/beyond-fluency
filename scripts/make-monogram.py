"""Produce a typographic bf signature from the licensed Bodoni Moda font."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import re
font=TTFont('public/fonts/bodoni-regular.ttf');glyphs=font.getGlyphSet();cmap=font.getBestCmap();scale=43/font['head'].unitsPerEm
paths=[]
for letter,x in [('b',4),('f',25)]:
 pen=SVGPathPen(glyphs);transform=TransformPen(pen,(scale,0,0,-scale,x,39));glyphs[cmap[ord(letter)]].draw(transform);paths.append(pen.getCommands())
p=Path('lib/icon-paths.ts');s=p.read_text();s=re.sub(r'export const monogramPaths = \[.*?\];','export const monogramPaths = ['+','.join(repr(d) for d in paths)+'];',s);p.write_text(s)
