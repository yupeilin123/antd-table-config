import React from 'react';
import ElementLibrary from './ElementLibrary';
import ElementConfigure from './ElementConfigure';
import './style';
import './index.less';

function AntdTableConfig(props) {
  const { dataSource = [] } = props;
  return (
    <section className='atc-layout'>
      <section className='atc-slider'>
        <div className='atc-group-title'>元素库</div>
        <ElementLibrary dataSource={dataSource} />
      </section>
      <section className='atc-layout-content'>
        <ElementConfigure />
      </section>
    </section>
  );
}

export default AntdTableConfig;
