import { useMusic } from './MusicContext';
import { XIcon } from './MusicIcons';
import Scribble from '../Scribble';
import { vars } from '../../lib';

/** "put a record on?" sticky note. Saying yes is the click that lets the audio start. */
export default function MusicPopup() {
  const { showPopup, dismissPopup, playMusic } = useMusic();

  if (!showPopup) return null;

  return (
    <div className="inview fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="music-title">
      <div className="a-fade absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={dismissPopup} aria-hidden="true" />

      <div className="a-drop sway relative w-full max-w-sm bg-[#F6E7A6] p-8 pt-10 text-[#2D2A24] shadow-2xl" style={vars({ r: -2 })}>
        <span className="tape a-tape" aria-hidden="true" />
        <span className="a-pop absolute -left-5 -top-5" style={vars({ base: 500 })}>
          <Scribble type="star" color="#FB8500" className="h-10 w-10 animate-wiggle" />
        </span>

        <button onClick={dismissPopup} className="absolute right-3 top-3 p-2 opacity-60 transition-opacity hover:opacity-100" aria-label="Close">
          <XIcon className="h-5 w-5" />
        </button>

        <h2 id="music-title" className="a-write -rotate-2 font-marker text-3xl" style={vars({ base: 400 })}>
          put a record on?
        </h2>
        <p className="mt-3 font-hand text-2xl leading-snug">
          this sketchbook reads better with a little music.
          <br />
          <span className="text-xl opacity-70">(you can stop it anytime, bottom left)</span>
        </p>

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => {
              playMusic();
              dismissPopup();
            }}
            className="border border-[#2D2A24] bg-[#2D2A24] px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-[#F6E7A6] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFB703] hover:text-[#2D2A24] hover:shadow-lg"
          >
            yes please ♪
          </button>
          <button onClick={dismissPopup} className="font-hand text-2xl underline decoration-dashed underline-offset-4 opacity-80 hover:opacity-100">
            maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
