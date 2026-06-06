import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

// Variable global para la caché (se mantiene viva mientras la app esté abierta)
let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    // 1. Verificación de Caché
    const now = Date.now();
    if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    // 2. Si no hay caché o expiró, hacemos la petición real
    try {
      setLoading(true);
      const response = await fetch('https://script.google.com/macros/s/AKfycbxPK1zwG952lBOwFnBUE70QDPrnlZZqlmiaU8o51Mca98jSVgdJiHTOzpPTFs-09O-q/exec');
      const json = await response.json();
      
      // Guardar en caché
      cachedData = json;
      lastFetchTime = Date.now();
      
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 3. Renderizado de pantalla de carga
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando Inventario YOLI...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario Actual</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.Producto}: {item.Cantidad}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  loadingText: { marginTop: 10, fontSize: 16 },
  item: { padding: 15, borderBottomWidth: 1, width: '100%' }
});