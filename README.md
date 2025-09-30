# OTA Business Class

Premium OTA for Business/First flights with Amadeus & Sabre.

## ✨ Features

### 🎨 Premium Design
- Modern glass-morphism effects
- Elegant color palette with premium gold/platinum accents
- Smooth animations and micro-interactions
- Fully responsive design
- Dark mode support

### 🔍 Advanced Search
- Multi-step search interface
- Real-time flight suggestions
- Advanced filtering options
- Price range selection
- Airline and class preferences

### ✈️ Flight Management
- Comprehensive flight results display
- Interactive flight selection
- Detailed flight information
- Amenity indicators
- Price comparison

### 🌟 Premium Services
- Priority boarding
- Lounge access
- Concierge service
- Airport transfers
- Travel insurance
- Membership tiers (Gold, Platinum, Diamond)

### 🏙️ Featured Destinations
- Curated destination showcase
- High-quality imagery
- Price comparisons
- User ratings and reviews
- Interactive carousel

### 👥 Customer Experience
- Customer testimonials
- Trust indicators
- Newsletter subscription
- 24/7 support
- Premium membership benefits

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd skyline-ota
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Date Handling**: date-fns

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── SearchForm.tsx
│   ├── FeaturedDestinations.tsx
│   ├── PremiumServices.tsx
│   ├── Testimonials.tsx
│   ├── Newsletter.tsx
│   └── FlightResults.tsx
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Secondary**: Sky Blue (#0ea5e9)
- **Premium Gold**: #f59e0b
- **Premium Platinum**: #8b5cf6
- **Premium Diamond**: #06b6d4

### Typography
- **Headings**: Poppins (Display)
- **Body**: Inter (Sans-serif)

### Components
- Glass-morphism effects
- Gradient backgrounds
- Card hover animations
- Premium button styles
- Interactive form elements

## 🔧 Customization

### Adding New Destinations
Edit `src/components/FeaturedDestinations.tsx` and add new destination objects to the `destinations` array.

### Modifying Services
Update `src/components/PremiumServices.tsx` to add or modify premium services and membership tiers.

### Styling Changes
Modify `tailwind.config.js` for color scheme changes or `src/app/globals.css` for custom styles.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔑 Env keys (sample)

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DB?schema=public
REDIS_URL=redis://default:pass@localhost:6379
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
AMADEUS_BASE_URL=https://test.api.amadeus.com
AMADEUS_CLIENT_ID=...
AMADEUS_CLIENT_SECRET=...
SABRE_BASE_URL=https://api.test.sabre.com
SABRE_CLIENT_ID=...
SABRE_CLIENT_SECRET=...
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support, email support@skyline-ota.com or join our Discord community.

---

Built with ❤️ for premium travel experiences
