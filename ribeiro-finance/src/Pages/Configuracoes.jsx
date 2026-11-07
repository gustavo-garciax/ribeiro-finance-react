import { useState } from 'react'
import { useFinance } from '../contexts/FinanceContext'
import { MdDelete, MdAdd } from 'react-icons/md'
import './Configuracoes.css'

export default function Configuracoes() {
  const { categories, addCategory, removeCategory } = useFinance()
  const [newCategory, setNewCategory] = useState('')
  const [newColor, setNewColor] = useState('#22c55e')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleAddCategory = (e) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    addCategory({
      name: newCategory.trim(),
      color: newColor,
    })

    setNewCategory('')
    setNewColor('#22c55e')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="config-page">
      <h1 className="page-title">Configurações</h1>

      {/* Categorias Section */}
      <div className="config-section">
        <h2 className="config-section__title">Categorias</h2>
        <p className="config-section__description">
          Gerencie as categorias de gastos disponíveis.
        </p>

        <div className="config-categories">
          {categories.map((cat) => (
            <div key={cat.id} className="config-category-item">
              <div className="config-category-item__info">
                <span
                  className="config-category-item__dot"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="config-category-item__name">{cat.name}</span>
              </div>
              <button
                className="config-category-item__delete"
                onClick={() => removeCategory(cat.id)}
                title="Remover categoria"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>

        <form className="config-add-category" onSubmit={handleAddCategory}>
          <div className="config-add-category__inputs">
            <input
              type="text"
              placeholder="Nova categoria..."
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="config-input"
            />
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="config-color-input"
              title="Cor da categoria"
            />
            <button type="submit" className="config-add-btn">
              <MdAdd /> Adicionar
            </button>
          </div>
        </form>

        {showSuccess && (
          <p className="config-success">Categoria adicionada com sucesso!</p>
        )}
      </div>

      {/* Dados Section */}
      <div className="config-section">
        <h2 className="config-section__title">Dados</h2>
        <p className="config-section__description">
          Gerencie seus dados financeiros.
        </p>

        <div className="config-data-actions">
          <div className="config-data-info">
            <p className="config-data-info__text">
              <strong>Banco de dados:</strong> Não configurado
            </p>
            <p className="config-data-info__hint">
              {/* TODO: Replace with actual database connection status */}
              Configure a conexão com o banco de dados no arquivo{' '}
              <code>src/services/api.js</code>
            </p>
          </div>
        </div>
      </div>

      {/* Sobre Section */}
      <div className="config-section">
        <h2 className="config-section__title">Sobre</h2>
        <div className="config-about">
          <p>
            <strong>RibeiroFinance</strong> v1.0.0
          </p>
          <p className="config-about__desc">
            Sistema de controle financeiro pessoal.
          </p>
        </div>
      </div>
    </div>
  )
}
