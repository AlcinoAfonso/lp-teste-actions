export const typography = {
  // Hero
  heroTitle: {
    tag: 'h1' as const,
    classes: 'font-inter text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight',
  },
  heroDescription: {
    tag: 'p' as const,
    classes: 'font-inter text-lg md:text-xl leading-relaxed',
  },
  
  // Header
  logoText: {
    tag: 'div' as const,
    classes: 'font-inter text-2xl md:text-3xl font-semibold tracking-tight',
  },
  logoSubtitle: {
    tag: 'div' as const,
    classes: 'font-inter text-sm md:text-base font-normal tracking-wide uppercase opacity-80',
  },
  navLink: {
    tag: 'a' as const,
    classes: 'font-inter text-base md:text-lg font-medium',
  },
  
  // Botões
  button: {
    base: 'inline-block font-inter text-sm md:text-base font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg transition-all duration-200 text-center',
    variants: {
      primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg hover:shadow-xl',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      outline: 'border-2 border-current hover:opacity-80',
      whatsapp: 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl',
    },
  },
};
