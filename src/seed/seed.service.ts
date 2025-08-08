import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,

  ){};

  
  // Metodo para insertar pokemosn de pruebas
  async executeSeed() {

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    //const insertPromisesArray: Promise<any>[]= [];

    await this.pokemonService.removeAll(); //Borra todo
    
    //cInserta de uno en uno
    data.results.forEach( ( { name, url } )  => {

      const segmentos = url.split('/');
      const no = +segmentos[ segmentos.length - 2 ];

      //insertPromisesArray.push( this.pokemonService.create({ no, name }) );

      this.pokemonService.create({ no, name });

    });

    
    //await Promise.all(  insertPromisesArray  );


    return 'Seed ejecutado';
  }

}
