import axios from 'axios';

const Backend_url = 'http://localhost:4000/soil'

const postSoil = async (name, color, characteristics, suitable_crops, distributor,token)=>{
    try{
        const response = await axios.post(`${Backend_url}/postsoil`, {name, color, characteristics, suitable_crops, distributor},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        return error;
    }
}

const getSoils = async (tok)=>{
    try{
        const response = await axios.get(`${Backend_url}/getall`, {
            headers: {
                Authorization: `Bearer ${tok}`
            }
        });
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        return error;
    }
}

export {postSoil, getSoils};