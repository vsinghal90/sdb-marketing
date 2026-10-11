/* Shuddh Desi Bites sound logo (option 12A "Grand & Slow"), chosen 2026-10-09.
   Piano + tabla, three notes: Shuddh (heaviest), Desi (second), Bites (soft ending).
   Usage: SDBSoundLogo.play(audioContext, destinationNode, startTime)
   Timing: Shuddh at +0s, Desi at +0.55s, Bites at +1.15s (show the logo here); rings out until about +4.1s. */
const SDBSoundLogo=(()=>{
  const LOGO_AT=1.15,LENGTH=4.2;
  function play(a,out,T){
    let nb=null;const noise=()=>{if(nb)return nb;const b=a.createBuffer(1,a.sampleRate,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return nb=b};
    const bus=a.createGain();bus.gain.value=.7;bus.connect(out);
    const mtof=m=>440*Math.pow(2,(m-69)/12);
    const env=(g,at,p,dec,att=.003)=>{g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(p,at+att);g.gain.exponentialRampToValueAtTime(.0001,at+att+dec)};
    const sine=(at,f,p,dec,type='sine')=>{const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;env(g,at,p,dec);o.connect(g).connect(bus);o.start(at);o.stop(at+dec+.05)};
    const nz=(at,type,f,p,dec,q=1)=>{const n=a.createBufferSource(),fl=a.createBiquadFilter(),g=a.createGain();n.buffer=noise();fl.type=type;fl.frequency.value=f;fl.Q.value=q;env(g,at,p,dec,.001);n.connect(fl).connect(g).connect(bus);n.start(at,Math.random()*.5);n.stop(at+dec+.05)};
    const SA=62;
    const na=(at,v=1)=>{const f=mtof(SA);[[1,.26,.5],[2,.12,.32],[3,.07,.2],[4.2,.03,.1]].forEach(([r,p,d])=>sine(at,f*r,p*v,d));nz(at,'bandpass',3200,.08*v,.025,3)};
    const tin=(at,v=1)=>{const f=mtof(SA);[[1,.16,.22],[2,.06,.14]].forEach(([r,p,d])=>sine(at,f*r,p*v,d));nz(at,'bandpass',2600,.05*v,.02,3)};
    const ge=(at,v=1,from=85,to=135,glide=.25,dec=.7)=>{const o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain(),g2=a.createGain();o.frequency.setValueAtTime(from,at);o.frequency.exponentialRampToValueAtTime(to,at+glide);o2.frequency.setValueAtTime(from*2,at);o2.frequency.exponentialRampToValueAtTime(to*2,at+glide);env(g,at,.45*v,dec);env(g2,at,.1*v,dec*.5);o.connect(g).connect(bus);o2.connect(g2).connect(bus);o.start(at);o2.start(at);o.stop(at+dec+.05);o2.stop(at+dec+.05);nz(at,'lowpass',400,.15*v,.04)};
    const dha=(at,v=1)=>{ge(at,v);na(at,v)};
    const piano=(at,m,v=1,dec=1.8)=>{const f=mtof(m);sine(at,f,.14*v,dec);sine(at,f*2,.05*v,dec*.6);sine(at,f*3,.02*v,dec*.35,'triangle');nz(at,'bandpass',f*4,.01*v,.02,2)};
    const bloom=(at,notes,len,v=1,peakAt=.55)=>{const f=a.createBiquadFilter(),g=a.createGain();f.type='lowpass';f.Q.value=.7;f.frequency.setValueAtTime(250,at);f.frequency.exponentialRampToValueAtTime(5200,at+len*peakAt);f.frequency.exponentialRampToValueAtTime(900,at+len);g.gain.setValueAtTime(.0001,at);g.gain.exponentialRampToValueAtTime(.05*v,at+len*peakAt);g.gain.exponentialRampToValueAtTime(.0001,at+len);f.connect(g).connect(bus);notes.forEach(m=>[-14,-5,5,14].forEach(c=>{const o=a.createOscillator();o.type='sawtooth';o.frequency.value=mtof(m);o.detune.value=c;o.connect(f);o.start(at);o.stop(at+len+.05)}))};
    const N=[62,69,74],t=[0,.55,1.15],acc=1.4,ring=2.9;
    dha(T+t[0],1.35);ge(T+t[0],.7,62,110,.35,1);piano(T+t[0],N[0],acc*1.15,1.2);piano(T+t[0],N[0]-12,1.1,1.2);piano(T+t[0],N[0]-24,.7,1.2);
    dha(T+t[1],.95);piano(T+t[1],N[1],acc*.85,1);piano(T+t[1],N[1]-12,.7,1);
    tin(T+t[2],.45);piano(T+t[2],N[2],.7,ring);[62,66,69].forEach(m=>piano(T+t[2],m,.35,ring));
    bloom(T+t[2],[50,57,62,66],ring+.1,.38,.3);
    return bus;
  }
  return {play,LOGO_AT,LENGTH};
})();
