import axios from 'axios';

const Backend_url = 'https://soil-farming-agent-pxaa.onrender.com/user'

const register = async (name, email, password) =>{
    try{
        const response = await axios.post(`${Backend_url}/signup`, {name, email, password});
        console.log(response);
        const { token } = response.data;
        localStorage.setItem("token", token);
        return response;
    }catch(error){
        console.log(error);
        if (error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
          } else {
            console.error(error);
            throw new Error("An error occurred while registering.");
        }
    }
}

const login = async (email, password) =>{
    try{
        const response = await axios.post(`${Backend_url}/login`, {email, password});
        const { token } = response.data;
        localStorage.setItem("token", token);
        return response;
    }catch(err){
        if(err.response && err.response.status === 400){
            throw new Error(err.response.data.message);
        } else {
            console.error(err);
            throw new Error("An error occurred while logging in.");
        }
    }
}

const adminlogin = async (username, password) =>{
    try{
        const response = await axios.post(`${Backend_url}/admin`, {username, password});
        const { token } = response.data;
        localStorage.setItem("token", token);
        return response;
    }catch(err){
        console.log(err);
        return err;
    }
}

const updAdmin = async(user,updusername, newpassword, token) => {
    try{
        console.log(user, updusername, newpassword, token);
        const response = await axios.put(`${Backend_url}/admin/${user}`, {updusername, newpassword}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        return response;
    }catch(err){
        console.log(err);
        return err;
    }
}

export {register, login, adminlogin, updAdmin};