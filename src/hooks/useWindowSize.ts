import { useState, useEffect } from "react";

export function useWindowSize() {
  const [state, setState] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight
  });

  useEffect(() => {
    const handler = () => {
      setState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight
      });
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return state;
}
