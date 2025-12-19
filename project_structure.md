# Project Structure\n\n\`\`\`
.
├── backend
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   │   ├── product.controller.js
│   │   │   └── shop.controller.js
│   │   ├── middleware
│   │   │   └── errorHandler.js
│   │   ├── models
│   │   │   ├── Product.js
│   │   │   └── Shop.js
│   │   ├── public
│   │   │   └── 404.html
│   │   └── routes
│   │       ├── product.routes.js
│   │       └── shop.routes.js
│   ├── package.json
│   ├── package-lock.json
│   ├── products.json
│   ├── sample_products_100.json
│   ├── seed_websites.js
│   ├── server.js
│   └── shops.json
├── client
│   ├── public
│   │   ├── main.svg
│   │   ├── roger.png
│   │   └── vite.svg
│   ├── src
│   │   ├── api
│   │   │   ├── axiosInstance.js
│   │   │   ├── products.api.js
│   │   │   └── shops.api.js
│   │   ├── assets
│   │   │   └── react.svg
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ShopCard.jsx
│   │   ├── contexts
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProductContext.jsx
│   │   ├── hooks
│   │   │   ├── useFetchProducts.js
│   │   │   ├── useFetchShops.js
│   │   │   └── useLowestPrice.js
│   │   ├── pages
│   │   │   ├── Admin
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── EditProduct.jsx
│   │   │   │   └── ManageShops.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── ProductList.jsx
│   │   ├── router
│   │   │   └── AppRouter.jsx
│   │   ├── styles
│   │   │   └── index.css
│   │   ├── utils
│   │   │   ├── priceHelpers.js
│   │   │   └── validators.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
├── DATA_FLOW.md
├── package.json
├── package-lock.json
└── project_structure.md

22 directories, 56 files
\`\`\`
