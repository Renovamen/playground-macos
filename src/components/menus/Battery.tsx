import { useBattery } from "../../hooks";
import { BsBattery, BsFillLightningChargeFill } from "react-icons/bs";

export default function Battery() {
  const batteryState = useBattery();

  const width = (): number => {
    return 0.1 + batteryState.level * 0.96;
  };

  const color = (): string => {
    if (batteryState.charging) return "bg-green-400";

    if (batteryState.level < 0.2) return "bg-red-500";
    else if (batteryState.level < 0.5) return "bg-yellow-500";
    else return "bg-white";
  };

  return (
    <div className="nightwind-prevent-block flex flex-row items-center">
      <span className="text-xs mt-0.5 mr-2">
        {(batteryState.level * 100).toFixed()}%
      </span>
      <div className="relative">
        <BsBattery size={24} />
        <div
          className={`battery-level ${color()}`}
          style={{ width: `${width()}rem` }}
        />
        {batteryState.charging && (
          <BsFillLightningChargeFill
            size={12}
            className="absolute top-1/2 -mt-1.5 left-0 ml-1"
          />
        )}
      </div>
    </div>
  );
}
