import React from 'react';
import Icon from 'antd/es/icon';
import InputNumber from 'antd/es/input-number';
import Button from 'antd/es/button';

export default (props) => {
  const { master } = props;
  return (
    <>
      <div className='atc-config-area'>
        <div className='atc-group-title'>元素配置</div>
        <div className='atc-config-tip'>
          <Icon type='info-circle' className='atc-config-tip-icon' />
          你可以通过拖放元素库中的组件来自定义界面
        </div>
      </div>
      <div className='atc-operation-bar'>
        <div className='atc-rows'>
          第
          <InputNumber className='atc-rows-setting' />
          行
        </div>
        <div className='atc-rows-btn atc-rows-add'>
          <Icon type='plus-circle' className='atc-rows-icon' />
          添加
        </div>
        <div className='atc-operation-divider' />
        <div className='atc-rows-btn atc-rows-delete'>
          <Icon type='delete' className='atc-rows-icon' />
          删除
        </div>
        <div className='atc-operation-btns'>
          <Button>重置</Button>
          <Button className='atc-operation-btn' type='primary' ghost>预览</Button>
          <Button className='atc-operation-btn' type='primary'>保存</Button>
        </div>
      </div>
    </>
  );
};
