import * as Haptics from "expo-haptics";

export const ERROR = "Error 💥";

export type ClaveOperador = "+" | "−" | "×" | "÷";

export type Registro = {
  id: number;
  expresion: string;
  resultado: string;
};

type Operador = {
  emoji: string;
  nombre: string;
  aplicar: (a: number, b: number) => number | null;
};

// Cada operación vive aquí: símbolo, emoji, nombre y su función.
export const OPERADORES: Record<ClaveOperador, Operador> = {
  "+": { emoji: "➕", nombre: "SUMA", aplicar: (a, b) => a + b },
  "−": { emoji: "➖", nombre: "RESTA", aplicar: (a, b) => a - b },
  "×": { emoji: "✖️", nombre: "MULTIPLICACIÓN", aplicar: (a, b) => a * b },
  "÷": {
    emoji: "➗",
    nombre: "DIVISIÓN",
    aplicar: (a, b) => (b === 0 ? null : a / b),
  },
};

export const PORCENTAJE = { emoji: "🎯", nombre: "PORCENTAJE" };

export function esOperador(v: string): v is ClaveOperador {
  return Object.prototype.hasOwnProperty.call(OPERADORES, v);
}

// Evita cosas como 0.1 + 0.2 = 0.30000000000000004
export function formatear(n: number | null): string {
  if (n === null || !Number.isFinite(n)) return ERROR;
  return String(parseFloat(n.toPrecision(12)));
}

// Estilo teléfono: 200 + 10% = 200 + 20
export function calcularPorcentaje(
  base: number | null,
  valor: number,
  op: ClaveOperador | null
): number {
  if (base !== null && (op === "+" || op === "−")) return (base * valor) / 100;
  return valor / 100;
}

// Vibración: cada tipo de pulsación tiene su propia sensación
export const vibrar = {
  tecla: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  },
  operador: () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  },
  resultado: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
  },
  error: () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
      () => {}
    );
  },
};