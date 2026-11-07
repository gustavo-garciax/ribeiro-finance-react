import React, { useMemo } from 'react';
import {
  MdRestaurant,
  MdHome,
  MdDirectionsCar,
  MdFavorite,
  MdSportsEsports,
  MdSchool,
  MdMoreHoriz,
} from 'react-icons/md';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useFinance } from '../contexts/FinanceContext';
import { formatCurrency, getMonthName, getCategoryColor } from '../utils/formatters';
import './Analises.css';

const CATEGORY_ICONS = {
  'Alimentação': MdRestaurant,
  'Moradia': MdHome,
  'Transporte': MdDirectionsCar,
  'Saúde': MdFavorite,
  'Lazer': MdSportsEsports,
  'Educação': MdSchool,
  'Outros': MdMoreHoriz,
};

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="analises-tooltip">
        <p className="analises-tooltip-label">{label}</p>
        <p className="analises-tooltip-value">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
}

export default function Analises() {
  const { transactions, getCategoryTotals, getMonthlyTotals } = useFinance();

  const categoryTotals = useMemo(() => {
    const totals = getCategoryTotals();
    return totals.sort((a, b) => b.value - a.value);
  }, [getCategoryTotals]);

  const maxCategoryValue = useMemo(() => {
    if (categoryTotals.length === 0) return 0;
    return Math.max(...categoryTotals.map((c) => c.value));
  }, [categoryTotals]);

  const monthlyTotals = useMemo(() => {
    const totals = getMonthlyTotals();
    return totals.map((item) => {
      const [year, month] = item.month.split('-');
      return {
        name: `${getMonthName(parseInt(month, 10) - 1)}/${year.slice(2)}`,
        total: item.total,
      };
    });
  }, [getMonthlyTotals]);

  const hasData = transactions.length > 0;

  if (!hasData) {
    return (
      <div className="analises-page">
        <h1 className="analises-title">Análises Detalhadas</h1>
        <div className="analises-empty">
          <p>Adicione transações para ver as análises</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analises-page">
      <h1 className="analises-title">Análises Detalhadas</h1>

      <div className="analises-grid">
        {/* Distribuição por Categoria */}
        <div className="analises-card">
          <h2 className="analises-card-title">Distribuição por Categoria</h2>
          <div className="analises-category-list">
            {categoryTotals.map((category) => {
              const IconComponent = CATEGORY_ICONS[category.name] || MdMoreHoriz;
              const color = getCategoryColor(category.name);
              const widthPercent =
                maxCategoryValue > 0
                  ? (category.value / maxCategoryValue) * 100
                  : 0;

              return (
                <div key={category.name} className="analises-category-row">
                  <div className="analises-category-info">
                    <div
                      className="analises-category-icon"
                      style={{ color }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <span className="analises-category-name">
                      {category.name}
                    </span>
                  </div>
                  <span className="analises-category-amount">
                    {formatCurrency(category.value)}
                  </span>
                  <div className="analises-progress-track">
                    <div
                      className="analises-progress-fill"
                      style={{
                        width: `${widthPercent}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparação Mensal */}
        <div className="analises-card">
          <h2 className="analises-card-title">Comparação Mensal</h2>
          <div className="analises-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTotals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis
                  dataKey="name"
                  stroke="#888"
                  tick={{ fill: '#888', fontSize: 12 }}
                />
                <YAxis
                  stroke="#888"
                  tick={{ fill: '#888', fontSize: 12 }}
                  tickFormatter={(value) =>
                    `R$ ${value.toLocaleString('pt-BR')}`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="total"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
