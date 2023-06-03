import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/header';
import { Main } from './components/main';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { VideoHome } from './Components/videoHome';

export const App = () => {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const query = getFirestore();
        const collectionRef = collection(query, 'videos');
  
        const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });
          setVideos(data);
        });
  
        return () => unsubscribe();
      } catch (error) {
        console.error('Error al obtener los elementos:', error);
      }
    };
  
    fetchVideos();
  }, []);
  console.log(JSON.stringify(categorias))

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const query = getFirestore();
        const collectionRef = collection(query, 'categorias');

        const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
          const data = querySnapshot.docs.map((cat) => ({
            id: cat.id,
            ...cat.data()
          }));
          setCategorias(data);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error al obtener los elementos:', error);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <div>
        <Header videos={videos} categorias={categorias} />
        <VideoHome/>
        <Main categorias={categorias} videos={videos} />
    </div>
  );
};
