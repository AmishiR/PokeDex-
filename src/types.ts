export interface PokemonBase {
  name:string;
  url:string;
}

export interface PokemonType {
  slot:number;
  type:{
    name:string;
    url:string;
  };
}

export interface PokemonStat {
  base_stat:number;
  effort:number;
  stat:{
    name:string;
    url:string;
  };
}

export interface PokemonAbility {
  ability: {
    name:string;
    url:string;
  };
  is_hidden:boolean;
  slot:number;
}

export interface Pokemon {
  id:number;
  name: string;
  height:number;
  weight:number;
  types:PokemonType[];
  stats:PokemonStat[];
  abilities:PokemonAbility[];
  sprites: {
    front_default:string;
    other: {
      showdown: {
        front_default:string;
      };
      'official-artwork': {
        front_default:string;
      };
    };
  };
}

export interface TypeRes {
  name:string;
  url:string;
}
