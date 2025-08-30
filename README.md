# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# PC Parts Inventory

A React-based PC parts inventory application built with Vite and TypeScript. Browse and search through different PC components including CPUs, motherboards, power supplies, and graphic cards.

## Features

- **Summary Dashboard**: Overview of all parts with inventory statistics
- **Search Functionality**: Search across all parts or within specific categories
- **Category Pages**: Dedicated pages for each part type (CPUs, Motherboards, Power Supplies, Graphic Cards)
- **Detailed Specifications**: View detailed specifications for each component
- **Responsive Design**: Works on desktop and mobile devices
- **Stock Status**: Track which parts are in stock

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
- **Graphic Cards**: NVIDIA and AMD GPUs with memory and performance specs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
