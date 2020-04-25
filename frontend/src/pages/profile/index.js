import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api.js'


export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongName = () => { return localStorage.getItem('ongName') };
    const ongId = () => { return localStorage.getItem('ongId') };


    validarLogon();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId(),
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId()]);


    function handleLogout(e) {
        e.preventDefault();
        logout();
    }

    function handleDeleteIncident(id, e) {
        e.preventDefault();

        if(validarLogon()){
            deleteIncident(id)
        }
    }

    async function deleteIncident(id) {
        try {
            await api.delete(`incident/${id}`,
                {
                    headers: {
                        Authorization: ongId()
                    }
                }
            );
            setIncidents(incidents.filter(incident => incident.id !== id));   //limpa o front end dos incidents deletados
        } catch (err) {
            alert('Erro ao deletar...');
        }
    }

    function logout() {
        localStorage.clear();
        history.push('/');
    }

    function validarLogon() {
        if (ongName() && ongId()) {
            return true;
        } else {
            alert('Redirecionando...');
            logout();
            return false;
        }
    }

    function atualizarLogUsuario() {
        ongName = localStorage.getItem('ongName');
        ongId = localStorage.getItem('ongId');
    }

    return (
        <div className='profile-container'>
            <header>
                <img src={logoImg} alt='Be the hero' />
                <span>Bem vindo, {ongName()}</span>

                <Link className='button' to='/incidents/new' >Cadastrar novo caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color='#E02041'></FiPower>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.titulo}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.descricao}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-br', {
                            style: 'currency', currency: 'BRL'
                        }).format(incident.valor)}</p>
                        <button onClick={(e) => handleDeleteIncident(incident.id, e)} type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}