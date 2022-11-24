import { useEffect, useState } from "react";

export const Colors = () => {
  const [colorHex, setColorHex] = useState("#");
  const [colorRGB, setColorRGB] = useState("");
  const [colorBg, setColorBg] = useState("");
  const ChangedColor = (e) => {
    if (e.target.value.length >= 1 && e.target.value.length < 8)
      setColorHex((prev) => (prev = e.target.value));
  };
  let bgColor = colorBg;

  useEffect(() => {
    setColorRGB("loading...");
    let timer = setTimeout(() => {
      if (colorHex.length > 3 && colorHex.match(/\w\w/g) !== null) {
        setColorRGB(`rgb(${colorHex.match(/\w\w/g).map((x) => +`0x${x}`)})`);
        setColorBg(colorHex);
        console.log("render");
      }
      if (colorHex.match(/\w\w/g) === null | colorHex.length <= 3) {
        setColorRGB("Ошибка!");
        setColorBg("#a52019");
      }
    }, 700);
    if (colorHex.length < 3) setColorRGB("loading...");
    return () => {
      clearTimeout(timer);
    };
  }, [colorHex]);

  return (
    <div className="background" style={{ background: bgColor }}>
      <input
        type="text"
        className="input-colors"
        value={colorHex}
        onChange={(e) => {
          ChangedColor(e);
        }}
      />
      <span className="rgb-wrapper">{colorRGB}</span>
    </div>
  );
};
