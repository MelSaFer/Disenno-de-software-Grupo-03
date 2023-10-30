// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import * as Routes from "../src/app/routes";

const Filters = () => {

  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubs, setSelectedSubs] = useState({});
  // Estado de categorías seleccionadas 
  const [selectedCats, setSelectedCats] = useState([]); 

  let queryParams;

  function handleClick(checkbox) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      // Delete the filter from query
      queryParams.delete(checkbox.name);
    } else {
      // Set filter in the query
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
      } else {
        queryParams.append(checkbox.name, checkbox.value);
      }
    }
    const path = window.location.pathname + "?" + queryParams.toString();
    router.push(path);
  }

  const [selected, setSelected] = useState({});

  function handleChange(e) {
  
    const value = e.target.value;
    const category = categories.find(cat => cat.name === value);

    /*
    if(!e.target.checked) {
      setSubcategories([]); 
    }
    */

    if(category) {
      setSubcategories(category.subcategories);
    }

    // Copiar estado existente 
    let updated = {...selected};  
  
    if(e.target.checked) {
      // Agregar valor al objeto
      updated[value] = true;
    } else {
      // Eliminar valor del objeto 
      delete updated[value];
    }

    if(!e.target.checked && Object.keys(selected).length === 1) {
      // Limpiar estado
      setSelected({});
      setSubcategories([]);
    }
  
    // Actualizar estado
    setSelected(updated);
  }

  function handleSubChange(e) {

    // Obtener nombre de la subcategoría
    const subName = e.target.value;
  
    // Copiar estado existente
    let updated = {...selectedSubs};
  
    if(e.target.checked) {
      // Agregar subcategoría al estado  
      updated[subName] = true;
    } else {
      // Eliminar subcategoría del estado
      delete updated[subName];
    }
  
    // Actualizar estado de subcategorías seleccionadas
    setSelectedSubs(updated);
  }

  useEffect(() => {
    console.log("Estas son las sub seleccionadas:", selectedSubs);
  }, [selectedSubs]);


  useEffect(() => {
    fetchCategories();
  }, [])
  
  const fetchCategories = async () => {
    try {
      const res = await axios.post(Routes.getCategories);
      setCategories(res.data);
      console.log("estos son los datos de toda esta vara: ",res.data)
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  }


  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Categorias</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat._id}>
              <input
                type="checkbox" 
                value={cat.categoryName}
                checked={selected[cat.Categoryname]}
                onChange={handleChange}
              />
              <span style={{paddingLeft:'5px'}}>{cat.categoryName}</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <h3 className="font-semibold mb-2">Subcategorias</h3>
        <div>
          {Object.keys(selected).map(categoryName => {
            const category = categories.find(cat => cat.categoryName === categoryName);
            console.log("Esto es lo que quiero vara:", category)
            const subs = category.subcategories;
             return (
               <>      
                 <h4 className="text-center" style={{marginTop:'5px'}}>{categoryName}</h4> 
                 <ul>
                   {subs.map(sub => (
                     <li key={sub}>
                       <input
                         type="checkbox"
                         value={sub}
                         onChange={handleSubChange}
                         className="mx-5" 
                       />
                       <span style={{paddingLeft:'5px'}}>{sub}</span>
                     </li>
                   ))}  
                 </ul>
                 {Object.keys(selected).length > 1 && <hr/>}
               </>
             );
          })}
        </div>
      </div>
    </aside>
  )
};

export default Filters;

/*
const result = await axios.request({
          method: "post",
          url: Routes.getContent,
          headers: { "Content-Type": "application/json" },
          data: requestData,
        });

router.post("/getFilteredContent", galeryController.getFilteredContent);
router.post("/getFilteredSubcategory", galeryController.getFilteredSubcontent);
*/