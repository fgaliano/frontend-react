// 1. IMPORTACIONES (Traer herramientas de fuera)
import { useState, useCallback } from 'react';
import { Boton } from '../components/Boton';


// 2. DEFINICIÓN Y EXPORTACIÓN (Hacer la función pública)
export default function Login() {
  
  // 3. LÓGICA (Opcional: aquí vive el useState, funciones de java, etc.)
  const saludo = "Hola mundo estas en login";

// Definimos la función con useCallback
  const mensajeDeBienvenida = useCallback((texto) => {
    alert("Mensaje: " + texto);
  }, []); // Se queda fija en memoria

  function miAlerta(mensaje) {
  alert("¡Hola desde la función js!: " + mensaje);
}

  // 4. RENDERIZADO (Obligatorio: lo que el usuario ve)
  return (
    <div>
      <h1>{saludo}</h1>
      <Boton texto="Botón de prueba JS moderno" tipo="button" variante="exito" ayuda={"hola soy alt moderno"} onClick={() => mensajeDeBienvenida("¡Bienvenido!")}/>
      &nbsp;  
      <Boton texto="Botón de prueba JS antiguo" tipo="button" variante="exito" ayuda={"hola soy alt antiguo"} onClick={() => miAlerta("¡Bienvenido!")}/>
    </div>

    
  );
}