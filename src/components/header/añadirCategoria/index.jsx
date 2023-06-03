import { useState } from "react"
import { Campo } from "../../campo/campo"
import './añadirCategoria.css'
import { Boton } from "../../boton/boton";
import { getFirestore, collection, addDoc,doc,  updateDoc, deleteDoc } from 'firebase/firestore';
import { AiFillDelete } from 'react-icons/ai';
import { MdModeEdit } from 'react-icons/md';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    maxHeight: '87vh',
    overflowY: 'auto',
  };

export default function AñadirCategoria({setOpenCat, openCat, categorias}) {
    const [titulo, setTitulo] = useState('');
    const [color, setColor] = useState('#000000')
    const [editIndex, setEditIndex] = useState(-1);
    const [newTitulo, setNewTiulo] = useState('')
    const [newColor, setNewColor] = useState('')
    const [deleted, setDeleted] = useState(false);

    const handleCloseCat = () => setOpenCat(false);

    const addCategoria = async (e) => {

        console.log(e)
        let datosCategoria = {
            titulo,
            color
        }
        e.preventDefault()
        try {
            const query = getFirestore();
            const docRef = await addDoc(collection(query, "categorias"), datosCategoria);
            console.log("Documento agregado con ID: ", docRef.id);
            handleCloseCat()
        } catch (error) {
            console.error("Error al agregar el documento: ", error);
        }
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        setNewTiulo(categorias[index].titulo);
        setNewColor(categorias[index].color);
    };


    const handleSaveClick = (index, id) => {
        categorias[index].titulo = newTitulo;
        categorias[index].color = newColor
        setEditIndex(-1);
        modificarDocumento(id)
    };

    const modificarDocumento = async (id) => {
        try {
          const query = getFirestore();
          const documentoRef = doc(query, 'categorias', id);
          await updateDoc(documentoRef, { 
            titulo: newTitulo,
            color: newColor
         });
          console.log('Documento modificado exitosamente');
        } catch (error) {
          console.error('Error al modificar el documento:', error);
        }
      };

      const eliminarCategoria = async (id) => {
        try {
          const query = getFirestore();
          const documentRef = doc(query, 'categorias', id);
          await deleteDoc(documentRef);
          setDeleted(true);
        } catch (error) {
          console.error('Error al eliminar el video:', error);
        }
      };


    return (

        <Modal
        open={openCat}
        onClose={handleCloseCat}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className="añadirCat">
            <form onSubmit={addCategoria}>
                <h1>Agregar Categoria</h1>

                <Campo
                    titulo="Nombre de la categoria"
                    placeholder="Ingresar Nombre"
                    required={true}
                    cambiarValor={setTitulo}
                />

                <Campo
                    titulo="Color de la categoria"
                    required={true}
                    valor={color}
                    cambiarValor={setColor}
                    type='color'
                />

                <Boton>Agregar Categoria</Boton>
            </form>

            {categorias.length>0 && <div className="editarCat">
            
                {categorias.map(({ id, titulo, color }, index) => <div className="editando" key={index}>
                    {editIndex === index ? (<>
                        <input
                        className="nombre-input"
                            type="text"
                            value={newTitulo}
                            onChange={(e) => setNewTiulo(e.target.value)}
                        />

                        <input 
                            className="color-input" 
                            type="color" 
                            value={newColor} 
                            onChange={(e) => setNewColor(e.target.value)}/>
                        <span>
                            <button className="update" onClick={() => handleSaveClick(index, id)}>Guardar</button>
                            <button className="delete" onClick={() => setEditIndex(-1)}>Cancelar</button>
                        </span>
                    </>
                    ) : (
                        <>
                            <p key={index}>{titulo}</p>
                            <div
                                className="color-circle"
                                style={{ backgroundColor: color }}
                            ></div>
                            
                            <span>
                                <MdModeEdit
                                    className="update"
                                    onClick={() => handleEditClick(index)}
                                />
                                <AiFillDelete onClick={()=>eliminarCategoria(id)} className="delete" />
                            </span>
                        </>
                    )}


                </div>)}
            </div>}
        </div>
        </Box>
      </Modal>

        
    )
}