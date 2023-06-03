import { AiFillCheckCircle } from 'react-icons/ai';
import './boton.css'

export const Boton = ({showText, children}) => {  

  return (
    <button className='boton'>
     {showText ? (
        <>
          Video Agregado <AiFillCheckCircle className='check-icon'/>
        </>
      ) : (
        children
      )}
    </button>
  );
};