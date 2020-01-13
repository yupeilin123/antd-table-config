import React, { useState } from 'react';
import DragingIcon from '../DragingIcon';

export default function DndMaterial(props) {
  const { children, onDrop, className, disable, element, style } = props;
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const [isDarging, setIsDraging] = useState(false);

  function handleDragStart(e) {
    e.target.style.borderColor = '#188EF2';
    setPosition({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
    setIsDraging(true);
  }
  function handleDragEnd(e) {
    const left = e.pageX - position.offsetX;
    const top = e.pageY - position.offsetY;
    e.target.style.borderColor = '';
    setIsDraging(false);
    if (onDrop) {
      onDrop({
        x: left,
        y: top,
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

  return (
    <div
      draggable={!disable}
      className={`${className} ${disable ? 'atc-used-selected' : ''}`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {isDarging && <DragingIcon className='atc-draging-icon' />}
      {children}
    </div>
  );
}
