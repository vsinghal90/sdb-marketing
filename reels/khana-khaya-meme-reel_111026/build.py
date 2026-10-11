# Usage: python3 build.py specs/<meme>.json  -> writes <slug>.html next to it (one self-contained reel page, all regional versions inside)
# The template is the meme format; the spec holds the words, voices and dish per regional version (north / east / west).
import base64,json,os,glob,sys
HERE=os.path.dirname(os.path.abspath(__file__))
P=lambda *f:os.path.join(HERE,*f)
KNOW=P('..','knowledge') if os.path.exists(P('..','knowledge','sdb-sound-logo.js')) else HERE   # a repo copy keeps the sound logo next to the reel
spec=json.load(open(sys.argv[1] if len(sys.argv)>1 else P('specs','khana-khaya.json')))
d=lambda f,m:'data:%s;base64,'%m+base64.b64encode(open(f,'rb').read()).decode()
h=open(P('meme.template.html')).read()
h=h.replace('{{TITLE}}',spec['title'])
h=h.replace('{{SWIGGY}}',d(P('swiggyw.png'),'image/png')).replace('{{OWNLY}}',d(P('ownly.png'),'image/png')).replace('{{LOCKUPT}}',d(P('lockup_t.png'),'image/png'))
h=h.replace('{{SOUNDLOGO}}',open(os.path.join(KNOW,'sdb-sound-logo.js')).read())
used={v['meal'] for v in spec['variants'].values()}
imgs={os.path.basename(f)[:-5]:d(f,'image/webp') for f in glob.glob(P('cut','*.webp')) if os.path.basename(f)[:-5] in used}
h=h.replace('{{IMGS}}',json.dumps(imgs))
voice={os.path.basename(f)[:-4]:d(f,'audio/wav') for f in glob.glob(P('voice',spec['slug'],'*.wav'))}
h=h.replace('{{VOICE}}',json.dumps(voice)).replace('{{SPEC}}',json.dumps(spec,ensure_ascii=False))
# every meme has its own background (owner, 2026-10-11): the spec must name one, and no other spec may use the same file
bg=spec.get('background');assert bg and os.path.exists(P(bg)),'the spec needs its own "background": backgrounds/<meme>-<scene>.svg'
for f in glob.glob(P('specs','*.json')):
  o=json.load(open(f))
  assert o['slug']==spec['slug'] or o.get('background')!=bg,'background %s is already used by %s; draw a new one'%(bg,o['slug'])
h=h.replace('{{BACKGROUND}}',open(P(bg)).read().split('-->',1)[1].strip())
assert '{{' not in h,'unfilled placeholder: '+h[h.index('{{'):h.index('{{')+20]
out=P(spec['slug']+'.html');open(out,'w').write(h);print(out,len(h),list(imgs),len(voice))
