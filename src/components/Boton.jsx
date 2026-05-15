// src/components/Boton.jsx
export function Boton({ 
  texto, 
  onClick, 
  tipo = "button", 
  variante = "primario", 
  icono,
  ayuda,        // Este será nuestro 'title' (el antiguo alt)
  alEntrar,     // Para el mouseover
  alSalir       // Para el mouseout
}) {
  return (
    <button 
      type={tipo} 
      onClick={onClick} 
      onMouseEnter={alEntrar} 
      onMouseLeave={alSalir}
      title={ayuda} // Aquí el usuario verá el texto al dejar el ratón quieto
      className={`btn-personalizado ${variante}`}
    >
      {icono && <span style={{ marginRight: '8px' }}>{icono}</span>}
      {texto}
    </button>
  );
}