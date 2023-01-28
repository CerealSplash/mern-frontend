import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  SliderTrack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { context } from "./context/PostContext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { toast } from "react-hot-toast";
import "./styles/main.css"

export const Home = () => {
  const { posts, deleteOnePost } = useContext(context);

  console.log(import.meta.env.VITE_URI_API);

  const confirmDelete = (post) => {
    toast(
      (t) => {
        return (
          <Stack spacing={2}>
            <Typography component="p" sx={{ color: "#ccc" }}>
              Delete this post?
            </Typography>
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                deleteOnePost(post);
                toast.dismiss();
                toast.success("Post deleted succesfully!");
              }}
            >
              YES
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => {
                toast.dismiss();
              }}
            >
              NO
            </Button>
          </Stack>
        );
      },
      {
        style: {
          background: "#505050",
        },
      }
    );
  };

  if (posts.length === 0) {
    return (
      <Stack spacing={2} sx={{ marginTop: "10vh", justifyItems: "center" }}>
        <Stack sx={{ margin: "0 auto" }}>
          <Typography variant="h4">
            There are no posts yet, ¡Add One!
          </Typography>
          <Stack sx={{ margin: "0 auto" }}>
            <Link to="/new-post">
              <Button sx={{ width: "80px" }}>
                <AddBoxIcon sx={{ fontSize: "60px" }} color="error" />
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Grid
      container
      my={5}
      justifyContent="space-evenly"
      sx={{ textAlign: "center" }}
      alignItems="center"
    >
      <Grid item  md={12} sm={12} sx={12} className="pepe"><Typography variant="h3">Total posts: ({posts.length})</Typography></Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Link to="/new-post" className="">
          <Button size="large" className="">
            <AddBoxIcon sx={{ fontSize: "60px" }} color="error" />
          </Button>
        </Link>
      </Grid>
      {posts.map((post) => {
        return !post.image ? (
          <Grid
            item
            key={post._id}
            className="px-2 py-2"
            sm={3}
            md={3}
            lg={3}
            xl={3}
            sx={{
              backgroundColor: "#505050",
              // border: "red solid 3px",
              minWidth: "min-content",
              margin: "1em 0",
              borderRadius: "5px",
            }}
          >
            <Card sx={{ backgroundColor: "#606060", color: "#ccc" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom >
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "20px" }}>
                  {post.description}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Stack sx={{ margin: "0 auto" }} direction="row" spacing={2}>
                    <Link to={`/update/${post._id}`}><Button color="success" variant="contained" size="small">
                      <EditIcon />
                    </Button></Link>
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        confirmDelete(post._id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <Grid
            item
            key={post._id}
            className="px-2 py-2"
            sx={{
              backgroundColor: "#505050",
              // border: "red solid 3px",
              minWidth: "min-content",
              margin: "1em 0",
              borderRadius: "5px",
            }}
          >
            <Card sx={{ backgroundColor: "#606060", color: "#ccc" }}>
              <CardMedia
                component="img"
                image={post.image.url}
                sx={{
                  width: "20vw",
                  height: "auto",
                  padding: "2px",
                  minWidth: "200px",
                  margin: "0 auto",
                }}
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "20px" }}>
                  {post.description}
                </Typography>
                <Stack>
                  <Stack spacing={2} sx={{ margin: "0 auto" }} direction="row">
                    <Link to={`/update/${post._id}`}>
                    <Button color="success" variant="contained" size="small">
                      <EditIcon />
                    </Button></Link>
                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={() => {
                        confirmDelete(post._id);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
