import Formulario from "../components/Formulario"
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'



function EditarCliente() {
  const {id}= useParams();
  const [verCliente,setVerCliente] =useState({});
  const [cargando, setCargando]=useState(true);


  useEffect(()=>{
    
      const obtenerverClienteApi=async ()=>{
          try {
              const url=`${import.meta.env.VITE_API_URL}/${id}`
              const respuesta= await fetch(url)
              const data= await respuesta.json();
              setVerCliente(data)

          } catch (error) {
              console.log(error);
              
          }
          setTimeout(() => {
              setCargando(!cargando)
              
          }, 500);

      }
      
      

      obtenerverClienteApi()

  },[])


  return (
    <>
      {verCliente?.nombre? (
        
      <> 
        <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza este formulario para editar datos del cliente</p>
      
        <Formulario verCliente={verCliente}
                  cargando={cargando}/>
      
      </>
      ) : 
      <p className='text-4xl font-bold text-center'>No existe el cliente</p>}
    </>
  )
}

export default EditarCliente