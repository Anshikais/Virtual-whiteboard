import { useState } from "react";
import Toolbar from "./components/Toolbar";
import Whiteboard from "./components/Whiteboard";

function App() {
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [emoji, setEmoji] = useState("😀");
  const [shape, setShape] = useState("line");
  const [clear, setClear] = useState(false);

  return (
    <div className="app">
      <h1>Virtual Whiteboard</h1>

      <Toolbar
        setTool={setTool}
        setColor={setColor}
        setBrushSize={setBrushSize}
        setEmoji={setEmoji}
        setShape={setShape}
        clearBoard={() => setClear(true)}
      />

      {/* CENTERED BOARD */}
      <div className="board-container">
        <Whiteboard
          tool={tool}
          color={color}
          brushSize={brushSize}
          emoji={emoji}
          shape={shape}
          clear={clear}
          onClearDone={() => setClear(false)}
        />
      </div>
    </div>
  );
}

export default App;
