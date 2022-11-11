import React, { createContext, useContext, useState, useCallback } from 'react';

export interface IAppCtx {
  isChatOpen: boolean;
  toggleIsChatOpen: Function;
}

interface IIsChatOpenProviderProps {
  children: React.FC | Element;
}

const IsChatOpenContext = createContext<IAppCtx | null | any>(null);

export default function IsChatOpenProvider({
  children,
}: IIsChatOpenProviderProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleIsChatOpen = useCallback(
    () => setIsChatOpen(!isChatOpen),
    [isChatOpen]
  );

  const sampleAppCtx: IAppCtx = {
    isChatOpen,
    toggleIsChatOpen,
  };

  return (
    <IsChatOpenContext.Provider value={sampleAppCtx}>
      {children}
    </IsChatOpenContext.Provider>
  );
}

export const useIsChatOpen = () => {
  const context = useContext(IsChatOpenContext);
  return context;
};
