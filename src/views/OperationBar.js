import React from 'react';
import Button from 'antd/es/button';

const OperationBar = ({
  closable,
  onPreviewModal,
  onSave,
  onRest,
  onClose }) => (
    <div className='atc-operation-bar'>
      <div className='atc-operation-btns'>
        <Button onClick={onRest}>重置</Button>
        <Button className='atc-operation-btn' ghost type='primary' onClick={onPreviewModal}>预览</Button>
        <Button className='atc-operation-btn' type='primary' onClick={onSave}>保存</Button>
        {closable && (<Button className='atc-operation-btn' onClick={onClose}>关闭</Button>)}
      </div>
    </div>
);


export default OperationBar;
