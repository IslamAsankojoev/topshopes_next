import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from 'store/store';

export type AppDispatch = typeof store.dispatch;

import { allActions } from '../store/rootActions';

export const useActions = () => {
  const dispatch: AppDispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
