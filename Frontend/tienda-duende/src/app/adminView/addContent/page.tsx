// @ts-nocheck
"use client";
import React from "react";
import NavbarAdmin from "@/src/components/navbarAdmin";
import Footer from "@/src/components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { set } from "firebase/database";
import * as Routes from "../../routes";
import { useRouter } from "next/navigation";

//Firebase image upload
import { firebaseStorageURL } from "../../../firebase/config";
import firebase_app from "../../../firebase/config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// Subir imagen a firestore
const storage = getStorage(firebase_app, firebaseStorageURL);

const AddContent = () => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  // datos utilizados para el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");
  const router = useRouter();

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
      console.log(files[0]);
      setImagen(files[0]);
      const imageURL = URL.createObjectURL(files[0]);
      console.log(imageURL);
      setImagenURL(imageURL);
    } else {
      MessageChannel.error("File size to large");
    }
  };

  // const handleImageChange = (e) => {
  //   // Captura la imagen seleccionada por el usuario
  //   const selectedImage = e.target.files[0];
  //   setImagen(selectedImage);

  //   // Crea una URL de objeto para la vista previa de la imagen
  //   const imageURL = URL.createObjectURL(selectedImage);

  //   setImagen(selectedImage);
  //   setImagenURL(imageURL);
  // };

  async function handleUploadedFile() {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `image/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          message.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url);
            console.log(url);
            return url;
          });
        }
      );
    } else {
      message.error("File not found");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && description && keyWords && imagen) {
      // formar la fecha
      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formatedDate = `${year}-${month}-${day}T00:00:00.000Z`;

      // validar los tags
      const regex = /#\w+/g; // Modificamos el regex para que coincida con una sola etiqueta a la vez.
      const matches = keyWords.match(regex);

      if (matches && matches.join("") === keyWords) {
        const valTags = matches.map((tag) => tag.replace("#", "")); // Elimina el "#" de cada etiqueta.

        // Crear el objeto de datos
        const datos = {
          title: name,
          description: description,
          date: formatedDate,
          imageId: downloadURL,
          categoryName: "terror",
          tags: valTags,
        };

        const imageUrl = await handleUploadedFile();

        // Enviar datos al backend
        const fetchData = async () => {
          try {
            const result = await axios.request({
              method: "post",
              url: Routes.addContent,
              headers: { "Content-Type": "application/json" },
              data: datos,
            });
            console.log(result);
            router.push("/adminView/galleryAdmin");
          } catch (error) {
            console.error("Error al obtener datos:", error);
          }
        };
        // enviar datos
        fetchData();
      } else {
        alert("Los tags no siguen el formato correcto");
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarAdmin />
        <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
      </header>
      <main className="flex-grow">
        <div className="flex h-full justify-center items-top">
          {/* Columna izquierda con la imagen */}
          <div className=" flex justify-center items-center w-1/3 p-2 mr-4 border">
            <div>
              <input
                type="file"
                id="imagen"
                name="imagen"
                className="w-full p-2 border rounded mb-5 mt-5"
                accept="image/*"
                onChange={(files) => handleSelectedFile(files.target.files)}
              />
              {imagenURL && (
                <div>
                  <img
                    src={imagenURL}
                    alt="Vista previa de la imagen"
                    className="max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha con el título y descripción */}
          <div className="w-1/3 p-5 ml-4 text-yellow-900 flex flex-col justify-top">
            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <label htmlFor="contentName" className="font-semibold">
                  Nombre:
                </label>
                <input
                  className="border rounded-full w-[350px] border-red-300 ml-2 p-2"
                  type="text"
                  id="contentName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contentDescription" className="font-semibold">
                  Descripcion:
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="w-full p-2 border rounded border-red-300 mt-5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="precioProducto" className="font-semibold">
                  Palabras clave:
                </label>
                <textarea
                  id="clave"
                  name="clave"
                  rows="4"
                  placeholder="Ingrese los tags en formato: #tag#tag#tag"
                  className="w-full p-2 border rounded border-red-300 mb-5 mt-5"
                  value={keyWords}
                  onChange={(e) => setKeyWords(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-center mb-5">
                <button
                  type="submit"
                  className="bg-gray-100 text-red-400 border border-red-300 rounded-full px-3 py-2 mr-4 hover:bg-gray-200 w-full"
                >
                  +Agregar Categoria
                </button>
                <button
                  type="submit"
                  className="bg-gray-100 text-red-400 border border-red-300 rounded-full px-3 py-2 mr-4 hover:bg-gray-200 w-full"
                >
                  +Agregar subcategoria
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-[150px] bg-red-400 text-white rounded-full px-3 py-2 mr-4 "
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="w-[150px] bg-red-400 text-white rounded-full px-3 py-2"
                >
                  <a href="/adminView/galleryAdmin" title="galeria">
                    Cancelar
                  </a>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AddContent;
