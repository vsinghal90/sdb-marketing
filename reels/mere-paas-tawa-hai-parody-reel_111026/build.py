# Usage: python3 build.py  -> writes sdb-parody-reel.html next to it
import base64,json,os,glob
HERE=os.path.dirname(os.path.abspath(__file__))
KNOW=os.path.join(HERE,'..','knowledge')   # brand files: sound logo
if os.path.exists(os.path.join(HERE,'sdb-sound-logo.js')):KNOW=HERE   # repo copy keeps the sound logo next to the reel
P=lambda *f:os.path.join(HERE,*f)
d=lambda f,m:'data:image/%s;base64,'%m+base64.b64encode(open(f,'rb').read()).decode()
h=open(P('reel.template.html')).read()
h=h.replace('{{SWIGGY}}',d(P('swiggyw.png'),'png')).replace('{{OWNLY}}',d(P('ownly.png'),'png')).replace('{{LOCKUPT}}',d(P('lockup_t.png'),'png'))
h=h.replace('{{SOUNDLOGO}}',open(os.path.join(KNOW,'sdb-sound-logo.js')).read())
imgs={os.path.basename(f)[:-5]:d(f,'webp') for f in glob.glob(P('cut','*.webp'))}
h=h.replace('{{IMGS}}',json.dumps(imgs))
voice={os.path.basename(f)[:-4]:'data:audio/wav;base64,'+base64.b64encode(open(f,'rb').read()).decode() for f in glob.glob(P('voice','*.wav'))}   # dialogue clips
h=h.replace('{{VOICE}}',json.dumps(voice))
assert '{{' not in h,'unfilled placeholder: '+h[h.index('{{'):h.index('{{')+20]
open(P('sdb-parody-reel.html'),'w').write(h);print(len(h),list(imgs))
