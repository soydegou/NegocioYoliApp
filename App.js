import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

const API_URL = 'https://script.google.com/macros/s/AKfycbxPK1zwG952lBOwFnBUE70QDPrnlZZqlmiaU8o51Mca98jSVgdJiHTOzpPTFs-09O-q/exec';

export default function App() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 🔥 TRUCO ANTI-CACHÉ: Obliga al celular a pedir datos frescos
        const urlSinCache = `${API_URL}?t=${new Date().getTime()}`;
        const response = await fetch(urlSinCache);
        
        const textoRespuesta = await response.text(); 
        
        try {
          const data = JSON.parse(textoRespuesta);
          if (data.status === 'success') {
            setInventory(data.data);
          } else {
            console.log("Error de la API:", data.message);
          }
        } catch (parseError) {
          console.log("🚨 GOOGLE NO ENVIÓ DATOS. Envió esto:", textoRespuesta.substring(0, 100) + "...");
        }

      } catch (error) {
        console.log("🚨 ERROR DE RED:", error.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={{marginTop: 10}}>Cargando inventario de YOLI...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 STOCK ACTUAL YOLI</Text>
      
      {inventory.length === 0 && !loading && (
        <Text style={{textAlign: 'center', marginTop: 20, color: 'red'}}>
          No se pudieron cargar los datos. Revisa la terminal negra.
        </Text>
      )}

      <FlatList 
        data={inventory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.productName}>{item.producto}</Text>
            <Text style={styles.stockText}>{item.cantidad}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, backgroundColor: '#f0f4f8', paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 18, 
    backgroundColor: 'white', 
    marginBottom: 10, 
    borderRadius: 10,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productName: { fontSize: 16, color: '#333', flex: 1 },
  stockText: { fontSize: 18, fontWeight: 'bold', color: '#2ecc71', minWidth: 40, textAlign: 'right' }
});