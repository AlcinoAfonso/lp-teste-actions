export const typography = {
  // Hero
  heroTitle: {
    tag: 'h1' as const,
    classes: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
  },
  heroDescription: {
    tag: 'p' as const,
    classes: 'text-lg md:text-xl text-gray-700 leading-relaxed mt-4',
  },
  
  // Header
  logoText: {
    tag: 'div' as const,
    classes: 'text-2xl font-bold tracking-tight',
  },
  logoSubtitle: {
    tag: 'div' as const,
    classes: 'text-sm font-normal tracking-wide uppercase opacity-80',
  },
  navLink: {
    tag: 'a' as const,
    classes: 'text-base font-medium hover:opacity-80 transition-opacity',
  },
  
  // Botões
  button: {
    base: 'inline-block text-base font-semibold px-8 py-4 rounded-lg transition-all duration-200',
    variants: {
      primary: 'bg-orange-500 text-white hover:bg-orange-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      outline: 'border-2 border-current hover:opacity-80',
    },
  },
};
