const Toolbar = ({
  setTool,
  setColor,
  setBrushSize,
  setEmoji,
  setShape,
  clearBoard,
}) => {
  return (
    <div className="toolbar">
      <button onClick={() => setTool("pen")}>✏️ Pen</button>
      <button onClick={() => setTool("eraser")}>🧽 Eraser</button>
      <button onClick={() => setTool("emoji")}>😀 Emoji</button>
      <button onClick={() => setTool("shape")}>🔺 Shape</button>

      <input type="color" onChange={(e) => setColor(e.target.value)} />

      <input
        type="range"
        min="1"
        max="15"
        defaultValue="4"
        onChange={(e) => setBrushSize(Number(e.target.value))}
      />

      <select onChange={(e) => setEmoji(e.target.value)}>
        <option value="😀">😀</option>
        <option value="😂">😂</option>
        <option value="❤️">❤️</option>
        <option value="🔥">🔥</option>
      </select>

      <select onChange={(e) => setShape(e.target.value)}>
        <option value="line">Line</option>
        <option value="rect">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="arrow">Arrow</option>
        <option value="ellipse">Ellipse</option>
  <option value="triangle">Triangle</option>
  <option value="diamond">Diamond</option>
  <option value="dashed">Dashed Line</option>
  <option value="right-angle">Right Angle</option>
      </select>

      <button className="clear-btn" onClick={clearBoard}>
        Clear
      </button>
    </div>
  );
};

export default Toolbar;
