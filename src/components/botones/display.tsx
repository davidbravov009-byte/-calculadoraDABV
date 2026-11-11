import { FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import type { Registro } from "../../logica/motor";

interface DisplayProps {
  expresion: string;
  resultado: string;
  modo: string | null; // ej: "SUMA ➕"
  historial: Registro[];
  historialVisible: boolean;
  onCerrarHistorial: () => void;
  onElegirResultado: (resultado: string) => void;
  onBorrarHistorial: () => void;
}

export default function Display({
  expresion,
  resultado,
  modo,
  historial,
  historialVisible,
  onCerrarHistorial,
  onElegirResultado,
  onBorrarHistorial,
}: DisplayProps) {
  const hayError = resultado.startsWith("Error");
  // El emoji es la última palabra del modo
  const emojiModo = modo !== null ? modo.split(" ").pop() : "🧮";

  return (
    <>
      <View style={styles.contenedor}>
        <Text style={styles.marcaAgua}>{emojiModo}</Text>

        {modo !== null ? (
          <View style={styles.chip}>
            <Text style={styles.chipTexto}>{modo}</Text>
          </View>
        ) : null}

        <Text style={styles.expresion} numberOfLines={1} adjustsFontSizeToFit>
          {expresion}
        </Text>

        <Text
          style={[styles.resultado, hayError && styles.resultadoError]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.4}
        >
          {resultado}
        </Text>
      </View>

      <Modal
        visible={historialVisible}
        animationType="slide"
        transparent
        onRequestClose={onCerrarHistorial}
      >
        <Pressable style={styles.fondo} onPress={onCerrarHistorial}>
          <Pressable style={styles.hoja} onPress={() => {}}>
            <View style={styles.agarre} />

            <View style={styles.cabecera}>
              <Text style={styles.titulo}>🕘 Historial</Text>
              {historial.length > 0 ? (
                <Pressable onPress={onBorrarHistorial} hitSlop={10}>
                  <Text style={styles.borrar}>🗑️ Borrar todo</Text>
                </Pressable>
              ) : null}
            </View>

            <FlatList
              data={historial}
              keyExtractor={(r) => String(r.id)}
              ListEmptyComponent={
                <Text style={styles.vacio}>Aún no hay operaciones 🫥</Text>
              }
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.fila,
                    pressed && { opacity: 0.6 },
                  ]}
                  onPress={() => {
                    onElegirResultado(item.resultado);
                    onCerrarHistorial();
                  }}
                >
                  <Text style={styles.filaExpresion}>{item.expresion}</Text>
                  <Text style={styles.filaResultado}>{item.resultado}</Text>
                </Pressable>
              )}
            />

            {historial.length > 0 ? (
              <Text style={styles.pista}>Toca un resultado para reutilizarlo</Text>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    minHeight: 200,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 22,
    backgroundColor: "#13151B",
    borderRadius: 32,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  marcaAgua: {
    position: "absolute",
    top: 6,
    left: 14,
    fontSize: 120,
    opacity: 0.07,
  },
  chip: {
    position: "absolute",
    top: 20,
    left: 22,
    backgroundColor: "rgba(255,122,69,0.16)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipTexto: {
    color: "#FF7A45",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  expresion: {
    color: "#7F8796",
    fontSize: 22,
    textAlign: "right",
    marginBottom: 4,
  },
  resultado: {
    color: "#FFFFFF",
    fontSize: 68,
    fontWeight: "300",
    textAlign: "right",
  },
  resultadoError: {
    color: "#FF6B6B",
    fontSize: 40,
  },
  fondo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "flex-end",
  },
  hoja: {
    maxHeight: "70%",
    backgroundColor: "#13151B",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 28,
  },
  agarre: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2E323C",
    marginBottom: 16,
  },
  cabecera: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titulo: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  borrar: { color: "#FF6B6B", fontSize: 13, fontWeight: "600" },
  vacio: {
    color: "#7F8796",
    textAlign: "center",
    paddingVertical: 36,
    fontSize: 14,
  },
  fila: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1F222A",
  },
  filaExpresion: { color: "#7F8796", fontSize: 14, textAlign: "right" },
  filaResultado: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "300",
    textAlign: "right",
    marginTop: 2,
  },
  pista: {
    color: "#5A6270",
    fontSize: 12,
    textAlign: "center",
    marginTop: 14,
  },
});