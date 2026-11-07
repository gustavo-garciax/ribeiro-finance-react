import React, { useState, useMemo } from 'react';
import { MdAdd, MdClose, MdTrackChanges } from 'react-icons/md';
import { useFinance } from '../contexts/FinanceContext';
import { formatCurrency } from '../utils/formatters';
import './Metas.css';

function GoalCard({ goal, onAddMoney }) {
  const [depositAmount, setDepositAmount] = useState('');

  const progress = useMemo(() => {
    if (!goal.targetAmount || goal.targetAmount === 0) return 0;
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
  }, [goal.currentAmount, goal.targetAmount]);

  const remaining = useMemo(() => {
    return Math.max(goal.targetAmount - goal.currentAmount, 0);
  }, [goal.targetAmount, goal.currentAmount]);

  const monthsRemaining = useMemo(() => {
    if (!goal.deadline) return null;
    const now = new Date();
    const deadline = new Date(goal.deadline);
    const diffMs = deadline - now;
    const diffMonths = Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30)), 0);
    return diffMonths;
  }, [goal.deadline]);

  const durationLabel = useMemo(() => {
    if (!goal.deadline) return null;
    const now = new Date();
    const deadline = new Date(goal.deadline);
    const diffMs = deadline - now;
    const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365);
    if (diffYears >= 1) {
      const years = Math.round(diffYears * 10) / 10;
      return `📅 ${years >= 2 ? Math.round(years) : years.toFixed(1)} ${Math.round(years) === 1 ? 'ano' : 'anos'}`;
    }
    const months = Math.max(Math.ceil(diffMs / (1000 * 60 * 60 * 24 * 30)), 0);
    return `📅 ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }, [goal.deadline]);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (!amount || amount <= 0) return;
    onAddMoney(goal.id, amount);
    setDepositAmount('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleDeposit();
  };

  return (
    <div className="metas-goal-card">
      <div className="metas-goal-header">
        <div className="metas-goal-icon">
          <MdTrackChanges size={22} />
        </div>
        {durationLabel && (
          <span className="metas-goal-duration">{durationLabel}</span>
        )}
      </div>

      <h3 className="metas-goal-name">{goal.name}</h3>
      {monthsRemaining !== null && (
        <p className="metas-goal-remaining-months">
          {monthsRemaining} {monthsRemaining === 1 ? 'mês restante' : 'meses restantes'}
        </p>
      )}

      <div className="metas-goal-progress-section">
        <div className="metas-goal-progress-header">
          <span className="metas-goal-progress-label">Progresso</span>
          <span className="metas-goal-progress-percent">{progress.toFixed(1)}%</span>
        </div>
        <div className="metas-progress-track">
          <div
            className="metas-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="metas-goal-values">
        <div className="metas-goal-value-row">
          <span className="metas-goal-value-label">Economizado</span>
          <span className="metas-goal-value green">
            {formatCurrency(goal.currentAmount)}
          </span>
        </div>
        <div className="metas-goal-value-row">
          <span className="metas-goal-value-label">Meta</span>
          <span className="metas-goal-value">
            {formatCurrency(goal.targetAmount)}
          </span>
        </div>
        <div className="metas-goal-value-row">
          <span className="metas-goal-value-label">Faltam</span>
          <span className="metas-goal-value red">
            {formatCurrency(remaining)}
          </span>
        </div>
      </div>

      <div className="metas-goal-deposit">
        <input
          type="number"
          className="metas-deposit-input"
          placeholder="R$ 0,00"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          onKeyDown={handleKeyDown}
          min="0"
          step="0.01"
        />
        <button
          className="metas-deposit-btn"
          onClick={handleDeposit}
          disabled={!depositAmount || parseFloat(depositAmount) <= 0}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}

function AddGoalModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(targetAmount);
    if (!name.trim() || !amount || amount <= 0) return;

    onSubmit({
      name: name.trim(),
      targetAmount: amount,
      deadline: deadline || null,
    });

    setName('');
    setTargetAmount('');
    setDeadline('');
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="metas-modal-overlay" onClick={handleOverlayClick}>
      <div className="metas-modal">
        <div className="metas-modal-header">
          <h2 className="metas-modal-title">Nova Meta</h2>
          <button className="metas-modal-close" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="metas-modal-form">
          <div className="metas-form-group">
            <label className="metas-form-label" htmlFor="goal-name">
              Nome da meta
            </label>
            <input
              id="goal-name"
              type="text"
              className="metas-form-input"
              placeholder="Ex: Viagem para Europa"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="metas-form-group">
            <label className="metas-form-label" htmlFor="goal-amount">
              Valor da meta
            </label>
            <input
              id="goal-amount"
              type="number"
              className="metas-form-input"
              placeholder="Ex: 15000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="metas-form-group">
            <label className="metas-form-label" htmlFor="goal-deadline">
              Prazo
            </label>
            <input
              id="goal-deadline"
              type="date"
              className="metas-form-input"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <button type="submit" className="metas-form-submit">
            Criar Meta
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Metas() {
  const { goals, addGoal, addToGoal } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGoal = (goalData) => {
    addGoal(goalData);
  };

  return (
    <div className="metas-page">
      <h1 className="metas-title">Minhas Metas</h1>

      <div className="metas-grid">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onAddMoney={addToGoal} />
        ))}

        <div
          className="metas-add-card"
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setIsModalOpen(true);
          }}
        >
          <div className="metas-add-icon">
            <MdAdd size={32} />
          </div>
          <span className="metas-add-text">Adicionar Nova Meta</span>
        </div>
      </div>

      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddGoal}
      />
    </div>
  );
}
