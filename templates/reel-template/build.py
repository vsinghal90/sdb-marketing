import base64,json,os,glob,sys
SRC=sys.argv[1] if len(sys.argv)>1 else 'v2.src.html'
d=lambda f,m:'data:image/%s;base64,'%m+base64.b64encode(open(f,'rb').read()).decode()
h=open(SRC).read()
h=h.replace('{{BG}}',d('bgp.jpg','jpeg')).replace('{{LOGO}}',d('logo.png','png')).replace('{{SWIGGY}}',d('swiggyw.png','png')).replace('{{OWNLY}}',d('ownly.png','png')).replace('{{LOCKUPT}}',d('lockup_t.png','png')).replace('{{LOCKUP}}',d('/mnt/project-files/knowledge/LogoNameTagline.png','png'))
imgs={os.path.basename(f)[:-4]:d(f,'jpeg') for f in glob.glob('food/web/*.jpg')}
imgs.update({os.path.basename(f)[:-5]:d(f,'webp') for f in glob.glob('cut/*.webp')})
imgs['paneerHero']=d('food/web/paneer.jpg','jpeg')
h=h.replace('{{IMGS}}',json.dumps(imgs))
open('sdb-reel.html','w').write(h);print(len(h),list(imgs))
