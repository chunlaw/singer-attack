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
  stageCount: Array<number | undefined>;
}

interface AppContextValue extends AppContextState {
  remainingShots: number;
  fireCannon: (idx: number, ori: "x" | "y") => void;
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
      }, 0),
    [state.stageCount]
  );

  const fireCannon = useCallback(
    (idx: number, ori: "x" | "y") => {
      if (remainingShots) {
        fire(idx, ori);
        setState((prev) => {
          const stageCount = JSON.parse(JSON.stringify(prev.stageCount));
          if (stageCount[prev.stage] === undefined) stageCount[prev.stage] = 0;
          stageCount[prev.stage] += 1;
          return {
            ...prev,
            stageCount,
          };
        });
      }
    },
    [remainingShots, fire]
  );

  useEffect(() => {
    if (isClear && state.stage + 1 < stages.length) {
      setState((prev) => ({
        ...prev,
        stage: prev.stage + 1,
      }));
    }
  }, [isClear, setBoard, state.stage]);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.stage < stages.length) {
      setBoard(stages[state.stage].board.map((r) => r.map((v) => v === 1)));
      setState((prev) => {
        const stageCount = JSON.parse(JSON.stringify(prev.stageCount));
        stageCount[prev.stage] = 0;
        return {
          ...prev,
          stageCount,
        };
      });
    }
  }, [state.stage, setBoard]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        remainingShots,
        fireCannon,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

const DEFAULT_STATE: AppContextState = {
  stage: 0,
  stageCount: stages.map(() => undefined),
};
