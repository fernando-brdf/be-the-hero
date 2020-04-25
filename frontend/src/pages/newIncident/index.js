import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api.js'

export default function NewIncident() {
    const history = useHistory();
    
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const ongId = localStorage.getItem('ongId');
    

    const data = {
        titulo,
        descricao,
        valor
    };

    async function handleNewIncident(e) {
        e.preventDefault();

        try {
            await api.post('incident', data,
                {
                    headers: {
                        Authorization: ongId,
                    }
                });

            history.push('/profile');
        } catch (e) {
            alert('Erro ao cadastrar novo caso...');
        }
    }

    return (
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={logoImg} alt='Be the Hero' />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#E02041' />
                        Voltar para home
                    </Link>
                </section>
                {<form onSubmit={handleNewIncident}>
                    <input placeholder='Título do caso'
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea type='text' placeholder='Descrição'
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input placeholder='Valor em reais'
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                    />

                    <button className='button' type='submit'>Cadastrar</button>
                </form>}

            </div>
        </div>
    );
}