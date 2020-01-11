import React, { useState } from 'react';
import CanDragingIcon from '../CanDragingIcon';

export default function DndMaterial(props) {
  const { children, onDrag, className, disable } = props;
  const [style, setStyle] = useState();
  const [position, setPosition] = useState({ offsetX: 0, offsetY: 0 });
  const [isDarging, setIsDraging] = useState(false);
  function handleDragStart(e) {
    setStyle({
      borderColor: '#188EF2',
    });
    setPosition({
      offsetX: e.nativeEvent.offsetX,
      offsetY: e.nativeEvent.offsetY,
    });
    setIsDraging(true);
  }
  function handleDragEnd(e) {
    const left = e.pageX - position.offsetX;
    const top = e.pageY - position.offsetY;
    setStyle();
    setIsDraging(false);
    if (onDrag) {
      onDrag({
        x: left,
        y: top,
      });
    }
  }
  return (
    <div
      draggable={!disable}
      className={className}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={style}
    >
      {isDarging && <CanDragingIcon className='atc-draging-icon' />}
      {children}
    </div>
  );
}
