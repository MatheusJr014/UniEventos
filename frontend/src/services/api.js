import axios from "axios";

const baseURL = import.meta.env.MODE === "production"
? import.meta.env.VITE_API_URL_PROD
: import.meta.env.VITE_API_URL_DEV;

const api = axios.create({
  baseURL,
});

export const getEventos = async () => {
  const { data } = await api.get("/eventos");
  return data;
};

export const getIngressos = async () => {
  const { data } = await api.get("/ingressos");
  return data;
};

export const getEventoById = async (id) => {
  const { data } = await api.get(`/eventos/${id}`);
  return data;
};
export const getUsuarioById = async (id, token) => {
  const { data } = await api.get(`/usuarios/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const getEventosPorOrganizador = async (organizadorId) => {
  const { data } = await api.get(`/eventos?OrganizadorId=${organizadorId}`);
  return data;
};

export const atualizarUsuario = async (id, dadosUsuario, token) => {
  const { data } = await api.put(`/usuarios/${id}`, dadosUsuario, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const getIngressosUsuario = async (usuarioId, token) => {
  const { data } = await api.get(`/ingressos?usuarioId=${usuarioId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const getAvaliacoes = async () => {
  try {
    const { data } = await api.get("/avaliacoes");
    return data;
  } catch (error) {
    console.warn("Erro ao buscar avaliações:", error);
    return [];
  }
};

export const criarAvaliacao = async (avaliacaoData) => {
  const { data } = await api.post("/avaliacoes", avaliacaoData);
  return data;
};

export const atualizarAvaliacao = async (id, avaliacaoData) => {
  const { data } = await api.put(`/avaliacoes/${id}`, avaliacaoData);
  return data;
};

export const criarEvento = async (eventData) => {
  const { data } = await api.post("/eventos", eventData);
  return data;
};

export const atualizarEvento = async (id, eventData) => {
  const { data } = await api.put(`/eventos/${id}`, eventData);
  return data;
};

export const deletarEvento = async (id) => {
  const { data } = await api.delete(`/eventos/${id}`);
  return data;
};

export const criarUsuario = async (dadosUsuario) => {
  const { data } = await api.post("/usuarios", dadosUsuario);
  return data;
};

export const loginUsuario = async (payload) => {
  try {
    const response = await api.post('/login', payload);
    return response.data;
  } catch (error) {
    throw {
      response: {
        status: error.response?.status
      },
      message: error.message
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    // TODO: Implementar quando a rota estiver disponível no backend
    // const { data } = await api.post('/login/forgot-password', { email });
    // return data;
    
    // Simulação temporária (remover quando API estiver pronta)
    throw new Error('API não implementada ainda');
  } catch (error) {
    throw {
      response: {
        status: error.response?.status || 501
      },
      message: error.message
    };
  }
};

export const getIngressosPorEvento = async (eventoId) => {
  const { data } = await api.get(`/ingressos?EventoId=${eventoId}`);
  return data;
};

export const getIngressosPorOrganizador = async (organizadorId) => {
  const { data } = await api.get(`/ingressos?OrganizadorId=${organizadorId}`);
  return data;
};

export const criarIngresso = async (ingressoData) => {
  const { data } = await api.post("/ingressos", ingressoData);
  return data;
};

export const atualizarIngresso = async (id, ingressoData) => {
  const { data } = await api.put(`/ingressos/${id}`, ingressoData);
  return data;
};

export const deletarIngresso = async (id, organizadorId) => {
  const url = organizadorId 
    ? `/ingressos/${id}?OrganizadorId=${organizadorId}`
    : `/ingressos/${id}`;
  const { data } = await api.delete(url);
  return data;
};

export const getEventoCompletoById = async (id) => {
  const { data } = await api.get(`/eventos/${id}`);
  return data;
};

export const getEventoDetalhadoById = async (id) => {
  const { data } = await api.get(`/eventos/${id}`);
  return data;
};

// Funções de Checkout
export const criarCheckout = async (dadosCheckout) => {
  const token = localStorage.getItem('token');
  const { data } = await api.post('/checkout', dadosCheckout, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const listarPedidos = async (filtros = {}) => {
  const token = localStorage.getItem('token');
  const queryParams = new URLSearchParams(filtros).toString();
  const { data } = await api.get(`/checkout/pedidos${queryParams ? `?${queryParams}` : ''}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const getPedidoById = async (id) => {
  const token = localStorage.getItem('token');
  const { data } = await api.get(`/checkout/pedidos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export const atualizarStatusPedido = async (id, statusData) => {
  const token = localStorage.getItem('token');
  const { data } = await api.patch(`/checkout/pedidos/${id}/status`, statusData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export default api;