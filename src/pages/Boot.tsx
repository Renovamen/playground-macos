import { useState, useEffect } from "react";
import { FaApple } from "react-icons/fa";
import { useInterval } from "../hooks";

interface BootProps {
  restart: boolean;
  sleep: boolean;
  setBooting: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

const loadingInterval = 1;
const bootingInterval = 500;

export default function Boot({ restart, sleep, setBooting }: BootProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    if (restart && !sleep) setLoading(true);
  }, [restart, sleep]);

  useInterval(
    () => {
      const newPercent = percent + 0.15;
      if (newPercent >= 100) {
        setTimeout(() => {
          setBooting(false);
          setLoading(false);
        }, bootingInterval);
      } else setPercent(newPercent);
    },
    loading ? loadingInterval : null
  );

  const handleClick = () => {
    if (sleep) setBooting(false);
    else if (restart || loading) return;
    else setLoading(true);
  };

  return (
    <div
      className="nightwind-prevent nightwind-prevent-block w-full h-full bg-black flex flex-col justify-center items-center"
      onClick={handleClick}
    >
      <FaApple className="text-white -mt-4 w-20 h-20 sm:w-24 sm:h-24" />
      {loading && (
        <div className="absolute top-1/2 mt-16 sm:mt-24 left-0 right-0 mx-auto w-56 h-1 sm:h-1.5 bg-gray-500 rounded overflow-hidden">
          <span
            className="absolute top-0 bg-white h-full rounded-sm"
            style={{
              width: `${percent.toString()}%`
            }}
          />
        </div>
      )}
      {!restart && !loading && (
        <div className="absolute top-1/2 mt-16 sm:mt-20 left-0 right-0 mx-auto text-sm text-gray-200 text-center">
          Click to {sleep ? "wake up" : "boot"}
        </div>
      )}
    </div>
  );
}
