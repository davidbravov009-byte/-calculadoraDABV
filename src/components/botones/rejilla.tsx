
import { View, StyleSheet } from "react-native";
import Boton from "./boton";

type BotonDato = {
  texto: string;
  color?: string;
  colorTexto?: string;
  ancho?: number;
};

const botones: BotonDato[][] = [
  [
    { texto: "AC", color: "#39414C", colorTexto: "#FFFFFF" },
    { texto: "DEL", color: "#39414C", colorTexto: "#FFFFFF" },
    { texto: "%", color: "#39414C", colorTexto: "#FFFFFF" },
    { texto: "÷", color: "#1769FF" },
  ],
  [
    { texto: "7" },
    { texto: "8" },
    { texto: "9" },
    { texto: "×", color: "#1769FF" },
  ],
  [
    { texto: "4" },
    { texto: "5" },
    { texto: "6" },
    { texto: "−", color: "#1769FF" },
  ],
  [
    { texto: "1" },
    { texto: "2" },
    { texto: "3" },
    { texto: "+", color: "#1769FF" },
  ],
  [
    { texto: "0", ancho: 2 },
    { texto: "." },
    { texto: "=", color: "#FFFFFF", colorTexto: "#111820" },
  ],
];

export default function Rejilla() {
  return (
    <View style={styles.contenedor}>
      {botones.map((fila, indice) => (
        <View style={styles.fila} key={indice}>
          {fila.map((boton, i) => (
            <Boton
              key={i}
              texto={boton.texto}
              color={boton.color}
              colorTexto={boton.colorTexto}
              ancho={boton.ancho}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 9,
    paddingBottom: 8,
  },
  fila: {
    flexDirection: "row",
  },
});
