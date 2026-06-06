import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbxPK1zwG952lBOwFnBUE70QDPrnlZZqlmiaU8o51Mca98jSVgdJiHTOzpPTFs-09O-q/exec')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario YOLI</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          // Extraemos los valores de forma genérica (sin nombres de columna)
          const valores = Object.values(item);
          return (
            <View style={styles.item}>
              <Text style={styles.text}>
                {valores[0]}: {valores[1]}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, width: '90%' },
  text: { fontSize: 18 }
});