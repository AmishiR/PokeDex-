"use client";
import {motion, AnimatePresence } from 'motion/react';
import {X, Heart,Ruler,Weight} from 'lucide-react';
import {Pokemon} from '../types';
import {cn} from '../lib/utils';

interface PokemonModalProps {
  pokemon:Pokemon | null;
  isFavorite:boolean;
  onToggleFavorite:(id: number) => void;
  onClose: ()=> void;
}

export default function PokemonModal({ pokemon, isFavorite, onToggleFavorite, onClose }: PokemonModalProps) {
  if (!pokemon) return null;

  const artworkUrl =pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  const animatedUrl =pokemon.sprites.other.showdown.front_default;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{opacity: 0, scale: 0.8, y: 50 }}
          animate={{opacity: 1, scale: 1, y: 0 }}
          exit={{opacity: 0, scale: 0.8, y: 50 }}
          onClick={(e) => e.stopPropagation()}
          className="theme-detail w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-white text-black p-2 text-center text-[10px] font-black uppercase tracking-widest border-b-2 border-black relative">
            Selected Unit: {pokemon.name}
            <button onClick={onClose} className="absolute right-2 top-1 text-black hover:text-red-500 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>


          <div className="flex-1 p-6 flex flex-col md:flex-row gap-6 overflow-y-auto">
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-full aspect-square bg-white border-2 border-black flex flex-col items-center justify-center p-4 relative">
                <img 
                  src={artworkUrl} 
                  alt={pokemon.name}
                  className="w-full h-full object-contain filter drop-shadow-lg rendering-pixelated"
                  referrerPolicy="no-referrer"
                />
                {animatedUrl &&(
                  <div className="absolute bottom-2 right-2 w-12 h-12 bg-slate-50 border border-black/10 p-1">
                    <img 
                      src={animatedUrl} 
                      alt={pokemon.name}
                      className="w-full h-full object-contain rendering-pixelated"
                      referrerPolicy="no-referrer"
                    /></div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white border-2 border-black p-2 text-center">
                  <span className="text-[8px] font-black block text-black uppercase">Height</span>
                  <span className="text-xs font-black text-black">{pokemon.height/10}M</span>
                </div>
                <div className="bg-white border-2 border-black p-2 text-center">
                  <span className="text-[8px] font-black block text-black uppercase">Weight</span>
                  <span className="text-xs font-black text-black">{pokemon.weight / 10}KG</span>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-black p-3">
                <p className="text-[9px] font-bold text-black uppercase underline mb-2">Primary Abilities:</p>
                <div className="flex flex-wrap gap-1">
                  {pokemon.abilities.map((a) => (
                    <span key={a.ability.name} className="bg-white border border-black px-2 py-0.5 text-[8px] font-black text-black uppercase">
                      {a.ability.name.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side*/}
            <div className="flex-1 flex flex-col gap-4">
              <div className="space-y-3">
                <h3 className="text-[10px] font-black text-black uppercase border-b-2 border-black pb-1">Performance Data</h3>
                {pokemon.stats.map((s) => (
                  <div key={s.stat.name} className="flex flex-col gap-1">
                    <div className="flex justify-between items-end">
                      <span className="text-[9px] font-black text-black uppercase">{s.stat.name.replace('-', ' ')}</span>
                      <span className="text-xs font-black text-black">{s.base_stat}</span>
                    </div>
                    <div className="w-full h-4 bg-slate-200 border-2 border-black overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((s.base_stat / 200) * 100, 100)}%` }}
                        className={cn(
                          "h-full transition-colors",
                          s.base_stat > 100 ? 'bg-green-500' : s.base_stat > 60 ? 'bg-orange-500' : 'bg-red-500'
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onToggleFavorite(pokemon.id)}
                className={cn(
                  "mt-auto w-full py-4 text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all",
                  isFavorite ? "bg-red-600" : "bg-blue-600"
                )}
              >
                {isFavorite ? "Remove from Favorites" : "Favorite This Unit"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
