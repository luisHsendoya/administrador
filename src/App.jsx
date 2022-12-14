import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Layout from './layout/Layout'
import EditarCliente from './pages/EditarCliente'
import Inicio from './pages/Inicio'
import VerCliente from './pages/VerCliente'
import NuevoCliente from './pages/NuevoCliente';




function App() {
  console.log(import.meta.env.VITE_API_URL);
  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/clientes' element={<Layout/>}>
            <Route index element={<Inicio/>}/>
            <Route path='nuevo' element={<NuevoCliente/>} />
            <Route path='editar/:id' element={<EditarCliente/>}/>
            <Route path=':id' element={<VerCliente/>}/>
        </Route>

      </Routes>
    
    </BrowserRouter>
   
  )
}

export default App
