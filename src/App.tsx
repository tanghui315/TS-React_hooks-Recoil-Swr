import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import { RecoilRoot } from 'recoil'

const App: React.FunctionComponent = (): JSX.Element => {

  return <RecoilRoot>
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path='*' exact={true}  component={NotFound} />
      </Switch>
    </BrowserRouter>
  </RecoilRoot>
}

export default App;
