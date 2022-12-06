import { useActions } from 'hooks/useActions';
import React from 'react';
import { getLocalStorage } from 'utils/local-storage/localStorage';

const WishCartProvider: React.FC = ({ children }) => {
  const { setWishList } = useActions();

  React.useEffect(() => {
    setWishList(getLocalStorage('wishlist') || []);
  }, [setWishList]);

  return <>{children}</>;
};

export default WishCartProvider;
