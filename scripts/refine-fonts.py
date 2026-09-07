from pathlib import Path
from urllib.request import urlopen
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset
import io
out=Path('public/fonts')
assets=[('newsreader','Newsreader[opsz,wght].ttf','newsreader-regular',400),('newsreader','Newsreader-Italic[opsz,wght].ttf','newsreader-italic',400),('inter','Inter[opsz,wght].ttf','inter-regular',400),('inter','Inter[opsz,wght].ttf','inter-medium',500),('inter','Inter[opsz,wght].ttf','inter-semibold',600)]
def make(a):
 family,file,name,weight=a
 data=urlopen('https://raw.githubusercontent.com/google/fonts/main/ofl/'+family+'/'+quote(file),timeout=30).read()
 font=TTFont(io.BytesIO(data));axes={'wght':weight,'opsz':20 if family=='newsreader' else 18};font=instantiateVariableFont(font,axes,inplace=True)
 options=subset.Options();options.layout_features=['*'];sub=subset.Subsetter(options=options);sub.populate(unicodes=list(range(32,591))+list(range(8192,8304))+[8364,8592,8593,8594,8595]);sub.subset(font)
 font.save(out/(name+'.ttf'));font.flavor='woff';font.save(out/(name+'.woff'));return name
with ThreadPoolExecutor(max_workers=3) as ex:print(list(ex.map(make,assets)))
for family in ['newsreader','inter']:(out/(family+'-OFL.txt')).write_bytes(urlopen('https://raw.githubusercontent.com/google/fonts/main/ofl/'+family+'/OFL.txt',timeout=30).read())
