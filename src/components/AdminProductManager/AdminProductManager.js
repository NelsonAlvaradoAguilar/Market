import React, { useState, useEffect } from "react";
import styles from "./AdminProductManager.module.scss";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../utils/api";

const emptyProduct = {
  name: "",
  category_id: "",
  price: "",
  quantity: "",
  imageUrl: "",
  origin: "",
};

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      // Defensive: handle cases where API returns { products: [...] } or a single object
      let productsArray = [];

      if (Array.isArray(res)) {
        productsArray = res;
      } else if (res && Array.isArray(res.products)) {
        productsArray = res.products;
      } else if (res) {
        // If it's a single product object, wrap in array
        productsArray = [res];
      }

      setProducts(productsArray);
      setError("");
    } catch (err) {
      setError("Failed to load products.");
    }
    setLoading(false);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (editingId) {
        await updateProduct(editingId, product);
      } else {
        await addProduct(product);
      }
      setProduct(emptyProduct);
      setEditingId(null);
      await fetchProducts();
    } catch (err) {
      setError(err.response?.data?.error || "Error saving product.");
    }
    setLoading(false);
  };

  const handleEdit = (prod) => {
    setProduct({
      ...prod,
      price: prod.price ?? "",
      quantity: prod.quantity ?? "",
      category_id: prod.category_id ?? "",
      imageUrl: prod.imageUrl ?? "",
      origin: prod.origin ?? "",
    });
    setEditingId(prod.id);
  };

  const confirmDelete = (id) => {
    setPendingDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    setLoading(true);
    try {
      await deleteProduct(pendingDeleteId);
      await fetchProducts();
      setPendingDeleteId(null);
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting product.");
    }
    setLoading(false);
  };

  const handleCancelDelete = () => {
    setPendingDeleteId(null);
  };

  const handleCancel = () => {
    setProduct(emptyProduct);
    setEditingId(null);
    setError("");
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.managerContainer}>
      <h2>Admin: Product Inventory</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: "2em" }}>
        <h3>{editingId ? "Edit Product" : "Add New Product"}</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            name="name"
            value={product.name}
            onChange={handleInput}
            placeholder="Product Name"
            required
            style={{ flex: 2 }}
          />
          <input
            name="category_id"
            value={product.category_id}
            onChange={handleInput}
            placeholder="Category ID"
            required
            style={{ width: 100 }}
          />
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleInput}
            placeholder="Price"
            required
            min="0"
            style={{ width: 100 }}
          />
          <input
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleInput}
            placeholder="Stock"
            required
            min="0"
            style={{ width: 80 }}
          />
          <input
            name="origin"
            value={product.origin}
            onChange={handleInput}
            placeholder="Origin"
            style={{ width: 120 }}
          />
          <input
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleInput}
            placeholder="Image URL"
            style={{ flex: 2 }}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" style={{ marginRight: 10 }} disabled={loading}>
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </form>

      <section
        className={styles.inventorySection}
        aria-labelledby="inventory-heading"
      >
        <header className={styles.inventoryHeader}>
          <h3 id="inventory-heading">Current Inventory</h3>
          <div className={styles.inventoryGridHeader}>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span>Origin</span>
            <span>Image</span>
            <span>Actions</span>
          </div>
        </header>
        {products.length === 0 ? (
          <div className={styles.inventoryEmpty}>No products found.</div>
        ) : (
          products.map((prod) => (
            <article
              className={styles.inventoryGrid}
              key={prod.id}
              aria-label={`Product: ${prod.name}`}
            >
              <div>{prod.name}</div>
              <div>{prod.category_id}</div>
              <div>${Number(prod.price).toFixed(2)}</div>
              <div>{prod.quantity}</div>
              <div>{prod.origin}</div>
              <div>
                {prod.imageUrl && (
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    style={{ width: 40, height: 40, objectFit: "cover" }}
                  />
                )}
              </div>
              <div className="actions">
                <button
                  onClick={() => handleEdit(prod)}
                  style={{ marginRight: 4 }}
                  disabled={loading}
                  aria-label={`Edit ${prod.name}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(prod.id)}
                  style={{ color: "red" }}
                  disabled={loading}
                  aria-label={`Delete ${prod.name}`}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Custom Delete Confirmation Modal */}
      {pendingDeleteId && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={handleDeleteConfirmed} disabled={loading}>
              Yes, Delete
            </button>
            <button onClick={handleCancelDelete} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductManager;
