import { useState } from 'react';
import AgregarVideo from './agregarVideo';
import './header.css'
import { MdOndemandVideo } from 'react-icons/md'
import AñadirCategoria from './añadirCategoria';

export const Header = ({ videos, categorias }) => {

  const [openVid, setOpenVid] = useState(false);
  const [openCat, setOpenCat] = useState(false);


  const handleOpenCat = () => setOpenCat(true);
  const handleOpenVid = () => setOpenVid(true);
  return (
    <header>
        <div>
          <MdOndemandVideo className='icon' />
          <p>ImgMotion</p>
        </div>
      <section>
        <button className='agregar vid' onClick={handleOpenVid}>Nuevo Video</button>
        <button className='agregar' onClick={handleOpenCat}>Nueva Categoria</button>
      </section>
      <AgregarVideo videos={videos} categorias={categorias} openVid={openVid} setOpenVid={setOpenVid}/>
      <AñadirCategoria categorias={categorias} openCat={openCat} setOpenCat={setOpenCat}/>
    </header>
    

  );
}
