const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Pedido', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // ID do usuário que está comprando
    UsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    },
    // ID do evento
    EventoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Eventos',
        key: 'id'
      }
    },
    // ID do ingresso
    IngressoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ingressos',
        key: 'id'
      }
    },
    // ID da preferência do Mercado Pago
    preferenceId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // ID do pagamento no Mercado Pago (quando disponível)
    paymentId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Quantidade de ingressos
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    // Valor total do pedido
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    // Status do pagamento: aguarde, confirmado, cancelado
    statusPagamento: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'aguarde',
      validate: {
        isIn: [['aguarde', 'confirmado', 'cancelado']]
      }
    },
    // URL de redirecionamento do Mercado Pago
    checkoutUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Dados adicionais em JSON (para armazenar informações do Mercado Pago)
    dadosPagamento: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const value = this.getDataValue('dadosPagamento');
        return value ? JSON.parse(value) : null;
      },
      set(value) {
        this.setDataValue('dadosPagamento', value ? JSON.stringify(value) : null);
      }
    }
  }, {
    timestamps: true,
    tableName: 'Pedidos'
  });
};

