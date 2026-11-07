import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { generateId } from '../utils/formatters';

const FinanceContext = createContext(null);

// Categorias padrão do sistema
const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Alimentação', icon: 'utensils', color: '#a78bfa' },
  { id: 'cat-2', name: 'Moradia', icon: 'home', color: '#f472b6' },
  { id: 'cat-3', name: 'Transporte', icon: 'car', color: '#fb923c' },
  { id: 'cat-4', name: 'Saúde', icon: 'heart-pulse', color: '#f472b6' },
  { id: 'cat-5', name: 'Lazer', icon: 'gamepad-2', color: '#22c55e' },
  { id: 'cat-6', name: 'Educação', icon: 'graduation-cap', color: '#60a5fa' },
  { id: 'cat-7', name: 'Outros', icon: 'ellipsis', color: '#94a3b8' },
];

export function FinanceProvider({ children }) {
  // TODO: Replace with API call to fetch initial data
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [goals, setGoals] = useState([]);
  const [monthlyData] = useState([]);

  // --- Transações ---

  const addTransaction = useCallback((transaction) => {
    const newTransaction = {
      ...transaction,
      id: transaction.id || generateId(),
    };
    // TODO: Replace with API call (transactionService.create)
    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  }, []);

  const removeTransaction = useCallback((id) => {
    // TODO: Replace with API call (transactionService.delete)
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // --- Metas ---

  const addGoal = useCallback((goal) => {
    const newGoal = {
      ...goal,
      id: goal.id || generateId(),
      currentAmount: goal.currentAmount || 0,
    };
    // TODO: Replace with API call (goalService.create)
    setGoals((prev) => [...prev, newGoal]);
    return newGoal;
  }, []);

  const removeGoal = useCallback((id) => {
    // TODO: Replace with API call (goalService.delete)
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const addToGoal = useCallback((goalId, amount) => {
    // TODO: Replace with API call (goalService.update)
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? { ...g, currentAmount: g.currentAmount + amount }
          : g
      )
    );
  }, []);

  // --- Categorias ---

  const addCategory = useCallback((category) => {
    const newCategory = {
      ...category,
      id: category.id || generateId(),
      icon: 'ellipsis',
    };
    // TODO: Replace with API call (categoryService.create)
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }, []);

  const removeCategory = useCallback((id) => {
    // TODO: Replace with API call (categoryService.delete)
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  // --- Cálculos e agregações ---

  const getMonthlyTotals = useCallback(() => {
    // Agrupa transações por mês e calcula totais
    const totals = {};
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!totals[monthKey]) {
        totals[monthKey] = { month: monthKey, total: 0 };
      }
      if (t.type === 'expense') {
        totals[monthKey].total += Math.abs(t.amount);
      }
    });
    return Object.values(totals).sort((a, b) => a.month.localeCompare(b.month));
  }, [transactions]);

  const getCategoryTotals = useCallback(() => {
    // Agrupa despesas por categoria e calcula totais
    const totals = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const cat = t.category || 'Outros';
        if (!totals[cat]) {
          totals[cat] = 0;
        }
        totals[cat] += Math.abs(t.amount);
      });

    return Object.entries(totals).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  const getTotalExpenses = useCallback(() => {
    // Retorna total de despesas do mês atual
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
      .filter((t) => {
        const date = new Date(t.date);
        return (
          t.type === 'expense' &&
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      })
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  }, [transactions]);

  const getUniqueCategories = useCallback(() => {
    // Retorna quantidade de categorias utilizadas nas transações
    const usedCategories = new Set(transactions.map((t) => t.category));
    return usedCategories.size;
  }, [transactions]);

  const getTransactionCount = useCallback(() => {
    // Retorna quantidade de transações do mês atual
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions.filter((t) => {
      const date = new Date(t.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    }).length;
  }, [transactions]);

  const value = useMemo(
    () => ({
      // Estado
      transactions,
      categories,
      goals,
      monthlyData,

      // Ações - Transações
      addTransaction,
      removeTransaction,

      // Ações - Categorias
      addCategory,
      removeCategory,

      // Ações - Metas
      addCategory,
      removeCategory,
      addGoal,
      removeGoal,
      addToGoal,

      // Cálculos
      getMonthlyTotals,
      getCategoryTotals,
      getTotalExpenses,
      getUniqueCategories,
      getTransactionCount,
    }),
    [
      transactions,
      categories,
      goals,
      monthlyData,
      addTransaction,
      removeTransaction,
      addCategory,
      removeCategory,
      addGoal,
      removeGoal,
      addToGoal,
      getMonthlyTotals,
      getCategoryTotals,
      getTotalExpenses,
      getUniqueCategories,
      getTransactionCount,
    ]
  );

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance deve ser usado dentro de um FinanceProvider');
  }
  return context;
}

export default FinanceContext;
