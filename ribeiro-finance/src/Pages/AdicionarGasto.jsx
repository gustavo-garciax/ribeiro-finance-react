import { useState } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { useFinance } from '../contexts/FinanceContext';
import './AdicionarGasto.css';

const CATEGORIES = [
  'Alimentação',
  'Moradia',
  'Transporte',
  'Saúde',
  'Lazer',
  'Educação',
  'Outros',
];

function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const INITIAL_FORM = {
  description: '',
  amount: '',
  category: 'Alimentação',
  date: getTodayDate(),
};

export default function AdicionarGasto() {
  const { addTransaction } = useFinance();
  const [form, setForm] = useState(INITIAL_FORM);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const amount = parseFloat(form.amount);
    if (!form.description.trim() || isNaN(amount) || amount <= 0) {
      return;
    }

    addTransaction({
      description: form.description.trim(),
      amount,
      category: form.category,
      date: form.date,
      type: 'expense',
    });

    setForm({ ...INITIAL_FORM, date: getTodayDate() });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }

  const isValid =
    form.description.trim() !== '' &&
    form.amount !== '' &&
    parseFloat(form.amount) > 0;

  return (
    <div className="adicionar-gasto">
      <h1 className="adicionar-gasto-title">Adicionar Gasto</h1>
      <p className="adicionar-gasto-subtitle">Registre uma nova despesa</p>

      <div className="form-card">
        {showSuccess && (
          <div className="form-success">
            <MdCheckCircle size={18} />
            Gasto adicionado com sucesso!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Descrição
            </label>
            <input
              id="description"
              name="description"
              type="text"
              className="form-input"
              placeholder="Ex: Almoço no restaurante"
              value={form.description}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="amount">
              Valor
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              className="form-input"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Categoria
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="date">
              Data
            </label>
            <input
              id="date"
              name="date"
              type="date"
              className="form-input"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="form-submit"
            disabled={!isValid}
          >
            <MdAdd size={20} />
            Adicionar Gasto
          </button>
        </form>
      </div>
    </div>
  );
}
