import React, { useState } from 'react';
import Icon from 'antd/es/icon';
import DragingIcon from '../components/DragingIcon';

const ElementConfigure = React.forwardRef((props, ref) => {
  const { columns = [], onEdit } = props;
  const [currentDragIndex, setCurrentDragIndex] = useState();

  function handleMouseEnter(dataIndex) {
    setCurrentDragIndex(dataIndex);
  }
  function handleMouseLeave() {
    setCurrentDragIndex();
  }

  return (
    <div className='atc-config-area' ref={ref}>
      {
        columns.map((data, index) => (
          <div className='atc-column' key={data.dataIndex || index + 1}>
            <div className='atc-column-index'>
              {index + 1}
              <Icon
                type='edit'
                className={`atc-column-edit${data.dataIndex ? '' : ' atc-column-disable'}`}
                onClick={data.dataIndex && onEdit.bind(this, data)}
              />
            </div>
            <div
              draggable
              className='atc-column-title'
              data-drag-type='column'
              onMouseEnter={handleMouseEnter.bind(this, data.dataIndex || index + 1)}
              onMouseLeave={handleMouseLeave}
              data-index={data.dataIndex}
            >
              {currentDragIndex === (data.dataIndex || index + 1) && <DragingIcon className='atc-draging-icon' />}
              {data.title}
            </div>
          </div>
        ))
      }
    </div>
  );
});

export default React.memo(ElementConfigure, (prevProps, nextProps) => {
  if (prevProps.columns !== nextProps.columns || prevProps.currentDragIndex !== nextProps.currentDragIndex) return false;
  return true;
});
