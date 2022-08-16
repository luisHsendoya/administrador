import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner';


function VerCliente() {
    const {id}= useParams();
    const [verCliente,setVerCliente] =useState({});
    const [cargando, setCargando]=useState(true);


    useEffect(()=>{
      
        const obtenerverClienteApi=async ()=>{
            try {
                const url=`http://localhost:4000/clientes/${id}`
                const respuesta= await fetch(url)
                const data= await respuesta.json();
                setVerCliente(data)

            } catch (error) {
                console.log(error);
                
            }
            setTimeout(() => {
                setCargando(!cargando)
                
            }, 1000);

        }
        
        

        obtenerverClienteApi()

    },[])
  return (
   <>
    { cargando ? <Spinner/>: Object.keys(verCliente).length===0 ? <p className='text-4xl font-bold text-center'>No hay resultados</p>: (
        <>
            <h1 className='font-black text-4xl text-blue-900 mt-10'>Ver Cliente</h1>
            <p className='mt-3'>Informacion del Cliente</p>

        
            <p className='text-2xl text-gray-800 mt-4'><span className='uppercase font-bold text-gray-500 '>verCliente:</span> {verCliente.nombre}</p>
            <p className='text-2xl text-gray-800 mt-4'><span className='uppercase font-bold text-gray-500 '>Empresa:</span> {verCliente.empresa}</p>
            <p className='text-2xl text-gray-800 mt-4'><span className='uppercase font-bold text-gray-500 '>Email:</span> {verCliente.email}</p>
            {verCliente.telefono && (<p className='text-2xl text-gray-800 mt-4'><span className='uppercase font-bold text-gray-500 '>Telefono:</span> {verCliente.telefono}</p>)}  
            {verCliente.notas && (<p className='text-2xl text-gray-800 mt-4'><span className='uppercase font-bold text-gray-500 '>Notas:</span> {verCliente.notas}</p>
)}
    </>
        
    )
  }
   
   </>

   
  )
}

export default VerCliente