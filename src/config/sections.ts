export const sectionDefaults = {
  header: {
    structure: 'Logo com texto à esquerda, menu de navegação à direita',
    classes: 'w-full py-4',
    container: 'container-lp flex items-center justify-between',
    mobileMenu: 'Menu hambúrguer em telas menores que md',
  },
  
  hero: {
    structure: 'Duas colunas - texto à esquerda, imagem à direita. Empilha no mobile.',
    classes: 'py-16 md:py-24',
    container: 'container-lp',
    grid: 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center',
    textColumn: 'order-2 lg:order-1',
    imageColumn: 'order-1 lg:order-2',
  },
};
