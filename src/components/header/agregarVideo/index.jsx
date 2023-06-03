import { Boton } from '../../boton/boton';
import { Campo } from '../../campo/campo';
import { ListaOpciones } from './lista_opciones';
import './agregarVideo.css';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  maxHeight: '87vh',
  overflowY: 'auto',
};

export default function AgregarVideo({setOpenVid, openVid, categorias}) {

  const [descripcion, setDescripcion] = useState('');
  const [miniatura, setMiniatura] = useState('');
  const [link, setLink] = useState('');
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria]=useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleCloseVid = () => setOpenVid(false);

  const obtenerDatos = (urlE) => {

    setIsLoading(true);
      const oEmbedUrl = `https://www.tiktok.com/oembed?url=${urlE}`;
      fetch(oEmbedUrl)
        .then(response => response.json())
        .then(oEmbedData => {
          setDescripcion(oEmbedData.title);
          const { thumbnail_url } = oEmbedData;
          setMiniatura(thumbnail_url);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
      setIsLoading(false);

  };


  const añadirVideo = async (datosVideo) => {
    try {
      const query = getFirestore();
      const docRef = await addDoc(collection(query, "videos"), datosVideo);
      console.log("Documento agregado con ID: ", docRef.id);
      handleCloseVid()
      setDescripcion("")
    setMiniatura("")
    setLink("")
    setTitulo("")
    setCategoria("")
    } catch (error) {
      console.error("Error al agregar el documento: ", error);
    }
  };
  
  const enviarDatos = (e) => {
  e.preventDefault()
    let datosVideo = {
      link,
      titulo,
      miniatura,
      categoria,
      descripcion,
    };
  
    añadirVideo(datosVideo);
    handleClick();
  };
  
  
  const handleClick = () => {
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 2000);
  };
  
  

  useEffect(() => {
  }, []);

  return (
    <Modal
        open={openVid}
        onClose={handleCloseVid}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='formulario'>
      <form onSubmit={enviarDatos}>
        <h1 className='titulo'>Agregar Nuevo Video</h1>

        <Campo
          titulo="Link del video"
          placeholder="Ingresar el link del video"
          required={true}
          ad=' (link en formato web: https://www.tiktok.com/@usuario/video/id_video)'
          valor={link}
          obtenerDatos={obtenerDatos}
          cambiarValor={setLink}
          isLoading={isLoading}
        />

        <Campo
          titulo="Titulo"
          placeholder="Ingresa el titulo"
          required={true}
          valor={titulo}
          cambiarValor={setTitulo}
        />

        <Campo
          titulo="Link miniatura del video"
          placeholder="Ingresar link de la miniatura"
          required={true}
          valor={miniatura}
          cambiarValor={setMiniatura}
        />

        <img src={miniatura} style={{ display: miniatura ? 'inline-block' : 'none', width: '150px', height: '180px', margin: '10px auto' }} alt='' />


        <ListaOpciones
          categorias={categorias}
          valor={categoria}
          setValor ={setCategoria}
        />

        <Campo
          type="textarea"
          titulo="Descripción"
          placeholder="Ingrese la descripción"
          cambiarValor={setDescripcion}
          valor={descripcion}
        />


        <Boton
          showText={showText}
          >Agregar Video</Boton>

      </form>
    </div>
        </Box>
      </Modal>

   
  );
}