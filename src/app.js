import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactDOM from 'react-dom';
import ConfigProvider from 'antd/es/config-provider';
import zhCN from 'antd/es/locale/zh_CN';
import AntdTableConfig from './views';
import './app.less';

const App = () => (
  <ConfigProvider locale={zhCN}>
    <AntdTableConfig />
  </ConfigProvider>
);

ReactDOM.render(<App />,
  document.getElementById('app'));
