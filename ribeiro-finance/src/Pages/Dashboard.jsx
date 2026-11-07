import { useMemo } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import {
  MdTrendingUp,
  MdGridView,
  MdShoppingCart,
} from 'react-icons/md';
import {
  FaUtensils,
  FaHome,
  FaCar,
  FaHeartbeat,
  FaGamepad,
  FaGraduationCap,
  FaEllipsisH,
} from 'react-icons/fa';
import { useFinance } from '../contexts/FinanceContext';
import { formatCurrency, formatDate, getCategoryColor, getMonthName } from '../utils/formatters';
import './Dashboard.css';

// Mapeamento de ícone por categoria
const CATEGORY_ICON_MAP = {
  'Alimentação': FaUtensils,
  'Moradia': FaHome,
  'Transporte': FaCar,
  'Saúde': FaHeartbeat,
  'Lazer': FaGamepad,
  'Educação': FaGraduationCap,
  'Outros': FaEllipsisH,
};

function getCategoryIconComponent(categoryName) {
  return CATEGORY_ICON_MAP[categoryName] || FaEllipsisH;
}

// Label customizado para o gráfico de pizza
function renderPieLabel({ name, percent }) {
  return `${name} ${(percent * 100).toFixed(0)}%`;
}

export default function Dashboard() {
  const {
    transactions,
    getTotalExpenses,
    getUniqueCategories,
    getTransactionCount,
    getCategoryTotals,
    getMonthlyTotals,
  } = useFinance();

  const totalExpenses = getTotalExpenses();
  const uniqueCategories = getUniqueCategories();
  const transactionCount = getTransactionCount();
  const categoryTotals = getCategoryTotals();
  const monthlyTotals = getMonthlyTotals();

  // Últimas 5 transações
  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  // Cores para o gráfico de pizza
  const pieColors = useMemo(() => {
    return categoryTotals.map((item) => getCategoryColor(item.name));
  }, [categoryTotals]);

  // Dados formatados para gráfico de barras
  const barData = useMemo(() => {
    return monthlyTotals.map((item) => {
      const [, monthStr] = item.month.split('-');
      const monthIndex = parseInt(monthStr, 10) - 1;
      return {
        name: getMonthName(monthIndex),
        total: item.total,
      };
    });
  }, [monthlyTotals]);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">Visão geral das suas finanças</p>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="summary-card-info">
            <span className="summary-card-label">Total Gastos</span>
            <span className="summary-card-value">{formatCurrency(totalExpenses)}</span>
          </div>
          <div className="summary-card-icon green">
            <MdTrendingUp />
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-info">
            <span className="summary-card-label">Categorias</span>
            <span className="summary-card-value">{uniqueCategories}</span>
          </div>
          <div className="summary-card-icon purple">
            <MdGridView />
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-info">
            <span className="summary-card-label">Transações</span>
            <span className="summary-card-value">{transactionCount}</span>
          </div>
          <div className="summary-card-icon orange">
            <MdShoppingCart />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-section">
        {/* Pie Chart - Gastos por Categoria */}
        <div className="chart-card">
          <h2 className="chart-card-title">Gastos por Categoria</h2>
          {categoryTotals.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryTotals}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    nameKey="name"
                    label={renderPieLabel}
                    labelLine={false}
                  >
                    {categoryTotals.map((entry, index) => (
                      <Cell key={entry.name} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      background: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff',
                    }}
                  />
                  <Legend
                    wrapperStyle={{ color: '#888888', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-empty">
              Adicione transações para ver os gráficos
            </div>
          )}
        </div>

        {/* Bar Chart - Evolução Mensal */}
        <div className="chart-card">
          <h2 className="chart-card-title">Evolução Mensal</h2>
          {barData.length > 0 ? (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    tick={{ fill: '#888888', fontSize: 12 }}
                    axisLine={{ stroke: '#2a2a2a' }}
                  />
                  <YAxis
                    stroke="#888888"
                    tick={{ fill: '#888888', fontSize: 12 }}
                    axisLine={{ stroke: '#2a2a2a' }}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      background: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff',
                    }}
                    cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                  />
                  <Bar
                    dataKey="total"
                    fill="#22c55e"
                    radius={[6, 6, 0, 0]}
                    name="Total"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="chart-empty">
              Adicione transações para ver os gráficos
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section">
        <div className="transactions-header">
          <h2 className="transactions-title">Últimas Transações</h2>
          {recentTransactions.length > 0 && (
            <span className="transactions-count">
              {recentTransactions.length} de {transactions.length}
            </span>
          )}
        </div>

        {recentTransactions.length > 0 ? (
          recentTransactions.map((transaction) => {
            const IconComponent = getCategoryIconComponent(transaction.category);
            const iconColor = getCategoryColor(transaction.category);

            return (
              <div key={transaction.id} className="transaction-item">
                <div
                  className="transaction-icon"
                  style={{
                    background: `${iconColor}20`,
                    color: iconColor,
                  }}
                >
                  <IconComponent />
                </div>
                <div className="transaction-details">
                  <div className="transaction-description">
                    {transaction.description}
                  </div>
                  <div className="transaction-meta">
                    {transaction.category} • {formatDate(transaction.date)}
                  </div>
                </div>
                <div className="transaction-amount">
                  - {formatCurrency(Math.abs(transaction.amount))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="transactions-empty">
            Nenhuma transação encontrada
          </div>
        )}
      </div>
    </div>
  );
}
