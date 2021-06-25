import React, {useState, useEffect} from 'react';
import './styleComponents.css';

const PalabraForm = (props) => {

    // Estado inicial o vacio del componente.
    const estadoVacio = {
        palabra: '',
        definicion: '',
        color: '#494848'
    }

    // Asignamos el estado del componente.
    const [valores, setValores] = useState(estadoVacio);

    //Modificamos el estado cada vez que un input cambie.
    const inputModificado = evento => {
        const {name, value} = evento.target;
        setValores({...valores, [name]: value});
    }

    const enviarPalabra = (evento) => {
        evento.preventDefault(); //Para no recargar la página.
        
        props.AgregarPalabra(valores);
        setValores(estadoVacio);
    }
 
    const buscarPorId = id =>{
        props.listPalabras.map( tmpP => {
            if(tmpP.id === id){
                setValores(tmpP);
            }
        })
    }
    useEffect(() => {
        if(props.idModificar !== ''){
            buscarPorId(props.idModificar);
        } else{
            setValores(estadoVacio);
        }
    }, [props.idModificar]);

    return(
        <div className="formContenedor">
            <h2>Registro de Palabras</h2>
            <form onSubmit={enviarPalabra}>
                <div className="inputBox">
                    <input 
                        type="text" 
                        name='palabra'
                        value={valores.palabra}
                        onChange={inputModificado}
                        required='required'
                    />
                    <span>Palabra:</span>
                </div>
                <div className="inputBox">
                    <textarea 
                        type="text" 
                        name='definicion'
                        value={valores.definicion}
                        onChange={inputModificado}
                        required='required'
                    />
                    <span>Definición:</span>
                </div>
                <div className="inputBoxColor">
                    <p>Color:</p>
                    <input 
                        type="color" 
                        name='color'
                        value={valores.color}
                        onChange={inputModificado}
                        required='required'
                    />
                </div>
                <div className="inputBox">
                    <input type="submit" value="Guardar"/>
                </div>
            </form>
        </div>
    );

}

export default PalabraForm;