# The Crown on the Blockchain 👑

![Banner Placeholder](./src/assets/Pasted image.png)

A complete ultra-premium cinematic website for a luxury Rolex NFT/Web3 experience. This project bridges centuries of horological mastery with the boundless potential of blockchain technology. It was designed to provide a perfect responsive layout, cinematic luxury aesthetics, and multi-language support (English and Arabic with full RTL capabilities).

## Features ✨

- **Modern Luxury UI**: Black, gold, and cream aesthetics to reflect a premium identity.
- **Bilingual Architecture**: Built-in support for English (LTR) and Arabic (RTL) with dynamic language switching.
- **Cinematic Animations**: Optimized Framer Motion transitions and intersection observers (`whileInView`) for a luxury feel without compromising performance.
- **Fully Responsive**: Flawless experience across desktops, tablets, and mobile devices.
- **Optimized Performance**: Replaced continuous loops with viewport-triggered entrance animations ensuring the site feels like a rocket.
- **Web3 Theme**: Highlights concepts like Digital Scarcity, Blockchain Verification, Smart Contracts, and the Metaverse.

## Tech Stack 🛠️

- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS Modules & Tailwind CSS (for layout utilities)
- **Animations**: Framer Motion
- **Internationalization**: `react-i18next`
- **Routing**: `react-router-dom` (if added) or single-page smooth scrolling.

## Project Structure 📂

```text
src/
├── assets/                  # Images, Videos, and SVG Icons
├── components/              # Reusable UI Components (Hero, Navbar, Footer, etc.)
│   ├── nft-experience/      # Web3/NFT specific modular components
│   └── ...
├── locales/                 # i18n JSON translation files (en.json, ar.json)
├── index.css                # Global styles, variables, and typography
└── main.jsx                 # Entry point with i18n initialization
```

## Getting Started 🚀

Follow these instructions to run the project locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Afandy2025/rolex.git
   ```
2. Navigate into the project directory:
   ```bash
   cd rolex
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## Multi-Language (i18n) Support 🌍

The application uses `react-i18next` for seamless language switching. 
To add or modify translations, edit the respective JSON files located in `src/locales/`:
- `en.json` - English (LTR)
- `ar.json` - Arabic (RTL)

The application automatically handles text alignment, directionality (`dir="rtl"`), and animation inversions based on the selected locale.

## Contributing 🤝

Contributions, issues, and feature requests are welcome!

## License 📜

This is a conceptual university project. Not affiliated with Rolex SA.
