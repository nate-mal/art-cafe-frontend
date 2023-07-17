
# ArtCafe E-commerce Website

Welcome to the frontend repository of ArtCafe, an e-commerce website specializing in selling coffee machine parts, refurbished coffee machines, and offering repair services for coffee machines. This Next.js app, combined with Strapi for content management and Stripe for payment processing, forms the backbone of our user-friendly and intuitive website.

**Website Demo:** [www.artcafe.store](https://www.artcafe.store)

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
  - [Instant Search](#instant-search)
  - [Coffee Machine Parts](#coffee-machine-parts)
  - [Repair Services](#repair-services)
  - [Reparo Estimate](#reparo-estimate)
  - [Stripe Integration](#stripe-integration)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
Our e-commerce website is built using Next.js, a powerful and flexible React framework that enables server-side rendering and optimized performance. Strapi serves as our headless CMS, managing product listings, descriptions,and whatnot. Stripe powers our secure payment processing, ensuring safe transactions for our customers.

## Features

### Instant Search
I've implemented an instant search functionality using MeiliSearch, allowing users to find products quickly and effortlessly. The prominent instant search box on our website enables users to search for specific products or browse by category, enhancing their shopping experience.

### Coffee Machine Parts
The Coffee Machine Parts section offers a wide selection of parts for various types of coffee machines. Each product page is designed with high-quality images, detailed descriptions, and customer reviews to assist users in making informed purchasing decisions.

### Repair Services
Our Repair Services section provides a variety of services, ranging from basic maintenance to troubleshooting and repairs. Customers can easily schedule a repair for their coffee machines through this section, making the process hassle-free.

### Reparo Estimate
To make it convenient for customers, we've created the Reparo Estimate section. This features a simple quiz that helps customers estimate the cost of repairing their broken coffee machines, enabling them to plan and budget accordingly.

### Stripe Integration
To handle payment processing securely, we've seamlessly integrated Stripe into our website's checkout process. With this integration, customer payment information is kept safe, making online transactions smooth and reliable.

## Getting Started

### Installation
To get the frontend up and running on your local machine, follow these steps:

1. Clone this repository: `git clone https://github.com/nate-mal/art-cafe-frontend`
2. Change to the project directory: `cd art-cafe-frontend`
3. Install dependencies: `npm install`

### Configuration
Before running the app, you'll need to configure some environment variables:

1. Create a `.env` file at the root of the project.
2. Add the necessary environment variables, such as Stripe API keys and MeiliSearch configuration.

Here's an example `.env` file:

```
MEI_HOST=your_meilisearch_url
MEI_MASTER_KEY=your_meilisearch_key
NEXT_PUBLIC_API_URL=your_backend_url(strapi)
NEXT_PUBLIC_URL=your_client_url

LOCATION_KEY=key_used_for_requestingspecificdata_from_strapi(products url from provider to check the stock with a google cloud function)
EMAIL_SERVER_USER=youremail@domain.com
EMAIL_SERVER_PASSWORD=youremailpassword
EMAIL_SERVER_HOST=hot
EMAIL_SERVER_PORT=hostport
EMAIL_ADDRESS_FROM=Art Cafe <noreply.youremail@domain.com>
EMAIL_ADDRESS_REPLY=yourreplyemail@domain.com
```
3. Also change the stripe public key  in Checkout component  and the variables from lib/settings file accordingly

```
 const minOrder = min_order_amount_in_cents;
const min_free_shipping = min_order_for_free_shipping_in_cents;
const promo_code = "your_promo_code";
const backend_url = "your_strapibackend_url";

```
4. Create a function to check the stock from the provider based on the specific provider API and update the link in the stock API endpoint, if not the nextjs stock endpoint handler will check only the intern stock in strapi.

### Usage
To start the development server, run: `npm run dev`

Visit `http://localhost:3000` in your web browser to access the e-commerce website.

## Contributing
We welcome contributions from the community! If you find any issues or have suggestions for improvement, please submit a pull request or open an issue in this repository.

## License
The project is licensed under the [MIT License](LICENSE).

For the backend repository and instructions on setting up the entire project, please visit [ArtCafe Backend Repository](https://github.com/nate-mal/strapi).

Thank you for being part of this exciting project, and we hope our website serves coffee machine enthusiasts everywhere with a delightful shopping experience!

































