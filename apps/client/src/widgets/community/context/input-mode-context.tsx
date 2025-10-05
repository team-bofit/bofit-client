import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { createInputModeReducer } from '@widgets/community/hooks/create-input-mode-reducer';
import {
  InputBoxMode,
  ReducerAction,
} from '@widgets/community/types/input-box-type';

interface InputModeContextValue {
  mode: InputBoxMode;
  dispatch: React.Dispatch<ReducerAction>;
}

const InputModeContext = createContext<InputModeContextValue | null>(null);

export const InputModeContextProvider = ({
  postId,
  children,
}: {
  postId: string;
  children: ReactNode;
}) => {
  const reducer: React.Reducer<InputBoxMode, ReducerAction> = (
    prev,
    action,
  ) => {
    return createInputModeReducer({ postId, _prev: prev, action });
  };

  const [mode, dispatch] = useReducer(reducer, {
    type: 'comment',
    action: 'create',
    postId,
  } as const);

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [postId]);
  const value = useMemo(() => ({ mode, dispatch }), [mode]);
  return (
    <InputModeContext.Provider value={value}>
      {children}
    </InputModeContext.Provider>
  );
};

export const useChangeInputMode = () => {
  const mode = useContext(InputModeContext);
  if (!mode) {
    throw new Error('InputModeContextProvider 안에서 사용하세요.');
  }
  return mode;
};
