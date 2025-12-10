//!lets go!!
import Shop from '../models/Shop.js'

// ! ceate new shop from the models/shop/.js??

export const createShop = async  (req , resp) =>{
    try {
        const {name , location} = req.body;
        const shop = await Shop.create({name, location});
        resp.status(201).json(shop);
        
    } catch (error) {
        resp.status(500).json({message :`${error.message}  error in shop.controller.js`});
    }
}

    //get all shops -> -. ->
    export const getShops  = async (req, resp) =>{
        try {
            const shops = await Shop.find()
        return resp.status(200).json(shops);

        } catch (error) {
        return resp.status(500).json({message :`${error.message} error in geTShops`})
        }
    }

