
import { Text, Pressable, StyleSheet } from "react-native";

interface BotonProps {
  texto: string;
  color?: string;
  colorTexto?: string;
  ancho?: number;
}

export default function Boton({
  texto,
  color = "#222831",
  colorTexto = "#FFFFFF",
  ancho = 1,
}: BotonProps) {
  return (
    <Pressable
      style={[
        styles.boton,
        {
          backgroundColor: color,
          flex: ancho,
        },
      ]}
    >
      <Text style={[styles.texto, { color: colorTexto }]}>
        {texto}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    height: 65,
    margin: 5,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#343B45",
  },
  texto: {
    fontSize: 23,
    fontWeight: "700",
  },
});
