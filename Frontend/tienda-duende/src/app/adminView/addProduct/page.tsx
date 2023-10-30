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
import * as Routes from "../../routes";

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

//  ==========================================================================
const AddProduct = () => {
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const router = useRouter();

  // datos utilizados para el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");
  const [cuantity, setCuantity] = useState(0);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);
      console.log(files[0]);
      setImagen(files[0]);
      const imageURL = URL.createObjectURL(files[0]);
      setImagenURL(imageURL);
    } else {
      MessageChannel.error("File size to large");
    }
  };

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

    if (name && description && price && imagen && cuantity) {
      if (price <= 0) {
        alert("El precio debe ser mayor a 0");
        return;
      }
      if (cuantity <= 0) {
        alert("La cantidad debe ser mayor a 0");
        return;
      }
      const imageUrl = await handleUploadedFile();

      // Construye los datos para enviar a la API
      const datos = {
        name: name,
        description: description,
        cuantityAvailable: parseInt(cuantity),
        imageId: downloadURL,
        price: parseFloat(price),
      };
      console.log(datos);

      // Sube imagen y forma url

      const fetchData = async () => {
        try {
          const result = await axios.request({
            method: "post",
            url: Routes.addProduct,
            headers: { "Content-Type": "application/json" },
            data: datos,
          });
          console.log("fetch");
          console.log(result);
          router.push("/adminView/storeAdmin");
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const handleRemoveFile = () => setImageFile(undefined);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarAdmin />
        <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
      </header>
      <main className="flex-grow">
        <div className="flex h-full justify-center items-top">
          {/* Columna izquierda con la imagen */}
          <div className=" flex flex-col justify-center items-center w-1/3 p-2 mr-4 border">
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
            {/* <div>
              <button onClick={handleUploadedFile}>Upload</button>
            </div> */}
          </div>

          {/* Columna derecha con el título y descripción */}
          <div className="w-1/3 p-5 ml-4 text-yellow-900 flex flex-col justify-top">
            <form onSubmit={handleSubmit}>
              <div className="mb-10">
                <label htmlFor="nameProducto" className="font-semibold">
                  Nombre:
                </label>
                <input
                  className="border rounded-full w-[350px] border-red-300 ml-2 p-2"
                  type="text"
                  id="productName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-10">
                <label htmlFor="productDescription" className="font-semibold">
                  Descripcion:
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="w-full p-2 border rounded border-red-300 mb-5 mt-5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="productCuantity" className="font-semibold">
                  Cantidad:
                </label>
                <input
                  className="border rounded-full w-[70px] border-red-300 ml-2 p-2"
                  type="number"
                  id="productCuantity"
                  value={cuantity}
                  onChange={(e) => setCuantity(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="productPrice" className="font-semibold">
                  Precio:
                </label>
                <input
                  className="border rounded-full w-[80px] border-red-300 ml-2 p-2"
                  type="number"
                  id="productPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-red-400 text-white rounded-full px-3 py-2 mr-4"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="bg-red-400 text-white rounded-full px-3 py-2"
                >
                  <a href="/adminView/storeAdmin" title="tienda">
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

export default AddProduct;
