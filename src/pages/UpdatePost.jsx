import { Button, Stack } from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { context } from "../context/PostContext";
import { getOnePost } from "../api/posts";
import { useState, useEffect } from "react";
import RotateRightIcon from '@mui/icons-material/RotateRight';

export const UpdatePost = (props) => {
  console.log(props);

  const navigate = useNavigate();

  const { updateOnePost } = useContext(context);

  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  const update = async () => {
    const res = await getOnePost(props.id);
    setPost( {title: res.data.title, description: res.data.description} );
  };

  useEffect(() => {
    const up = async () => {
      await update();
    };
    up();
  }, []);

  console.log(post);

  return (
    <div className="flex items-center justify-center m-20">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <Formik
          validationSchema={Yup.object({
            title: Yup.string().required("Title required"),
            description: Yup.string().required("Description required"),
          })}
          initialValues={post}
          onSubmit={async (values, actions) => {
            await updateOnePost(props.id, values);
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, isSubmitting, setFieldValue }) => (
            <Form onSubmit={handleSubmit} className="text-black">
              <div className="m-auto">
                <label
                  htmlFor="Title"
                  className="block mb-1 font-bold text-md text-gray-400 "
                >
                  Title
                </label>
                <Field
                  name="title"
                  placeholder="Post Title"
                  className="px-3 py-2 focus:outline-none rounded bg-gray-400 w-80 m-auto color-black"
                />
                <ErrorMessage
                  component="p"
                  className="text-red-400 m-auto text-sm"
                  name="title"
                />
              </div>

              <div className="mb-5 mt-5">
                <label
                  htmlFor="description"
                  className="block mb-1 font-bold text-md text-gray-400"
                >
                  Description
                </label>
                <Field
                  name="description"
                  placeholder="Post Description"
                  className="px-3 py-2 focus:outline-none rounded bg-gray-400 w-80 m-auto h-32"
                  component="textarea"
                  rows={3}
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-400 m-auto text-sm"
                />
              </div>
              <label
                htmlFor="image"
                className="block mb-1 font-bold text-md text-gray-400"
              >
                Image
              </label>

              <div className="text-black-400 bg-gray-400 rounded-md p-1">
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    setFieldValue("image", e.target.files[0]);
                  }}
                  className="rounded-md"
                />
              </div>
              <div className="m-auto flex gap-1 mt-5">
                <Link to="/" className="m-auto">
                  <Button variant="contained" color="error">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  sx={{ maxWidth: "150px", margin: "0 auto" }}
                  variant="contained"
                >
                  {isSubmitting ? (
                    <RotateRightIcon className="animate-spin" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
