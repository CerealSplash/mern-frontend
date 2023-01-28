import React, { createContext } from "react";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { getAllPosts, createPost, deletePost, updatePost } from "../api/posts";

export const context = createContext();

export const PostContext = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getting = async () => {
      getPosts();
    };
    getting();
  }, []);

  const deleteOnePost = async (id) => {
    const res = await deletePost(id);
    console.log(res);
    setPosts(
      posts.filter((p) => {
        return p._id !== id;
      })
    );
  };

  const getPosts = async () => {
    const POSTS = await getAllPosts();
    setPosts(POSTS.data);
  };

  const makePost = async (newPost) => {
    const res = await createPost(newPost);
    console.log(res);
    setPosts([...posts, res.data]);
  };

  const updateOnePost = async (id, values) => {
    const res = await updatePost(id, values);
    console.log(res);
    if (res.status === 200) {
      setPosts(posts.map((post) => (post._id === id ? values : post)));
    }
    // setPosts.filter()
  };
  // console.log(posts)
  // getPosts()
  return (
    //De esta manera indicamos que todos los hijos anidados podran usar el context almacenado en este componente seleccionando qué funciones van a poder usar los hijos en value. En este caso estamos exportando un objeto
    <context.Provider
      value={{
        posts: posts,
        setPosts: setPosts,
        deleteOnePost: deleteOnePost,
        makePost: makePost,
        updateOnePost: updateOnePost,
      }}
    >
      {props.children}
    </context.Provider>
  );
};
