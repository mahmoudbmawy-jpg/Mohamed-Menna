class CinematicAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;
  private intervalId: NodeJS.Timeout | null = null;
  private targetVolume: number = 0.25;

  constructor() {
    if (typeof window !== "undefined") {
      const savedMute = localStorage.getItem("mohamed_menna_music_muted");
      if (savedMute === "true") {
        this.isMuted = true;
      }
    }
  }

  public init(customUrl?: string, volume = 0.25) {
    this.targetVolume = volume;
    if (typeof window === "undefined") return;

    if (customUrl) {
      this.audioElement = new Audio(customUrl);
      this.audioElement.loop = true;
      this.audioElement.volume = this.isMuted ? 0 : this.targetVolume;
      this.audioElement.crossOrigin = "anonymous";
    }

    // Handle visibility change to save resources/battery
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (this.audioElement && this.isPlaying) {
          this.audioElement.pause();
        }
      } else {
        if (this.audioElement && this.isPlaying && !this.isMuted) {
          this.audioElement.play().catch(() => {});
        }
      }
    });
  }

  public async play() {
    this.isPlaying = true;
    if (this.isMuted) return;

    // Try HTML Audio element first
    if (this.audioElement) {
      try {
        this.audioElement.volume = 0;
        await this.audioElement.play();
        this.fadeInAudioElement();
        return;
      } catch (e) {
        console.warn("Audio element playback failed, falling back to Web Audio ambient generator:", e);
      }
    }

    // Fallback to Web Audio procedural romantic synth
    this.startProceduralAmbient();
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.5);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("mohamed_menna_music_muted", this.isMuted ? "true" : "false");
    }

    if (this.isMuted) {
      if (this.audioElement) this.audioElement.volume = 0;
      if (this.masterGain && this.audioCtx) {
        this.masterGain.gain.linearRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.3);
      }
    } else {
      if (this.audioElement) {
        this.fadeInAudioElement();
      } else if (!this.audioCtx) {
        this.startProceduralAmbient();
      } else if (this.masterGain) {
        this.masterGain.gain.linearRampToValueAtTime(this.targetVolume, this.audioCtx.currentTime + 0.8);
      }
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying && !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private fadeInAudioElement() {
    if (!this.audioElement || this.isMuted) return;
    let vol = 0;
    this.audioElement.volume = 0;
    const interval = setInterval(() => {
      vol += 0.02;
      if (vol >= this.targetVolume) {
        vol = this.targetVolume;
        clearInterval(interval);
      }
      if (this.audioElement) this.audioElement.volume = vol;
    }, 100);
  }

  // Generates a soft cinematic ambient chord progression (warm analog pad + subtle romantic chime)
  private startProceduralAmbient() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(this.targetVolume * 0.4, this.audioCtx.currentTime + 2.0);
      this.masterGain.connect(this.audioCtx.destination);

      // Warm chord notes (F, A, C, E, G in Hz)
      const chordPitches = [174.61, 220.0, 261.63, 329.63, 392.0];
      chordPitches.forEach((freq) => {
        if (!this.audioCtx || !this.masterGain) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
      });

      // Gentle random piano-like chime notes
      const melodyPitches = [349.23, 392.0, 440.0, 523.25, 659.25, 783.99];
      this.intervalId = setInterval(() => {
        if (!this.audioCtx || !this.masterGain || this.isMuted || !this.isPlaying) return;
        const note = melodyPitches[Math.floor(Math.random() * melodyPitches.length)];
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(note, this.audioCtx.currentTime);

        noteGain.gain.setValueAtTime(0.0001, this.audioCtx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.04, this.audioCtx.currentTime + 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 2.5);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 2.6);
      }, 2400);
    } catch (e) {
      console.warn("Procedural soundscape initialisation notice:", e);
    }
  }
}

export const audioEngine = new CinematicAudioEngine();
