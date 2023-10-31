// @ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Navigation from "../../components/Navbar";
import Navbar2 from "@/src/components/navbar2";
import axios from "axios";
import * as Routes from "../../routes";
import { auth } from "../../../firebase/config";
import { useRouter } from "next/navigation";

//Firebase image upload
import { firebaseStorageURL } from "../../../firebase/config";
import firebase_app from "../../../firebase/config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

// Subir imagen a firestore
const storage = getStorage(firebase_app, firebaseStorageURL);

const ShippingInfo = () => {
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");
  const [direccion, setDireccion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenURL, setImagenURL] = useState("");

  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [costoTotal, setCostoTotal] = useState(0);
  const [costoEnvio, setCostoEnvio] = useState(10);
  const [costoTotalFinal, setCostoTotalFinal] = useState(0);
  const router = useRouter();

  const [authUser, setAuthUser] = useState({ uid: "", email: "" });

  // obtains the user's uid and email
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser({ uid: user.uid, email: user.email });
        console.log(`El UID del usuario es ${user.uid} ${user.email}`);
      } else {
        console.log("No hay usuario iniciado sesión");
      }
    }, []);

    // Detener la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  /*
  receives the data of the products in the cart and calculates the total cost of the purchase
  */
  useEffect(() => {
    const fetchData = async () => {
      const requestData = { userId: authUser.uid }; // cambiar por el userId del usuario logueado
      // obtains the products in the cart
      try {
        const result = await axios.request({
          method: "post",
          url: Routes.getCart,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });

        // function to obtain additional data from each product
        function fetchProductData(product) {
          // make a request to the server to obtain the additional data
          return axios
            .post(Routes.getProductByName, { name: product.name })
            .then((response) => {
              // process the response
              const productData = response.data;

              // add the additional data to the product object
              product.additionalData = productData;

              return product;
            })
            .catch((error) => {
              console.error(
                `Error al obtener datos para ${product.name}: ${error.message}`
              );
              return product; // in case of error, return the product without additional data
            });
        }

        Promise.all(result.data.map(fetchProductData))
          .then((updatedData) => {
            // console.log(updatedData);
          })
          .catch((err) => {
            console.error(`Error en Promise.all: ${err}`);
          })
          .finally(() => {
            setLoading(false);
            setProducts(
              result.data.map((product) => ({
                ...product,
                productId: product.additionalData.productId, // Lleva la propiedad _id al primer nivel
              }))
            );
            calcularCostoTotal(result.data);
          });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [authUser.uid]);

  console.log(products);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (provincia && canton && distrito && direccion && imagen) {
      // Construye los datos para enviar a la API
      const datos = { provincia, canton, distrito, direccion, imagen };

      const imageUrl = await handleUploadedFile();

      // formar la fecha
      const date = new Date();

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const formatedDate = `${year}-${month}-${day}`;

      // Construye los datos para enviar a la API
      const data = {
        purchaseDetails: "Compra",
        products: products,
        voucherId: downloadURL,
        aproxDeliveryDate: formatedDate,
        shippingAddress: `${provincia}, ${canton}, ${distrito}, ${direccion}`,
        shippingPrice: costoTotalFinal,
        userId: authUser.uid,
        state: "PENDING",
      };
      console.log(data);

      // Sube imagen y forma url

      const fetchData = async () => {
        try {
          const result = await axios.request({
            method: "post",
            url: Routes.makePurchase,
            headers: { "Content-Type": "application/json" },
            data: data,
          });
          console.log("fetch");
          console.log(result);
          router.push("/userView/store");
        } catch (error) {
          console.error("Error al obtener datos:", error);
        }
      };
      fetchData();
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };

  const handleImageChange = (e) => {
    // Captura la imagen seleccionada por el usuario
    const selectedImage = e.target.files[0];
    setImagen(selectedImage);

    // Crea una URL de objeto para la vista previa de la imagen
    const imageURL = URL.createObjectURL(selectedImage);

    setImagen(selectedImage);
    setImagenURL(imageURL);
  };

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

          // setProgressUpload(progress); // to show progress upload

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

  function calcularCostoTotal(data) {
    let total = 0;
    for (const product of data) {
      const ProductCost = product.quantity * product.additionalData.price;
      total += ProductCost;
    }
    // return costoTotal;
    setCostoTotal(total);
    setCostoTotalFinal(total + costoEnvio);
  }

  async function deleteImageFromStorage() {
    // Parsea el enlace para obtener la referencia al objeto en Storage
    const imageURL =
      "https://firebasestorage.googleapis.com/v0/b/proyectodisenno-7d92d.appspot.com/o/image%2Fgato.jpg?alt=media&token=3cfbe4d0-ef4f-4910-b5ea-35c6a9ed6d7b";
    try {
      // Crea un objeto URL a partir del URL proporcionado
      const url = new URL(imageURL);

      // Obtiene la parte del pathname que contiene el nombre del archivo
      const pathname = url.pathname;

      // Decodifica la parte del pathname y quita la parte "image/" del principio del nombre del archivo
      const decodedFileName = decodeURIComponent(
        pathname.substring(pathname.lastIndexOf("/") + 1)
      ).replace(/^image\//, "");

      console.log(
        'Nombre del archivo de imagen sin "image/":',
        decodedFileName
      );

      console.log("Nombre del archivo de imagen:", decodedFileName);
      // Genera una referencia al objeto en Storage
      const storageRef = ref(storage, `image/${decodedFileName}`); // Ruta completa al objeto

      // Elimina el objeto de Storage
      await deleteObject(storageRef);
      console.log("Imagen eliminada con éxito.");
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  }

  return (
    <div>
      {/* Navbar component */}
      {/* <header className="bg-green-200 py-5 mb-6"></header> */}
      <div className="">
        <Navbar2 />

        {/* Page heading */}
        <hr className="border border-red-400 w-5/6 mx-auto my-4"></hr>
        <div className="flex justify-center items-center mb-3 ">
          <h1 className="font-bold text-black text-3xl">FINALIZAR COMPRA</h1>
        </div>

        {/* Page content */}
        <div className="flex justify-center items-start">
          {/* Left column */}
          <div className="w-1/4 p-4">
            <div className="bg-gray-50 p-4 border ">
              <h2 className="text-lg font-semibold text-black mb-8">
                Detalles de facturación
              </h2>

              {/* ============================Provincia============================================= */}
              <form className="text-black" onSubmit={handleSubmit}>
                <label htmlFor="provincia">
                  Provincia<a className="text-red-600">*</a>
                </label>
                <input
                  type="text"
                  id="provincia"
                  name="provincia"
                  className="w-full p-2 border rounded mb-5 mt-5"
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                />
                {/* ============================Canton============================================= */}
                <label htmlFor="campo1">
                  Cantón<a className="text-red-600">*</a>
                </label>
                <input
                  type="text"
                  id="campo1"
                  name="campo1"
                  className="w-full p-2 border rounded mb-5 mt-5"
                  value={canton}
                  onChange={(e) => setCanton(e.target.value)}
                />
                {/* ============================Distrito============================================= */}
                <label htmlFor="campo1">
                  Distrito<a className="text-red-600">*</a>
                </label>
                <input
                  type="text"
                  id="campo1"
                  name="campo1"
                  className="w-full p-2 border rounded mb-5 mt-5"
                  value={distrito}
                  onChange={(e) => setDistrito(e.target.value)}
                />
                {/* ============================Direccion============================================= */}
                <label htmlFor="campo2">
                  Dirección exacta<a className="text-red-600">*</a>
                </label>
                <textarea
                  id="campo2"
                  name="campo2"
                  rows="4"
                  className="w-full p-2 border rounded mb-5 mt-5"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                />
                {/* ============================Imagen============================================= */}
                <label htmlFor="imagen">Subir imagen de comprobante</label>
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
              </form>
            </div>
          </div>

          {/* Right column */}
          <div className="w-2/4 p-4">
            <div className="bg-white p-4 border ">
              <h2 className="text-lg font-semibold text-black">Tu pedido</h2>
              {/* internal columns */}
              <div className="flex text-black">
                {/* left column */}
                <div className="w-2/3 p-2">
                  <div className="flex flex-col">
                    <p className="font-bold text-2xl">Producto</p>
                    <div className=" ">
                      <div className="p-2 justify-start items-start">
                        <div className=" font-bold">
                          <ul className=" list-none font-light">
                            {products.map((product) => (
                              <li key={product.name}>
                                - {product.name}{" "}
                                <span className="font-bold">
                                  [{product.quantity}]
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* <div className="w-1/3">
                        <div className="w-1/2 p-2 font-bold">
                          <p>x4</p>
                          <p>x3</p>
                          <p>x1</p>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                {/* right column */}
                <div className="w-1/3 p-2">
                  <p className="font-bold text-2xl">Subtotal</p>
                  <div className="flex text-black p-2">
                    <ul className=" list-none font-light">
                      {products.map((product) => (
                        <li key={product.name}>
                          ${product.quantity * product.additionalData.price}{" "}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="border-t my-4" /> {/* Línea divisora horizontal */}
              {/* Pricing */}
              <div className="flex text-black">
                {/* left column */}
                <div className="flex flex-col justify-center items-end w-1/2 p-2 font-bold">
                  <p>Subtotal</p>
                  <p>Envío</p>
                  <p className="text-red-400">Total</p>
                </div>
                {/* right column */}
                <div className="w-1/2 p-2">
                  <p>${costoTotal}</p>
                  <p>${costoEnvio}</p>
                  <p>${costoTotalFinal}</p>
                </div>
              </div>
              {/* send button */}
              <button
                type="submit"
                className="bg-white hover:bg-gray-50 text-red-400 font-semibold rounded-full border border-red-400 px-4 py-2 mt-5 w-full"
                onClick={handleSubmit}
              >
                Realizar pedido
              </button>
              <button onClick={deleteImageFromStorage}>eliminar</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ShippingInfo;
