import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Asegúrate de que esta URL sea la correcta y esté publicada como "Cualquiera"
    fetch('https://script.google.com/macros/s/AKfycbxPK1zwG952lBOwFnBUE70QDPrnlZZqlmiaU8o51Mca98jSVgdJiHTOzpPTFs-09O-q/exec')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error capturado:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando Stock...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario YOLI</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Usamos corchetes para acceder a nombres con espacios o mayúsculas */}
            <Text style={styles.text}>
              {item["PRODUCTO"]}: {item["STOCK ACTUAL"]}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: 'center', backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, width: '90%', backgroundColor: '#fff' },
  text: { fontSize: 18 }
});