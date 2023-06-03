import "./listaOpciones.css";

export const ListaOpciones =({setValor, valor, categorias})=>{

    const manejarCambio=(e)=>{
        setValor(e.target.value)
    }

    return <div className="lista-opciones">
        <label>Categoria</label>
        <select value={valor} onChange={manejarCambio} required>
            <option
                value=''
                disabled
                defaultValue=''
                hidden
            >Seleccionar Categoria</option>
            {categorias.map((categoria, index)=> <option value={categoria.titulo} key={index}>{categoria.titulo}</option>)}
        </select>
    </div>
}