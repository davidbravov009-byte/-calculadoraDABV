
import { StyleSheet, Text, View } from "react-native";
import Display from "../components/botones/display";
import Rejilla from "../components/botones/rejilla";

export default function Index() {
  return (
    <View style={styles.pantalla}>
      <View style={styles.decoracion}>
        <Text style={styles.marca}>NG / 2026</Text>
        <Text style={styles.estado}>● SISTEMA ACTIVO</Text>
      </View>

      <Display />

      <Rejilla />

      <Text style={styles.credito}>
        NEXUS PRO / DIGITAL INTERFACE
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#0B0D11",
    justifyContent: "flex-end",
    paddingTop: 35,
  },
  decoracion: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  marca: {
    color: "#3685FF",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },
  estado: {
    color: "#77818F",
    fontSize: 10,
  },
  credito: {
    color: "#667181",
    fontSize: 9,
    textAlign: "center",
    letterSpacing: 2,
    paddingVertical: 10,
  },
});

