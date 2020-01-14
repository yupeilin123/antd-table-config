import React, { useState, useEffect } from 'react';
import Icon from 'antd/es/icon';
import DragingIcon from '../components/DragingIcon';

let dragIndex;
let enterIndex;

const ElementConfigure = React.forwardRef((props, ref) => {
  const { columns = [], onOpen, onSwap, onMove, onAdd, onReplace } = props;
  const [currentDataIndex, setCurrentDataIndex] = useState();

  function dragStart(e) {
    e.target.style.opacity = 0.5;
    const dragObj = e.target;
    const columnList = Array.from(ref.current.children).map((ele) => ele.lastElementChild);
    columnList.forEach((columnObj, index) => {
      if (columnObj === dragObj) {
        dragIndex = index;
      }
    });
  }
  function dragend(e) {
    e.target.style.opacity = '';
    const currentColumn = columns.find((_) => _.dataIndex === e.target.dataset.index);
    onMove({
      x: e.clientX,
      y: e.clientY,
    }, currentColumn);
  }
  function dragenter(e) {
    if (e.target.className === 'atc-column-title') {
      e.target.style.borderStyle = 'dotted';
      const enterObj = e.target;
      const columnList = Array.from(ref.current.children).map((ele) => ele.lastElementChild);
      columnList.forEach((columnObj, index) => {
        if (columnObj === enterObj) {
          enterIndex = index;
        }
      });
    }
  }
  function dragleave(e) {
    if (e.target.style.borderStyle === 'dotted') {
      e.target.style.borderStyle = 'solid';
    }
  }

  function drop(e) {
    const elementStr = e.dataTransfer.getData('element');
    e.target.style.borderStyle = '';
    if (elementStr) {
      const element = JSON.parse(elementStr);
      if (enterIndex || enterIndex === 0) {
        if (columns[enterIndex].dataIndex) {
          onAdd(element, enterIndex + 1);
        } else {
          onReplace(element, enterIndex);
        }
      } else {
        onAdd(element, columns.length);
      }
    } else {
      e.preventDefault();
      if (dragIndex !== enterIndex) {
        onSwap(dragIndex, enterIndex);
      }
    }
  }

  useEffect(() => {
    ref.current.addEventListener('dragstart', dragStart);
    ref.current.addEventListener('dragend', dragend);
    ref.current.addEventListener('dragenter', dragenter);
    ref.current.addEventListener('dragleave', dragleave);
    ref.current.addEventListener('drop', drop);
    return () => {
      ref.current.removeEventListener('dragstart', dragStart);
      ref.current.removeEventListener('dragend', dragend);
      ref.current.removeEventListener('dragenter', dragenter);
      ref.current.removeEventListener('dragleave', dragleave);
      ref.current.removeEventListener('drop', drop);
    };
  }, []);

  function handleMouseEnter(dataIndex) {
    setCurrentDataIndex(dataIndex);
  }
  function handleMouseLeave() {
    setCurrentDataIndex();
  }

  return (
    <div className='atc-config-area' ref={ref} data-drag-type='column'>
      {
        columns.map((data, index) => (
          <div className='atc-column' key={data.dataIndex || index + 1}>
            <div className='atc-column-index'>
              {index + 1}
              <Icon type='edit' className='atc-column-edit' onClick={onOpen.bind(this, data)} />
            </div>
            <div
              draggable
              className='atc-column-title'
              onMouseEnter={handleMouseEnter.bind(this, data.dataIndex || index + 1)}
              onMouseLeave={handleMouseLeave}
              data-index={data.dataIndex}
            >
              {currentDataIndex === (data.dataIndex || index + 1) && <DragingIcon className='atc-draging-icon' />}
              {data.title}
            </div>
          </div>
        ))
      }
    </div>
  );
});

export default ElementConfigure;
