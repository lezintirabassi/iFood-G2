import React, { useEffect, useState } from "react";
import { createCliente, getClientes, updateCliente, deleteCliente } from "./api";
import "./styles.css";

function App() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [modoEdicao, setModoEdicao] = useState(false);
    const [cpfEdit, setCpfEdit] = useState("");

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const data = await getClientes();
        setClientes(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (modoEdicao) {
            await updateCliente(cpfEdit, { nome, email });
            setModoEdicao(false);
        } else {
            await createCliente({ nome, email, cpf });
        }
        fetchClientes();
        setNome("");
        setEmail("");
        setCpf("");
    };

    const handleDelete = async (cpf) => {
        await deleteCliente(cpf);
        fetchClientes();
    };

    const handleEdit = (cliente) => {
        setModoEdicao(true);
        setNome(cliente.nome);
        setEmail(cliente.email);
        setCpfEdit(cliente.cpf);
    };

    return (
        <div className="container">
            <h1>Gerenciamento de Clientes</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {!modoEdicao && <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />}
                <button type="submit">{modoEdicao ? "Atualizar Cliente" : "Adicionar Cliente"}</button>
            </form>

            <ul>
                {clientes.map((cliente) => (
                    <li key={cliente.cpf}>
                        {cliente.nome} - {cliente.email} - {cliente.cpf}
                        <button onClick={() => handleEdit(cliente)}>Editar</button>
                        <button onClick={() => handleDelete(cliente.cpf)}>Excluir</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
