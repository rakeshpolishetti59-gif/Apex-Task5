/**
 * AURA Web Audio Synthesizer Engine
 * Generates tactile sound effects purely using browser Native Web Audio API
 * Zero external audio files required, zero latency, 100% lightweight
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = localStorage.getItem('aura_sound_enabled') !== 'false'; // default enabled
  }

  init() {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('aura_sound_enabled', this.enabled);
    if (this.enabled) {
      this.playChime();
    }
    return this.enabled;
  }

  playTap() {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      // AudioContext not allowed or not supported
    }
  }

  playAddToCart() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.audioCtx.currentTime;
      
      // Dual-tone futuristic blip
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.06));
        
        gain.gain.setValueAtTime(0.09, now + (idx * 0.06));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.06) + 0.12);
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        osc.start(now + (idx * 0.06));
        osc.stop(now + (idx * 0.06) + 0.12);
      });
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      const now = this.audioCtx.currentTime;
      // Majestic chord progression for successful checkout
      const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio + high C
      chord.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + (idx * 0.08));
        
        gain.gain.setValueAtTime(0.12, now + (idx * 0.08));
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx * 0.08) + 0.35);
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        osc.start(now + (idx * 0.08));
        osc.stop(now + (idx * 0.08) + 0.35);
      });
    } catch (e) {}
  }

  playChime() {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.audioCtx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);
      
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {}
  }
}

const Sound = new SoundEngine();
