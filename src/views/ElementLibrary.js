import React from 'react';
import DndElement from '../components/DndElement';

export default (props) => {
  const { dataSource } = props;
  return (
    <div className='atc-elements-container'>
      {
        (dataSource || []).map((element) => (
          <DndElement isDrag={element.isDrag} key={element.dataIndex} className='atc-element'>
            {element.title}
          </DndElement>
        ))
      }
    </div>
  );
};
