export const sectionDefaults = {
  header: {
    structure: 'Logo à esquerda, menu/telefone à direita',
    classes: 'w-full py-4 mb-8',
    container: 'container-lp',
    grid: 'flex items-center justify-between',
    logoContainer: 'flex-shrink-0',
    navContainer: 'flex items-center gap-6',
    mobileMenu: 'Menu hambúrguer em telas menores que md',
  },

  hero: {
    structure: 'Dois containers: texto (vertical) e imagem. Mobile empilha, desktop lado a lado.',
    classes: 'py-12 md:py-16 mb-12',
    container: 'container-lp',
    layout: 'flex flex-col md:flex-row gap-12 md:gap-16 items-center',
    textContainer: 'flex-1 flex flex-col space-y-6 text-center md:text-left',
    imageContainer: 'flex-1 w-full md:w-auto',
  },

  benefits: {
    structure: 'Título centralizado, grid de benefícios com ícone + título + texto',
    classes: 'py-12 md:py-16 mb-12',
    container: 'container-lp',
    titleContainer: 'text-center mb-12',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10',
    cardContainer: 'flex flex-col items-center text-center space-y-4',
    iconContainer: 'text-4xl mb-2',
  },

  services: {
    structure: 'Título centralizado, imagem à esquerda e textos à direita',
    classes: 'py-12 md:py-16 mb-12',
    container: 'container-lp',
    titleContainer: 'text-center mb-12',
    contentLayout: 'flex flex-col md:flex-row gap-12 md:gap-16 items-center',
    imageContainer: 'flex-1 w-full md:w-auto',
    textContainer: 'flex-1 space-y-6',
    textItem: 'flex gap-4',
    iconInline: 'text-2xl flex-shrink-0 mt-1',
    buttonContainer: 'mt-8 text-center md:text-left',
  },
};
