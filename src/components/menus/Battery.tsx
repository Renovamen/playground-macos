import { useBattery } from "~/hooks";

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
    <div className="hstack space-x-2">
      <span className="text-xs">{(batteryState.level * 100).toFixed()}%</span>
      <div className="relative hstack">
        <span className="i-bi:battery text-2xl" />
        <div className={`battery-level ${color()}`} style={{ width: `${width()}rem` }} />
        {batteryState.charging && (
          <span className="i-bi:lightning-charge-fill text-xs absolute top-1/2 -mt-1.5 left-0 ml-1" />
        )}
      </div>
    </div>
  );
}
