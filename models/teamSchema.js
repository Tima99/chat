
import mongoose from "mongoose"

const Schema = mongoose.Schema

const teamSchema = new Schema({
    admin      : {type : String , required : true , unique : true},
    captain    : {type : String , required : true , unique : true},
    teamname   : {type : String , required : true },
    teamid     : {type : String , required : true , unique : true},
    sports     : {type : String , required : true},
    homeground : {type : String , required : true},
    password   : {type : String , required : true},
    joinlink   : {type : String , required : true , unique : true},
    joinlimit  : {type : Number , default  : 15},
    matches    : {
                       total : { type : Number , default : 0},
                       wins  : { type : Number , default : 0},
                 }, 
    players    : [{
                       email : { type : String , unique : true },
                       type  : { type : String , default : "All-Rounder"}
                 }],
               
} , {timestamps : true})

export default mongoose.model('Team' , teamSchema , 'teams')
