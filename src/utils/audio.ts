/**
 * Web Audio API synthesizer for the cozy lofi ambient music
 * Plays smooth electric piano Rhodes chords with subtle tape warmth,
 * like cozy background music.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private chordIndex: number = 0;
  private masterGain: GainNode | null = null;

  // Lofi chords progression: Fmaj7 -> Em7 -> Dm7 -> Cmaj7
  private chords: number[][] = [
    // Fmaj7: F3, A3, C4, E4
    [174.61, 220.00, 261.63, 329.63],
    // Em7: E3, G3, B3, D4
    [164.81, 196.00, 246.94, 293.66],
    // Dm7: D3, F3, A3, C4
    [146.83, 174.61, 220.00, 261.63],
    // Cmaj7: C3, E3, G3, B3
    [130.81, 164.81, 196.00, 246.94]
  ];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playChord() {
    if (!this.ctx || !this.isPlaying || !this.masterGain) return;

    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const duration = 3.6;

    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft warm Rhodes tone
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.04); // subtle human strum

      // Warm low-pass filter for lofi chill vibe
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(350, now + duration);

      // Envelope: gentle attack and long smooth release
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.08 / (i + 1), now + 0.15);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now + i * 0.04);
      osc.stop(now + duration + 0.1);
    });
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initCtx();
    this.isPlaying = true;
    this.chordIndex = 0;
    this.playChord();

    if (this.timer) clearInterval(this.timer);
    this.timer = window.setInterval(() => {
      if (this.isPlaying) {
        this.playChord();
      }
    }, 3800);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext may be restricted before interaction
    }
  }

  public playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // AudioContext may be restricted before interaction
    }
  }
}

export const soundEngine = new SoundEngine();
