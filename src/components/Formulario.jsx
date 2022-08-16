import {Formik, Form,Field} from 'formik'
import * as Yup from 'yup';
import Error from './Error';
import {useNavigate} from 'react-router-dom'
import Spinner from './Spinner';


function Formulario({verCliente, cargando}) {

    const navigate= useNavigate()

    const nuevoClienteSchema= Yup.object().shape({
        nombre:Yup.string().required('El nombre del cliente es obligatorio').min(3,'nombre es muy corto').max(20, 'el nombre es muy largo'),
        empresa:Yup.string().required('La empresa del cliente es obligatorio'),
        email:Yup.string().required('El email es obligatorio').email('Email no valido'),
        telefono:Yup.number().integer('Numero no valido').positive('Numero no valido').typeError('Numero no valido'),
        notas:Yup.string()
    })


    const handleSubmit=async (values)=>{
        
       try {
        let respuesta;
        
        if(verCliente.id){
          //editando
          const url=`${import.meta.env.VITE_API_URL}/${verCliente.id}`
          respuesta= await fetch(url,{
            method:'PUT',
            headers:{
              'Content-Type':"application/json"
            },
            body: JSON.stringify(values)

          });
          


        }else{
          //nuevo registro
          const url=`${import.meta.env.VITE_API_URL}/clientes`
          respuesta= await fetch(url,{
            method:'POST',
            headers:{
              'Content-Type':"application/json"
            },
            body: JSON.stringify(values)

          });
          
        }

        await respuesta.json();
        
        navigate('/clientes')


        
       } catch (error) {
        
        console.log(error);
       }

    }
  return (

    cargando ? <Spinner/> : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-xl'>
        <h1 className='text-gray-600  font-bold text-xl uppercase text-center md:w-3/4 mx-auto'>{verCliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'}</h1>
        <Formik initialValues={{
            nombre:verCliente?.nombre ?? '',
            empresa:verCliente?.empresa ?? '',
            email:verCliente?.email ?? '',
            telefono: verCliente?.telefono ?? '',
            notas:verCliente?.notas ?? '',
        }}
            enableReinitialize={true}
            onSubmit={async (values,{resetForm})=>{
              await handleSubmit(values)
              resetForm()
            
            }}
            validationSchema={nuevoClienteSchema}
            
            >
            

            {({errors,touched}) => {
                return(
                <Form className='mt-10'>
                    <div className='mb-4'> 
                        <label className='text-gray-800 ' htmlFor="nombre">Nombre</label>
                        <Field 
                                name='nombre'
                                placeholder="Nombre del Cliente"
                                id='nombre'
                                type='text'
                                className='mt-2 block w-full  p-3 bg-gray-50'
                        />
                        {
                        errors.nombre && touched.nombre ? (
                          <Error>{errors.nombre}</Error>
                        ):null
                        }
                    </div>
                    <div className='mb-4'> 
                        <label className='text-gray-800 ' htmlFor="empresa">Empresa</label>
                        <Field 
                                name="empresa"
                                placeholder="Empresa del Cliente"
                                id='empresa'
                                type='text'
                                className='mt-2 block w-full  p-3 bg-gray-50'
                        />
                        {
                        errors.empresa && touched.empresa ? (
                          <Error>{errors.empresa}</Error>
                        ):null
                        }
                        
                    </div>
                    <div className='mb-4'> 
                        <label className='text-gray-800 ' htmlFor="email">Email</label>
                        <Field 
                                name="email"
                                placeholder="Email del Cliente"
                                id='email'
                                type='email'
                                className='mt-2 block w-full  p-3 bg-gray-50'
                        />

{
                        errors.email && touched.email ? (
                          <Error>{errors.email}</Error>
                        ):null
                        }
                    </div>
                    <div className='mb-4'> 
                        <label className='text-gray-800 ' htmlFor="telefono">Telefono</label>
                        <Field 
                                name='telefono'
                                placeholder="Telefono del Cliente"
                                id='telefono'
                                type='tel'
                                className='mt-2 block w-full  p-3 bg-gray-50'
                        />
                         {
                        errors.telefono && touched.telefono ? (
                          <Error>{errors.telefono}</Error>
                        ):null
                        }
                    </div>
                    <div className='mb-4'> 
                        <label className='text-gray-800 ' htmlFor="notas">Notas</label>
                        <Field 
                                name="notas"
                                as="textarea"
                                placeholder="Notas del Cliente"
                                id='notas'
                                type='email'
                                className='mt-2 block w-full  p-3 bg-gray-50 h-40'
                        />
                         {
                        errors.notas && touched.notas ? (
                          <Error>{errors.notas}</Error>
                        ):null
                        }
                    </div>
                    <input className='mt-5 w-full bg-blue-800  p-3 text-white uppercase font-bold text-lg' type='submit' value={verCliente?.nombre ? 'Editar Cliente': 'Agregar Cliente'}/>
                </Form>
            )}}
        </Formik>
    </div>
    )
  )
}

Formulario.defaultProps={
  verCliente:{},
  cargando:false,
}

export default Formulario