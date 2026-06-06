import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbxPK1zwG952lBOwFnBUE70QDPrnlZZqlmiaU8o51Mca98jSVgdJiHTOzpPTFs-09O-q/exec')
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') setData(json.data);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.productName}>{item.producto}</Text>
      <View style={styles.badge}>
        <Text style={styles.stockText}>Stock: {item.cantidad}</Text>
      </View>
    </View>
  );

  if (loading) return <View style={styles.container}><ActivityIndicator size="large" color="#2ecc71" /></View>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📦 Inventario YOLI</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#2c3e50' },
  list: { paddingHorizontal: 15 },
  card: { 
    backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 10,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3
  },
  productName: { fontSize: 18, fontWeight: '600', color: '#34495e', flex: 1 },
  badge: { backgroundColor: '#2ecc71', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  stockText: { color: '#fff', fontWeight: 'bold' }
});