import { StyleSheet, View } from "react-native";
import { ClaveOperador, OPERADORES, PORCENTAJE } from "../../logica/motor";
import Boton from "./boton";

type BotonDato = {
  valor: string; // lo que recibe la calculadora
  texto?: string; // lo que se ve en el botón (si es distinto)
  emoji?: string;
  color?: string;
  colorTexto?: string;
  ancho?: number;
};

const FUNCION = "#252831";
const MENTA = "#7CF0C4";
const NARANJA = "#FF7A45";
const FONDO = "#0D0E12";

const operacion = (c: ClaveOperador): BotonDato => ({
  valor: c,
  emoji: OPERADORES[c].emoji,
  color: NARANJA,
});

const botones: BotonDato[][] = [
  [
    { valor: "AC", emoji: "🧹", color: FUNCION, colorTexto: MENTA },
    { valor: "DEL", texto: "⌫", color: FUNCION, colorTexto: MENTA },
    { valor: "%", emoji: PORCENTAJE.emoji, color: FUNCION, colorTexto: MENTA },
    operacion("÷"),
  ],
  [{ valor: "7" }, { valor: "8" }, { valor: "9" }, operacion("×")],
  [{ valor: "4" }, { valor: "5" }, { valor: "6" }, operacion("−")],
  [{ valor: "1" }, { valor: "2" }, { valor: "3" }, operacion("+")],
  [
    { valor: "0", ancho: 2 },
    { valor: "." },
    { valor: "=", emoji: "✨", color: MENTA, colorTexto: FONDO },
  ],
];

interface RejillaProps {
  onPresionar: (valor: string) => void;
  operadorActivo: ClaveOperador | null;
}

export default function Rejilla({ onPresionar, operadorActivo }: RejillaProps) {
  return (
    <View style={styles.contenedor}>
      {botones.map((fila, indice) => (
        <View style={styles.fila} key={indice}>
          {fila.map((b) => (
            <Boton
              key={b.valor}
              texto={b.texto ?? b.valor}
              emoji={b.emoji}
              color={b.color}
              colorTexto={b.colorTexto}
              ancho={b.ancho}
              activo={b.valor === operadorActivo}
              onPress={() => onPresionar(b.valor)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 11,
  },
  fila: {
    flexDirection: "row",
  },
});