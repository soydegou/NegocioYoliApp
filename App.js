import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('TU_URL_AQUI/exec')
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <ActivityIndicator size="large" style={{flex:1}} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard YOLI</Text>
      
      {/* Sección Patrimonio */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>💰 Patrimonio</Text>
        <Text>Valor Actual: {data.config[15]["Valor Actual del Negocio ($)"]}</Text>
        <Text>Ganancia Reinvertida: {data.config[16]["Valor Actual del Negocio ($)"]}</Text>
      </View>

      {/* Sección Sociedad */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>🤝 Corte de Sociedad</Text>
        <Text>Ganancia José: {data.config[10]["Ganancia Jose (16%)"]}</Text>
        <Text>Ganancia Yeison: {data.config[11]["Ganancia Jose (16%)"]}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', padding: 20 },
  section: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 28, fontWeight: 'bold', marginVertical: 20 },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});