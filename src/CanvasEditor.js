import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Image } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { setImageData, setImageScale, setImagePosition } from "./redux/actions";

const CanvasEditor = () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const imageData = useSelector((state) => state.imageData);
  const scale = useSelector((state) => state.scale);
  const position = useSelector((state) => state.position);

  const [imageInstance, setImageInstance] = useState(null);

  useEffect(() => {
    const canvas = new Canvas("canvas", {
      backgroundColor: "yellow",
      selection: false,
    });

    // Make responsive
    canvas.setWidth(window.innerWidth * 0.8);
    canvas.setHeight(window.innerHeight * 0.6);

    // Create the stencil mask (clipPath)
    const stencil = new Rect({
      left: 350,
      top: 10,
      width: 600,
      height: 400,
      rx: 30,
      ry: 30,
      absolutePositioned: true,
    });

    canvas.clipPath = stencil;

    canvasRef.current = canvas;

    return () => {
      canvas.dispose(); // Clean up
    };
  }, []);

  const keepImageInBounds = (image, frame) => {
    const leftLimit = frame.left + frame.width - image.getScaledWidth();
    const topLimit = frame.top + frame.height - image.getScaledHeight();

    if (image.left < frame.left) image.left = frame.left; // Prevent moving left outside
    if (image.top < frame.top) image.top = frame.top; // Prevent moving top outside
    if (image.left > leftLimit) image.left = leftLimit; // Prevent moving right outside
    if (image.top > topLimit) image.top = topLimit; // Prevent moving bottom outside
  };

  const adjustImageToFrame = (image) => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.clipPath) return;

    const frame = canvas.clipPath;
    const scaleX = frame.width / image.width;
    const scaleY = frame.height / image.height;
    const minScale = Math.min(scaleX, scaleY);

    image.scale(minScale);

    image.set({
      left: frame.left + (frame.width - image.getScaledWidth()) / 2,
      top: frame.top + (frame.height - image.getScaledHeight()) / 2,
      hasBorders: true,
      hasControls: true,
      lockRotation: true, // Prevent rotation
    });

    image.on("moving", () => {
      keepImageInBounds(image, frame);
      // Update the image position in Redux
      dispatch(setImagePosition({ left: image.left, top: image.top }));
    });

    canvas.add(image);
    canvas.setActiveObject(image);
    canvas.renderAll();

    // Save image data in Redux
    dispatch(setImageData(image));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !canvasRef.current) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imgElement = document.createElement("img");
      imgElement.src = reader.result;

      imgElement.onload = () => {
        const fabricImg = new Image(imgElement);
        setImageInstance(fabricImg);
        adjustImageToFrame(fabricImg);
      };
    };
    reader.readAsDataURL(file);
  };

  const zoomImage = (factor) => {
    const canvas = canvasRef.current;
    if (!canvas || !imageInstance) return;
  
    const currentScale = imageInstance.scaleX;
    const newScale = Math.max(0.1, currentScale + factor);
    imageInstance.scale(newScale);
  
    dispatch(setImageScale(newScale));
  
    const frame = canvas.clipPath;
    imageInstance.set({
      left: frame.left + (frame.width - imageInstance.getScaledWidth()) / 2,
      top: frame.top + (frame.height - imageInstance.getScaledHeight()) / 2,
    });
  
    imageInstance.setCoords();
    keepImageInBounds(imageInstance, frame);
    imageInstance.setCoords(); // 🧙‍♂️ This tells Fabric to update the control box
    canvas.renderAll();
  };
  
  

  const resetImage = () => {
    if (imageInstance && canvasRef.current) {
      adjustImageToFrame(imageInstance);
    }
  };

  return (
    <div className="canvas-editor">
      
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="canvas-controls">
        <button onClick={() => zoomImage(0.1)}>Zoom In</button>
        <button onClick={() => zoomImage(-0.1)}>Zoom Out</button>
        <button onClick={resetImage}>Reset</button>
      </div>
      
      <canvas id="canvas" />
    </div>
  );
};

export default CanvasEditor;
