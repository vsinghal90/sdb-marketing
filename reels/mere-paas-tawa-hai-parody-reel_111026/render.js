const {chromium}=require('playwright');const fs=require('fs');
// Usage: NODE_PATH=<global node_modules> node render.js <out dir>   -> <out dir>/audio.wav and <out dir>/frames/*.jpg (30fps, 1080x1920)
// then: ffmpeg -framerate 30 -i frames/f%05d.jpg -ss 0.06 -i audio.wav -map 0:v -map 1:a -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart <name>.mp4
const path=require('path');const OUT=process.argv[2],FPS=30,PAGE='file://'+path.join(__dirname,'sdb-parody-reel.html');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(PAGE);await p.waitForTimeout(800);
// audio: the same scheduling code, rendered offline
const wav=await p.evaluate(async()=>{
  const sr=48000,len=Math.ceil((TOTAL+0.6)*sr);
  const off=new OfflineAudioContext(2,len,sr);off.resume=async()=>{};AC=off;
  await startAudio();
  const buf=await off.startRendering();
  const n=buf.length,ch=[buf.getChannelData(0),buf.getChannelData(1)],out=new DataView(new ArrayBuffer(44+n*4));
  const w=(o,s)=>{for(let i=0;i<s.length;i++)out.setUint8(o+i,s.charCodeAt(i))};
  w(0,'RIFF');out.setUint32(4,36+n*4,true);w(8,'WAVE');w(12,'fmt ');out.setUint32(16,16,true);out.setUint16(20,1,true);out.setUint16(22,2,true);out.setUint32(24,sr,true);out.setUint32(28,sr*4,true);out.setUint16(32,4,true);out.setUint16(34,16,true);w(36,'data');out.setUint32(40,n*4,true);
  let o=44;for(let i=0;i<n;i++)for(let c=0;c<2;c++){const v=Math.max(-1,Math.min(1,ch[c][i]));out.setInt16(o,v*32767,true);o+=2}
  let s='';const u=new Uint8Array(out.buffer);for(let i=0;i<u.length;i+=32768)s+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return btoa(s)});
fs.writeFileSync(OUT+'/audio.wav',Buffer.from(wav,'base64'));
// frames: step the reel's own clock and pin every CSS animation/transition to the time it started
const total=await p.evaluate(()=>{document.getElementById('start').hidden=true;playing=false;return TOTAL});
await p.evaluate(()=>{window.__seen=new Map();window.__step=t0=>{t=t0;render();
  for(const a of document.getAnimations()){if(!__seen.has(a))__seen.set(a,t0);a.pause();a.currentTime=Math.max(0,(t0-__seen.get(a))*1000)}}});
const N=Math.round(total*FPS);
for(let f=0;f<N;f++){const tt=Math.max(0.0001,f/FPS);
  await p.evaluate(x=>__step(x),tt);await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  await p.evaluate(x=>__step(x),tt);
  await p.screenshot({path:OUT+'/frames/f'+String(f).padStart(5,'0')+'.jpg',type:'jpeg',quality:92});
  if(f%100===0)console.log('frame',f,'/',N)}
console.log('errors',errs);await b.close()})();
