import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { solve } from "../algo.ts";
import throttle from "lodash.throttle";

interface BoardContextState {
  board: boolean[][];
  xFiring: number;
  yFiring: number;
}

interface BoardContextValue extends BoardContextState {
  solution: number;
  isClear: boolean;
  setBoard: (board: boolean[][]) => void;
  toggleBoard: (x: number, y: number) => void;
  fire: (idx: number, ori: "x" | "y") => void;
}

const BoardContext = React.createContext({} as BoardContextValue);

export const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<BoardContextState>(() => {
    return JSON.parse(
      localStorage.getItem("board") ?? JSON.stringify(DEFAULT_STATE)
    );
  });

  const isClear = useMemo(() => {
    for (let i = 0; i < state.board.length; ++i) {
      for (let j = 0; j < state.board[i].length; ++j) {
        if (state.board[i][j]) {
          return false;
        }
      }
    }
    return true;
  }, [state.board]);

  const toggleBoard = useCallback((x: number, y: number) => {
    return;
    setState((prev) => {
      const _board = JSON.parse(JSON.stringify(prev.board));
      _board[x][y] = !_board[x][y];
      return {
        ...prev,
        board: _board,
      };
    });
  }, []);

  const solution = useMemo(() => solve(state.board), [state]);

  const fire = useMemo(
    () =>
      throttle((idx: number, ori: "x" | "y") => {
        setState((prev) => ({
          ...prev,
          [`${ori}Firing`]: idx,
        }));
      }, 400),
    []
  );

  useEffect(() => {
    if (state.xFiring !== -1 || state.yFiring !== -1) {
      const interval = setInterval(() => {
        setState((prev) => {
          const _board = JSON.parse(JSON.stringify(prev.board));
          for (let i = 0; i < _board.length; ++i) {
            for (let j = 0; j < _board.length; ++j) {
              if (i === prev.xFiring || j === prev.yFiring) {
                _board[i][j] = false;
              }
            }
          }
          return {
            ...prev,
            board: _board,
            xFiring: -1,
            yFiring: -1,
          };
        });
      }, 400);
      return () => {
        clearInterval(interval);
      };
    }
    return;
  }, [state.xFiring, state.yFiring]);

  const setBoard = useCallback((board: boolean[][]) => {
    setState((prev) => ({
      ...prev,
      board,
    }));
  }, []);

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider
      value={{
        ...state,
        solution,
        isClear,
        fire,
        setBoard,
        toggleBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;

const DEFAULT_STATE: BoardContextState = {
  board: Array(10)
    .fill(0)
    .map(() => {
      const ret = [];
      for (let i = 0; i < 10; ++i) ret.push(false);
      return ret;
    }),
  xFiring: -1,
  yFiring: -1,
};
