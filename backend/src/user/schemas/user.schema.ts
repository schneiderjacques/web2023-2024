import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      if (ret._id) {
        ret.id = ret._id.toString(); // Convertir l'ID en chaîne et l'ajouter comme propriété "id"
        delete ret._id;
      }
    },
    
  },
  versionKey: false
})

export class User{

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: mongoose.Types.ObjectId;
  

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true,
      })
    mail: string;

    @Prop({
        type: String,
        required: true,
        trim: true,

      })
      pseudo: string;

    @Prop({
        type: Boolean,
        default: false,
      })
    isMailConfirmed: boolean;

    @Prop({
        type: String,
        required: true,
      })
      password: string;


}



export const UserSchema = SchemaFactory.createForClass(User);
