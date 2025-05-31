export const ProductDetailData = {
  id: 1,
  name: 'Full Sleeve Sweatshirt for Men (Pink)',
  dateCreated: '26 Mar, 2021',
  price: 120.4,
  available: 1230,
  description:
    'Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton. Material composition is 100% organic cotton. This is one of the world’s leading designer lifestyle brands and is internationally recognized for celebrating the essence of classic American cool style, featuring preppy with a twist designs.',
  subcategory: 'T-Shirt',
  brand: 'Tommy Hilfiger',
  rating: 4.5,
  images: [
    {
      url: 'https://themesbrand.com/velzon/html/default/assets/images/products/img-8.png',
    },
    {
      url: 'https://themesbrand.com/velzon/html/default/assets/images/products/img-6.png',
    },
    {
      url: 'https://themesbrand.com/velzon/html/default/assets/images/products/img-1.png',
    },
    {
      url: 'https://themesbrand.com/velzon/html/default/assets/images/products/img-8.png',
    },
  ],
};

export const ratingData = [
  {
    id: 1,
    name: '5 star',
    value: 2758,
    ratio: 50.2,
  },
  {
    id: 2,
    name: '4 star',
    value: 1063,
    ratio: 19.3,
  },
  {
    id: 3,
    name: '3 star',
    value: 997,
    ratio: 18.1,
  },
  {
    id: 4,
    name: '2 star',
    value: 408,
    ratio: 7.4,
    className: 'rating__warning',
  },
  {
    id: 5,
    name: '1 star',
    value: 274,
    ratio: 5,
    className: 'rating__error',
  },
];

export const reviewData = [
  {
    id: 1,
    rating: 4.2,
    content: 'Superb sweatshirt. I loved it. It is for winter.',
    images: [
      {
        url: 'https://themesbrand.com/velzon/html/default/assets/images/small/img-12.jpg',
      },
      {
        url: 'https://themesbrand.com/velzon/html/default/assets/images/small/img-11.jpg',
      },
      {
        url: 'https://themesbrand.com/velzon/html/default/assets/images/small/img-10.jpg',
      },
    ],
    author: 'Henry',
    dateCreated: '12 Jul, 21',
  },
  {
    id: 2,
    rating: 4.0,
    content: 'Great at this price, Product quality and look is awesome.',
    author: 'Nancy',
    dateCreated: '06 Jul, 21',
  },
  {
    id: 3,
    rating: 4.2,
    content: 'Good product. I am so happy.',
    author: 'Joseph',
    dateCreated: '06 Jul, 21',
  },
  {
    id: 4,
    rating: 4.2,
    content: 'Nice Product, Good Quality.',
    author: 'Jimmy',
    dateCreated: '24 Jul, 21',
  },
];
