# 🛒 The Big Store - Full Stack E-Commerce Platform

A modern, feature-rich e-commerce web application built with React.js frontend and Node.js/Express backend with MongoDB database. This platform provides a complete shopping experience with user authentication, product management, shopping cart, order processing, and admin dashboard.

![E-Commerce Platform](public/images/of5.png)

## ✨ Features

### 🛍️ Customer Features
- **User Authentication** - Secure registration and login system
- **Product Catalog** - Browse products organized by categories
- **Advanced Search** - Find products quickly with search functionality
- **Shopping Cart** - Add/remove items with quantity management
- **Order Management** - Complete checkout process with order history
- **Order Tracking** - View order status and history
- **Responsive Design** - Mobile-friendly interface

### 👨‍💼 Admin Features
- **Dashboard** - Comprehensive admin panel for store management
- **Product Management** - Add, edit, delete products with image uploads
- **Category Management** - Organize products into categories
- **User Management** - View and manage registered users
- **Order Management** - Track and update order statuses
- **Inventory Management** - Real-time stock level tracking

## 🛠️ Technology Stack

**Frontend:**
- React.js 19.1.1
- React Router DOM for navigation
- Bootstrap for responsive UI
- Font Awesome icons
- React Toastify for notifications
- React Slideshow for product displays

**Backend:**
- Node.js with Express.js
- MongoDB with Mongoose ODM
- Multer for file uploads
- CORS enabled for cross-origin requests

**Additional Libraries:**
- Axios for API calls
- JQuery for enhanced UI interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is running on your system
   - The application connects to `mongodb://127.0.0.1:27017/projectdb`

4. **Start the development servers**

   Frontend (React):
   ```bash
   npm start
   ```
   Server will run on http://localhost:3000

   Backend (Node.js):
   ```bash
   npm run server
   ```
   API server will run on http://localhost:9000

## 📁 Project Structure

```
project/
├── src/                 # React frontend source
│   ├── Components/      # React components
│   │   ├── AdminHeader.js
│   │   ├── AdminHome.js
│   │   ├── Categories.js
│   │   ├── Changepassword.js
│   │   ├── Checkout.js
│   │   └── ...other components
│   ├── App.js           # Main app component
│   └── index.js         # Entry point
├── public/              # Static assets
│   ├── images/         # Product images
│   ├── Uploads/        # User uploads
│   ├── css/            # Bootstrap and custom styles
│   └── js/             # JavaScript libraries
├── server.js           # Express server with API routes
└── package.json        # Dependencies and scripts
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User authentication

### Products
- `POST /api/saveproduct` - Add new product
- `GET /api/fetchprodsbycatid` - Get products by category
- `GET /api/searchproducts` - Search products
- `GET /api/fetchnewprods` - Get newest products

### Categories
- `POST /api/savecategory` - Add new category
- `GET /api/getallcat` - Get all categories

### Shopping Cart
- `POST /api/savetocart` - Add to cart
- `GET /api/getcart` - Get user's cart
- `DELETE /api/delcartitem/:uid` - Remove cart item

### Orders
- `POST /api/saveorder` - Create new order
- `GET /api/getallorders` - Get all orders (admin)
- `GET /api/getuserorders` - Get user orders
- `PUT /api/updatestatus` - Update order status

## 🎯 Usage

1. **As a Customer:**
   - Register/Login to your account
   - Browse products by categories
   - Add products to your shopping cart
   - Proceed to checkout and place orders
   - View your order history and track orders

2. **As an Admin:**
   - Access admin dashboard
   - Manage products and categories
   - View and manage user accounts
   - Process and update order statuses
   - Monitor inventory levels

## 🖼️ Screenshots

The application includes a modern UI with:
- Responsive product grids
- Shopping cart functionality
- Admin dashboard interface
- Order management system
- Image upload capabilities

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://127.0.0.1:27017/projectdb
PORT=9000
JWT_SECRET=your-secret-key
```

### File Uploads
Product and category images are stored in `public/Uploads/` directory with automatic filename generation.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bootstrap for responsive UI components
- Font Awesome for icons
- React community for excellent documentation
- MongoDB for reliable database solution

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

**Happy Shopping!** 🛍️
