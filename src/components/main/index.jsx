import './home.css'
import SectionVideos from './sectionVideos';

export const Main = ({categorias, videos}) => {

  return (
    <section className='home'>
      {categorias.map((categoria, index) => {
        const tieneVideos = videos.some(video => video.categoria === categoria.titulo);

        if (tieneVideos) {
          return (
            <SectionVideos
              categoria={categoria}
              videos={videos}
              key={index}
            />
          );
        }

        return null;
      })}
    </section>
  );
}