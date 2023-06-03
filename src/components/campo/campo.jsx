import { useState } from 'react';
import './campoTexto.css';
import { BiSearchAlt2 } from 'react-icons/bi';

export const Campo = ({placeholder, type='text', cambiarValor, valor, obtenerDatos, titulo, ad, required, isLoading}) => {
  const placeholderModificado = `${placeholder}...`;
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    cambiarValor(e.target.value);
    setError(false);
  };

  const handleClick = () => {
    if (valor !== '' && valor.includes('tiktok')) {
      obtenerDatos(valor);
      setError(false);
    } else {
      setError(true); 
    }
  };

  return (
    <div className={`campo campo-${type}`}>
      <label>{titulo}<span className='ad'>{ad}</span></label>
      {error && <span className="error-message">¡Ingrese un enlace válido de TikTok!</span>}
      <div>
        {type === 'textarea' ? (
          <textarea
            placeholder={placeholderModificado}
            required={required}
            value={valor}
            onChange={handleChange}
          />
        ) : (
          <input
            type={type}
            autoCapitalize='sentences' // Establecer autoCapitalize en 'sentences'
            placeholder={placeholderModificado}
            required={required}
            value={valor}
            onChange={handleChange}
          />
        )}
        {titulo === 'Link del video' && (
          <>
            {isLoading ? (
              <div className="dot-spinner">
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
              </div>
            ) : (
              <BiSearchAlt2
                onClick={handleClick}
                className="search-icon"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
