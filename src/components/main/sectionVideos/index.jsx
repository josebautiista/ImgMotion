import { Categoria } from './categoria'
import { Video } from '../video'
import './sectionVideos.css'

export default function SectionVideos({videos, categoria}) {
    const videosFiltrados = videos.filter(video=> video.categoria===categoria.titulo)
    return (<>
        <Categoria datos={categoria}/>
        <section className='contenedorCategorias'>

            {videosFiltrados.map((video, index) =>
                <Video
                    videos={video}
                    key={index}
                    fondo={categoria.color}
                />)
            }
        </section>
        </>
    )
}