import * as React from 'react';
import * as Radium from 'radium';
import { Switch, Route, BrowserRouter, DefaultRoute } from 'react-router-dom';
import { Styles, Test } from 'common/Styles';
import './reset.less';
import './styles.less';

export interface Props { }

@Radium
class App extends React.Component<Props, {}>
{
  render() {
    return (
      <BrowserRouter>
        <div id='app-root' style={{backgroundColor: Styles.bg.L2}}>
          <div className='page-content'>
            Hello
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;