"use client";
import {useState} from 'react';
import {motion,AnimatePresence} from 'motion/react';
import {Search,Filter,Loader2,LogIn,LogOut,Github,User,Eye} from 'lucide-react';
import {usePokemon} from './hooks/usePokemon';
import {useFavorites} from './hooks/useFavorites';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import {Pokemon} from './types';
import {cn} from './lib/utils';
import {useAuth,useClerk,SignOutButton} from '@clerk/react';

export default function App(){
  const [page,setPage]=useState(1);
  const [search,setSearch]=useState("");
  const [selectedType,setSelectedType]=useState("");
  const [selectedPokemon,setSelectedPokemon]=useState<Pokemon|null>(null);
  const [viewedPokemon,setViewedPokemon]=useState<Pokemon[]>([]);
  const {userId}=useAuth();
  const {openSignIn}=useClerk();

  const handlePokemonClick=(pokemon:Pokemon)=>{
    setSelectedPokemon(pokemon);
    if(!viewedPokemon.find(p=>p.id===pokemon.id)){
      setViewedPokemon(prev=>[pokemon,...prev].slice(0,10));
    }
  };

  const {pokemon,types,totalPages,isLoading,error}=usePokemon(page,search,selectedType);
  const {isFavorite,toggleFavorite}=useFavorites();

  const handleSearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearch(e.target.value);
    setPage(1);
  };

  const handleTypeChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    setSelectedType(e.target.value);
    setPage(1);
  };

  return(
    <div className="min-h-screen p-4 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="theme-header flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-400 rounded-full border-4 border-white shadow-inner flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
          </div>
          <h1 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
            Pokedex: Showdown Edition
          </h1>
        </div>

        {userId?(
          <SignOutButton signOutCallback={()=>window.location.reload()}>
            <button
              className={cn(
                "flex items-center gap-2 px-4 py-2 border-4 border-black font-black uppercase text-xs transition-all active:shadow-none active:translate-x-1 active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                "bg-white text-black"
              )}
            >
              <LogOut className="w-4 h-4"/>
              <span>Sign Out</span>
            </button>
          </SignOutButton>
        ):(
          <button
            onClick={()=>openSignIn({mode:'redirect'})}
            className={cn(
              "flex items-center gap-2 px-4 py-2 border-4 border-black font-black uppercase text-xs transition-all active:shadow-none active:translate-x-1 active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
              "bg-yellow-400 text-black"
            )}
          >
            <Github className="w-4 h-4"/>
            <span>Trainer Login</span>
          </button>
        )}
      </header>

      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        {/* Aside / Filters */}
        <aside className="lg:w-80 flex flex-col gap-6">
          <div className="theme-panel flex flex-col gap-4">
            <label className="text-[10px] font-black text-black uppercase tracking-widest">Quick Search</label>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"/>
              <input
                type="text"
                placeholder="POKEMON NAME..."
                value={search}
                onChange={handleSearchChange}
                className="w-full bg-slate-100 border-2 border-black p-3 pl-10 text-xs text-black font-bold focus:outline-none focus:bg-yellow-50"
              />
            </div>
            
            <label className="text-[10px] font-black text-black uppercase tracking-widest mt-2">Elemental Filter</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"/>
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full bg-slate-100 border-2 border-black p-3 pl-10 text-xs text-black font-bold focus:outline-none appearance-none uppercase"
              >
                <option value="">ALL TYPES</option>
                {types.map((t)=>(
                  <option key={t.name} value={t.name}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="theme-aside flex-1 min-h-[200px] relative overflow-hidden hidden lg:block">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 border-8 border-blue-500 rounded-full opacity-30"></div>
            <h3 className="text-white font-black italic uppercase text-lg leading-tight mb-4 tracking-tighter">Trainer Stats</h3>
            <div className="text-[10px] space-y-3 font-bold text-blue-100 uppercase">
              <div className="flex justify-between border-b-2 border-blue-400/50 pb-1">
                <span>RECORDS FOUND</span>
                <span className="text-white">{pokemon.length}</span>
              </div>
              <div className="flex justify-between border-b-2 border-blue-400/50 pb-1">
                <span>DATA STREAM</span>
                <span className="text-white">ACTIVE</span>
              </div>
              <div className="flex justify-between border-b-2 border-blue-400/50 pb-1">
                <span>REGION</span>
                <span className="text-white">KANTO-HQ</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-blue-300"/>
                <h4 className="text-white font-black italic uppercase text-xs tracking-tighter">Viewing History</h4>
              </div>
              {viewedPokemon.length>0?(
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {viewedPokemon.map((p)=>(
                    <button
                      key={p.id}
                      onClick={()=>handlePokemonClick(p)}
                      className="w-full text-left text-[9px] font-bold text-blue-200 uppercase bg-blue-900/30 border border-blue-400/30 px-2 py-1 rounded hover:bg-blue-800/50 transition-colors truncate block"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              ):(
                <p className="text-[9px] text-blue-400/60 italic">No Pokemon viewed yet</p>
              )}
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 flex flex-col gap-6 pb-24">
          {error&&(
            <div className="p-4 bg-red-100 border-4 border-red-600 text-red-600 font-bold text-center text-xs uppercase">
              CRITICAL ERROR: {error}
            </div>
          )}

          <AnimatePresence mode="wait">
            {isLoading?(
              <motion.div 
                key="loader"
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                className="flex flex-col items-center justify-center py-40 gap-4 bg-white/5 border-4 border-dashed border-black/20"
              >
                <Loader2 className="w-12 h-12 animate-spin text-red-600"/>
                <p className="text-[#eee] font-black italic uppercase text-xs tracking-widest animate-pulse">Syncing Database...</p>
              </motion.div>
            ):(
              <motion.div 
                key="grid"
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                className="flex flex-col gap-8"
              >
                {pokemon.length>0?(
                  <>
                    <motion.div 
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                      initial="hidden"
                      animate="show"
                      variants={{
                        hidden:{opacity:0},
                        show:{
                          opacity:1,
                          transition:{
                            staggerChildren:0.05
                          }
                        }
                      }}
                    >
                      {pokemon.map((p)=>(
                        <motion.div
                          key={p.id}
                          variants={{
                            hidden:{opacity:0,scale:0.8,y:20},
                            show:{opacity:1,scale:1,y:0}
                          }}
                        >
                          <PokemonCard
                            pokemon={p}
                            isFavorite={isFavorite(p.id)}
                            onToggleFavorite={toggleFavorite}
                            onClick={()=>handlePokemonClick(p)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Pagination */}
                    <footer className="flex flex-col sm:flex-row justify-between items-center bg-black p-3 border-4 border-red-600 gap-4 mt-auto">
                      <button 
                        disabled={page===1} 
                        onClick={()=>setPage(p=>p-1)}
                        className="w-full sm:w-auto px-8 py-2 bg-red-600 text-white font-black text-xs uppercase hover:bg-red-500 active:translate-y-0.5 transition-all disabled:opacity-40"
                      >
                        Previous Page
                      </button>
                      
                      <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                        Unit {page} // {totalPages}
                      </span>

                      <button 
                        disabled={page>=totalPages} 
                        onClick={()=>setPage(p=>p+1)}
                        className="w-full sm:w-auto px-8 py-2 bg-red-600 text-white font-black text-xs uppercase hover:bg-red-500 active:translate-y-0.5 transition-all disabled:opacity-40"
                      >
                        Next Page
                      </button>
                    </footer>
                  </>
                ):(
                  <div className="py-40 text-center theme-panel bg-white/5 border-dashed">
                    <Search className="w-16 h-16 mx-auto text-white/20 mb-4"/>
                    <p className="text-white/40 font-black italic uppercase tracking-tighter">No Units Detected</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <PokemonModal
        pokemon={selectedPokemon}
        isFavorite={selectedPokemon?isFavorite(selectedPokemon.id):false}
        onToggleFavorite={toggleFavorite}
        onClose={()=>setSelectedPokemon(null)}
      />

    </div>
  );
}