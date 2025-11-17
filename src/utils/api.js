import axios from "axios";
const getToken = () => localStorage.getItem("token") || null;

//const API_BASE = "http://localhost:4242/api";
const API_BASE = "https://marketserver-7r02.onrender.com/api";

const getProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/products`);
      return response.data;
    } catch (error) {
      console.log(
        `Failed to get products from API with error message: ${error}`
      );
      return null;
    }
  },
  getProductById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/products/${id}`);
      return response.data;
    } catch (error) {
      console.log(
        `Failed to get product by id from API with error message: ${error}`
      );
      return null;
    }
  },
  getSections = async () => {
    try {
      const response = await axios.get(`${API_BASE}/sections`);
      return response.data;
    } catch (error) {
      console.log(
        `Failed to get sections from API with error message: ${error}`
      );
      return null;
    }
  };
const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE}/categories`);
    return response.data;
  } catch (error) {
    console.log(
      `Failed to get categories from API with error message: ${error}`
    );
    return null;
  }
};
const getOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE}/orders`);
    return response.data;
  } catch (error) {
    console.log(`Failed to get orders from API with error message: \${error}`);
    return null;
  }
};
const createOrder = async (data) => {
  const token = getToken();
  if (!token) {
    console.log("No token found. User must be logged in.");
    return null;
  }
  try {
    const response = await axios.post(`${API_BASE}/orders`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // { id: ... }
  } catch (error) {
    console.log(`Failed to create order from API with error message: ${error}`);
    return null;
  }
};
const getOrderItems = async () => {
  try {
    const response = await axios.get(`${API_BASE}/order-items`);
    return response.data;
  } catch (error) {
    console.log(
      `Failed to get order items from API with error message: ${error}`
    );
    return null;
  }
};
const createOrderItem = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/order-items`, data);
    return response.data; // { id: ... }
  } catch (error) {
    console.log(
      `Failed to create order item from API with error message: ${error}`
    );
    return null;
  }
};
const signUp = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/users/signup`, {
      name,
      email,
      password,
    });
    return { data: response.data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.error || "Registration failed",
    };
  }
};

// Login - expects backend to return { token, user }
const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE}/users/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.response?.data?.error || "Login failed" };
  }
};

// Get profile - always reads token fresh from storage
const getAuthorized = async () => {
  const token = getToken();
  console.log("Token before API call:", token);

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axios.get(`${API_BASE}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Return the user object directly
    return response.data; // { id, name, email, role, ... }
  } catch (error) {
    console.log("Error in getAuthorized:", error);
    // Re-throw so callers can handle it
    throw error;
  }
};
// Logout
const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // <-- this is key!
};
export const addToCart = async (productId, quantity = 1) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to add to cart.");
  }
  try {
    const response = await axios.post(
      `${API_BASE}/cart/add-to-cart`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
export const getCart = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to view cart.");
  }
  try {
    const response = await axios.get(`${API_BASE}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // should be an array of cart items
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};
export const updateCartQty = async (productId, newQty) => {
  const token = getToken();
  if (!token) throw new Error("You must be logged in to update cart.");
  await axios.patch(
    `${API_BASE}/cart/${productId}`,
    { quantity: newQty }, // <-- Only send this!
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
export const removeFromCart = async (productId) => {
  const token = getToken();
  if (!token) throw new Error("You must be logged in to remove from cart.");
  await axios.delete(`${API_BASE}/cart/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const createCheckoutSession = async () => {
  const token = getToken();
  if (!token) throw new Error("No token");

  try {
    const res = await axios.post(
      `${API_BASE}/subscriptions/session`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res);

    return res.data; // { url }
  } catch (err) {
    console.error("Error creating checkout session:", err);
    throw err;
  }
};
const cancelSubscription = async () => {
  const token = getToken();
  if (!token) throw new Error("No token");

  try {
    const res = await axios.post(
      "/subscriptions/cancel",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data; // e.g. { message: "Subscription will cancel at period end" }
  } catch (err) {
    console.error("Error canceling subscription:", err);
    throw err;
  }
};
// PRODUCTS
/*
export const createProduct = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/products`, data);
    return response.data;
  } catch (error) {
    console.log(
      `Failed to create product from API with error message: ${error}`
    );
    return null;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE}/products/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(
      `Failed to update product from API with error message: ${error}`
    );
    return null;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.log(
      `Failed to get category by id from API with error message: ${error}`
    );
    return null;
  }
};

// SECTIONS

export const getSectionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/sections/${id}`);
    return response.data;
  } catch (error) {
    console.log(
      `Failed to get section by id from API with error message: ${error}`
    );
    return null;
  }
};

// USERS
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE}/users`);
    return response.data;
  } catch (error) {
    console.log(`Failed to get users from API with error message: ${error}`);
    return null;
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/users`, data);
    return response.data;
  } catch (error) {
    console.log(`Failed to create user from API with error message: ${error}`);
    return null;
  }
};

// ORDERS
export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE}/orders`);
    return response.data;
  } catch (error) {
    console.log(`Failed to get orders from API with error message: ${error}`);
    return null;
  }
};

export const createOrder = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/orders`, data);
    return response.data;
  } catch (error) {
    console.log(`Failed to create order from API with error message: ${error}`);
    return null;
  }
};

// ORDER ITEMS
export const getOrderItems = async () => {
  try {
    const response = await axios.get(`${API_BASE}/order-items`);
    return response.data;
  } catch (error) {
    console.log(
      `Failed to get order items from API with error message: ${error}`
    );
    return null;
  }
};

export const createOrderItem = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/order-items`, data);
    return response.data;
  } catch (error) {
    console.log(
      `Failed to create order item from API with error message: ${error}`
    );
    return null;
  }
};
*/
export {
  getProducts,
  getProductById,
  getSections,
  getCategories,
  getOrders,
  createOrder,
  getOrderItems,
  createOrderItem,
  signUp,
  loginUser,
  getAuthorized,
  getToken,
  logOut,
  cancelSubscription,
};
