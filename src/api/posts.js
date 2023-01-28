import axios from 'axios'
import { Form } from 'formik';

export const getAllPosts = async ()=>{
    const res = await axios.get(`${import.meta.env.VITE_URI_API}/posts`);

    return res
}

export const createPost = async (toSend)=> {

    const form = new FormData();

    //Con este fragmento de código transformamos la data de un json a un formulario

    for (let key in toSend){
        form.append(key, toSend[key])
    }

    return await axios.post(`${import.meta.env.VITE_URI_API}/posts`, form, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deletePost = async (id) => await axios.delete(`${import.meta.env.VITE_URI_API}/posts/${id}`)

export const updatePost = async (id, values)=> {
    
    const form = new FormData();


    for (let key in values){
        form.append(key, values[key])
    }

    return await axios.put(`${import.meta.env.VITE_URI_API}/posts/${id}`, form)
}

export const getOnePost = async (id) => await axios.get(`${import.meta.env.VITE_URI_API}/posts/${id}`)