import './video.css';
import { AiFillDelete } from 'react-icons/ai';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

export function Video({videos, fondo}) {
  const { titulo, id, miniatura, link } = videos;

  const eliminarVideo = async (id) => {
    try {
      const query = getFirestore();
      const documentRef = doc(query, 'videos', id);
      await deleteDoc(documentRef);
    } catch (error) {
      console.error('Error al eliminar el video:', error);
    }
  };

  return (
    <div className='tarjetaVideos' style={{ background: fondo + '99' }}>
      <a href={link} target="_blank"><img src={miniatura} alt='miniatura' /></a>
      <div>
      <h1>{titulo}</h1>
        <AiFillDelete className='delete' onClick={() => eliminarVideo(id)} />
      </div>
    </div>
  );
}