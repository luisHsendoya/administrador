import {useEffect, useState} from 'react'
import Cliente from '../components/Cliente';


function Inicio() {
  const [clientes, setClientes]=useState([]);
  useEffect(()=>{
    const getClienteApi=async ()=>{
      try {
        const url= 'http://localhost:4000/clientes';
        const respuesta= await fetch(url);
        const data= await respuesta.json();
        setClientes(data)
        
      } catch (error) {
        console.log(error);
        
      }

    }
    getClienteApi()

  },[])

  async function handleEliminar(id){
    const confirmar= confirm('¿Deseas eliminar este cliente?')
    if(confirmar) {
      try {
        const url= `http://localhost:4000/clientes/${id}`;
        const respuesta= await fetch(url,{
          method:'DELETE',


        })
        await respuesta.json();
        const arrayClienteS= clientes.filter(cliente=> cliente.id!== id)
        setClientes(arrayClienteS)
        
      } catch (error) {
        console.log(error);
        
      }

    }

  }
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className='mt-3'>Administra tus clientes</p>


        <table className='w-full mt-5 table-auto shadow-md bg-white'>
            <thead className='bg-blue-800 text-white'>
                <tr>
                  <th className='p-2'>Nombre</th>
                  <th className='p-2'>Contacto</th>
                  <th className='p-2'>Empresa</th>
                  <th className='p-2'>Acciones</th>
                </tr>

            </thead>
            <tbody>
              {clientes.map(cliente=>(
                <Cliente 
                key={cliente.id}
                cliente={cliente}
                handleEliminar={handleEliminar}/>

              ))}

            </tbody>
        </table>
    
    </>
  )
}

export default Inicio