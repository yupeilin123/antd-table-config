import React from 'react';
import Icon from 'antd/es/icon';
import DndComp from '../components/DndComp';

const ElementConfigure = React.forwardRef((props, ref) => {
  const { columns = [], onOpen, onDrop } = props;
  return (
    <div className='atc-config-area' ref={ref} data-drag-type='column'>
      {
        columns.map((data, index) => (
          <div className='atc-column' key={data.dataIndex}>
            <div className='atc-column-index'>
              {index + 1}
              <Icon type='edit' className='atc-column-edit' onClick={onOpen.bind(this, data)} />
            </div>
            <DndComp
              type='column'
              className='atc-column-title'
              element={data}
              onDrop={onDrop}
            >
              {data.title}
            </DndComp>
          </div>
        ))
      }
    </div>
  );
});

export default ElementConfigure;
