import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Pokemon extends Document {

    // id: string // mongo de forma automatica

    @Prop({
        unique: true,
        index: true,
    })
    name: string; 


    @Prop({
        unique: true,
        index: true,
    })
    no:string;

}


export const PokemonSchema = SchemaFactory.createForClass( Pokemon );