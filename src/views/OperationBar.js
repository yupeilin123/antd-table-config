import React from 'react';
import Button from 'antd/es/button';

const OperationBar = ({
  closable,
  restable,
  onPreviewModal,
  onSave,
  onRest,
  onCancel,
  saveButtonProps,
  cancelButtonProps }) => (
    <div className='atc-operation-bar'>
      <div className='atc-operation-btns'>
        {restable && <Button onClick={onRest}>重置</Button> }
        <Button className='atc-operation-btn' ghost type='primary' onClick={onPreviewModal}>预览</Button>
        <Button className='atc-operation-btn' type='primary' onClick={onSave} {...saveButtonProps}>保存</Button>
        {closable && (<Button className='atc-operation-btn' onClick={onCancel} {...cancelButtonProps}>关闭</Button>)}
      </div>
    </div>
);


export default OperationBar;
