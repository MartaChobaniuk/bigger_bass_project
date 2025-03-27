import React, { useEffect, useState } from 'react';
import './App.scss';
import { PopUp } from './components/PopUp';
import { Loader } from './components/Loader';
import { Start } from './components/Start';

export const App: React.FC = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [isStartVisible, setIsStartVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaderVisible(false);
      setIsPopUpVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    setIsPopUpVisible(false);
    setIsStartVisible(true);
  };

  return (
    <div className="app">
      {isLoaderVisible && <Loader />}
      {isPopUpVisible && <PopUp onStart={handleButtonClick} />}
      {isStartVisible && <Start />}
    </div>
  );
};
