import Webcam from "react-webcam";
import { format } from "date-fns";

interface SidebarProps {
  state: FaceTimeState;
  onTake: () => void;
  onSave: () => void;
  onSelect: (src: string) => void;
}

interface SidebarItemProps {
  date: string;
  active: boolean;
}

interface FaceTimeState {
  canSave: boolean;
  curImage: string | null;
}

const SidebarItem = ({ date, active }: SidebarItemProps) => {
  const [hover, setHover] = useState(false);
  const { deleteImage } = useStore((state) => ({
    deleteImage: state.delFaceTimeImage
  }));

  return (
    <div
      className={`hstack h-16 px-2.5 rounded-md space-x-2 ${active && "bg-[#508041]"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="size-11 rounded-full bg-zinc-600 flex-center">
        <span className="i-ph:link-bold" text="2xl white/80" />
      </div>

      <div text="left">
        <div className="font-medium leading-4" text="white sm">
          FaceTime Link
        </div>
        <div className="hstack space-x-1 text-white/60">
          <span className="i-ion:videocam" />
          <span>FaceTime · {format(Number(date), "hh:mm:ss")}</span>
        </div>
      </div>

      <span
        className="i-maki:cross absolute right-2.5 duration-150"
        text={`lg white/60 hover:white ${!hover && "transparent"}`}
        onClick={(e) => {
          e.stopPropagation();
          deleteImage(date);
        }}
      />
    </div>
  );
};

const Sidebar = ({ state, onTake, onSave, onSelect }: SidebarProps) => {
  const { images } = useStore((state) => ({
    images: state.faceTimeImages
  }));

  return (
    <div className="absolute w-74 h-full z-1 left-0 top-0 flex flex-col bg-zinc-900/85 backdrop-blur-xl">
      <div className="p-5 space-y-2.5 text-sm">
        <button
          className="flex-center space-x-1 w-full py-1 text-white bg-green-700 rounded-md"
          onClick={onTake}
        >
          <span className="i-ion:ios-videocam text-base" />
          <span>{state.curImage ? "Retake" : "Take a Picture"}</span>
        </button>
        <button
          className={`flex-center space-x-1 w-full py-1 text-white rounded-md bg-stone-500 ${
            !state.canSave && "opacity-60 cursor-not-allowed"
          }`}
          disabled={!state.canSave}
          onClick={onSave}
        >
          <span
            className={`${
              state.canSave ? "i-mdi:content-save" : "i-mdi:content-save-off"
            } text-base`}
          />
          <span>Save Picture</span>
        </button>
      </div>

      <div className="text-xs flex-1 overflow-y-scroll" p="t-5 b-2.5 x-2.5">
        <div className="px-2.5 text-white/60 mb-2">Recent</div>
        {Object.keys(images)
          .reverse()
          .map((date) => (
            <button
              className="relative w-full"
              key={date}
              onClick={() => onSelect(images[date])}
            >
              <SidebarItem date={date} active={state.curImage === images[date]} />
            </button>
          ))}
      </div>
    </div>
  );
};

const FaceTime = () => {
  const webcamRef = useRef<Webcam>(null);
  const { addImage } = useStore((state) => ({
    addImage: state.addFaceTimeImage
  }));
  const [state, setState] = useState<FaceTimeState>({
    canSave: false,
    curImage: null
  });

  return (
    <div className="relative h-full">
      <Sidebar
        state={state}
        onTake={() => {
          if (!state.curImage) {
            const src = webcamRef.current?.getScreenshot() || "";
            setState({ curImage: src, canSave: true });
          } else setState({ curImage: null, canSave: false });
        }}
        onSave={() => {
          addImage(state.curImage!);
          setState({ curImage: null, canSave: false });
        }}
        onSelect={(src) => {
          setState({ curImage: src, canSave: false });
        }}
      />

      <div className="h-full bg-zinc-800">
        {!state.curImage ? (
          <Webcam
            mirrored={true}
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user",
              aspectRatio: 1.7
            }}
          />
        ) : (
          state.curImage && <img size-full src={state.curImage} alt="your-image" />
        )}
      </div>
    </div>
  );
};

export default FaceTime;
