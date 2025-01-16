import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    }, 
},{
    timestamps: true    //we can see when the menu is created and updated
});


const Menu = mongoose.model('Menu', menuSchema);

export default Menu;