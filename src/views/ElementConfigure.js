import React from 'react';
import Icon from 'antd/es/icon';
import DndElement from '../components/DndElement';

const ElementConfigure = React.forwardRef((props, ref) => {
  const { columns = [], onOpen, onDrop } = props;
  return (
    <div className='atc-config-area' ref={ref} data-drag-type='column'>
      <div className='atc-group-title'>列表配置</div>
      <div className='atc-config-tip'>
        <Icon type='info-circle' className='atc-config-tip-icon' />
        你可以通过拖放元素库中的元素来自定义列表
      </div>
      <div className='atc-column-container'>
        {
          columns.map((data, index) => (
            <div className='atc-column' key={data.dataIndex}>
              <div className='atc-column-index'>
                {index + 1}
                <Icon type='edit' className='atc-column-edit' onClick={onOpen.bind(this, data)} />
              </div>
              <DndElement onDrop={onDrop} element={data} className='atc-column-title'>
                {data.title}
              </DndElement>
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default ElementConfigure;
