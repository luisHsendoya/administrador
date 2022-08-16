import {useNavigate} from 'react-router-dom'

function Cliente({cliente, handleEliminar}) {

    const navigate=useNavigate()
    const {nombre,empresa,email,telefono,id}=cliente;
  return (
    <tr className='border-b hover:bg-gray-100'>
        <td className='p-3'>{nombre}</td>
        <td className='p-3'>
            <p><span className='px-2 text-gray-800 font-bold uppercase'>Email:</span>{email}</p>
            <p><span className='text-gray-800 font-bold uppercase'>Telefono:</span>{telefono}</p>
        </td> 

        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            <button onClick={()=>navigate(`/clientes/${id}`)} className='bg-green-400  hover:bg-green-500 block w-full text-white p-2 uppercase font-bold text-xs' type='button'>Ver</button>

            <button  onClick={()=>navigate(`/clientes/editar/${id}`)} className='bg-yellow-400  hover:bg-yellow-500 block w-full text-white p-2 uppercase font-bold text-xs mt-2' type='button'>Editar</button>
            <button onClick={()=>handleEliminar(id)} className='bg-red-600  hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-2' type='button'>Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente