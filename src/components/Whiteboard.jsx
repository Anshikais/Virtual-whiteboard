import { useRef, useEffect } from "react";

const Whiteboard = ({
  tool,
  color,
  brushSize,
  emoji,
  shape,
  clear,
  onClearDone,
}) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = "round";
  }, []);

  // CLEAR
  useEffect(() => {
    if (clear) {
      const c = canvasRef.current;
      c.getContext("2d").clearRect(0, 0, c.width, c.height);
      onClearDone();
    }
  }, [clear, onClearDone]);

  const onMouseDown = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    start.current = { x, y };
    isDrawing.current = true;

    // EMOJI (single click)
    if (tool === "emoji") {
      const ctx = canvasRef.current.getContext("2d");
      ctx.font = "30px serif";
      ctx.fillText(emoji, x, y);
      isDrawing.current = false;
    }
  };

  const onMouseMove = (e) => {
    if (!isDrawing.current) return;
    if (tool !== "pen" && tool !== "eraser") return;

    const ctx = canvasRef.current.getContext("2d");
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.beginPath();
    ctx.moveTo(start.current.x, start.current.y);
    ctx.lineTo(x, y);

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }

    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
    start.current = { x, y };
  };

  const onMouseUp = (e) => {
    if (!isDrawing.current) return;
    isDrawing.current = false;

    if (tool !== "shape") return;

    const ctx = canvasRef.current.getContext("2d");
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const sx = start.current.x;
    const sy = start.current.y;

    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;

    if (shape === "line") {
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    if (shape === "rect") {
      ctx.strokeRect(sx, sy, x - sx, y - sy);
    }

    if (shape === "circle") {
      const r = Math.hypot(x - sx, y - sy);
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    if (shape === "arrow") {
  const headLength = 14; // arrow head size
  const angle = Math.atan2(y - sy, x - sx);

  // FORCE arrow to be black for visibility
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = brushSize;

  // main arrow line
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(x, y);
  ctx.stroke();

  // arrow head - left side
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x - headLength * Math.cos(angle - Math.PI / 6),
    y - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.stroke();

  // arrow head - right side
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(
    x - headLength * Math.cos(angle + Math.PI / 6),
    y - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}
if (shape === "ellipse") {
  const radiusX = Math.abs(x - sx) / 2;
  const radiusY = Math.abs(y - sy) / 2;
  const centerX = (x + sx) / 2;
  const centerY = (y + sy) / 2;

  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
}
if (shape === "triangle") {
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(x, y);
  ctx.lineTo(2 * sx - x, y);
  ctx.closePath();
  ctx.stroke();
}
if (shape === "diamond") {
  const midX = (sx + x) / 2;
  const midY = (sy + y) / 2;

  ctx.beginPath();
  ctx.moveTo(midX, sy);
  ctx.lineTo(x, midY);
  ctx.lineTo(midX, y);
  ctx.lineTo(sx, midY);
  ctx.closePath();
  ctx.stroke();
}
if (shape === "dashed") {
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.setLineDash([]); // reset
}
if (shape === "right-angle") {
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  ctx.lineTo(x, sy);
  ctx.lineTo(x, y);
  ctx.stroke();
}
  };

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={500}
      style={{ background: "white", border: "2px solid black" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={() => (isDrawing.current = false)}
    />
  );
};

export default Whiteboard;
