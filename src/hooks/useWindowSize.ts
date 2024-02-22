import { useState, useEffect } from 'react'

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    // Função de callback para atualizar o tamanho da janela
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Adiciona um ouvinte de redimensionamento à janela
    window.addEventListener('resize', handleResize)

    // Remove o ouvinte de redimensionamento quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // O segundo parâmetro vazio assegura que o efeito só é executado uma vez durante a montagem

  return windowSize
}
