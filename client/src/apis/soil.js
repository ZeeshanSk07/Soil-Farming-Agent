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
        return response;
    }catch(error){
        console.log(error);
        return error;
    }
}

const DeleteSoil = async(id, token) =>{
    try{
        const response = await axios.delete(`${Backend_url}/deletesoil/${id}`, {
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

const editSoil = async(id, characteristics, suitable_crops, distributor,token) =>{
    try{
        console.log(id, characteristics, suitable_crops, distributor,token);
        const response = await axios.put(`${Backend_url}/updatesoil/${id}`, { characteristics, suitable_crops, distributor},{
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

export {postSoil, getSoils, DeleteSoil, editSoil};