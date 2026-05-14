import { useState } from 'react'
import './App.css'



function App() {

  // --- ESTADO (Variables que React vigila) ---
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail]         = useState('');
  const [message, setMessage]   = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = "http://localhost:8081/auth";

  // --- LÓGICA (JS Tradicional con Fetch) ---
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitamos que la página se refresque
    
  setIsLoading(true); // 🚀 ACTIVAMOS la pantalla de carga
  setMessage('');     // Limpiamos mensajes previos

    const endpoint = isLoginMode ? 'login' : 'register';
    
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email  })
      });

    // Simulamos un pequeño retraso de 1 segundo para que se vea la modal 
    // (opcional, solo para pruebas porque los microservicios locales son muy rápidos)
    await new Promise(resolve => setTimeout(resolve, 1000));      

      if (response.ok) {
        if (isLoginMode) {
          const token = await response.text();
          localStorage.setItem('token', token);
          setIsLogged(true);
          setMessage("✅ Login exitoso.");
        } else {
          setMessage("✅ Registro completado. ¡Ahora haz login!");
          setIsLoginMode(true); // Pasamos automáticamente al modo login
        }
      } else {
        setMessage("❌ Algo ha fallado. Revisa tus datos.");
      }
    } catch (error) {
      setMessage("⚠️ Error de conexión con el servidor Java.");
    }finally {
      setIsLoading(false); // ✅ DESACTIVAMOS la carga (pase lo que pase)
    }




  };

  // --- INTERFAZ (JSX / "HTML") ---
  return (
    <div className="container">

      {/* MODAL DE CARGA: Solo se ve si isLoading es true */}
    {isLoading && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="spinner"></div>
          <p>Procesando datos, por favor espere...</p>
        </div>
      </div>
    )}
    
      <header>
        <h1>{isLogged ? "Panel de Usuario" : "Acceso al Sistema"}</h1>
      </header>

      {!isLogged ? (
        <main className="card">
          {/* Usamos un FORMULARIO real */}
          <form onSubmit={handleSubmit}>
            <h2>{isLoginMode ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
            
            <div className="input-group">
              <label>Usuario</label>
              <input 
                type="text" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Ej: paco_dev"
              />
            </div>

            <div className="input-group">
              <label>Mail</label>
              <input 
                type="text" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Ej: paco_dev"
              />
            </div>            

            <div className="input-group">
              <label>Contraseña</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary">
              {isLoginMode ? 'Entrar' : 'Registrarse'}
            </button>
          </form>

          <button 
            className="btn-switch" 
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Haz login'}
          </button>
        </main>
      ) : (
        <section className="card success">
          <h2>🎉 Bienvenido, {username}</h2>
          <p>Tu token JWT está guardado de forma segura.</p>
          <button onClick={() => { localStorage.removeItem('token'); setIsLogged(false); }}>
            Cerrar Sesión
          </button>
        </section>
      )}

      {message && <footer className="feedback">{message}</footer>}
    </div>

    
  )


}

export default App