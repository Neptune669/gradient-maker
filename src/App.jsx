import { useState } from "react";
export default function App() {
  const [colors, setColors] = useState(["#FFD500", "#FF0040"]);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const colorStops = colors.join(", ");
  const backgroundImage = `linear-gradient(90deg, ${colorStops})`;

  function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (colors.includes(color)) {
      return randomColor();
    }

    if (color === "#FFD500" || color === "#FF0040") {
      return randomColor();
    }

    return color;
  }

  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto  px-8 lg:px-0 overflow-hidden gap-6 items-center my-12">
        <div
          style={{ backgroundImage }}
          className="aspect-vide lg:w-[60rem] w-[25rem] lg-px-0  h-60 rounded-lg shadow-2xl"
        />
        <form className="flex   gap-2" action="">
          {colors.map((color, index) => {
            return (
              <input
                key={index}
                type="color"
                value={color}
                onChange={(e) => {
                  const newColors = [...colors];
                  newColors[index] = e.target.value;
                  setColors(newColors);
                }}
              />
            );
          })}
        </form>
        <div className="space-x-2 mt-12">
          {" "}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => {
              e.preventDefault();
              setColors([...colors, randomColor()]);
              if (colors.length >= 5) {
                alert("You can't add more than 5 colors");

                setColors(colors.slice(0, 5));
                return;
              }
            }}
          >
            Add Color
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => {
              e.preventDefault();
              if (colors.length <= 2) {
                alert("You can't remove less than 2 colors");
                return;
              }
              setColors(colors.slice(0, -1));
            }}
          >
            Remove Color
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={(e) => {
              e.preventDefault();
              setColors(["#FFD500", "#FF0040"]);
            }}
          >
            Reset
          </button>
        </div>
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold lg:py-2 px-4  rounded mt-4"
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? "Hide Code" : "Show Code"}
        </button>
        {showCode && (
          <div className="px-8 lg:px-0">
            <pre className=" transition-color  flex gap-4 items-center bg-gray-600 text-white p-4  rounded">
              {/* Code snippet content would go here */}
              <code>{backgroundImage}</code>
              <button
                disabled={copied}
                onClick={() =>
                  navigator.clipboard.writeText(backgroundImage).then(() => {
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                    }, 2000);
                  })
                }
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded "
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </pre>
          </div>
        )}{" "}
      </div>
    </>
  );
}
