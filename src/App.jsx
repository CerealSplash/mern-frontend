import { useContext, useEffect, useState } from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import { PostContext } from "./context/PostContext";
import { NotFound } from "./pages/NotFound";
import { PostForm } from "./pages/PostForm";
import { Toaster } from "react-hot-toast";
import { Home } from "./Home";
import { context } from "./context/PostContext";
import { UpdatePost } from "./pages/UpdatePost";

import { getAllPosts } from "./api/posts";
import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

function App() {
  const [count, setCount] = useState(0);
  console.log("Cereal");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getting = async () => {
      getPosts();
    };
    getting();
  }, []);

  const getPosts = async () => {
    const POSTS = await getAllPosts();
    setPosts(POSTS.data);
  };

  return (
    <>
      <PostContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-post" element={<PostForm />} />
          <Route path="*" element={<NotFound />} />
          {posts.map((post) => {
            return (
              <Route
                path={`/update/${post._id}`}
                element={<UpdatePost id={post._id} />}
                key={post._id}
              />
            );
          })}
        </Routes>
        <Toaster />
      </PostContext>
      <footer>
        <Stack className="justify-center ">
          <ButtonGroup variant="text" className="m-auto mb-5 gap-1">
            <a target="_blank" href="https://www.linkedin.com/in/monje-l%C3%B3pez-miguel-ernesto-a9104423a/">
            <Button><LinkedInIcon fontSize="large" /></Button>
            </a>
            <a href="https://github.com/CerealSplash" target="_blank" ><Button><GitHubIcon fontSize="large" /></Button></a>
            <Typography component="div" variant="p"><EmailIcon fontSize="large" />monlodev@gmail.com</Typography>
          </ButtonGroup>
        </Stack>
      </footer>
    </>
  );
}

export default App;
