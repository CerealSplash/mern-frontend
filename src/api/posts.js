import axios from 'axios'
import { Form } from 'formik';

export const getAllPosts = async ()=>{
    const res = await axios.get("http://localhost:3000/posts");

    return res
}

export const createPost = async (toSend)=> {

    const form = new FormData();

    //Con este fragmento de código transformamos la data de un json a un formulario

    for (let key in toSend){
        form.append(key, toSend[key])
    }

    return await axios.post("http://localhost:3000/posts", form, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deletePost = async (id) => await axios.delete(`http://localhost:3000/posts/${id}`)

export const updatePost = async (id, values)=> {
    
    const form = new FormData();


    for (let key in values){
        form.append(key, values[key])
    }

    return await axios.put(`http://localhost:3000/posts/${id}`, form)
}

export const getOnePost = async (id) => await axios.get(`http://localhost:3000/posts/${id}`)