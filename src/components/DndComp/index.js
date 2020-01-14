import React, { useState } from 'react';
import DragingIcon from '../DragingIcon';

export default function DndComp(props) {
  const { children, onDrop, className, disable, element, style, type } = props;
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const [isDarging, setIsDraging] = useState(false);
  function handleDragStart(e) {
    if (type === 'element') {
      e.target.style.borderColor = '#188EF2';
    }
    setPosition({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
    setIsDraging(true);
  }
  function handleDragEnd(e) {
    const left = e.pageX - position.offsetX;
    const top = e.pageY - position.offsetY;
    if (type === 'element') {
      e.target.style.borderColor = '';
    }
    setIsDraging(false);
    if (onDrop) {
      onDrop({
        x: left,
        y: top,
        clientX: e.clientX,
        clientY: e.clientY,
      }, element);
    }
  }
  function handleMouseEnter() {
    if (!disable) {
      setIsDraging(true);
    }
  }
  function handleMouseLeave() {
    if (!disable) {
      setIsDraging(false);
    }
  }
  function handleDragOver(e) {
  }
  function handleDragEnter(e) {
  }
  function handleDragLeave(e) {
  }

  return (
    <div
      draggable={!disable}
      className={`${className} ${disable ? 'atc-used-selected' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {isDarging && <DragingIcon className='atc-draging-icon' />}
      {children}
    </div>
  );
}
