"use client";
import { useState } from 'react';

export function useFavorites(){
  const [favorites,setFavorites]=useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved=localStorage.getItem('pokedex_favs');
      return saved ? JSON.parse(saved) :[];
    }
    return [];
  });

  const toggleFavorite=(id: number) =>{
    setFavorites((prev) =>{
      const isFav=prev.includes(id);
      const next=isFav ? prev.filter((f)=>f!== id) : [...prev, id];
      localStorage.setItem('pokedex_favs', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite=(id: number)=>favorites.includes(id);

  return { favorites, toggleFavorite, isFavorite };
}