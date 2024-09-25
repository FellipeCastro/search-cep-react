import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'

import api from './services/api'

function App() {
  const [input, setInput] = useState("")
  const [cep, setCep] = useState({})

  const handleSearch = async () => {
    if (input === "") {
      alert("Preencha o campo para continuar!")
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } catch {
      alert("Erro ao buscar CEP")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input 
          type="text" 
          name="cep" 
          id="cep" 
          placeholder="Digite seu CEP" 
          autoComplete="off" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>{cep.cep}</h2>
  
          <ul>
            <li><span>{cep.logradouro}</span></li>
            <li><span>{cep.complemento}</span></li>
            <li><span>{cep.bairro}</span></li>
            <li><span>{cep.estado}</span></li>
          </ul>
        </main>
      )}
    </div>
  )
}

export default App
