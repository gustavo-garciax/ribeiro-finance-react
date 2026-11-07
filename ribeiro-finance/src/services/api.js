// Base URL - TODO: Configure for your backend
const API_BASE_URL = '/api';

/**
 * Serviço de transações
 * TODO: Conectar com API real (REST, GraphQL, Firebase, etc.)
 */
export const transactionService = {
  getAll: async () => {
    // TODO: fetch from API
    // const response = await fetch(`${API_BASE_URL}/transactions`);
    // return response.json();
    return [];
  },

  create: async (transaction) => {
    // TODO: POST to API
    // const response = await fetch(`${API_BASE_URL}/transactions`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(transaction),
    // });
    // return response.json();
    return transaction;
  },

  delete: async (id) => {
    // TODO: DELETE from API
    // await fetch(`${API_BASE_URL}/transactions/${id}`, { method: 'DELETE' });
    return id;
  },
};

/**
 * Serviço de metas financeiras
 * TODO: Conectar com API real
 */
export const goalService = {
  getAll: async () => {
    // TODO: fetch from API
    // const response = await fetch(`${API_BASE_URL}/goals`);
    // return response.json();
    return [];
  },

  create: async (goal) => {
    // TODO: POST to API
    // const response = await fetch(`${API_BASE_URL}/goals`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(goal),
    // });
    // return response.json();
    return goal;
  },

  update: async (id, data) => {
    // TODO: PUT to API
    // const response = await fetch(`${API_BASE_URL}/goals/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // });
    // return response.json();
    return data;
  },

  delete: async (id) => {
    // TODO: DELETE from API
    // await fetch(`${API_BASE_URL}/goals/${id}`, { method: 'DELETE' });
    return id;
  },
};

/**
 * Serviço de categorias
 * TODO: Conectar com API real
 */
export const categoryService = {
  getAll: async () => {
    // TODO: fetch from API
    // const response = await fetch(`${API_BASE_URL}/categories`);
    // return response.json();
    return [];
  },
};
