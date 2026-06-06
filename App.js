import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbxPK1zwG952lBOwFnBUE70QDPrnlZZqlmiaU8o51Mca98jSVgdJiHTOzpPTFs-09O-q/exec')
      .then((res) => res.json())
      .then((json) => {
        // AQUÍ ESTÁ LA CORRECCIÓN: accedemos a json.data
        if (json.status === 'success') {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <View style={styles.container}><ActivityIndicator size="large" /><Text>Cargando...</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario YOLI</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Usamos las llaves exactamente como las escribiste en el Script: producto y cantidad */}
            <Text style={styles.text}>{item.producto}: {item.cantidad}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  item: { padding: 15, borderBottomWidth: 1, width: '90%' },
  text: { fontSize: 18 }
});