import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../theme/globalStyle';
import {LightTheme as Theme} from '../../theme/Theme';
import ErrorBoundary from '../ErrorBoundary';
import { reducer, initialState } from './reducer';

interface IContext {
  data: any;
  queryParams: URLSearchParams;
  dispatch: React.Dispatch<any>;
}

interface IProps {
  children: React.ReactNode | HTMLAllCollection;
}

const Context = createContext({} as IContext);
Context.displayName = 'AppContext';
const { Provider, Consumer } = Context;

const ContextProvider: React.FunctionComponent<IProps & RouteComponentProps> = ({ children }) => {
  const [ data, dispatch ] = useReducer(reducer, initialState);
  const queryParams = useQuery();
  const { pathname } = useLocation();

  useEffect(() => {
    if(pathname === '/' && queryParams.get('from')) {
      queryParams.delete('from');
    }
  }, [
    pathname,
    queryParams,
  ]);

  return useMemo(() => (
    <Provider value={{
      data,
      queryParams,
      dispatch,
    }}>
      <ThemeProvider theme={Theme}>
        <GlobalStyle />
        <ErrorBoundary>
          { children }
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  ), [
    children,
    data,
    queryParams,
    dispatch,
  ]);
};


const WrappedProvider = withRouter(ContextProvider);

export {
  WrappedProvider as AppProvider,
  Consumer as AppConsumer,
  Context as AppContext,
}
