
# 🧩 Canvas Stencil Editor

A React-based stencil photo editor inspired by Canva, built using **Fabric.js** for canvas manipulation and **Redux** for state management. Users can upload an image, fit it into a predefined stencil mask (frame), and move or scale the image within that mask. State changes (like scale and position) are synced in real-time with Redux.

---

## ✨ Features

- 📐 Responsive Canvas powered by Fabric.js  
- 🖼️ Predefined stencil mask with rounded corners (clipPath)  
- 📤 Upload image and fit into the stencil  
- 🖱️ Drag and resize image with bounding constraints  
- 🔍 Zoom In / Zoom Out functionality  
- 🔄 Reset image to original fit  
- 🧠 Redux state management for:
  - Image object
  - Image scale
  - Image position

---

## 📦 Project Structure

```
.
├── src/
│   ├── CanvasEditor.js         # Main canvas logic with Fabric.js
│   ├── App.js                  # Wrapped with Redux Provider
│   ├── redux/
│   │   ├── actions.js          # Redux actions for image state
│   │   ├── reducers.js         # Redux reducer
│   │   └── store.js            # Redux store setup
│   └── index.js                # Entry point
├── public/
│   └── index.html              # HTML file with root div
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mananc12/Fabric.js.git
cd canvas-stencil-editor
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm start
# or
yarn start
```

4. Open in browser:

```
http://localhost:3000
```


---

## 🛠️ Built With

- [React](https://reactjs.org/)
- [Fabric.js](http://fabricjs.com/)
- [Redux](https://redux.js.org/)
- [JavaScript (ES6+)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 🙋‍♂️ Author

**Manan Chauhan**  
Made with ❤️ for stencil-based creativity.
