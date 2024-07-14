import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../Hooks/api";
import { ReactTabulator } from "react-tabulator";

import ChartComponent from "../components/Chart";
import SalesChart from "../components/SalesChart";

import "../styles/Dashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ProductsComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user?.token;

  const [database, setDatabase] = useState([]);
  const [updatedRows, setUpdatedRows] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts();
        setDatabase(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleCellEdited = (cell) => {
    const updatedRow = cell.getRow().getData();
    setUpdatedRows((prev) => {
      const updatedIndex = prev.findIndex((row) => row.id === updatedRow.id);
      if (updatedIndex >= 0) {
        const updatedRowsCopy = [...prev];
        updatedRowsCopy[updatedIndex] = updatedRow;
        return updatedRowsCopy;
      } else {
        return [...prev, updatedRow];
      }
    });
  };

  const handleUpdateProducts = async () => {
    try {
      for (const row of updatedRows) {
        await updateProduct(row.id, row, token);
      }
      alert("Productos actualizados correctamente");
    } catch (error) {
      console.error("Error updating products:", error);
      alert("Hubo un error al actualizar los productos");
    }
  };

  const handleAddProduct = async () => {
    try {
      if (
        !newProduct.name ||
        !newProduct.price ||
        !newProduct.stock ||
        !newProduct.category
      ) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
      }

      const addedProduct = await addProduct(newProduct, token);
      setDatabase((prev) => [...prev, addedProduct]);
      setNewProduct({
        name: "",
        price: "",
        stock: "",
        category: "",
        description: "",
      });
      alert("Producto agregado correctamente");
    } catch (error) {
      console.error("Error adding product:", error.message || error);
      alert("Hubo un error al agregar el producto");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id, token);
      setDatabase((prev) => prev.filter((product) => product.id !== id));
      alert("Producto eliminado correctamente");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Hubo un error al eliminar el producto");
    }
  };

  const columns = [
    { title: "ID", field: "id", width: 150, editor: false },
    { title: "Producto", field: "name", width: 150, editor: "input" },
    { title: "Precio", field: "price", width: 150, editor: "input" },
    { title: "Stock", field: "stock", width: 150, editor: "input" },
    { title: "Descripción", field: "description", editor: "input" },
    {
      title: "Acciones",
      field: "actions",
      width: 100,
      formatter: (cell, formatterParams, onRendered) => {
        const button = document.createElement("button");
        button.className = "delete-button";
        button.onclick = () => handleDeleteProduct(cell.getRow().getData().id);

        const icon = document.createElement("i");
        icon.className = "fas fa-trash-alt trash-icon";

        button.appendChild(icon);
        return button;
      },
    },
  ];

  return (
    <>
      <div className="chart-section">
        <div className="chart">
          <SalesChart />
        </div>
        <div className="chart">
          <ChartComponent />
        </div>
      </div>
      <div className="products-component-container">
        <div className="add-product-form">
          <h3>Agregar Nuevo Producto</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Precio"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Categoría"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Descripción"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div className="button-container">
            <button className="add-button" onClick={handleAddProduct}>
              Agregar Producto
            </button>
            <button className="red-button" onClick={handleUpdateProducts}>
              Actualizar Productos
            </button>
          </div>
        </div>
        <div className="tabulator-container">
          <ReactTabulator
            data={database}
            columns={columns}
            cellEdited={handleCellEdited}
            options={{ movableColumns: true }}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsComponent;