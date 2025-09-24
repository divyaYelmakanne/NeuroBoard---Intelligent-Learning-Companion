# NeuroBoard - Intelligent Learning Companion

> Your intelligent learning companion. Track progress, manage tasks, and achieve academic excellence with AI-powered insights.

## 🚀 Overview

NeuroBoard is a comprehensive educational platform designed to revolutionize the way students learn and manage their academic journey. Built with modern web technologies, it provides an intuitive and powerful interface for tracking progress, managing tasks, and accessing learning resources.

## ✨ Key Features

### 📊 **Performance Analytics**
- Real-time progress tracking across all subjects
- Detailed performance charts and visualizations
- AI-powered predictions and insights
- Comprehensive reporting system

### 📝 **Task Management**
- Create, organize, and track study tasks
- Priority-based task management
- Progress tracking with completion percentages
- Deadline management and reminders

### 😊 **Mood Tracking**
- Daily mood monitoring and analysis
- Emotional well-being insights
- Correlation with academic performance
- Personalized recommendations

### 📅 **Smart Scheduling**
- Intelligent calendar integration
- Study schedule optimization
- Event and deadline management
- Time management tools

### 📚 **Learning Resources**
- Comprehensive course library
- Interactive learning tools
- Progress tracking for courses
- Resource organization and management

### 🧪 **Mock Tests & Assessments**
- Extensive test library covering:
  - **HTML & CSS** - Web development fundamentals
  - **JavaScript** - Programming essentials
  - **C Programming** - System programming
  - **Java** - Object-oriented programming
  - **Python** - Modern programming language
  - **Operating Systems** - OS concepts and processes
  - **Database Management** - DBMS fundamentals

### 🤖 **AI Assistant**
- Personalized learning support
- Intelligent recommendations
- Study plan optimization
- 24/7 academic assistance

### 👤 **Profile Management**
- Comprehensive user profiles
- Academic information tracking
- Personal goal setting
- Progress history

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library

### State Management
- **React Context API** - Global state management
- **React Query** - Server state management and caching

### UI/UX
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Responsive design system
- **Custom gradients** - Beautiful visual design
- **Responsive layout** - Mobile-first approach

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript** - Type checking
- **PostCSS** - CSS processing
- **Vite** - Fast development and building

## 📁 Project Structure

```
neuroboard-hub-main/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/            # Images and media files
│   ├── components/        # Reusable React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── [components]  # Custom components
│   ├── contexts/         # React Context providers
│   ├── data/            # Mock data and constants
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── [config files]
├── [config files]       # Vite, TypeScript, Tailwind configs
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neuroboard-hub-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradient (`#6366f1` to `#8b5cf6`)
- **Secondary**: Amber gradient (`#f59e0b` to `#fbbf24`)
- **Success**: Green (`#10b981`)
- **Warning**: Orange (`#f97316`)
- **Error**: Red (`#ef4444`)

### Typography
- **Font Family**: System font stack
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable typography
- **Responsive**: Mobile-first typography scaling

### Components
- **shadcn/ui** - High-quality, accessible components
- **Custom gradients** - Beautiful visual effects
- **Responsive design** - Works on all devices
- **Dark/Light theme** - Theme switching support

## 🔐 Authentication System

The application includes a complete authentication system with:

- **User Registration** - Create new accounts
- **User Login** - Secure authentication
- **Profile Management** - Update user information
- **Protected Routes** - Route-level security
- **Local Storage** - Persistent sessions

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  birthDate?: string;
  address?: string;
  grade?: string;
  school?: string;
  bio?: string;
}
```

## 📊 Dashboard Features

### Performance Tracking
- **Subject-wise analytics** - Track performance across subjects
- **Trend analysis** - Historical performance data
- **Goal setting** - Academic target management
- **Progress visualization** - Charts and graphs

### Activity Monitoring
- **Study hours tracking** - Time spent studying
- **Task completion** - Daily/weekly progress
- **Test performance** - Mock test results
- **Mood correlation** - Academic-emotional insights

## 🧪 Mock Test System

Comprehensive testing system with 8 major subjects:

1. **HTML** - Web markup fundamentals
2. **CSS** - Styling and layout
3. **JavaScript** - Programming essentials
4. **C Programming** - System programming
5. **Java** - Object-oriented programming
6. **Python** - Modern programming
7. **Operating Systems** - OS concepts
8. **Database Management** - DBMS fundamentals

### Test Features
- **20 questions** per subject
- **30-minute duration** per test
- **Instant scoring** and feedback
- **Progress tracking** across attempts
- **Detailed explanations** for answers

## 🎯 Learning Tools

### AI Assistant
- Personalized study recommendations
- Doubt clarification
- Study plan optimization
- Progress-based suggestions

### Study Resources
- Course materials and notes
- Video tutorials and guides
- Practice exercises
- Reference materials

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Mobile Features
- Touch-friendly interface
- Optimized navigation
- Collapsible sidebar
- Mobile-first design approach

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
VITE_APP_NAME=NeuroBoard
```

### Build Configuration
- **Vite** configuration in `vite.config.ts`
- **TypeScript** configuration in `tsconfig.json`
- **Tailwind** configuration in `tailwind.config.ts`
- **ESLint** configuration in `eslint.config.js`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Production
The built files will be in the `dist/` directory, ready for deployment to any static hosting service like:

- **Vercel**
- **Netlify**
- **GitHub Pages**
- **AWS S3**
- **Firebase Hosting**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the amazing component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons
- **React** community for the ecosystem

## Author

For support, please contact:
- **Email**: divyayelmakanne@gmail.com
- **GitHub**: https://github.com/divyaYelmakanne

---

**Made with ❤️ for students everywhere**

*Transform your learning journey with NeuroBoard - Your intelligent learning companion.*
