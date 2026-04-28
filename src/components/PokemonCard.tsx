"use client";
import {motion} from 'motion/react';
import {Heart} from 'lucide-react';
import type {Pokemon} from '../types';
import {cn} from '../lib/utils';

interface PokemonCardProps {
  pokemon:Pokemon;
  isFavorite:boolean;
  onToggleFavorite:(id:number)=>void;
  onClick:()=>void;
}

export default function PokemonCard({ pokemon, isFavorite, onToggleFavorite, onClick }: PokemonCardProps) {
  const spriteUrl=pokemon.sprites.other.showdown.front_default || 
                    pokemon.sprites.other['official-artwork'].front_default ||
                    pokemon.sprites.front_default;

  const handleFavoriteClick=(e:React.MouseEvent)=>{
    e.stopPropagation();
    onToggleFavorite(pokemon.id);
  };

  return (
    <motion.div
      whileHover={{ scale:1.05, y:-5 }}
      whileTap={{ scale:0.95 }}
      onClick={onClick}
      className="theme-card cursor-pointer relative flex flex-col items-center group transition-all"
    >
      <button 
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-10 p-2 hover:scale-110 transition-transform"
      >
        <Heart 
          className={cn(
            "w-5 h-5 transition-colors",
            isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-300 group-hover:text-slate-400'
          )} 
        />
      </button>

      <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-400">
        #{String(pokemon.id).padStart(3, '0')}
      </span>

      <div className="w-full aspect-square bg-slate-100 border-2 border-black mb-4 flex items-center justify-center group-hover:bg-yellow-50 transition-colors px-4 overflow-hidden relative">
        <motion.img 
          src={spriteUrl} 
          alt={pokemon.name} 
          animate={{ 
            y:[0, -4, 0],
          }}
          transition={{
            duration:2,
            repeat:Infinity,
            ease:"easeInOut"
          }}
          className="max-h-full max-w-full rendering-pixelated drop-shadow-md z-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-2 w-12 h-2 bg-black/10 rounded-full blur-[2px]" />
      </div>

      <h2 className="text-black text-sm font-black uppercase mb-3 tracking-tighter">
        {pokemon.name}
      </h2>

      <div className="flex gap-2 w-full justify-center flex-wrap pb-2">
        {pokemon.types.map((t)=>(
          <span 
            key={t.type.name} 
            className={cn(
              "px-2 py-0.5 border-2 border-black text-[8px] font-black uppercase text-white",
              t.type.name==='fire' ? 'bg-orange-500' :
              t.type.name==='water' ? 'bg-blue-500' :
              t.type.name==='grass' ? 'bg-green-500' :
              t.type.name==='electric' ? 'bg-yellow-400 !text-black' :
              t.type.name==='ghost' ? 'bg-purple-600' :
              t.type.name==='psychic' ? 'bg-pink-400' :
              'bg-slate-500'
            )}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}