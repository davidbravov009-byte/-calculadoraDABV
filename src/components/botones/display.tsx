
import { View, Text, StyleSheet } from "react-native";

export default function Display() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.encabezado}>
        <View style={styles.logo}>
          <Text style={styles.logoTexto}>N</Text>
        </View>

        <View>
          <Text style={styles.titulo}>NEXUS</Text>
          <Text style={styles.subtitulo}>CALCULATOR / PRO</Text>
        </View>

        <View style={styles.estado}>
          <View style={styles.indicador} />
          <Text style={styles.estadoTexto}>ONLINE</Text>
        </View>
      </View>

      <View style={styles.panel}>
        <Text style={styles.etiqueta}>OPERACIÓN</Text>
        <Text style={styles.operacion}>0 + 0</Text>

        <View style={styles.linea} />

        <Text style={styles.etiqueta}>RESULTADO</Text>

        <View style={styles.lineaResultado} />

        <Text style={styles.resultado}>0.00</Text>

        <View style={styles.lineaResultado} />

        <Text style={styles.pie}>
          PRECISION SYSTEM / 001
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    minHeight: 240,
    margin: 14,
    marginBottom: 8,
    padding: 18,
    backgroundColor: "#15191F",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#343B45",
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 25,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#1769FF",
    alignItems: "center",
    justifyContent: "center",
  },
  logoTexto: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "900",
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    letterSpacing: 3,
  },
  subtitulo: {
    color: "#77818F",
    fontSize: 9,
    letterSpacing: 1.5,
    marginTop: 3,
  },
  estado: {
    marginLeft: "auto",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  indicador: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#3685FF",
  },
  estadoTexto: {
    color: "#8793A3",
    fontSize: 9,
    fontWeight: "700",
  },
  panel: {
    flex: 1,
    justifyContent: "flex-end",
  },
  etiqueta: {
    color: "#77818F",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "right",
    marginBottom: 5,
  },
  operacion: {
    color: "#AAB4C2",
    fontSize: 24,
    textAlign: "right",
    marginTop: 5,
    marginBottom: 12,
  },
  linea: {
    height: 1,
    backgroundColor: "#343B45",
    marginBottom: 14,
  },
  lineaResultado: {
    height: 3,
    backgroundColor: "#1769FF",
    borderRadius: 2,
    marginVertical: 8,
  },
  resultado: {
    color: "#FFFFFF",
    fontSize: 46,
    fontWeight: "800",
    textAlign: "right",
    marginVertical: 2,
  },
  pie: {
    color: "#667181",
    fontSize: 9,
    letterSpacing: 1.5,
    textAlign: "right",
    marginTop: 10,
  },
});
