# Helix Explorer v2.0 🧬

A futuristic, interactive 3D DNA sequence visualizer built with **React**, **Three.js** (via React Three Fiber), and **Gemini AI**.

## 🚀 Advanced Features

### 1. Interactive 3D Helix
- **Procedural Generation**: The DNA strands and base pairs are generated algorithmically using mathematical constants.
- **Raycasting Interaction**: Real-time hover detection on individual molecular segments triggers dynamic lighting and AI analysis.
- **Adaptive Lighting**: Uses a combination of point lights and emissive materials to create a "Neon Glow" effect that Intensifies on interaction.

### 2. AI-Powered Educational Layer
- **Gemini Integration**: Hovering over a segment triggers a request to Google's Gemini Pro model to explain the specific genetic significance of that base pair (A-T, C-G, etc.).
- **Real-time Sanitization**: Markdown response processing for clean technical documentation display.

### 3. High-Fidelity UI (HUD)
- **Glassmorphism**: Backdrop blur filters combined with low-opacity borders for a high-tech "Head-Up Display" feel.
- **Motion Orchestration**: Staggered entry animations using `motion/react` for UI components.
- **Scanline Layer**: A subtle CSS-only scanline effect and chroma aberration simulation for that terminal/cyberdeck aesthetic.

### 4. Visual Effects
- **Bloom & Emissive**: Every base pair acts as a light source, providing a soft volumetric glow.
- **Particle Sea**: A background of 2,000 coordinate-mapped points creating a deep-space laboratory atmosphere.

## 🛠 Tech Stack
- **Engine**: Three.js / React Three Fiber
- **AI**: Google Generative AI (Gemini)
- **Styling**: Tailwind CSS 4.0
- **Animation**: Motion (Framer Motion)
- **Icons**: Lucide React

## 🧬 Scientific Accuracy
- **Color Coding**: 
  - <span style="color:#ff4d4d">●</span> Adenine (A)
  - <span style="color:#4dff88">●</span> Thymine (T)
  - <span style="color:#4da6ff">●</span> Cytosine (C)
  - <span style="color:#ffcc4d">●</span> Guanine (G)
- **Structure**: Real-world rotational step ($ \pi / 8 $) and constant radius for major/minor groove simulation.
