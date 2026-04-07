# Indian Constitution Awareness Platform

A modern, high-end web platform for promoting awareness of the Indian Constitution with stunning UI/UX and smooth animations.

## Design System

### Color Palette
- **Navy Blue**: #0A1F44 (Primary)
- **Saffron**: #FF9933 (Secondary)
- **White**: #FFFFFF
- **Green**: #138808 (Accent)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Poppins, Inter (sans-serif)

### Key Features
- Glassmorphism effects
- Smooth animations with Motion/React
- Responsive design
- 8px grid system
- Custom Ashoka Chakra elements

## Project Structure

```
src/
├── app/
│   ├── App.tsx (Main entry point)
│   ├── routes.tsx (React Router configuration)
│   ├── components/
│   │   ├── AshokaChakra.jsx (Animated Ashoka Chakra component)
│   │   ├── DashboardLayout.jsx (Reusable dashboard layout)
│   │   └── figma/
│   │       └── ImageWithFallback.tsx (Protected system file)
│   └── pages/
│       ├── Landing.jsx (Homepage with role selection)
│       ├── Login.jsx (Login page with floating labels)
│       ├── Signup.jsx (Registration with 6-digit captcha)
│       ├── ArticleView.jsx (Article reading page)
│       ├── DiscussionForum.jsx (Community forum)
│       ├── Quiz.jsx (Interactive quiz with score reveal)
│       ├── NotFound.jsx (404 page)
│       └── dashboards/
│           ├── AdminDashboard.jsx
│           ├── EducatorDashboard.jsx
│           ├── LegalExpertDashboard.jsx
│           └── CitizenDashboard.jsx
└── styles/
    ├── index.css (Main import file)
    ├── fonts.css (Google Fonts import)
    ├── theme.css (Color tokens and design system)
    ├── custom.css (Custom animations and utilities)
    └── tailwind.css (Tailwind imports)
```

## Pages Overview

### 1. Landing Page (/)
- Animated Ashoka Chakra hero section
- Role selection cards (Admin, Educator, Legal Expert, Citizen)
- Feature highlights
- Platform statistics
- About section
- Footer with quick links

### 2. Authentication Pages
- **Login** (/login): Email/password with social login options
- **Signup** (/signup): Multi-step registration with role selection and 6-digit captcha

### 3. Role-Based Dashboards

#### Admin Dashboard (/admin)
- User management overview
- Pending content approvals
- Analytics dashboard
- System logs access
- Role management

#### Educator Dashboard (/educator)
- Content creation tools
- Session scheduling
- Article management
- Quiz creator
- Student interaction panel

#### Legal Expert Dashboard (/legal-expert)
- Constitutional article updates
- Legal insights editor
- Case reference management
- Amendment tracking
- Advisory request handling

#### Citizen Dashboard (/citizen)
- Constitutional articles exploration
- Fundamental Rights & Duties
- Discussion forum access
- Quiz participation
- Bookmarked articles
- Learning progress tracking

### 4. Article View Page (/article/:id)
- Clean reading layout
- Font size adjustment
- Bookmark and share options
- Like/reaction system
- Comments section
- Related articles sidebar

### 5. Discussion Forum (/forum)
- Category-based threads
- Like and reply system
- Trending discussions
- Search and filter
- Expandable comment sections

### 6. Quiz Page (/quiz/:id)
- Multiple choice questions
- Progress bar animation
- Timer display
- Answer review with explanations
- Animated score reveal
- Retake option

### 7. 404 Page (/**)
- Animated 404 display
- Navigation options
- Quick access to main sections

## Key Components

### DashboardLayout
Reusable layout for all dashboards featuring:
- Collapsible sidebar navigation
- Top bar with search
- Notification bell
- User profile menu
- Responsive design

### AshokaChakra
Animated SVG component of the Ashoka Chakra with 24 spokes, used for loading states and decorative elements.

## Custom Animations

- **fadeIn**: Fade in with upward movement
- **slideInFromLeft/Right**: Slide in animations
- **scaleIn**: Scale and fade animation
- **hover-lift**: Card lift on hover
- **hover-glow**: Glow effect on hover
- **pulse-glow**: Pulsing glow animation

## Glassmorphism Classes

- `.glass`: Basic glassmorphism effect
- `.glass-white`: White glass with blur
- `.glass-navy`: Navy blue glass with blur

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All components are fully responsive and adapt to different screen sizes.

## Installation & Usage

The platform uses:
- React Router for navigation
- Motion (Framer Motion) for animations
- Lucide React for icons
- Tailwind CSS v4 for styling
- Custom CSS for additional effects

All dependencies are pre-installed. The app is ready to run with the existing setup.
