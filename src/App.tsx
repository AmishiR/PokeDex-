"use client";
import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Loader2 } from 'lucide-react';

import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';

import './App.css';

import { usePokemon } from './hooks/usePokemon';
import { useFavorites } from './hooks/useFavorites';
import PokemonCard from './components/PokemonCard';
import {Pokemon} from './types';

function App() {

  const [count,setCount]=useState(0);

  const [page,setPage]=useState(1);
  const [search,setSearch]=useState("");
  const [selectedType,setSelectedType]=useState("");
  const [selectedPokemon,setSelectedPokemon]=useState<Pokemon|null>(null);

  const { pokemon,types,totalPages,isLoading,error }=
    usePokemon(page,search,selectedType);

  const { isFavorite,toggleFavorite }=useFavorites();

  return (
    <>
      {/* Hero Section (kept from Vite template) */}
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>

        <div>
          <h1>Pokedex</h1>
          <p>Search and explore Pokémon</p>
        </div>

        <button
          type="button"
          className="counter"
          onClick={()=>setCount((count)=>count+1)}
        >
          Count is {count}
        </button>
      </section>

      {/* Search + Filter */}
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Pokemon..."
              value={search}
              onChange={(e)=>{ setSearch(e.target.value); setPage(1); }}
              className="w-full border-2 border-black p-3 pl-10"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e)=>{ setSelectedType(e.target.value); setPage(1); }}
            className="border-2 border-black p-3"
          >
            <option value="">All Types</option>
            {types.map((t)=>(
              <option key={t.name} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {pokemon.map((p)=>(
              <PokemonCard
                key={p.id}
                pokemon={p}
                isFavorite={isFavorite(p.id)}
                onToggleFavorite={toggleFavorite}
                onClick={()=>setSelectedPokemon(p)}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page===1}
            onClick={()=>setPage(p=>p-1)}
            className="px-4 py-2 bg-red-600 text-white disabled:opacity-40"
          >
            Previous
          </button>

          <span>{page} / {totalPages}</span>

          <button
            disabled={page>=totalPages}
            onClick={()=>setPage(p=>p+1)}
            className="px-4 py-2 bg-red-600 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* Footer sections (kept) */}
      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
        </div>

        <div id="social">
          <h2>Connect</h2>
          <p>Explore community</p>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;