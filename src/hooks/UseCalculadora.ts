import { useState } from "react";
import {
    ClaveOperador,
    ERROR,
    OPERADORES,
    PORCENTAJE,
    Registro,
    calcularPorcentaje,
    esOperador,
    formatear,
    vibrar,
} from "../logica/motor";

const MAX_DIGITOS = 12;
const MAX_HISTORIAL = 50;

export function useCalculadora() {
  const [entrada, setEntrada] = useState("0");
  const [acumulado, setAcumulado] = useState<number | null>(null);
  const [operador, setOperador] = useState<ClaveOperador | null>(null);
  const [esperandoNuevo, setEsperandoNuevo] = useState(false);
  const [expresion, setExpresion] = useState("");
  const [historial, setHistorial] = useState<Registro[]>([]);
  const [vibracionActiva, setVibracionActiva] = useState(true);

  const enError = entrada === ERROR;

  const sonar = (tipo: "tecla" | "operador" | "resultado" | "error") => {
    if (vibracionActiva) vibrar[tipo]();
  };

  const reiniciar = () => {
    setEntrada("0");
    setAcumulado(null);
    setOperador(null);
    setEsperandoNuevo(false);
    setExpresion("");
  };

  const fallar = (texto: string) => {
    sonar("error");
    setEntrada(ERROR);
    setAcumulado(null);
    setOperador(null);
    setEsperandoNuevo(true);
    setExpresion(texto);
  };

  const escribirDigito = (d: string) => {
    if (esperandoNuevo) {
      if (operador === null) setExpresion(""); // venimos de un "="
      setEntrada(d);
      setEsperandoNuevo(false);
      return;
    }
    if (entrada.replace(/[-.]/g, "").length >= MAX_DIGITOS) return;
    setEntrada(entrada === "0" ? d : entrada + d);
  };

  const escribirPunto = () => {
    if (esperandoNuevo) {
      if (operador === null) setExpresion("");
      setEntrada("0.");
      setEsperandoNuevo(false);
      return;
    }
    if (!entrada.includes(".")) setEntrada(entrada + ".");
  };

  const borrar = () => {
    if (esperandoNuevo) return;
    const nuevo = entrada.slice(0, -1);
    setEntrada(nuevo === "" || nuevo === "-" ? "0" : nuevo);
  };

  const elegirOperador = (op: ClaveOperador) => {
    const actual = parseFloat(entrada);
    let base = actual;

    if (operador !== null && acumulado !== null) {
      if (esperandoNuevo) {
        base = acumulado; // solo cambió de operador
      } else {
        const r = OPERADORES[operador].aplicar(acumulado, actual);
        if (r === null) {
          fallar("");
          return;
        }
        base = r; // encadenar: 2 + 3 × ...
      }
    }

    setAcumulado(base);
    setOperador(op);
    setEsperandoNuevo(true);
    setEntrada(formatear(base));
    setExpresion(`${formatear(base)} ${OPERADORES[op].emoji} ${op}`);
  };

  const guardarEnHistorial = (texto: string, valor: string) => {
    setHistorial((prev) =>
      [{ id: Date.now(), expresion: texto, resultado: valor }, ...prev].slice(
        0,
        MAX_HISTORIAL
      )
    );
  };

  const porcentaje = () => {
    const valor = parseFloat(entrada);
    const r = calcularPorcentaje(
      operador !== null ? acumulado : null,
      valor,
      operador
    );
    setEntrada(formatear(r));
    setEsperandoNuevo(operador === null);
    if (operador === null) {
      const texto = `${formatear(valor)}% ${PORCENTAJE.emoji}`;
      setExpresion(texto);
      guardarEnHistorial(texto, formatear(r));
    }
  };

  const igual = () => {
    if (operador === null || acumulado === null) return;
    const derecha = esperandoNuevo ? acumulado : parseFloat(entrada);
    const { aplicar, emoji } = OPERADORES[operador];
    const texto = `${formatear(acumulado)} ${emoji} ${operador} ${formatear(derecha)} =`;
    const r = aplicar(acumulado, derecha);

    if (r === null) {
      fallar(texto);
      return;
    }

    sonar("resultado");
    setExpresion(texto);
    setEntrada(formatear(r));
    guardarEnHistorial(texto, formatear(r));
    setAcumulado(null);
    setOperador(null);
    setEsperandoNuevo(true);
  };

  // Tocar un resultado del historial lo trae de vuelta a la pantalla
  const usarResultado = (valor: string) => {
    sonar("tecla");
    setEntrada(valor);
    if (operador !== null) {
      setEsperandoNuevo(false);
    } else {
      setEsperandoNuevo(true);
      setExpresion("");
    }
  };

  const borrarHistorial = () => {
    sonar("operador");
    setHistorial([]);
  };

  const pulsar = (valor: string) => {
    if (valor === "AC") {
      sonar("operador");
      reiniciar();
    } else if (/^\d$/.test(valor)) {
      sonar("tecla");
      escribirDigito(valor);
    } else if (valor === ".") {
      sonar("tecla");
      escribirPunto();
    } else if (enError) {
      // con error solo se puede escribir un número nuevo o AC
    } else if (valor === "DEL") {
      sonar("tecla");
      borrar();
    } else if (valor === "%") {
      sonar("operador");
      porcentaje();
    } else if (valor === "=") {
      igual();
    } else if (esOperador(valor)) {
      sonar("operador");
      elegirOperador(valor);
    }
  };

  return {
    expresion: expresion === "" ? "0" : expresion,
    resultado: entrada,
    modo:
      operador !== null
        ? `${OPERADORES[operador].nombre} ${OPERADORES[operador].emoji}`
        : null,
    operadorActivo: esperandoNuevo ? operador : null,
    historial,
    vibracionActiva,
    alternarVibracion: () => setVibracionActiva((v) => !v),
    usarResultado,
    borrarHistorial,
    pulsar,
  };
}