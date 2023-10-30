// @ts-nocheck
"use client";
import React from "react";
import NavbarAdmin from "@/src/components/navbarAdmin";
import Footer from "@/src/components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Handlee } from "next/font/google";
import { Link } from "react-router-dom";
import { useRouter } from "next/navigation";
import * as Routes from "../../../../routes";

interface PageProps {
  params: { id: string };
}

//Firebase image upload
import { firebaseStorageURL } from "../../../../../firebase/config";
import firebase_app from "../../../../../firebase/config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { text } from "stream/consumers";
import { set } from "firebase/database";

// Subir imagen a firestore
const storage = getStorage(firebase_app, firebaseStorageURL);

const ModifyContent = ({ params }: PageProps) => {
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [progressUpload, setProgressUpload] = useState(0);
  const [data, setData] = useState({});
  const router = useRouter();
  const [newImageURL, setNewImageURL] = useState();

  // datos utilizados para el formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [KeyWords, setKeyWords] = useState("");
  const [textoFormateado, setTextoFormateado] = useState("");
  const [KeyWordsBox, setKeyWordsBox] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");

  const [imageModified, setImageModified] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const requestData = { _id: params.id };
      console.log("Estos son los parametros:", params.id);
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getContent,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });
        setData(result.data);
        console.log("El data es el siguiente:", data);
        console.log(result);

        setTitle(result.data.title);
        setDescription(result.data.description);
        setKeyWords(result.data.tags);
        setImagenURL(result.data.imageId);
        setDownloadURL(result.data.imageId);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (KeyWords === "") return setTextoFormateado("");
    const formattedText = `#${KeyWords.join("#")}`;
    setTextoFormateado(formattedText);
  }, [KeyWords]);

  // const handleImageChange = (e) => {
  //   // Captura la imagen seleccionada por el usuario
  //   const selectedImage = e.target.files[0];
  //   setImagen(selectedImage);

  //   // Crea una URL de objeto para la vista previa de la imagen
  //   const imageURL = URL.createObjectURL(selectedImage);

  //   setImagen(selectedImage);
  //   setImagenURL(imageURL);
  // };

  const handleSelectedFile = (files: File[] | undefined) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
      console.log(files[0]);
      setImagen(files[0]);
      const imageURL = URL.createObjectURL(files[0]);
      console.log(imageURL);
      setImagenURL(imageURL);
      setImageModified(true);
    } else {
      MessageChannel.error("File size to large");
    }
  };

  async function handleUploadedFile() {
    if (imageModified) {
      console.log("handleUploadedFile");
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
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setImagenURL(url);
            setDownloadURL(url);
            setNewImageURL(url);

            console.log(url);
            return url;
          });
        }
      );
    } else {
    }
  }

  const SubmitData = async () => {
    console.log("SubmitData");
    // Arreglar
    if (title && description && KeyWords) {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const formatedDate = `${year}-${month}-${day}T00:00:00.000Z`;

      setKeyWordsBox(KeyWords);
      console.log("Key ", KeyWords);

      const regex = /#\w+/g;
      const matches = textoFormateado.match(regex);

      // if (imagen != null) {
      //   const newImageUrl = await handleUploadedFile();
      // }

      //let imageURLToUse = newImageURL || imagenURL;
      console.log("resultado");

      if (matches && matches.join("") === textoFormateado) {
        const valTags = matches.map((tag) => tag.replace("#", ""));

        const imageUrl = await handleUploadedFile();
        console.log("imagenURL", imageUrl);
        // console.log("newImageURL", newImageURL);

        const datos = {
          _id: params.id,
          title: title,
          description: description,
          date: formatedDate,
          imageId: imagenURL,
          categoryName: "terror", // Quemado
          tags: valTags,
        };

        console.log("Estos son los datos enviados:", datos);

        const fetchData = async () => {
          try {
            const result = await axios.request({
              method: "put",
              url: Routes.modifyContent,
              headers: { "Content-Type": "application/json" },
              data: datos,
            });
            console.log("fetch");
            console.log(result);
            router.push("/adminView/galleryAdmin");
          } catch (error) {
            console.error("Error al obtener datos:", error);
          }
        };

        fetchData();
      } else {
        alert("Los tags no siguen el formato correcto");
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const handleSubmit = async (e) => {
    console.log("Submit");
    e.preventDefault();

    if (imageModified) {
      handleUploadedFile();
    }

    await SubmitData();
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
                  Titulo:
                </label>
                <input
                  className="border rounded-full w-[350px] border-red-300 ml-2 p-2"
                  type="text"
                  id="contentName"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={textoFormateado}
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
                  type="button"
                  onClick={handleSubmit}
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

export default ModifyContent;
