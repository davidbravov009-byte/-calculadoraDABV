   import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Display from "../components/botones/display";
import Rejilla from "../components/botones/rejilla";
import { useCalculadora } from "../hooks/UseCalculadora";

export default function Index() {
  const insets = useSafeAreaInsets();
  const [verHistorial, setVerHistorial] = useState(false);
  const {
    expresion,
    resultado,
    modo,
    operadorActivo,
    historial,
    vibracionActiva,
    alternarVibracion,
    usarResultado,
    borrarHistorial,
    pulsar,
  } = useCalculadora();

  return (
    <View
      style={[
        styles.pantalla,
        { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 10 },
      ]}
    >
      <View style={styles.barra}>
        <Pressable style={styles.pastilla} onPress={() => setVerHistorial(true)}>
          <Text style={styles.pastillaTexto}>
            🕘 Historial{historial.length > 0 ? ` · ${historial.length}` : ""}
          </Text>
        </Pressable>

        <Pressable style={styles.pastilla} onPress={alternarVibracion}>
          <Text style={styles.pastillaTexto}>
            {vibracionActiva ? "📳 Vibración" : "📴 Silencio"}
          </Text>
        </Pressable>
      </View>

      <Display
        expresion={expresion}
        resultado={resultado}
        modo={modo}
        historial={historial}
        historialVisible={verHistorial}
        onCerrarHistorial={() => setVerHistorial(false)}
        onElegirResultado={usarResultado}
        onBorrarHistorial={borrarHistorial}
      />

      <Rejilla onPresionar={pulsar} operadorActivo={operadorActivo} />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: "#0D0E12",
    justifyContent: "flex-end",
  },
  barra: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  pastilla: {
    backgroundColor: "#181A20",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  pastillaTexto: {
    color: "#C4CAD4",
    fontSize: 13,
    fontWeight: "600",
  },
});