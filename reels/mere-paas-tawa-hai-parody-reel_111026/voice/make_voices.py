import sys,soundfile as sf,numpy as np
from kokoro_onnx import Kokoro
d=sys.argv[1];out=sys.argv[2]
k=Kokoro(d+'/kokoro.onnx',d+'/voices.bin')
L=[('f1','hm_omega','आज मेरे पास फ्रीज़र है,',1.1),('f2','hm_omega','माइक्रोवेव है,',1.1),('f3','hm_omega','छह महीने की शेल्फ़ लाइफ़ है!',1.1),
('f4','hm_omega','तुम्हारे पास क्या है?',0.9),('p1','hm_psi','मेरे पास...',0.85),('p2','hm_psi','गरम तवा है।',0.85),
('o1','hf_alpha','शुद्ध देसी बाइट्स। पनीर पराठा मील, एक सौ उन्यासी रुपये।',1.2)]
for n,v,t,sp in L:
  a,sr=k.create(t,voice=v,speed=sp,lang='hi')
  nz=np.where(np.abs(a)>0.01)[0];a=a[max(0,nz[0]-240):nz[-1]+2400]   # trim silence
  a=a/np.max(np.abs(a))*0.9
  sf.write(out+'/'+n+'.wav',a,sr,subtype='PCM_16');print(n,round(len(a)/sr,2),sr)
