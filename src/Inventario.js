import axios from 'axios';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby9fwbh7VTXxJ0NkIfIKlQiluzxNlsdMsqrRaVlTC-b7rJAqvW-DqVQeUoTt4zwGiDZ/exec";

export const getInventory = async () => {
  try {
    const response = await axios.get(GOOGLE_SCRIPT_URL);
    // Esto devuelve los datos directamente desde tu hoja "STOCK ACTUAL"
    return response.data;
  } catch (error) {
    console.error("Error al conectar con el inventario:", error);
    return [];
  }
};