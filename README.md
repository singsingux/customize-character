# 🎨 Character Avatar Customization App

An interactive web application for creating and customizing character avatars with real-time preview and PNG export functionality.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

### 🎭 Complete Character Customization
- **7 Customization Categories**
  - 🎨 Skin Tone (12 variations)
  - 👁️ Eyes (5 styles + color picker with 16 presets)
  - 👃 Nose (3 styles with size & position control)
  - 👄 Mouth (6 styles with size & position control)
  - 💇 Hair (34 styles + color picker with gradient)
  - ✨ Features (13 variations)
  - 🎩 Accessories (Headwear, Eyewear, Piercings)

### 🎨 Advanced Customization Tools
- **Real-time Color Picker**: 16 preset colors for Eyes and Hair
- **Gradient Support**: Multi-color gradients for hair
- **Positioning Sliders**: Precise X/Y positioning for facial features
- **Size Control**: Adjustable sizing for nose and mouth
- **Eye Spacing**: Control distance between eyes (-15 to +15)

### 💾 Save & Export
- **Background Selection**: Choose from 10 colors or 3 patterns
- **PNG Export**: Download high-quality 600x600px avatar
- **Local Storage**: Automatically saves your customization

### 🎯 UI/UX Features
- **Smooth Page Transitions**: Animated navigation between pages
- **Floating Category Menu**: Easy access to all customization options
- **Responsive Design**: Optimized for desktop experience
- **Surprise Me**: Random avatar generator
- **Reset Button**: Quick return to defaults

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/customize-character.git
cd customize-character
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
customize-character/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── customize/
│   │   └── page.tsx          # Customization page
│   ├── save/
│   │   └── page.tsx          # Save & export page
│   └── globals.css           # Global styles
├── components/
│   ├── CharacterPreview.tsx  # Real-time avatar preview
│   ├── CustomizeControls.tsx # Customization UI controls
│   └── GlobalLayout.tsx      # Common layout wrapper
├── types/
│   └── character.ts          # TypeScript type definitions
├── lib/
│   └── randomizer.ts         # Random avatar generator
└── public/
    ├── *.svg                 # Character component assets
    └── grid-bg.svg          # Background pattern
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Graphics**: SVG-based components for scalability
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser LocalStorage API

## 📸 Screenshots

### Main Page
Landing page with animated character carousel

### Customize Page
Full customization interface with category menu and real-time preview

### Save Page
Background selection and PNG export functionality

## 🎯 Usage

1. **Start Customizing**: Click "시작하기" on the main page
2. **Select Category**: Choose from the left floating menu
3. **Customize**: Pick items and adjust sliders
4. **Save**: Click "저장하기" to proceed to save page
5. **Choose Background**: Select a color or pattern
6. **Download**: Click "Download" to export as PNG

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific settings:
```bash
# Add your environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

## 📝 Customization Guide

### Adding New Character Items

1. Add SVG file to `/public/` directory
2. Update the item count in `CustomizeControls.tsx`
3. Follow naming convention: `category-item-X.svg`

### Adding New Categories

1. Update `character.ts` type definitions
2. Add category to `CustomizeControls.tsx`
3. Create corresponding SVG assets
4. Update preview rendering logic

## 🐛 Known Issues

- File watching (EMFILE) errors occasionally occur - restart dev server with `npm run dev`
- Best experienced on desktop browsers (mobile optimization planned)

## 🗺️ Roadmap

- [ ] Mobile responsive design
- [ ] More character styles and accessories
- [ ] Animation preview
- [ ] Share avatar via URL
- [ ] User gallery
- [ ] 3D avatar rotation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m '✨ Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- SVG assets designed for scalability and customization
- Inspired by avatar creation systems in modern games
- Built with modern web technologies for optimal performance

## 📧 Contact

Project Link: [https://github.com/YOUR_USERNAME/customize-character](https://github.com/YOUR_USERNAME/customize-character)

---

Made with ❤️ using Next.js and TypeScript
