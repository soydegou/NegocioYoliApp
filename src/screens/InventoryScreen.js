import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getInventory } from '../services/api';

export default function InventoryScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInventory().then((result) => {
      setData(result);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario Yoli</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Producto: {item[0]}</Text>
            <Text>Stock: {item[1]}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }
});