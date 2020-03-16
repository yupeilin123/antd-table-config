import React from 'react';
import Tooltip from 'antd/es/tooltip';
import DndComp from '../components/DndComp';

const Materiel = React.forwardRef((props, ref) => {
  const { action, dataSource = {}, columnMap } = props;
  return (
    <section
      className={`atc-slider${action
        && (action === 'draging'
          ? ' atc-dnd-box atc-drag-container'
          : ' atc-dnd-box atc-drop-container')}`}
      ref={ref}
      data-drag-type='element'
    >
      {action ? (
        <>
          <div className='atc-del-block' data-drag-type='element' />
          <div className='atc-del-label' data-drag-type='element'>将元素拖动至此处</div>
          <div className='atc-del-label' data-drag-type='element'>已移除元素</div>
        </>
      ) : (
        <>
          <div className='atc-group-title'>元素库</div>
          <div className='atc-elements-container'>
            {dataSource.map((element) => (
              <DndComp
                key={element.dataIndex}
                className='atc-element'
                element={element}
                disable={columnMap[element.dataIndex]}
              >
                <Tooltip title={element.title}>{element.title}</Tooltip>
              </DndComp>
            ))}
          </div>
        </>
      )}
    </section>
  );
});

export default Materiel;
