import React, { useState } from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { Link , useHistory} from 'react-router-dom';
import api from '../../services/api.js';

export default function Logon() {
    const [id, setId ] = useState('');
    const history = useHistory();

    async function handleLogin(e){  //47efa43d
        e.preventDefault();

        try{
            const response = await api.post('session',{id});
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName',response.data.nome);

            history.push('/profile');
        }catch(err){
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className='logon-container'>
            <section className='formul'>
                <img src={logoImg} alt='be the hero' />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder='Sua ID' value={id} onChange ={e =>setId(e.target.value)} />
                    <button className='button' type='submit'>Entrar</button>
                    <Link className='back-link' to='/register'>
                        Não tenho cadastro
                </Link>
                </form>
            </section>
            <img src={heroesImg} alt='heroes' />
        </div>
    );
}