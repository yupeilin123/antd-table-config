import React from 'react';
import InputNumber from 'antd/es/input-number';
import Button from 'antd/es/button';
import Icon from 'antd/es/icon';

const OperationBar = ({
  closable,
  lineNumber,
  columns = [],
  onSetLineNumber,
  onAddColumn,
  onDeleteColumn,
  onPreviewModal,
  onSave,
  onRest,
  onClose }) => (
    <div className='atc-operation-bar'>
      <div className='atc-rows'>
        第
        <InputNumber className='atc-rows-setting' min={1} max={columns.length + 1} value={lineNumber} onChange={(v) => onSetLineNumber(v)} />
        行
      </div>
      <div className='atc-rows-btn atc-rows-add' onClick={onAddColumn}>
        <Icon type='plus-circle' className='atc-rows-icon' />
        添加
      </div>
      <div className='atc-operation-divider' />
      <div className='atc-rows-btn atc-rows-delete' onClick={onDeleteColumn}>
        <Icon type='delete' className='atc-rows-icon' />
        删除
      </div>
      <div className='atc-operation-btns'>
        <Button onClick={onRest}>重置</Button>
        <Button className='atc-operation-btn' ghost type='primary' onClick={onPreviewModal}>预览</Button>
        <Button className='atc-operation-btn' type='primary' onClick={onSave}>保存</Button>
        {closable && (<Button className='atc-operation-btn' onClick={onClose}>关闭</Button>)}
      </div>
    </div>
);


export default React.memo(OperationBar, (prevProps, nextProps) => {
  if (prevProps.lineNumber !== nextProps.lineNumber || prevProps.columns !== nextProps.columns) return false;
  return true;
});
