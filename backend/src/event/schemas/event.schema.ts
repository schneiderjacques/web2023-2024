import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EventDocument = Event & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: (doc: any, ret: any) => {
      // delete obsolete data
      delete ret._id;
    },
  },
  versionKey: false,
})


export class Event {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  userId: mongoose.Schema.Types.ObjectId;
   
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: Date,
    required: true,
  })
  date_created: string;

  @Prop({
    type: Date,
    required: true,
  })
  date_updated: string;

  @Prop({
    type: Date,
    required: true,
  })
  date: string;

  @Prop(
    raw({
        city: {
            type: String,
            required: true,
            trim: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
        street: {
            type: String,
            required: true,
            trim: true,
        },
        locationDetails: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    }),
  )
  location: any;

  @Prop({
    type: String,
    trim: true,
  })
  description: string;

  @Prop({
    type: String,
  })
  start_time: string;

  @Prop({
    type: String,
    trim: true,
  })
  color: string;

  @Prop({
    type: String,
    trim: true,
  })
  type: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);




