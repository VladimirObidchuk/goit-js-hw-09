import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
const galleryStyle = {
  hero: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '100px 0',
  },
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '24px',
    listStyle: 'none',
    justifyContent: 'center',
  },
  galleryImage: {
    width: '100%',
    heigth: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: '48px',
  },
};
const lightboxStyle = {
  simpleLightbox: {
    position: 'absolute',
    backgroundColor: '#000000cc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slClouse: {
    position: 'absolute',
    right: '16px',
    top: '16px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    fontSize: '30px',
  },
  slNavigationBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '30px',
  },
  slPrev: { position: 'absolute', left: '16px' },
  slNext: { position: 'absolute', right: '16px' },
  slCaption: {
    color: 'wite',
  },
  slCounter: {
    position: 'absolute',
    left: '16px',
    top: '16px',
    fontWeight: '400',
    fontsize: '16px',
    lineheight: '1.5',
    letterspacing: '0.04em',
    color: '#fff',
  },
};

const galleruInner = document.querySelector('.gallery');
const createGallery = images => {
  return images
    .map(({ preview, original, description }) => {
      return `<a href="${original}" class="gallery__item">
        <img src="${preview}" alt="${description}" data-source="${original}" title="${description}" height="200" width="360"/>
      </a>`;
    })
    .join('');
};
galleruInner.insertAdjacentHTML('beforeend', createGallery(images));

const galleryInner = new SimpleLightbox('.gallery a', {
  animationSpeed: 300,
  animationSlide: true,
  captionDelay: 250,
  overlay: true,
  overlayOpacity: 0.8,
});

function initializeStyle() {
  const hero = document.querySelector('.hero');
  const title = document.querySelectorAll('.title');
  const galleryItems = document.querySelectorAll('.gallery__item');
  if (!galleryInner) return;
  galleryItems.forEach(item => {
    Object.assign(item.style, galleryStyle.gallery);
    item.addEventListener('mouseover', () => {
      item.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseout', () => {
      item.style.transform = 'scale(1)';
    });
  });
  Object.assign(hero.style, galleryStyle.hero);
  Object.assign(galleruInner.style, galleryStyle.gallery);
  title.forEach(item => {
    Object.assign(item.style, galleryStyle.title);
  });
}
galleryInner.on('shown.simplelightbox', () => {
  const lightboxContainer = document.querySelector('.simple-lightbox');
  const slClouse = lightboxContainer.firstElementChild;
  if (!lightboxContainer) return;
  const slNavigationBtn = document.querySelectorAll('.sl-navigation button');
  const slCounter = document.querySelector('.sl-counter');
  Object.assign(lightboxContainer.style, lightboxStyle.simpleLightbox);
  Object.assign(slClouse.style, lightboxStyle.slClouse);
  slNavigationBtn.forEach(item => {
    Object.assign(item.style, lightboxStyle.slNavigationBtn);
    item.className === 'sl-prev'
      ? Object.assign(item.style, lightboxStyle.slPrev)
      : null;
    item.className === 'sl-next'
      ? Object.assign(item.style, lightboxStyle.slNext)
      : null;
  });
  Object.assign(slCounter.style, lightboxStyle.slCounter);
  initializeStyle();
});
initializeStyle();
