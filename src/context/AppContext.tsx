import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import stages from "../stages.json";
import BoardContext from "./BoardContext";

interface AppContextState {
  stage: number;
  stageState: "init" | "story" | "playing" | "ending";
  curCnt: number;
  stageCount: Array<number | null>;
  isDialog: boolean;
  isWinDialog: boolean;
  soundConfig: {
    isBgMusic: boolean;
    bgVolume: number;
    isSoundEffect: boolean;
    soundEffectVolume: number;
  };
}

interface AppContextValue extends AppContextState {
  remainingShots: number;
  bgIframe: React.RefObject<HTMLIFrameElement>;
  soundIframe: React.RefObject<HTMLIFrameElement>;
  nextStageState: () => void;
  fireCannon: (idx: number, ori: "x" | "y") => void;
  toggleDialog: () => void;
  goToStage: (id: number) => void;
  toggleBgMusic: () => void;
  setBgVolume: (v: number) => void;
  toggleSoundEffect: () => void;
  setSoundEffectVolume: (v: number) => void;
}

const AppContext = React.createContext({} as AppContextValue);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const bgIframe = useRef<HTMLIFrameElement>(null);
  const soundIframe = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<AppContextState>(() => {
    return JSON.parse(
      localStorage.getItem("state") ?? JSON.stringify(DEFAULT_STATE)
    );
  });
  const { isClear, setBoard, fire } = useContext(BoardContext);

  const remainingShots = useMemo(
    () =>
      stages.reduce((acc, { ans }, idx) => {
        acc +=
          ans -
          (idx === state.stage && !state.isWinDialog
            ? 0
            : state.stageCount[idx] ?? 0);
        return acc;
      }, 0) - state.curCnt,
    [state.stageCount, state.stage, state.curCnt, state.isWinDialog]
  );

  const nextStageState = useCallback(() => {
    setState((prev) => {
      let stageState: AppContextState["stageState"] = "init";
      if (prev.stageState === "init") {
        stageState = "story";
      } else if (prev.stageState === "story") {
        stageState = "playing";
      } else if (prev.stageState === "playing") {
        stageState = "ending";
      }
      return {
        ...prev,
        stageState,
      };
    });
  }, []);

  const fireCannon = useCallback(
    (idx: number, ori: "x" | "y") => {
      if (remainingShots) {
        setTimeout(() => {
          soundIframe.current?.contentWindow?.document
            .querySelector("video")
            ?.play();
        }, 50);
        fire(idx, ori);
        setState((prev) => ({
          ...prev,
          curCnt: prev.curCnt + 1,
        }));
      }
    },
    [remainingShots, fire]
  );

  const toggleDialog = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isDialog: !prev.isDialog,
    }));
  }, []);

  const goToStage = useCallback(
    (id: number) => {
      if (id === 0 || state.stageCount[id - 1] !== null) {
        setState((prev) => ({
          ...prev,
          stage: id,
          stageState: "init",
          curCnt: 0,
          isDialog: false,
          isWinDialog: false,
        }));
      }
    },
    [state.stageCount]
  );

  const toggleBgMusic = useCallback(() => {
    setState((prev) => {
      let video =
        bgIframe.current?.contentWindow?.document.querySelector("video");
      if (video) {
        video.volume = !prev.soundConfig.isBgMusic
          ? prev.soundConfig.bgVolume
          : 0;
      }
      return {
        ...prev,
        soundConfig: {
          ...prev.soundConfig,
          isBgMusic: !prev.soundConfig.isBgMusic,
        },
      };
    });
  }, []);

  const setBgVolume = useCallback((v: number) => {
    setState((prev) => {
      let video =
        bgIframe.current?.contentWindow?.document.querySelector("video");
      if (video) {
        video.volume = prev.soundConfig.isBgMusic
          ? prev.soundConfig.bgVolume
          : 0;
      }
      return {
        ...prev,
        soundConfig: {
          ...prev.soundConfig,
          bgVolume: v,
        },
      };
    });
  }, []);

  const toggleSoundEffect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      soundConfig: {
        ...prev.soundConfig,
        isSoundEffect: !prev.soundConfig.isSoundEffect,
      },
    }));
  }, []);

  const setSoundEffectVolume = useCallback((v: number) => {
    setState((prev) => {
      let video =
        soundIframe.current?.contentWindow?.document.querySelector("video");
      if (video) {
        video.volume = prev.soundConfig.soundEffectVolume;
      }
      return {
        ...prev,
        soundConfig: {
          ...prev.soundConfig,
          soundEffectVolume: v,
        },
      };
    });
  }, []);

  useEffect(() => {
    if (isClear && state.curCnt) {
      setState((prev) => {
        const _stageCount = JSON.parse(JSON.stringify(prev.stageCount));
        if (
          prev.curCnt !== 0 &&
          (_stageCount[prev.stage] === null ||
            _stageCount[prev.stage] === 0 ||
            prev.curCnt < _stageCount[prev.stage])
        ) {
          _stageCount[prev.stage] = prev.curCnt;
        }
        return {
          ...prev,
          stageCount: _stageCount,
          curCnt: 0,
          stageState: "ending",
          isWinDialog: true,
        };
      });
    }
  }, [isClear, state.curCnt]);

  useEffect(() => {
    let video =
      bgIframe.current?.contentWindow?.document.querySelector("video");
    if (video) {
      video.volume = state.soundConfig.bgVolume;
      video.play();
    }
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.stageState === "init") {
      setBoard(stages[state.stage].board.map((r) => r.map((v) => v === 1)));
      setState((prev) => ({
        ...prev,
        stageState: "story",
      }));
    }
  }, [setBoard, state.stage, state.stageState]);

  const contextValue = useMemo<AppContextValue>(
    () => ({
      ...state,
      remainingShots,
      bgIframe,
      soundIframe,
      nextStageState,
      fireCannon,
      toggleDialog,
      goToStage,
      toggleBgMusic,
      setBgVolume,
      toggleSoundEffect,
      setSoundEffectVolume,
    }),
    [
      state,
      remainingShots,
      nextStageState,
      fireCannon,
      toggleDialog,
      goToStage,
      toggleBgMusic,
      setBgVolume,
      toggleSoundEffect,
      setSoundEffectVolume,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;

const DEFAULT_STATE: AppContextState = {
  stage: 0,
  stageState: "init",
  curCnt: 0,
  stageCount: stages.map(() => null),
  isDialog: false,
  isWinDialog: false,
  soundConfig: {
    isBgMusic: true,
    bgVolume: 0.8,
    isSoundEffect: true,
    soundEffectVolume: 0.8,
  },
};
