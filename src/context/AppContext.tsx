import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import stages from "../stages.json";
import BoardContext from "./BoardContext";

interface AppContextState {
  stage: number;
  curCnt: number;
  stageCount: Array<number | null>;
  isDialog: boolean;
  isWinDialog: boolean;
}

interface AppContextValue extends AppContextState {
  remainingShots: number;
  fireCannon: (idx: number, ori: "x" | "y") => void;
  toggleDialog: () => void;
  setWinDialog: (open: boolean) => void;
  goToStage: (id: number) => void;
}

const AppContext = React.createContext({} as AppContextValue);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppContextState>(() => {
    return JSON.parse(
      localStorage.getItem("state") ?? JSON.stringify(DEFAULT_STATE)
    );
  });
  const { isClear, setBoard, fire } = useContext(BoardContext);

  const remainingShots = useMemo(
    () =>
      stages.reduce((acc, { ans }, idx) => {
        acc += ans - (state.stageCount[idx] ?? 0);
        return acc;
      }, 0) - state.curCnt,
    [state.stageCount, state.curCnt]
  );

  const fireCannon = useCallback(
    (idx: number, ori: "x" | "y") => {
      if (remainingShots) {
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

  const setWinDialog = useCallback((open: boolean) => {
    setState((prev) => ({
      ...prev,
      isWinDialog: open,
    }));
  }, []);

  const goToStage = useCallback(
    (id: number) => {
      if (id === 0 || state.stageCount[id - 1] !== null) {
        setState((prev) => ({
          ...prev,
          stage: id,
        }));
      }
    },
    [state.stageCount]
  );

  useEffect(() => {
    if (isClear && state.curCnt) {
      setState((prev) => {
        const _stageCount = JSON.parse(JSON.stringify(prev.stageCount));
        if (
          _stageCount[prev.stage] === null ||
          prev.curCnt < _stageCount[prev.stage]
        ) {
          _stageCount[prev.stage] = prev.curCnt;
        }
        return {
          ...prev,
          stageCount: _stageCount,
          isWinDialog: true,
        };
      });
    }
  }, [isClear, setBoard, state.curCnt]);

  useEffect(() => {
    if (state.stage < stages.length && state.isWinDialog === false) {
      setBoard(stages[state.stage].board.map((r) => r.map((v) => v === 1)));
      setState((prev) => ({
        ...prev,
        curCnt: 0,
      }));
    }
  }, [state.stage, setBoard, state.isWinDialog]);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const contextValue = useMemo<AppContextValue>(
    () => ({
      ...state,
      remainingShots,
      fireCannon,
      toggleDialog,
      goToStage,
      setWinDialog,
    }),
    [state, remainingShots, fireCannon, toggleDialog, setWinDialog, goToStage]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;

const DEFAULT_STATE: AppContextState = {
  stage: 0,
  curCnt: 0,
  stageCount: stages.map(() => null),
  isDialog: true,
  isWinDialog: false,
};
