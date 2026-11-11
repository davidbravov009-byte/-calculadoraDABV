import { Pressable, StyleSheet, Text } from "react-native";

interface BotonProps {
  texto: string;
  emoji?: string;
  color?: string;
  colorTexto?: string;
  ancho?: number;
  activo?: boolean;
  onPress?: () => void;
}

export default function Boton({
  texto,
  emoji,
  color = "#181A20",
  colorTexto = "#FFFFFF",
  ancho = 1,
  activo = false,
  onPress,
}: BotonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.boton,
        {
          backgroundColor: activo ? "#FFFFFF" : color,
          flex: ancho,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.94 : 1 }],
        },
      ]}
    >
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text style={[styles.texto, { color: activo ? "#FF7A45" : colorTexto }]}>
        {texto}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    height: 72,
    margin: 5,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    fontSize: 28,
    fontWeight: "500",
  },
  emoji: {
    position: "absolute",
    top: 7,
    right: 11,
    fontSize: 12,
  },
});