"use client";
import React from "react";
import Navbar2 from "@/src/components/navbar2";
import Footer from "@/src/components/footer";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Handlee } from "next/font/google";
import { Link } from "react-router-dom";
import * as Routes from "../routes";

//Firebase image upload
import { firebaseStorageURL } from "../../firebase/config";
import firebase_app from "../../firebase/config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// Subir imagen a firestore
const storage = getStorage(firebase_app, firebaseStorageURL);

// Crea el nombre unico para cada imagen
function createUniqueFileName(getFile: { name: string }): string {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
}

async function helperForUploadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `proyecto/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}
//  ==========================================================================
const AddProduct = () => {
  // Subir imagen a firestore
  async function handleImage(event) {
    console.log(event.targe.files);
    const extractImageUrl = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );
    console.log(extractImageUrl);
  }

  const [imageSrc, setImageSrc] = useState("");

  // datos utilizados para el formulario
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");
  const [cuantity, setCuantity] = useState(0);

  const handleImageChange = (e) => {
    // Captura la imagen seleccionada por el usuario
    const selectedImage = e.target.files[0];
    setImagen(selectedImage);

    // Crea una URL de objeto para la vista previa de la imagen
    const imageURL = URL.createObjectURL(selectedImage);

    setImagen(selectedImage);
    setImagenURL(imageURL);
  };

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

      // Construye los datos para enviar a la API
      const datos = {
        name: name,
        description: description,
        cuantityAvailable: parseInt(cuantity),
        imageId: "imagen",
        price: parseInt(price),
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
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar2 />
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
                onChange={handleImageChange}
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
            <div>
              <input
                accept="image/"
                max="100000"
                type="file"
                onChange={handleImage}
              ></input>
            </div>
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
                  <a href="/store" title="tienda">
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
