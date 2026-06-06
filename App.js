import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Resumen');
  
  // Estados para la Calculadora / Cierre
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState('0');

  useEffect(() => {
    // ⚠️ REEMPLAZA ESTO CON TU URL DE GOOGLE APPS SCRIPT
    fetch('https://script.google.com/macros/s/AKfycbxn4r4CY6WRdFJX2g0VASWMkky1ygRVGo82Zr3KbfdgxzXZ4Jtc2qSp2j9dklKFcfPP/exec')
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error de conexión:", err);
        setLoading(false);
      });
  }, []);

  // Función para la calculadora interna
  const handleCalculate = () => {
    try {
      // Nota: eval() es seguro aquí porque es una app interna y solo procesa matemáticas básicas
      const result = eval(calcInput);
      setCalcResult(result.toString());
    } catch (e) {
      setCalcResult('Error');
    }
  };

  // --------------------------------------------------------
  // COMPONENTES DE DISEÑO (Tarjetas genéricas para evitar errores de columnas)
  // --------------------------------------------------------
  const GenericCard = ({ item }) => (
    <View style={styles.card}>
      {Object.entries(item).map(([key, val], idx) => {
        // Ignorar campos vacíos o sin título
        if (!key || val === '' || val === null) return null;
        return (
          <View key={idx} style={styles.cardRow}>
            <Text style={styles.cardKey}>{key}:</Text>
            <Text style={styles.cardValue}>{String(val)}</Text>
          </View>
        );
      })}
    </View>
  );

  const Section = ({ title, datalist }) => {
    if (!datalist || datalist.length === 0) return null;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {datalist.slice(0, 50).map((item, index) => (
          <GenericCard key={index} item={item} />
        ))}
      </View>
    );
  };

  // --------------------------------------------------------
  // PANTALLAS (TABS)
  // --------------------------------------------------------
  const renderResumen = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.headerTitle}>📊 Panel Gerencial</Text>
      <View style={styles.alertBox}>
        <Text style={styles.alertText}>¡Bienvenido al sistema YOLI!</Text>
        <Text style={styles.alertSubText}>Navega por las pestañas inferiores para explorar la base de datos completa.</Text>
      </View>
      
      {/* Mostramos una vista previa segura del Config si existe */}
      <Section title="Datos de Configuración (Crudos)" datalist={data?.config} />
    </ScrollView>
  );

  const renderInventario = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.headerTitle}>📦 Control de Inventario</Text>
      <Section title="Stock Actual en Nevera" datalist={data?.stock_actual} />
      <Section title="Lista de Precios Oficial" datalist={data?.precios} />
      <Section title="Inventario Completo" datalist={data?.inventario_completo} />
      <Section title="Auditoría de Inventario" datalist={data?.auditoria} />
      <Section title="Registro de Entradas" datalist={data?.entradas} />
    </ScrollView>
  );

  const renderTransacciones = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.headerTitle}>💸 Flujo de Dinero y Ventas</Text>
      <Section title="Ventas Semanales" datalist={data?.ventas} />
      <Section title="Historial Completo" datalist={data?.historial} />
      <Section title="Registro de Pagos" datalist={data?.pagos} />
      <Section title="Control de Egresos" datalist={data?.egresos} />
      <Section title="Registro de Mermas" datalist={data?.mermas} />
      <Section title="Análisis Financiero" datalist={data?.analisis} />
    </ScrollView>
  );

  const renderHerramientas = () => (
    <ScrollView style={styles.tabContent}>
      <Text style={styles.headerTitle}>🧮 Herramientas de Cierre</Text>
      
      {/* Calculadora de Cierre */}
      <View style={styles.toolCard}>
        <Text style={styles.toolTitle}>Sacar Cuentas / Calculadora</Text>
        <Text style={styles.toolSub}>Ej: 25.50 + 15.00 * 2</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Escribe tu cálculo aquí..."
          keyboardType="numbers-and-punctuation"
          value={calcInput}
          onChangeText={setCalcInput}
        />
        
        <TouchableOpacity style={styles.calcButton} onPress={handleCalculate}>
          <Text style={styles.calcButtonText}>Calcular Total</Text>
        </TouchableOpacity>
        
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Resultado:</Text>
          <Text style={styles.resultValue}>{calcResult}</Text>
        </View>
      </View>

      {/* Cierre de Caja (Maqueta Visual) */}
      <View style={styles.toolCard}>
        <Text style={styles.toolTitle}>Cierre de Inventario</Text>
        <Text style={styles.toolSub}>Preparar resumen para enviar a base de datos.</Text>
        
        <TouchableOpacity style={styles.closeButton} onPress={() => Alert.alert("Próximamente", "Aquí programaremos la escritura en el Google Sheet.")}>
          <Text style={styles.closeButtonText}>Ejecutar Cierre Semanal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // --------------------------------------------------------
  // RENDER PRINCIPAL
  // --------------------------------------------------------
  if (loading) {
    return (
      <View style={styles.centerScreen}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={{ marginTop: 10, fontSize: 16, color: '#7f8c8d' }}>Sincronizando con Google Sheets...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* CONTENIDO DE LA PESTAÑA ACTIVA */}
      <View style={styles.mainContent}>
        {activeTab === 'Resumen' && renderResumen()}
        {activeTab === 'Inventario' && renderInventario()}
        {activeTab === 'Transacciones' && renderTransacciones()}
        {activeTab === 'Herramientas' && renderHerramientas()}
      </View>

      {/* BARRA DE NAVEGACIÓN INFERIOR */}
      <View style={styles.bottomNav}>
        {['Resumen', 'Inventario', 'Transacciones', 'Herramientas'].map((tab) => (
          <TouchableOpacity 
            key={tab} 
            style={[styles.navItem, activeTab === tab && styles.navItemActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.navText, activeTab === tab && styles.navTextActive]}>
              {tab === 'Resumen' ? '📊' : tab === 'Inventario' ? '📦' : tab === 'Transacciones' ? '💸' : '🧮'}
            </Text>
            <Text style={[styles.navTextSmall, activeTab === tab && styles.navTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// --------------------------------------------------------
// ESTILOS PROFESIONALES
// --------------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ecf0f1' },
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainContent: { flex: 1, paddingBottom: 10 },
  tabContent: { flex: 1, padding: 15 },
  
  // Textos y Encabezados
  headerTitle: { fontSize: 26, fontWeight: '800', color: '#2c3e50', marginBottom: 15, marginTop: 10 },
  sectionContainer: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#34495e', marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#bdc3c7', paddingBottom: 5 },
  
  // Tarjetas Genéricas Inteligentes
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap' },
  cardKey: { fontWeight: '600', color: '#7f8c8d', width: '40%' },
  cardValue: { fontWeight: '700', color: '#2c3e50', width: '60%', textAlign: 'right' },
  
  // Alertas
  alertBox: { backgroundColor: '#d4edda', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1, borderColor: '#c3e6cb' },
  alertText: { color: '#155724', fontWeight: 'bold', fontSize: 16 },
  alertSubText: { color: '#155724', marginTop: 5 },

  // Herramientas (Calculadora)
  toolCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 3 },
  toolTitle: { fontSize: 20, fontWeight: 'bold', color: '#2c3e50' },
  toolSub: { color: '#7f8c8d', marginBottom: 15 },
  input: { backgroundColor: '#f7f9fa', borderWidth: 1, borderColor: '#bdc3c7', borderRadius: 8, padding: 15, fontSize: 18, marginBottom: 15 },
  calcButton: { backgroundColor: '#3498db', padding: 15, borderRadius: 8, alignItems: 'center' },
  calcButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultBox: { marginTop: 20, backgroundColor: '#e8f4f8', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  resultLabel: { fontSize: 16, color: '#34495e', fontWeight: '600' },
  resultValue: { fontSize: 28, fontWeight: 'bold', color: '#2980b9' },
  closeButton: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  closeButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Navegación Inferior
  bottomNav: { flexDirection: 'row', backgroundColor: '#fff', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#bdc3c7', justifyContent: 'space-around' },
  navItem: { alignItems: 'center', padding: 10, borderRadius: 10 },
  navItemActive: { backgroundColor: '#e8f4f8' },
  navText: { fontSize: 22 },
  navTextSmall: { fontSize: 10, fontWeight: '600', color: '#7f8c8d', marginTop: 4 },
  navTextActive: { color: '#3498db', fontWeight: 'bold' }
});