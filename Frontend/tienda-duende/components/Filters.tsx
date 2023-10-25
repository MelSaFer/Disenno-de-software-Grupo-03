// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Filters = () => {

  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
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
    fetchCategories();
  }, [])
  
  const fetchCategories = async () => {
    const res = await fetch('https://mocki.io/v1/9d5299ba-9de8-4386-a06a-0cf43b229d3c');
    setCategories(await res.json());
  }

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Categorias</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>
              <input
                type="checkbox" 
                value={cat.name}
                checked={selected[cat.name]}
                onChange={handleChange}
              />
              <span style={{paddingLeft:'5px'}}>{cat.name}</span>
            </li>
          ))}
        </ul>
        <hr className="my-4" />
        <h3 className="font-semibold mb-2">Subcategorias</h3>
        <div>
          {Object.keys(selected).map(catName => {
            const cat = categories.find(c => c.name === catName);
            const subs = cat.subcategories;
             return (
               <>      
                 <h4 className="text-center" style={{marginTop:'5px'}}>{catName}</h4> 
                 <ul>
                   {subs.map(sub => (
                     <li key={sub.name}>
                       <input
                         type="checkbox"
                         value={sub.name}
                         onChange={handleSubChange}
                         className="mx-5" 
                       />
                       <span style={{paddingLeft:'5px'}}>{sub.name}</span>
                     </li>
                   ))}  
                 </ul>
                 {Object.keys(selected).length > 1 && <hr/>}
               </>
             )
          })}
        </div>
      </div>
    </aside>
  )
};

export default Filters;