# Afronaut Ticketing Platform

A comprehensive, modern ticketing platform built with Next.js 14, TypeScript, and Tailwind CSS. This project serves as a complete UI mockup system for client presentations and demonstrations.

![Afronaut Ticketing Platform](public/placeholder-logo.png)

## 🌟 Features

### 🎫 Core Ticketing System
- **Event Discovery**: Advanced search and filtering with autocomplete
- **Ticket Management**: QR code generation, validation, and status tracking
- **Real-time Updates**: Live availability and pricing information
- **Mobile Optimization**: Responsive design for all screen sizes

### 👥 Multi-Role Architecture
- **Customers**: Browse events, purchase tickets, manage favorites
- **Agencies**: Create and manage events, track revenue and analytics
- **Employees**: Scan tickets, validate entries, monitor assigned events
- **Admin**: Full system oversight and management

### 🎨 Modern UI/UX
- **Dark/Light Theme**: System-aware theme switching
- **Animations**: Smooth Framer Motion transitions
- **Responsive Design**: Mobile-first approach with touch interactions
- **Accessible**: WCAG 2.1 compliant components

### 🛡️ Robust Architecture
- **Error Boundaries**: Graceful error handling and recovery
- **Loading States**: Skeleton loaders and progress indicators
- **TypeScript**: Full type safety and IntelliSense
- **Performance**: Optimized images, lazy loading, and code splitting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd afronaut-ticketing
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## 📱 Demo Accounts

### Test Users
```
Customer Account:
- Email: user@afronaut.com
- Password: password123
- Role: User (Customer)

Agency Account:
- Email: agency@afronaut.com  
- Password: password123
- Role: Agency (Event Organizer)

Employee Account:
- Email: employee@afronaut.com
- Password: password123
- Role: Employee (Scanner)

Admin Account:
- Email: admin@afronaut.com
- Password: password123
- Role: Admin (System Admin)
```

## 🏗️ Tech Stack

### Frontend Framework
- **Next.js 14**: App Router, Server Components, TypeScript
- **React 18**: Hooks, Context, Suspense
- **TypeScript**: Full type safety

### Styling & UI
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Framer Motion**: Animation and gesture library
- **Lucide React**: Modern icon library

### State Management
- **Zustand**: Lightweight state management
- **Local Storage**: Persistent user preferences
- **Context API**: Theme and authentication state

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Role-based dashboards
│   │   ├── admin/        # Admin dashboard
│   │   ├── agency/       # Agency management
│   │   ├── employee/     # Ticket scanning
│   │   └── user/         # Customer dashboard
│   ├── events/           # Event pages
│   ├── tickets/          # Ticket management
│   ├── auth/            # Authentication
│   └── globals.css      # Global styles
├── components/            # Reusable components
│   ├── common/          # Shared components
│   ├── events/          # Event-specific components
│   ├── tickets/         # Ticket components
│   └── ui/              # Base UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and config
├── mocks/               # Mock data for demos
├── stores/              # Zustand state stores
└── styles/              # Additional stylesheets
```

## 🎯 Key Features Walkthrough

### 1. Landing Page
- **Hero Section**: Animated gradient backgrounds with call-to-action
- **Search Integration**: Global search with autocomplete and recent searches
- **Featured Events**: Curated event recommendations
- **Feature Highlights**: Platform benefits and capabilities

### 2. Event Discovery
- **Advanced Filtering**: Location, price, date, category filters
- **Real-time Search**: Instant results with highlighting
- **Sort Options**: Date, price, popularity sorting
- **Grid Layout**: Responsive card-based event display

### 3. Event Details
- **Rich Media**: High-quality event imagery
- **Ticket Selection**: Multiple category selection with pricing
- **Venue Information**: Location, capacity, and amenities
- **Booking Flow**: Streamlined checkout process

### 4. Dashboard Systems

#### Customer Dashboard
- **Ticket Overview**: Active and past tickets
- **Favorites Management**: Saved events and notifications
- **Spending Analytics**: Purchase history and statistics
- **Profile Management**: Account settings and preferences

#### Agency Dashboard
- **Event Management**: Create, edit, and manage events
- **Analytics**: Revenue tracking and attendee insights
- **Employee Management**: Staff assignment and permissions
- **Performance Metrics**: Sales trends and forecasting

#### Employee Dashboard
- **Ticket Scanning**: QR code validation interface
- **Event Assignment**: Assigned venue and shift management
- **Scan History**: Validation logs and statistics
- **Real-time Status**: Live event attendance tracking

### 5. Mobile Experience
- **Responsive Design**: Optimized for all screen sizes
- **Touch Interactions**: Swipe gestures and touch-friendly controls
- **Mobile Menu**: Collapsible navigation with quick actions
- **Offline Support**: Cached content for poor connectivity

## 🎨 Design System

### Color Palette
- **Primary**: Vibrant green (#22C55E) for CTAs and highlights
- **Background**: Deep black (#000000) for premium feel
- **Surfaces**: Dark gray (#0A0A0A, #171717) for cards and panels
- **Text**: White (#FFFFFF) and grays for hierarchy
- **Accents**: Green variations for status and feedback

### Typography
- **Headings**: Bold, large scale for impact
- **Body**: Clean, readable sans-serif
- **Code**: Monospace for technical elements
- **Hierarchy**: Clear size and weight distinctions

### Components
- **Cards**: Elevated surfaces with subtle shadows
- **Buttons**: Clear hierarchy with hover animations
- **Forms**: Accessible inputs with proper validation
- **Navigation**: Intuitive structure with breadcrumbs

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Afronaut Ticketing"
NODE_ENV=development
```

### Customization
- **Themes**: Modify `src/app/globals.css` for color schemes
- **Components**: Extend `src/components/ui/` for custom components
- **Mock Data**: Update `src/mocks/` for demo content
- **Branding**: Replace logos and assets in `public/`

## 📈 Performance Optimizations

### Core Web Vitals
- **LCP**: Optimized image loading and lazy loading
- **FID**: Minimal JavaScript bundles and code splitting
- **CLS**: Reserved space for dynamic content

### Best Practices
- **Image Optimization**: Next.js Image component with proper sizing
- **Font Loading**: Efficient web font strategies
- **Bundle Splitting**: Route-based code splitting
- **Caching**: Aggressive caching for static assets

## 🔍 Testing

### Manual Testing Checklist
- [ ] All authentication flows work correctly
- [ ] Event search and filtering functions properly
- [ ] Ticket selection and booking process completes
- [ ] Dashboard analytics display correctly
- [ ] Mobile responsiveness across devices
- [ ] Theme switching works in all contexts
- [ ] Error states display helpful messages
- [ ] Loading states provide feedback

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📊 Analytics & Monitoring

### Built-in Analytics
- **User Behavior**: Navigation patterns and engagement
- **Event Performance**: Popularity and conversion rates
- **Revenue Tracking**: Sales metrics and trends
- **System Health**: Error rates and performance metrics

## 🛡️ Security Considerations

### Authentication
- **Mock Authentication**: Demo-safe user simulation
- **Role-based Access**: Proper permission checking
- **Session Management**: Secure state handling
- **Input Validation**: Form data sanitization

### Data Protection
- **Client-side Only**: No real user data collection
- **Local Storage**: Secure preference storage
- **HTTPS Ready**: SSL/TLS configuration support
- **Privacy First**: No tracking or analytics by default

## 🚀 Deployment

### Build Process
```bash
# Production build
npm run build

# Start production server
npm start

# Export static site
npm run export
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Static site hosting with form handling
- **AWS Amplify**: Full-stack deployment with backend
- **Docker**: Containerized deployment

### Environment Configuration
```bash
# Production environment variables
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow configured linting rules
- **Prettier**: Consistent code formatting
- **Comments**: Document complex logic and components

## 📝 License

This project is created for demonstration and client presentation purposes. All code is provided as-is for educational and evaluation use.

## 🆘 Support

### Documentation
- **Component Docs**: Storybook documentation (coming soon)
- **API Reference**: TypeScript interfaces and types
- **Design System**: Figma design files (available on request)

### Contact
For questions about implementation, customization, or deployment:
- **Email**: support@afronaut.com
- **Documentation**: Comprehensive inline code comments
- **Issues**: GitHub Issues for bug reports and feature requests

---

## 🎉 Acknowledgments

Built with modern web technologies and best practices:
- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **shadcn/ui**: For the beautiful component library
- **Framer Motion**: For smooth animations and gestures
- **Vercel**: For deployment and hosting platform

---

**Afronaut Ticketing Platform** - Your gateway to unforgettable experiences 🎫
