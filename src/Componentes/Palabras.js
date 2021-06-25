import React, {useState, useEffect} from 'react';
import PalabraForm from './PalabraForm';
import {db} from '../firebase';
import './styleComponents.css';

const Palabras = () => {

    // Estado del componente
    const [listPalabras, setListPalabras] = useState([]);
    const [ultimoOrden, setUltimoOrden] = useState(1);
    const [idModificar, setIdModificar] = useState('');
    //Agrega la palabra a Firebase
    const AgregarPalabra = async (palabra) => {
        try {
            if(idModificar === ''){
                await db.collection('Palabras').doc().set(palabra);
            } else{
                await db.collection('Palabras').doc(idModificar).update(palabra);
                setIdModificar('');
            }
        } catch (error) {
            console.erro(error);
        }
    }

    //Ingresa los datos de la palabra en el formulario para ser editada.
    const editarPalabra = id => {
        setIdModificar(id);
    }

    //Elimina una palabra por su ID
    const elimiarPalabra = async (id) => {
        if (window.confirm("¿Estas seguro que quieres eliminar la palabra?")){
            await db.collection('Palabras').doc(id).delete();
            console.log("Tarea Eliminada");
        }
    }

    //Busca si la frease ingresada está contenida en alguna palabra
    //En caso de ser true, la ingresa en una nueva lista.
    const buscarPalabra = async (evento) => {
        await db.collection('Palabras').onSnapshot(querySnapshot => {
            const PalabrasIncluidas = [];
            const frase = evento.target.value;
            querySnapshot.forEach( (tmpP) => {
                if(tmpP.data().palabra.toLocaleLowerCase().includes(frase.toLocaleLowerCase())){
                    PalabrasIncluidas.push({...tmpP.data(), id: tmpP.id});
                }
            });
            setListPalabras(PalabrasIncluidas);
        })
    }

    //Obtinene las palabras de Firebase al iniciar la App
    const getPalabras = async () => {
        await db.collection('Palabras').onSnapshot((querySnapshot) => {
            const docPalaras = [];
            querySnapshot.forEach(palabra => {
                docPalaras.push({...palabra.data(), id: palabra.id});
            });
            //Agregamos las palabras al estado del componente
            setListPalabras(docPalaras);
        })
    } 

    // Orden = 1 -> Orden alfabetico ascendente.
    // Orden = -1 -> Orden alfabetico descendente.
    // Ordena objetos de palabras 
    const ordenarArray = orden => {
        let tmpPalabras = [...listPalabras];
        tmpPalabras.sort( (a, b) => {
            if(a.palabra.toLocaleLowerCase() > b.palabra.toLocaleLowerCase()){
                return 1*orden;
            } 
            if(a.palabra.toLocaleLowerCase() < b.palabra.toLocaleLowerCase()){
                return -1*orden;
            } 
            return 0;
        });
        setListPalabras(tmpPalabras);
        setUltimoOrden(orden);
    }

    useEffect(() => {
        getPalabras();  
    }, [])

    //Retorno del Componente
    return (
        <div className="contenedor">
            <PalabraForm {...{AgregarPalabra, idModificar, listPalabras}}/>
            
            <div className="menuBox">
                    <h2>{listPalabras.length}</h2>
                <div className="buscadorBox">
                    <input 
                    type="text"
                    placeholder="Buscar"
                    onChange={buscarPalabra} />
                </div>
                <div className="buttonsBox">
                    <button onClick={() =>{
                        ordenarArray(1)
                    }}>
                        <i class="material-icons buildIcon" title="Orden Ascendente">arrow_upward</i>
                    </button>
                    <button onClick={() =>{
                        ordenarArray(-1)
                    }}>
                        <i class="material-icons buildIcon" title="Orden Descendente">arrow_downward</i>
                    </button>
                </div>
            </div>

            <div className="ContenedorPalabras">
                {
                    listPalabras.map( palabra => (
                        <div className="palabraBox" key={palabra.id}>
                            <div className="titleBox">
                                <h2>{palabra.palabra}</h2>
                            </div>
                            <div 
                                className="contendBox" 
                                style={{background: palabra.color}}>
                                    <h3>{palabra.palabra}</h3>
                                    <p>{palabra.definicion}</p>
                                    <div className="iconsBox">
                                        <i 
                                            class="material-icons deleteIcon"
                                            title="Eliminar"
                                            onClick={() => {
                                                elimiarPalabra(palabra.id);
                                            }}
                                        >delete_forever</i>
                                        <i 
                                            class="material-icons buildIcon"
                                            title="Editar"
                                            onClick={() => {
                                                editarPalabra(palabra.id); window.scrollTo(0, 0);;
                                            }}
                                        >build</i>
                                    </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Palabras;
