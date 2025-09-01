# PC Parts Inventory

A React-based PC parts inventory application built with Vite and TypeScript. Browse and search through different PC components including CPUs, motherboards, power supplies, and graphics cards.

## Features

- **Summary Dashboard**: Overview of all parts with inventory statistics
- **Search Functionality**: Search across all parts or within specific categories
- **Category Pages**: Dedicated pages for each part type (CPUs, Motherboards, Power Supplies, Graphics Cards)
- **Detailed Specifications**: View detailed specifications for each component
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx   # Main navigation
│   ├── SearchBar.tsx    # Search functionality
│   ├── PartCard.tsx     # Basic part display
│   └── DetailedPartCard.tsx # Detailed part view
├── data/               # Sample data
│   └── parts.ts        # PC parts data
├── pages/              # Page components
│   ├── HomePage.tsx    # Main dashboard
│   └── PartPage.tsx    # Category pages
├── types/              # TypeScript definitions
│   └── index.ts        # Type definitions
└── App.tsx            # Main app component
```

## Data Structure

The application includes sample data for:

- **CPUs**: AMD and Intel processors with specs like cores, threads, clock speeds
- **Motherboards**: Various form factors with socket types and features
- **Power Supplies**: Different wattages and efficiency ratings
- **Graphics Cards**: NVIDIA and AMD GPUs with memory and performance specs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
