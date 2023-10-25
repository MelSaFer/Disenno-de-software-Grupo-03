// @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Filters = () => {

  const router = useRouter();
  const [categories, setCategories] = useState([]);

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
  
    // Copiar estado existente 
    let updated = {...selected};  
  
    if(e.target.checked) {
      // Agregar valor al objeto
      updated[value] = true;
    } else {
      // Eliminar valor del objeto 
      delete updated[value];
    }
  
    // Actualizar estado
    setSelected(updated);

  }

  useEffect(() => {
    fetchCategories();
  }, [])
  
  const fetchCategories = async () => {
    const res = await fetch('https://mocki.io/v1/643e093c-10a0-410a-9a9d-0cd158e4d821');
    setCategories(await res.json());
  }

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Categorias</h3>

      <ul>
        {categories.map(x => (
          <li key={x.id}>
            <input 
              type="checkbox"
              value={x.name}
              checked={selected[x.name]}
              onChange={handleChange} 
            />
            {x.name}  
          </li>
        ))}
      </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Subcategorias</h3>
        <ul className="space-y-1">
          <li>
            {[].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="checkbox"
                  value={rating}
                  className="h-4 w-4"
                  //onClick={(e) => handleClick(e.target)}
                />
              </label>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Filters;