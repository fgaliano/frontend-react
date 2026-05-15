// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginVista from './vistas/Login'; // <--- IMPORTAMOS LA VISTA REAL
import './App.css';

// Dejamos estas como placeholders por ahora
const Home = () => <h2>🏠 Bienvenidos al Sistema</h2>;
const Registro = () => <h2>📝 Formulario de Registro (Siguiente paso)</h2>;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <Link to="/">Inicio</Link>&nbsp;
          <Link to="/login">Login</Link>&nbsp;
          <Link to="/registro">Registro</Link>
        </nav>

        <main className="contenido">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginVista />} /> {/* <--- USAMOS LA VISTA */}
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;