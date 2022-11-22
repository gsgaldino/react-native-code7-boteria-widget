import React, { createContext, useContext, useState } from 'react';
import { IIsChatOpenContext } from 'types/isChatOpen';

const IsChatOpenContext = createContext<IIsChatOpenContext>({
  isChatOpen: false,
  toggleIsChatOpen: () => {},
});

const IsChatOpenProvider: React.FC<React.ReactNode> = (props) => {
  const { children } = props;
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleIsChatOpen = () => setIsChatOpen(!isChatOpen);

  const isChatOpenContextState: IIsChatOpenContext = {
    isChatOpen,
    toggleIsChatOpen,
  };

  return (
    <IsChatOpenContext.Provider value={isChatOpenContextState}>
      {children}
    </IsChatOpenContext.Provider>
  );
};

export default IsChatOpenProvider;

export const useIsChatOpen = () =>
  useContext(IsChatOpenContext) as IIsChatOpenContext;
