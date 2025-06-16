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
};
