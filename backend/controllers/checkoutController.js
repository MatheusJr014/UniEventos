const { MercadoPagoConfig, Preference } = require('mercadopago');
const { Pedido, Ingresso, Evento, Usuario } = require('../models');

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000
  }
});

const preference = new Preference(client);

/**
 * Cria um pedido e gera a preferência de pagamento no Mercado Pago
 */
exports.criarCheckout = async (req, res) => {
  try {
    const { itens, eventoId } = req.body;
    const usuarioId = req.user.id;

    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ message: 'Itens são obrigatórios' });
    }

    if (!eventoId) {
      return res.status(400).json({ message: 'EventoId é obrigatório' });
    }

    // Validar ingressos e calcular totais
    let total = 0;
    const itemsPreference = [];
    const pedidosData = [];

    for (const item of itens) {
      const ingresso = await Ingresso.findByPk(item.ingressoId);
      
      if (!ingresso) {
        return res.status(404).json({ message: `Ingresso ${item.ingressoId} não encontrado` });
      }

      if (ingresso.quantidadeDisponivel < item.quantidade) {
        return res.status(400).json({ 
          message: `Estoque insuficiente para o ingresso ${ingresso.tipoingresso || ingresso.id}` 
        });
      }

      // Buscar evento
      const evento = await Evento.findByPk(ingresso.EventoId);

      if (!evento) {
        return res.status(404).json({ message: `Evento não encontrado` });
      }

      // Validar que o ingresso pertence ao evento informado
      if (ingresso.EventoId !== parseInt(eventoId)) {
        return res.status(400).json({ 
          message: `Ingresso ${item.ingressoId} não pertence ao evento ${eventoId}` 
        });
      }

      const precoUnitario = parseFloat(ingresso.preco);
      const subtotal = precoUnitario * item.quantidade;
      total += subtotal;

      // Item para Mercado Pago
      itemsPreference.push({
        id: ingresso.id.toString(),
        title: `${ingresso.tipoingresso || 'Ingresso'} - ${evento.nomeevento}`,
        description: `Ingresso para o evento: ${evento.nomeevento}`,
        quantity: item.quantidade,
        unit_price: precoUnitario,
        currency_id: 'BRL'
      });

      // Dados para criar pedido
      pedidosData.push({
        ingressoId: ingresso.id,
        quantidade: item.quantidade,
        precoUnitario: precoUnitario,
        subtotal: subtotal
      });
    }

    // Taxa de serviço (10%)
    const taxaServico = total * 0.1;
    const totalComTaxa = total + taxaServico;

    // Adicionar taxa como item
    if (taxaServico > 0) {
      itemsPreference.push({
        id: 'taxa-servico',
        title: 'Taxa de Serviço',
        description: 'Taxa de serviço da plataforma',
        quantity: 1,
        unit_price: taxaServico,
        currency_id: 'BRL'
      });
    }

    // Definir URLs de retorno
    let frontendUrl = process.env.FRONTEND_URL;
    
    // Se não estiver definido, usar padrão
    if (!frontendUrl || frontendUrl.trim() === '') {
      frontendUrl = 'http://localhost:5173';
      console.warn('FRONTEND_URL não configurado, usando padrão:', frontendUrl);
    }
    
    // Garantir que a URL não tenha barra no final e esteja limpa
    const baseUrl = String(frontendUrl).trim().replace(/\/$/, '');
    
    // Validar se a URL base é válida
    if (!baseUrl || baseUrl === 'undefined' || baseUrl === 'null' || !baseUrl.startsWith('http')) {
      console.error('FRONTEND_URL inválido:', process.env.FRONTEND_URL, '-> baseUrl:', baseUrl);
      return res.status(500).json({ 
        message: 'FRONTEND_URL não configurado corretamente no .env. Configure: FRONTEND_URL=http://localhost:5173',
        error: 'URL de retorno inválida',
        debug: {
          envValue: process.env.FRONTEND_URL,
          baseUrl: baseUrl
        }
      });
    }
    
    // Construir URLs de retorno
    const successUrl = `${baseUrl}/checkout/success`;
    const failureUrl = `${baseUrl}/checkout/failure`;
    const pendingUrl = `${baseUrl}/checkout/pending`;
    
    // Validar que todas as URLs foram criadas corretamente
    if (!successUrl || !failureUrl || !pendingUrl || 
        successUrl.includes('undefined') || failureUrl.includes('undefined') || pendingUrl.includes('undefined') ||
        successUrl.length < 20 || failureUrl.length < 20 || pendingUrl.length < 20) {
      console.error('Erro ao construir URLs:', { successUrl, failureUrl, pendingUrl, baseUrl });
      return res.status(500).json({ 
        message: 'Erro ao construir URLs de retorno',
        error: 'URLs inválidas',
        debug: { successUrl, failureUrl, pendingUrl, baseUrl }
      });
    }
    
    // IMPORTANTE: Mercado Pago não aceita localhost com auto_return
    // Se a URL for localhost, não adicionar auto_return
    const isLocalhost = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1');
    
    console.log('URLs de retorno configuradas:', { successUrl, failureUrl, pendingUrl, isLocalhost });

    // Criar preferência no Mercado Pago
    // IMPORTANTE: auto_return só funciona com URLs públicas (não localhost)
    const preferenceData = {
      items: itemsPreference,
      payer: {
        email: req.user.email || 'comprador@example.com'
      },
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl
      },
      statement_descriptor: 'CONECTA EVENTOS'
    };

    // Adicionar auto_return apenas se NÃO for localhost
    // O Mercado Pago não aceita localhost com auto_return
    if (!isLocalhost) {
      preferenceData.auto_return = "approved";
      console.log('auto_return adicionado (URL pública detectada)');
    } else {
      console.warn('auto_return NÃO adicionado (localhost detectado). O Mercado Pago não aceita localhost com auto_return.');
    }

    // Adicionar auto_return apenas se NÃO for localhost
    // O Mercado Pago não aceita localhost com auto_return
    if (!isLocalhost) {
      preferenceData.auto_return = "approved";
      console.log('auto_return adicionado (URL pública detectada)');
    } else {
      console.warn('auto_return NÃO adicionado (localhost detectado). Use uma URL pública ou ngrok para testar auto_return.');
    }

    // Validar estrutura antes de enviar
    // IMPORTANTE: Com auto_return, todas as URLs devem estar definidas e válidas
    // if (!preferenceData.back_urls || 
    //     !preferenceData.back_urls.success || 
    //     !preferenceData.back_urls.failure || 
    //     !preferenceData.back_urls.pending) {
    //   console.error('Estrutura de back_urls inválida:', preferenceData.back_urls);
    //   return res.status(500).json({
    //     message: 'Erro ao configurar URLs de retorno. Com auto_return, todas as URLs devem estar definidas.',
    //     error: 'Estrutura de URLs inválida',
    //     debug: preferenceData.back_urls
    //   });
    // }

    // Validar que todas as URLs são válidas antes de usar auto_return
    // const todasUrlsValidas = [
    //   preferenceData.back_urls.success,
    //   preferenceData.back_urls.failure,
    //   preferenceData.back_urls.pending
    // ].every(url => url && typeof url === 'string' && url.startsWith('http') && url.length > 10);

    // if (!todasUrlsValidas) {
    //   console.error('URLs inválidas para auto_return:', preferenceData.back_urls);
    //   return res.status(500).json({
    //     message: 'URLs de retorno inválidas. Verifique FRONTEND_URL no .env',
    //     error: 'URLs inválidas para auto_return',
    //     debug: preferenceData.back_urls
    //   });
    // }

    let response;
    try {
      // Log detalhado antes de enviar
      console.log('=== DADOS DA PREFERÊNCIA ===');
      console.log('Items:', preferenceData.items.length);
      console.log('Back URLs:', JSON.stringify(preferenceData.back_urls, null, 2));
      console.log('Payer Email:', preferenceData.payer.email);
      console.log('Statement Descriptor:', preferenceData.statement_descriptor);
      
      // Verificar se todas as URLs são válidas (não vazias, não undefined, começam com http)
      const urlsValidas = [
        preferenceData.back_urls.success,
        preferenceData.back_urls.failure,
        preferenceData.back_urls.pending
      ].every(url => url && typeof url === 'string' && url.startsWith('http') && url.length > 10);
      
      if (!urlsValidas) {
        console.error('URLs inválidas detectadas:', preferenceData.back_urls);
        return res.status(500).json({
          message: 'URLs de retorno inválidas',
          error: 'Uma ou mais URLs não são válidas',
          debug: preferenceData.back_urls
        });
      }

      // Criar objeto seguindo a documentação do Mercado Pago
      const dataToSend = {
        items: preferenceData.items,
        payer: preferenceData.payer,
        back_urls: {
          success: String(preferenceData.back_urls.success),
          failure: String(preferenceData.back_urls.failure),
          pending: String(preferenceData.back_urls.pending)
        },
        auto_return: preferenceData.auto_return,
        statement_descriptor: preferenceData.statement_descriptor
      };
      
      console.log('Enviando para Mercado Pago (com auto_return):', JSON.stringify({
        items: dataToSend.items.length,
        back_urls: dataToSend.back_urls,
        auto_return: dataToSend.auto_return,
        payer_email: dataToSend.payer.email
      }, null, 2));
      
      response = await preference.create({ body: dataToSend });
      
      console.log('Preferência criada com sucesso:', response.id);
    } catch (mpError) {
      console.error('Erro do Mercado Pago:', mpError);
      console.error('Detalhes do erro:', {
        message: mpError.message,
        cause: mpError.cause,
        status: mpError.status,
        statusCode: mpError.statusCode
      });
      
      if (mpError.message && (mpError.message.includes('back_url') || mpError.message.includes('auto_return'))) {
        return res.status(400).json({ 
          message: 'Erro na configuração das URLs de retorno. Verifique FRONTEND_URL no .env',
          error: mpError.message,
          debug: {
            successUrl,
            failureUrl,
            pendingUrl,
            frontendUrl: process.env.FRONTEND_URL,
            baseUrl: baseUrl
          }
        });
      }
      
      // Retornar erro mais detalhado
      return res.status(500).json({
        message: 'Erro ao criar preferência no Mercado Pago',
        error: mpError.message || 'Erro desconhecido',
        details: mpError.cause || mpError
      });
    }
    
    // Retornar URL de redirecionamento
    const redirectUrl = process.env.NODE_ENV === 'production' 
      ? response.init_point 
      : (response.sandbox_init_point || response.init_point);

    // Criar pedidos no banco de dados com status "aguarde"
    const pedidosCriados = [];
    for (const pedidoData of pedidosData) {
      const pedido = await Pedido.create({
        UsuarioId: usuarioId,
        EventoId: parseInt(eventoId),
        IngressoId: pedidoData.ingressoId,
        preferenceId: response.id,
        quantidade: pedidoData.quantidade,
        valorTotal: pedidoData.subtotal,
        statusPagamento: 'aguarde',
        checkoutUrl: redirectUrl,
        dadosPagamento: {
          preferenceId: response.id,
          initPoint: response.init_point,
          sandboxInitPoint: response.sandbox_init_point,
          total: totalComTaxa
        }
      });
      pedidosCriados.push(pedido);
    }
    
    res.json({
      redirectUrl: redirectUrl,
      preferenceId: response.id,
      total: totalComTaxa,
      pedidos: pedidosCriados
    });

  } catch (error) {
    console.error('Erro ao criar checkout:', error);
    res.status(500).json({ 
      message: 'Erro ao criar checkout',
      error: error.message 
    });
  }
};

/**
 * Lista todos os pedidos (com filtros opcionais)
 */
exports.listarPedidos = async (req, res) => {
  try {
    const { UsuarioId, EventoId, statusPagamento, OrganizadorId } = req.query;
    
    const where = {};
    const include = [
      {
        model: Ingresso,
        as: 'ingresso',
        attributes: ['id', 'tipoingresso', 'preco']
      },
      {
        model: Evento,
        as: 'evento',
        attributes: ['id', 'nomeevento', 'OrganizadorId']
      },
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['id', 'nome', 'email']
      }
    ];

    if (UsuarioId) {
      where.UsuarioId = UsuarioId;
    }

    if (EventoId) {
      where.EventoId = EventoId;
    }

    if (statusPagamento) {
      where.statusPagamento = statusPagamento;
    }

    // Se OrganizadorId for fornecido, filtrar apenas pedidos de eventos desse organizador
    if (OrganizadorId) {
      include[1].where = { OrganizadorId: OrganizadorId };
    }

    const pedidos = await Pedido.findAll({
      where,
      include,
      order: [['createdAt', 'DESC']]
    });

    res.json(pedidos);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
};

/**
 * Obtém um pedido por ID
 */
exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: [
        {
          model: Ingresso,
          as: 'ingresso',
          attributes: ['id', 'tipoingresso', 'preco']
        },
        {
          model: Evento,
          as: 'evento',
          attributes: ['id', 'nomeevento', 'OrganizadorId']
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome', 'email']
        }
      ]
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.json(pedido);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ error: 'Erro ao buscar pedido' });
  }
};

/**
 * Atualiza o status de um pedido
 */
exports.atualizarStatusPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusPagamento, paymentId } = req.body;

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    const updateData = {};
    if (statusPagamento) {
      if (!['aguarde', 'confirmado', 'cancelado'].includes(statusPagamento)) {
        return res.status(400).json({ error: 'Status inválido. Use: aguarde, confirmado ou cancelado' });
      }
      updateData.statusPagamento = statusPagamento;
    }

    if (paymentId) {
      updateData.paymentId = paymentId;
    }

    await pedido.update(updateData);

    const pedidoAtualizado = await Pedido.findByPk(id, {
      include: [
        {
          model: Ingresso,
          as: 'ingresso',
          attributes: ['id', 'tipoingresso', 'preco']
        },
        {
          model: Evento,
          as: 'evento',
          attributes: ['id', 'nomeevento']
        }
      ]
    });

    res.json(pedidoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar status do pedido:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
  }
};

