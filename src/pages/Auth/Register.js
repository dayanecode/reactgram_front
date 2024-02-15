import './Auth.css'

// Components
import { Link } from 'react-router-dom'

// Hooks
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Redux
import { register, reset } from '../../slices/authSlice'

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // O dispatch é o cara que te permite utilizar as funções Redux
  const dispatch = useDispatch();

  // Vou ter como extrair o estado que está rolando no slice, por meio do useSelector. Eu poderia pegar qualquer state, mas eu quero pegar do auth, neste momento.
  const { loadind, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

    console.log(user)

    // A gente sempre da dispatch. Agora eu vou dar dispatch em register, receber o usuário e mandar para a API
    dispatch(register(user));
  };

  // Clean all auth states 
  // essa jogadinha é feita sempre que rola um dispatch. É a maneira que a gente deixa automatizado o reset antes de disparar uma requisição assíncrona. 
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id='register'>
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name || ""} />
        <input type="email" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={email || ""} autoComplete="username" />
        <input type="password" placeholder='Senha' onChange={(e) => setPassword(e.target.value)} value={password || ""} autoComplete="new-password" />
        <input type="password" placeholder='Confirme a senha' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""} autoComplete="new-password" />
        <input type="submit" value='Cadastrar' />
      </form>
      <p>
        Já tem conta?
        <Link to="/login"> Clique aqui.</Link>
      </p>
    </div>
  )
}

export default Register
