import axios from 'axios';

// 🔥 REEMPLAZA ESTO CON LA URL QUE COPIASTE DE GOOGLE APPS SCRIPT
const API_URL = 'https://script.google.com/macros/s/AKfycbyaoDOaus1NVIK7qJoWHq-92qrFVqlGjcfrh7l7KFlP6aKakV6_C8asvQDGUGoFklcU/exec';

export const fetchInventory = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data.status === 'success') {
      return response.data.data;
    } else {
      console.error("Error del servidor Yoli:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error conectando con la base de datos:", error);
    return [];
  }
};