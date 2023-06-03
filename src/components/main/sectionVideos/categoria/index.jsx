import './categoria.css'

export function Categoria({datos}) {
    const {color, titulo}=datos
  return (
    <div className='categoria' style={{background:color}}>
      <h2>{titulo}</h2>
    </div>
  )
}