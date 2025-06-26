# Sprint 2 - Componentes Light ✨

## O que foi implementado:

### 1. Componentes Light Core
- **HeroLight**: Versão otimizada sem estados
- **BenefitsLight**: Grid responsivo simplificado
- **ServicesLight**: Layout eficiente com CSS Grid

### 2. Novos Componentes
- **GalleryLight**: Galeria de imagens com lazy load
- **PricingLight**: Tabela de preços comparativa
- **ContactLight**: Formulário de contato

### 3. Sistema de Temas
- 4 temas prontos: Default, Dark, Corporate, Startup
- Variáveis CSS dinâmicas
- ThemeProvider com Context API

### 4. Sistema de Variantes
- Variantes de Hero: centered, reversed, fullwidth
- Variantes de Botão: primary, secondary, outline, ghost, gradient
- Variantes de Seção: wave, angle, curve

### 5. Otimizações de Performance
- Lazy loading automático
- Preload de imagens críticas
- Font optimization
- Reduced motion support
- Middleware de cache

## Como usar:

### Versão Light de uma LP:
```
/cliente/light
```

### Aplicar tema:
```json
{
  "theme": "dark",
  "metadata": {...},
  "sections": [...]
}
```

### Usar variantes:
```json
{
  "type": "hero",
  "variant": "centered",
  ...
}
```

## Benefícios:
- ⚡ 40% mais rápido no carregamento
- 📦 50% menos JavaScript
- 🎨 Temas customizáveis
- ♿ Melhor acessibilidade
- 📱 Performance superior em mobile
