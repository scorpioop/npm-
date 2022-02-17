import React from 'react';
import ReactDOM from 'react-dom';
import ChangeButton from './components/button';
import PageTable from './components/PageTable';
const App = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    
    {
      title: 'Action',
      key: 'action',
      
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      
    },
  ];
  return (
    <div>
      <ChangeButton startText="1" endText="2"/>
      1234
      <PageTable columns={columns} data={data} total={45} showSizeChanger={true}/>
    </div>
  )
}

//要实现局部热更新，必须要添加此句
if (module.hot) {module.hot.accept()}

ReactDOM.render(<App />, document.getElementById('root'));
