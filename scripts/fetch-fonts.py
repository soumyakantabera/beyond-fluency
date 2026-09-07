from pathlib import Path
from urllib.request import urlopen
from concurrent.futures import ThreadPoolExecutor
from fontTools.ttLib import TTFont
from fontTools import subset
from io import BytesIO
files={
'bodoni-regular':'https://fonts.gstatic.com/s/bodonimoda/v28/aFT67PxzY382XsXX63LUYL6GYFcan6NJrKp-VPjfJMShrpsGFUt8oU7awIA.ttf',
'bodoni-italic':'https://fonts.gstatic.com/s/bodonimoda/v28/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZKMN4sQ.ttf',
'manrope-regular':'https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk79FO_F.ttf',
'manrope-medium':'https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk7PFO_F.ttf',
'manrope-semibold':'https://fonts.gstatic.com/s/manrope/v20/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4jE-_F.ttf'}
def fetch(item):
 name,url=item;cached=Path('public/fonts/'+name+'.ttf');data=cached.read_bytes() if cached.exists() else urlopen(url,timeout=30).read();cached.write_bytes(data)
 font=TTFont(BytesIO(data));options=subset.Options();options.flavor='woff';sub=subset.Subsetter(options=options);sub.populate(unicodes=list(range(0x0000,0x0250))+list(range(0x2000,0x2070))+[0x20ac,0x2197,0x2192,0x2190,0x2193,0x2212]);sub.subset(font);font.flavor='woff';font.save('public/fonts/'+name+'.woff');return name
with ThreadPoolExecutor(max_workers=5) as pool: print(list(pool.map(fetch,files.items())))
for font in ['bodonimoda','manrope']:
 Path('public/fonts/'+font+'-OFL.txt').write_bytes(urlopen('https://raw.githubusercontent.com/google/fonts/main/ofl/'+font+'/OFL.txt',timeout=30).read())
print('Self-hosted fonts and OFL licences saved.')
