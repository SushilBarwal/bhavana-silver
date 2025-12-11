# API Documentation - Bhavana Silver

## Base URL
```
http://localhost:8000/api/v1
```

---

## 🔐 Authentication

This API uses **simple token-based authentication** powered by Laravel Sanctum.

### How It Works

1. **Generate a token** by calling the token generation endpoint
2. **Include the token** in the `Authorization` header for all API requests
3. **No user registration or login required**

### Quick Start

```bash
# 1. Generate a token
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/json"

# 2. Use the token in requests
curl http://localhost:8000/api/v1/products \
  -H "Authorization: Bearer {your_token_here}"
```

---

## Authentication Endpoint

### Generate API Token

**Endpoint:** `POST /api/v1/auth/token`

**Description:** Generates a new API access token dynamically. No user account required.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body (Optional):**
```json
{
  "name": "My Application Token"
}
```

**Parameters:**
- `name` (optional, string): Custom name for the token. If not provided, a random name will be generated.

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{"name": "Mobile App Token"}'
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "token": "6|abc123xyz456def789...",
  "token_type": "Bearer",
  "name": "Mobile App Token",
  "created_at": "2025-12-08T12:00:00.000000Z"
}
```

**Response Fields:**
- `success` (boolean): Indicates successful token generation
- `token` (string): The API token to use in subsequent requests
- `token_type` (string): Always "Bearer"
- `name` (string): The token name/identifier
- `created_at` (datetime): When the token was created

**Important Notes:**
- ✅ Tokens are stored securely in the database
- ✅ Tokens don't expire by default
- ✅ You can generate multiple tokens
- ✅ Save the token securely - it's only shown once

---

## 🔒 Using Authentication

All endpoints below require authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer {your_token}
```

### Unauthorized Response (401)

If you try to access a protected endpoint without a valid token:

```json
{
  "message": "Unauthenticated."
}
```

---

## Site Settings Endpoints

### 1. Get Header Configuration

**Endpoint:** `GET /api/v1/site-settings/header`

**Description:** Retrieve header configuration including logo and menu items.

**Headers:**
```
Authorization: Bearer {your_token}
```

**Example Request:**
```bash
curl http://localhost:8000/api/v1/site-settings/header \
  -H "Authorization: Bearer 6|abc123xyz..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "logo": "/storage/logo.png",
    "site_name": "Bhavana Silver Jewellers",
    "contact": {
      "phone": "+1 (234) 567-8900",
      "email": "info@bhavanasilver.com"
    },
    "menu_items": [
      {
        "label": "Rings",
        "url": "/rings",
        "category_ids": [1, 2],
        "featured_category_id": 1,
        "order": 0,
        "submenu": {
          "categories": [
            {
              "id": 1,
              "name": "Gold Rings",
              "slug": "gold-rings",
              "children": []
            }
          ],
          "products": [
            {
              "id": 5,
              "name": "Diamond Ring",
              "slug": "diamond-ring",
              "price": 2500.00,
              "sale_price": 2000.00,
              "image": "http://localhost:8000/storage/products/ring.jpg"
            }
          ]
        }
      }
    ],
    "cta_button": {
      "text": "Shop Now",
      "url": "/products",
      "visible": true
    },
    "social_links": {
      "facebook": "https://facebook.com/bhavanasilver",
      "instagram": "https://instagram.com/bhavanasilver"
    }
  }
}
```

**Menu Item Fields:**
- `label` (string): Menu item text
- `url` (string): Link destination
- `category_ids` (array): IDs of categories for category tree
- `featured_category_id` (integer): Category ID to filter featured products (0 = all categories)
- `product_ids` (array): Manually selected product IDs (used if featured_category_id is 0)
- `order` (integer): Display order
- `submenu` (object): Contains categories and products
  - `categories` (array): Hierarchical category tree
  - `products` (array): Featured products (filtered by featured_category_id or manually selected)
    - Includes: id, name, slug, price, sale_price, image


---

### 2. Get Footer Configuration

**Endpoint:** `GET /api/v1/site-settings/footer`

**Description:** Retrieve footer configuration.

**Headers:**
```
Authorization: Bearer {your_token}
```

**Example Request:**
```bash
curl http://localhost:8000/api/v1/site-settings/footer \
  -H "Authorization: Bearer 6|abc123xyz..."
```

---

### 3. Get All Site Settings

**Endpoint:** `GET /api/v1/site-settings/all`

**Description:** Retrieve all site settings at once.

**Headers:**
```
Authorization: Bearer {your_token}
```

**Example Request:**
```bash
curl http://localhost:8000/api/v1/site-settings/all \
  -H "Authorization: Bearer 6|abc123xyz..."
```

---

### 4. Get Site Info

**Endpoint:** `GET /api/v1/site-settings/info`

**Description:** Retrieve general site information.

**Headers:**
```
Authorization: Bearer {your_token}
```

**Example Request:**
```bash
curl http://localhost:8000/api/v1/site-settings/info \
  -H "Authorization: Bearer 6|abc123xyz..."
```

---

## Product Endpoints

### 1. Get All Products (Paginated)

**Endpoint:** `GET /api/v1/products`

**Description:** Retrieve a paginated list of products with optional filtering.

**Headers:**
```
Authorization: Bearer {your_token}
```

**Query Parameters:**
- `per_page` (optional, integer, default: 15): Number of items per page
- `category` (optional, integer): Filter by category ID
- `categories` (optional, string): Filter by multiple category IDs (comma-separated)
- `search` (optional, string): Search by product name or code

**Example Request:**
```bash
curl "http://localhost:8000/api/v1/products?per_page=10&search=silver" \
  -H "Authorization: Bearer 6|abc123xyz..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "PROD-001",
      "sku": "PROD-001",
      "slug": "silver-necklace",
      "name": "Silver Necklace",
      "price": 1500.00,
      "max_price": 2000.00,
      "sale_price": 1200.00,
      "short_description": "Beautiful handcrafted silver necklace",
      "description": "Full description...",
      "details": {
        "material": "925 Sterling Silver",
        "finish": "Polished"
      },
      "stone_size": "5mm",
      "dimensions": "10x5x3 cm",
      "plating": "Gold Plated",
      "weight": 10.50,
      "category": {
        "id": 1,
        "name": "Necklaces",
        "slug": "necklaces",
        "level": 1,
        "level_name": "Sub-category",
        "full_path": "Jewelry > Necklaces",
        "parent_id": 1
      },
      "stone": {
        "id": 1,
        "name": "Ethiopian Opal",
        "slug": "ethiopian-opal",
        "properties": {
          "color": "Multi-color",
          "origin": "Ethiopia"
        }
      },
      "image": "http://localhost:8000/storage/products/image.jpg",
      "images": [
        {
          "id": 1,
          "url": "http://localhost:8000/storage/products/image.jpg",
          "name": "product",
          "extension": "jpg",
          "size": 1024
        }
      ],
      "created_at": "2025-12-02T09:30:00.000000Z",
      "updated_at": "2025-12-02T09:30:00.000000Z"
    }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 75,
    "from": 1,
    "to": 15
  }
}
```

---

### 2. Get Single Product by ID

**Endpoint:** `GET /api/v1/products/{id}`

**Description:** Retrieve a single product by its ID.

**Headers:**
```
Authorization: Bearer {your_token}
```

**URL Parameters:**
- `id` (required, integer): Product ID

**Example Request:**
```bash
curl http://localhost:8000/api/v1/products/1 \
  -H "Authorization: Bearer 6|abc123xyz..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "code": "PROD-001",
    "name": "Silver Necklace",
    ...
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### 3. Get Single Product by Slug

**Endpoint:** `GET /api/v1/products/slug/{slug}`

**Description:** Retrieve a single product by its URL-friendly slug.

**Headers:**
```
Authorization: Bearer {your_token}
```

**URL Parameters:**
- `slug` (required, string): Product slug

**Example Request:**
```bash
curl http://localhost:8000/api/v1/products/slug/silver-necklace \
  -H "Authorization: Bearer 6|abc123xyz..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "slug": "silver-necklace",
    "name": "Silver Necklace",
    ...
  }
}
```

---

## Category Endpoints

### 1. Get All Categories

**Endpoint:** `GET /api/v1/categories`

**Description:** Retrieve all product categories with optional filtering.

**Headers:**
```
Authorization: Bearer {your_token}
```

**Query Parameters:**
- `level` (optional, integer): Filter by hierarchy level (0, 1, or 2)
- `include_inactive` (optional, boolean, default: false): Include inactive categories

**Example Request:**
```bash
curl "http://localhost:8000/api/v1/categories?level=0" \
  -H "Authorization: Bearer 6|abc123xyz..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Jewelry",
      "slug": "jewelry",
      "full_path": "Jewelry",
      "level": 0,
      "level_name": "Parent",
      "parent_id": null,
      "description": "All jewelry items",
      "is_active": true,
      "order": 0,
      "created_at": "2025-12-02T09:30:00.000000Z",
      "updated_at": "2025-12-02T09:30:00.000000Z"
    }
  ]
}
```

---

### 2. Get Single Category

**Endpoint:** `GET /api/v1/categories/{id}`

**Description:** Retrieve a single category by its ID.

**Headers:**
```
Authorization: Bearer {your_token}
```

**URL Parameters:**
- `id` (required, integer): Category ID

**Example Request:**
```bash
curl http://localhost:8000/api/v1/categories/1 \
  -H "Authorization: Bearer 6|abc123xyz..."
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Jewelry",
    "slug": "jewelry",
    ...
  }
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

**Causes:**
- Missing Authorization header
- Invalid or expired token
- Malformed token format

---

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

**Causes:**
- Resource with specified ID doesn't exist
- Invalid slug

---

### 422 Validation Error
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "field_name": ["Error message here"]
  }
}
```

**Causes:**
- Invalid request parameters
- Missing required fields
- Data type mismatch

---

## React/JavaScript Integration

### Setup Axios with Authentication

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('api_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid or expired
      localStorage.removeItem('api_token');
      // Redirect to token generation or show error
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Generate and Store Token

```javascript
import api from './api';

// Generate a new token
export const generateToken = async (tokenName = 'My App') => {
  const response = await api.post('/auth/token', { name: tokenName });
  
  // Store token
  localStorage.setItem('api_token', response.data.token);
  
  return response.data;
};
```

### Fetch Products

```javascript
import api from './api';

// Get all products
export const fetchProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

// Get single product
export const fetchProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Get product by slug
export const fetchProductBySlug = async (slug) => {
  const response = await api.get(`/products/slug/${slug}`);
  return response.data;
};
```

### React Component Example

```jsx
import React, { useState, useEffect } from 'react';
import { generateToken, fetchProducts } from './api';

const App = () => {
  const [hasToken, setHasToken] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if token exists
  useEffect(() => {
    const token = localStorage.getItem('api_token');
    setHasToken(!!token);
  }, []);

  // Generate token
  const handleGenerateToken = async () => {
    try {
      await generateToken('React App');
      setHasToken(true);
    } catch (error) {
      console.error('Token generation failed:', error);
    }
  };

  // Fetch products
  useEffect(() => {
    if (hasToken) {
      loadProducts();
    }
  }, [hasToken]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts({ per_page: 12 });
      setProducts(data.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!hasToken) {
    return (
      <div>
        <h1>Welcome</h1>
        <button onClick={handleGenerateToken}>Get API Access</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
```

---

## CORS Configuration

If your frontend runs on a different domain/port, ensure CORS is configured in `config/cors.php`:

```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000', 'http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => false,
```

---

## Product Fields Reference

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | integer | Product ID | 1 |
| `code` | string | Product code/SKU | "PROD-001" |
| `sku` | string | Alias for code | "PROD-001" |
| `slug` | string | URL-friendly identifier | "silver-necklace" |
| `name` | string | Product name | "Silver Necklace" |
| `price` | decimal | Product price (regular) | 1500.00 |
| `max_price` | decimal | Maximum price (for range) | 2000.00 |
| `sale_price` | decimal | Sale/discounted price | 1200.00 |
| `short_description` | string | Brief description | "Beautiful..." |
| `description` | text | Full description | "This exquisite..." |
| `details` | JSON | Technical details | `{"material": "925 Sterling Silver"}` |
| `stone_size` | string | Stone size/grade | "5mm", "Large" |
| `dimensions` | string | Product dimensions | "10x5x3 cm" |
| `plating` | string | Plating type | "Gold Plated" |
| `weight` | decimal | Weight in grams | 10.50 |
| `category` | object | Category details | See category object |
| `stone` | object | Stone details | See stone object |
| `image` | string | Main image URL | Full URL |
| `images` | array | All product images | Array of image objects |

---

## Testing with Postman

### Step 1: Generate Token

1. Create new request
2. Method: `POST`
3. URL: `http://localhost:8000/api/v1/auth/token`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON): `{"name": "Postman Test"}`
6. Click **Send**
7. Copy the `token` from response

### Step 2: Use Token

1. Create new request
2. Method: `GET`
3. URL: `http://localhost:8000/api/v1/products`
4. Go to **Authorization** tab
5. Type: **Bearer Token**
6. Token: Paste your token
7. Click **Send**

### Import Postman Collection

A ready-to-use Postman collection is available:
- File: `Bhavana_Silver_API.postman_collection.json`
- Import into Postman for pre-configured requests
- Token is automatically saved after generation

---

## Security Notes

- ✅ All API endpoints (except `/auth/token`) are protected
- ✅ Tokens are hashed in database using SHA-256
- ✅ Use HTTPS in production
- ✅ Store tokens securely (avoid localStorage in production for sensitive data)
- ⚠️ Tokens don't expire by default (configurable in `config/sanctum.php`)
- ⚠️ Keep your tokens secret - treat them like passwords

---

## Rate Limiting

Consider implementing rate limiting for production:

```php
// In routes/web.php
Route::middleware(['throttle:60,1'])->group(function () {
    // API routes
});
```

This limits requests to 60 per minute per IP address.

---

## API Versioning

Current version: **v1**

The API is versioned via URL path (`/api/v1/`). Future versions will use `/api/v2/`, etc.

---

## Support

For issues or questions about the API:
- Check this documentation
- Review the Postman collection
- Contact the development team
