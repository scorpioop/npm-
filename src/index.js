import React from 'react';
import ReactDOM from 'react-dom';
import ChangeButton from './components/button'
const App = () => {
  return (
    <div>
      <ChangeButton startText="1" endText="2"/>
    </div>
  )
}

//要实现局部热更新，必须要添加此句
if (module.hot) {module.hot.accept()}

ReactDOM.render(<App />, document.getElementById('root'));
