# Usage: python3 make_voices.py <kokoro model dir> specs/<meme>.json
# Offline Hindi TTS (pip install kokoro-onnx soundfile; kokoro.onnx + voices.bin from the kokoro-onnx GitHub releases).
# Writes voice/<slug>/<variant>_<line>.wav for every line of every regional variant in the spec.
import sys,os,json,soundfile as sf,numpy as np
from kokoro_onnx import Kokoro
d,spec=sys.argv[1],json.load(open(sys.argv[2]))
k=Kokoro(d+'/kokoro.onnx',d+'/voices.bin')
out=os.path.join(os.path.dirname(os.path.abspath(__file__)),'voice',spec['slug']);os.makedirs(out,exist_ok=True)
for vn,v in spec['variants'].items():
  for ln,L in v['lines'].items():
    a,sr=k.create(L['hi'],voice=L['voice'],speed=L.get('speed',1),lang='hi')
    nz=np.where(np.abs(a)>0.01)[0];a=a[max(0,nz[0]-240):nz[-1]+2400]   # trim silence
    a=a/np.max(np.abs(a))*0.9
    sf.write(f'{out}/{vn}_{ln}.wav',a,sr,subtype='PCM_16');print(vn,ln,round(len(a)/sr,2))
