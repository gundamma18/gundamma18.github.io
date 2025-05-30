# 💕 Memory Lane Website

A beautiful, interactive, scrolling memory lane website that tells your love story through animated sections. Each memory comes to life with unique animations, backgrounds, and interactive elements.

![Memory Lane Website](https://img.shields.io/badge/Memory%20Lane-Love%20Story-ff6b9d?style=for-the-badge&logo=heart)

## ✨ Features

### 🎬 Scroll-Triggered Animations
- Each memory section loads with beautiful GSAP animations
- Parallax effects and smooth transitions
- Background elements animate independently
- Text appears with typewriter effects

### 🎵 Audio Integration
- Each memory can have its own soundtrack
- Play/pause controls with visual feedback
- Only one audio plays at a time
- Smooth audio transitions

### 📱 Fully Responsive
- Beautiful on desktop, tablet, and mobile
- Adaptive layouts and font sizes
- Touch-friendly navigation
- Optimized for all screen sizes

### 🎯 Interactive Elements
- Clickable heart that creates floating heart animations
- Hover effects on images and buttons
- Keyboard navigation (arrow keys, spacebar)
- Progress bar showing scroll position

### 🎨 Unique Memory Themes
Each of the 10 memory sections has its own visual identity:

1. **Bumble Interaction** - Orange/yellow with flying bees and chat bubbles
2. **First Coffee** - Brown/coffee tones with steam animations
3. **Holding Hands** - Pink gradients with floating hearts and sparkles
4. **Pineapple/Tomato Nicknames** - Fruit-themed with bouncing animations
5. **Black-White Dress** - Elegant monochrome with flowing lines
6. **First Video Call** - Blue gradients with video frames and wifi effects
7. **Mall Adventures** - Pink shopping vibes with walking figures
8. **Future Dreams** - Dreamy pastels with floating office/car icons
9. **South Korea** - Korean-inspired with cultural elements
10. **Reading & Gym** - Split screen design with books and weights

## 🛠️ Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Advanced animations and gradients
- **JavaScript (ES6+)** - Interactive functionality
- **GSAP** - Professional animations and scroll triggers
- **Google Fonts** - Beautiful typography
- **Progressive Web App** ready

## 🚀 Quick Start

### 1. Clone or Download
```bash
git clone [your-repo-url]
cd memory-lane-website
```

### 2. Open in Browser
Simply open `index.html` in your web browser. No build process required!

### 3. For Local Development
```bash
# Use a simple HTTP server for best results
python -m http.server 8000
# or
npx serve .
```

### 4. Deploy to GitHub Pages
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be live at `https://yourusername.github.io/repository-name`

## 🎨 Customization Guide

### Replacing Images
1. Navigate to `assets/images/`
2. Replace the placeholder images with your own:
   - `bumble-memory.jpg`
   - `coffee-memory.jpg`
   - `hands-memory.jpg`
   - `nicknames-memory.jpg`
   - `dress-memory.jpg`
   - `video-memory.jpg`
   - `mall-memory.jpg`
   - `dreams-memory.jpg`
   - `korea-memory.jpg`
   - `future-memory.jpg`

### Adding Audio
1. Place audio files in `assets/audio/`
2. Update the `<audio>` elements in `index.html`
3. Supported formats: MP3, OGG, WAV

### Editing Memory Content
1. Open `index.html`
2. Find the memory section you want to edit
3. Update the text in `.memory-title` and `.memory-description`
4. Customize the background elements as needed

### Changing Colors and Themes
1. Open `styles/main.css`
2. Find the memory section (e.g., `.bumble-memory`)
3. Update the `background` gradient
4. Modify accent colors in the section

### Adding More Memories
1. Copy a memory section in `index.html`
2. Update the `data-memory` attribute
3. Add corresponding CSS in `main.css`
4. Update the navigation dots count
5. Adjust `totalMemories` in `scripts/main.js`

## 📁 Project Structure

```
memory-lane-website/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # All styling and animations
├── scripts/
│   └── main.js             # JavaScript functionality
├── assets/
│   ├── images/             # Memory photos
│   │   ├── bumble-memory.jpg
│   │   ├── coffee-memory.jpg
│   │   └── ... (other memories)
│   └── audio/              # Optional audio files
│       ├── bumble-memory.mp3
│       └── ... (other audio)
└── README.md              # This file
```

## 🎯 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📱 Mobile Optimization

- Touch-friendly navigation
- Optimized image sizes
- Responsive typography
- Smooth touch scrolling
- Reduced motion for better performance

## 🔧 Performance Features

- Lazy loading images
- Optimized animations
- Minimal dependencies
- Compressed assets
- Efficient scroll handling

## 🎨 Animation Details

### GSAP Animations Used
- `gsap.fromTo()` for element entrances
- `ScrollTrigger` for scroll-based animations
- `TextPlugin` for typewriter effects
- `Timeline` for coordinated sequences
- Custom easing functions for natural motion

### CSS Animations
- Keyframe animations for background elements
- Transitions for hover effects
- Transform-based animations for performance
- Custom easing with `cubic-bezier`

## 💡 Tips for Best Results

1. **Images**: Use high-quality images (800x600px minimum)
2. **Audio**: Keep audio files under 5MB for faster loading
3. **Text**: Keep descriptions concise but meaningful
4. **Colors**: Maintain good contrast for readability
5. **Testing**: Test on multiple devices and browsers

## 🌟 Advanced Features

### Keyboard Navigation
- `↑` / `↓` arrows to navigate between memories
- `Space` to play/pause current audio
- `Esc` to stop all audio

### Mouse Effects
- Subtle cursor follower
- Hover animations on interactive elements
- Smooth scroll behavior

### Accessibility
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Reduced motion preferences respected

## 🛠️ Troubleshooting

### Common Issues

**Images not loading**
- Check file paths in `index.html`
- Ensure images are in `assets/images/`
- Verify file extensions match

**Animations not working**
- Check browser console for errors
- Ensure GSAP CDN is loading
- Verify JavaScript is enabled

**Audio not playing**
- Check file formats (MP3 recommended)
- Ensure audio files exist
- Check browser audio permissions

## 📄 License

This project is open source and available under the MIT License.

## 💝 Credits

- **GSAP** for amazing animations
- **Google Fonts** for beautiful typography
- **Lorem Picsum** for placeholder images
- Made with ❤️ for preserving beautiful memories

---

## 🎉 Enjoy Your Memory Lane!

This website is designed to be a beautiful digital scrapbook of your most precious moments. Customize it, make it yours, and share your love story with the world!

For questions or suggestions, feel free to reach out. Happy coding! 💕 