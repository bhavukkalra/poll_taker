// Shared logic that can be used in multiple components
// similar to redux => as it is shared state


import axios from 'axios'



const setToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
};


// if not using proxy write full path(base = http://localhost:4000/api/auth/login)
// @method : GET, POST etc
//@path : 
const call = async (method, path, data) => {
    const response = await axios[method](`http://localhost:4000/api/${path}`, data);
    return response.data;
};

export default { call,setToken };

