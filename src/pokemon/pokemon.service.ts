import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { skip } from 'node:test';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private default_limit: number;

  constructor(

    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService

  ) {
    this.default_limit = configService.get<number>('default_limit') || 10;
    
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {

      const pokemon = await this.pokemonModel.create( createPokemonDto ) ;
      return pokemon;

    } catch (error) {

      this.handleExceptions(error);
    }

  }

  async findAll( paginationDto: PaginationDto ) {
    
    const { limit = this.default_limit, offset = 0 } = paginationDto;
    
    return this.pokemonModel.find()
          .limit(limit)
          .skip(offset)
          .sort({  no: 1 })
          .select('--__v')
          ;

  }

  async findOne(term: string) {
    
    let pokemon: Pokemon | null = null;

    // Buscar por número (no)
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne( { no: term } );
    }

    // Buscar por MongoID (_id)
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Buscar por MongoID (_id)
    if (!pokemon ) {
      pokemon = await this.pokemonModel.findOne( { name: term });
    }

    
    if (!pokemon) {
      throw new NotFoundException(`No se encontró un Pokémon con el identificador "${term}"`);
    }

    return pokemon;

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    
    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    }

    try{

      await pokemon.updateOne( updatePokemonDto, { new: true } );
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error){

      this.handleExceptions(error);
    }

  }

  async remove(id: string) {

    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    // const result = await this.pokemonModel.findByIdAndDelete(id);
    
    const { acknowledged, deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if ( deletedCount === 0 ) {
      throw new BadRequestException(` Pokemon con id ${ id } no existe.`);
    }

    return;
    
  }


  async removeAll() {
    await this.pokemonModel.deleteMany({});
    return;
  }

  private handleExceptions( error: any ) {
    console.log(error);

    if ( error.code === 11000 ){
      throw new BadRequestException(`Pokecon existe en db ${ JSON.stringify( error.keyValue ) }`);
    }

    throw new InternalServerErrorException('No se pudo crear el pokemon - verifique el logs');    
  }


}
