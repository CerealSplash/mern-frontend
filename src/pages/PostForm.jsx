import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Stack,
} from "@mui/material";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { context } from "../context/PostContext";
import { useContext } from "react";
import * as Yup from "yup";
import { useState } from "react";
import RotateRightIcon from '@mui/icons-material/RotateRight';

export const PostForm = () => {
  // const { makePost } = useContext(context)
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  const { makePost } = useContext(context);

  // makePost({title: "test", description})

  //Yup se usa mucho en conjunto con formik ya que formik hace el tipado del formulario y Yup valida los datos ingresados en el form mediante el métoo object que recibe un objeto en el cual se indica lo que se va a validar siendo .string, .number, etc. y se le puede añadir también el required donde se inserta un mensaje hacía el usuario al no ser ingresado el valor esperado
  //También tiene la propiedad de .min(), .max(), .email("hshad") y muchas otras validaciones

  // console.log(post)

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
            // setPost(values);
            await makePost(values);
            actions.setSubmitting(false)
            navigate("/");
          }}
          // enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className="text-black">
              <div className="">
                <label
                  htmlFor="Title"
                  className="block mb-1 font-bold text-md text-gray-400"
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
                  component="textarea"
                  row={4}
                  name="description"
                  placeholder="Post Description"
                  className="px-3 py-2 focus:outline-none rounded bg-gray-400 w-80 m-auto h-32"
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
                  sx={{ margin: "auto auto" }}
                  variant="contained"
                  className="h-10"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 
                  <RotateRightIcon className="animate-spin" /> : 
                  "Save post" } 
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};