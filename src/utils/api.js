import axios from "axios";
export const token = sessionStorage.getItem("JWTtoken");
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
    const response = await axios.get(`\${API_BASE}/orders`);
    return response.data;
  } catch (error) {
    console.log(`Failed to get orders from API with error message: \${error}`);
    return null;
  }
};
const createOrder = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/orders`, data);
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
    const response = await axios.post(
      `${API_BASE}/users/register`,
      { name, email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // Optionally store token and user for global auth
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data; // { token, user }
  } catch (error) {
    console.log(
      `Failed to register user with error message: ${
        error.response?.data?.error || error.message
      }`
    );
    // Optionally: throw for form error handling
    throw new Error(error.response?.data?.error || "Registration failed");
  }
};
const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE}/users/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // Optionally store token and user for global auth
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data; // { token, user }
  } catch (error) {
    console.log(
      `Failed to login with error message: ${
        error.response?.data?.error || error.message
      }`
    );
    throw new Error(error.response?.data?.error || "Login failed");
  }
};
const getUserProfile = async () => {
    });
    return response.data; // { id, name, email, role, ... }
  } catch (error) {
    console.log(
      `Failed to get user profile with error message: ${
        error.response?.data?.error || error.message
      }`
    );
    throw new Error(error.response?.data?.error || "Could not fetch profile");
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
  getUserProfile,
  token,
};
