"use client";
import { useState, useEffect, useMemo } from 'react';
import type { Pokemon, PokemonBase, TypeRes } from '../types';

export function usePokemon(page: number, search: string, selectedType: string) {
  const limit=20;
  const [allPokemon,setAllPokemon]=useState<PokemonBase[]>([]);
  const [types,setTypes]=useState<TypeRes[]>([]);
  const [typePokemon,setTypePokemon]=useState<Set<string>|null>(null);
  const [pokemonDetails,setPokemonDetails]=useState<Pokemon[]>([]);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);

  // Fetch list of types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pokeRes,typeRes] = await Promise.all([
          fetch('https://pokeapi.co/api/v2/pokemon?limit=1300').then((r) => r.json()),
          fetch('https://pokeapi.co/api/v2/type').then((r) => r.json()),
        ]);
        setAllPokemon(pokeRes.results);
        setTypes(typeRes.results);
      } catch (err) {
        setError('Failed to load initial data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedType) {
      setTypePokemon(null);
      return;
    }

    const fetchTypeData = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`).then((r) => r.json());
        const names = new Set(res.pokemon.map((p: any) => p.pokemon.name));
        setTypePokemon(names as Set<string>);
      } catch (err) {
        setError('Failed to filter by type');
      }
    };
    fetchTypeData();
  }, [selectedType]);



  //Paginate
  const filteredList=useMemo(() => {
    let list = allPokemon;

    if (typePokemon) {
      list = list.filter((p) => typePokemon.has(p.name));
    }

    if (search) {
      list = list.filter((p) => p.name.includes(search.toLowerCase()));
    }

    return list;
  }, [allPokemon, search, typePokemon]);

  const paginatedList=useMemo(() => {
    const start=(page-1)*limit;
    return filteredList.slice(start,start+limit);
  }, [filteredList, page]);

  const totalPages=Math.ceil(filteredList.length/limit);

  


  useEffect(() => {
    if (paginatedList.length===0) {
      setPokemonDetails([]);
      setIsLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        const details = await Promise.all(
          paginatedList.map((p) => fetch(p.url).then((r) => r.json()))
        );
        setPokemonDetails(details);
      } catch (err) {
        setError('Failed to load page details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [paginatedList]);

  return {
    pokemon: pokemonDetails,
    types,
    totalPages,
    isLoading,
    error,
  };
}