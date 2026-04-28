import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { time } from "console";
import e from "express";
import { UserRole } from "../interfaces/user.interface";
import { Document } from 'mongoose';


@Schema({timestamps:true})
export class User extends Document  { //doc extend karam mongoose behaivor hambewenawa save,update......etc

    @Prop({required:true})
    email:string;

    @Prop({required:true})
    password_hash:string;

    @Prop({default:false})
    is_verified:Boolean;

    @Prop({required:true})
    role:UserRole;

}

export const UserSchema = SchemaFactory.createForClass(User);



