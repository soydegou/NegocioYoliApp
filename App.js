import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';

let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const now = Date.now();
    if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://script.google.com/macros/s/AKfycbxPK1zwG952lBOwFnBUE70QDPrnlZZqlmiaU8o51Mca98jSVgdJiHTOzpPTFs-09O-q/exec');
      const json = await response.json();
      
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
            {/* Aquí usamos los nombres exactos del CSV */}
            <Text style={styles.itemText}>
              {item.PRODUCTO}: {item["STOCK ACTUAL"]}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, width: '100%' },
  itemText: { fontSize: 16 }
});