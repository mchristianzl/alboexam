import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import db from '../database/db';
require('dotenv').config();
const md5 = require('md5');

const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : ""; 

interface Character {
    id: Number,
    name: String
}

interface Creator {
    name: String,
    role: String
}

const getColaborators = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.params.name;
    let results: any;

    try {
        results = await db.getCharacter(name);
    } catch (error) {
        console.log(error);
    }

    let id;
    if (results.length > 0) {
        id = results[0].ID;
    } else {
        return res.status(200).json({
            message: `No data found`, 
            data: []
        });
    }

    let ts = new Date().getTime();
    let hash = md5(ts + privateKey + publicKey);
    let args = {
        params: { 
            apikey: publicKey, 
            ts: ts,
            hash: hash
        },
        headers: {
            //"If-None-Match": "TODO",
            "accept": "*/*" 
        }
    };

    let result: AxiosResponse;
    try {
        result = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id}/comics`, args);    
    } catch (error) {
        return res.status(200).json({
            message: `Error: No se obtuvo información del servidor para los parametros`
        });
    }

    let comics = result.data.data.results;
    //let editors: Creator[] = new Array;
    //let writers: Creator[] = new Array;
    //let colorists: Creator[] = new Array;

    let editors: String[] = new Array;
    let writers: String[] = new Array;
    let colorists: String[] = new Array;

    comics.forEach((comic: any) => {
        //comic.creators.items;

        if (comic.creators.available > 0) {
            comic.creators.items.forEach((creator: {name: String; role: String;}) => {

                if (creator.role == "editor") {

                    editors.push(creator.name);

                } else if (creator.role == "writer") {
                    writers.push(creator.name);

                } else if (creator.role == "colorist") {
                    colorists.push(creator.name);
                }
                
            });
        }
        
    });
    
    return res.status(200).json({
        last_sync: ts, 
        data: {
            editors: editors,
            writers: writers,
            colorists: colorists 
        }, 
    });
};


const getCharacters = async (req: Request, res: Response, next: NextFunction) => {
    let name: string = req.params.name;
    let results: any;

    try {
        results = await db.getCharacter(name);
    } catch (error) {
        console.log(error);
    }

    let id;
    if (results.length > 0) {
        id = results[0].ID;
    } else {
        return res.status(200).json({
            message: `No data found`, 
            data: []
        });
    }

    let ts = new Date().getTime();
    let hash = md5(ts + privateKey + publicKey);
    let args = {
        params: { 
            apikey: publicKey, 
            ts: ts,
            hash: hash
        },
        headers: {
            "accept": "*/*" 
        }
    };

    let result: AxiosResponse;
    try {
        let url = `http://gateway.marvel.com/v1/public/characters/${id}/comics`;
        console.log('url' , url);   
        result = await axios.get(url, args);    
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            message: `Error: No se obtuvo información del servidor para los parametros`
        });
    }

    let datas = result.data.data.results;
    
    let response: Object[] = new Array;

    datas.forEach((data: any) => {

        let character;
        if (data.characters.available > 0) {
            data.characters.items.forEach((item: {name: String}) => {
                character = item.name;
            });
        }

        let stories = new Array;
        if (data.stories.available > 0) {
            data.stories.items.forEach((story: {name: String}) => {
                stories.push(story.name);
            });
        } 
        response.push({
            character: character,
            comics: stories
        });
    });
    
    return res.status(200).json({
        last_sync: ts, 
        characters: response
    });
};

export default {getColaborators, getCharacters};