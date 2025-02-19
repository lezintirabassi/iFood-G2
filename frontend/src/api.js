const API_URL = "http://localhost:5000";

export const createCliente = async (cliente) => {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
    return response.json();
};

export const getClientes = async () => {
    const response = await fetch(`${API_URL}/clientes`);
    return response.json();
};

export const updateCliente = async (cpf, cliente) => {
    const response = await fetch(`${API_URL}/update/${cpf}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
    });
    return response.json();
};

export const deleteCliente = async (cpf) => {
    const response = await fetch(`${API_URL}/delete/${cpf}`, { method: "DELETE" });
    return response.json();
};
