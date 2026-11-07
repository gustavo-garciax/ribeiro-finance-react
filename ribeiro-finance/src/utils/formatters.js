/**
 * Formata um valor numérico como moeda brasileira (Real).
 * Exemplo: 1234.56 → "R$ 1.234,56"
 */
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata uma string de data para o padrão brasileiro "dd/mm/yyyy".
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Formata uma string de data no formato curto "dd/mm/yyyy".
 */
export function formatDateShort(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

/**
 * Retorna o nome abreviado do mês em português.
 * @param {number} monthIndex - Índice do mês (0 = Janeiro, 11 = Dezembro)
 */
export function getMonthName(monthIndex) {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
  ];
  return months[monthIndex] || '';
}

/**
 * Gera um ID único baseado em timestamp + random.
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Mapeamento de categorias para ícones (Lucide icon names)
const CATEGORY_ICONS = {
  'Alimentação': 'utensils',
  'Moradia': 'home',
  'Transporte': 'car',
  'Saúde': 'heart-pulse',
  'Lazer': 'gamepad-2',
  'Educação': 'graduation-cap',
  'Outros': 'ellipsis',
};

/**
 * Retorna o nome do ícone para uma categoria.
 * @param {string} categoryName - Nome da categoria
 */
export function getCategoryIcon(categoryName) {
  return CATEGORY_ICONS[categoryName] || 'ellipsis';
}

// Mapeamento de categorias para cores
const CATEGORY_COLORS = {
  'Alimentação': '#a78bfa',
  'Moradia': '#f472b6',
  'Transporte': '#fb923c',
  'Saúde': '#f472b6',
  'Lazer': '#22c55e',
  'Educação': '#60a5fa',
  'Outros': '#94a3b8',
};

/**
 * Retorna a cor associada a uma categoria.
 * @param {string} categoryName - Nome da categoria
 */
export function getCategoryColor(categoryName) {
  return CATEGORY_COLORS[categoryName] || '#94a3b8';
}
