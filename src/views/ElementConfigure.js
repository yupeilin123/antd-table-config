import React from 'react';
import Icon from 'antd/es/icon';
import InputNumber from 'antd/es/input-number';
import Button from 'antd/es/button';
import DndElement from '../components/DndElement';

const ElementConfigure = React.forwardRef((props, ref) => {
  const { columns = [], onDrop } = props;
  return (
    <>
      <div className='atc-config-area' ref={ref} data-drag-type='column'>
        <div className='atc-group-title'>列表配置</div>
        <div className='atc-config-tip'>
          <Icon type='info-circle' className='atc-config-tip-icon' />
          你可以通过拖放元素库中的元素来自定义列表
        </div>
        <div className='atc-column-container'>
          {
            columns.map((data, index) => (
              <div className='atc-column' key={data.dataIndex}>
                <div className='atc-column-index'>
                  {index + 1}
                  <Icon type='edit' className='atc-column-edit' />
                </div>
                <DndElement onDrop={onDrop} element={data} className='atc-column-title'>
                  {data.title}
                </DndElement>
              </div>
            ))
          }
        </div>
      </div>
      <div className='atc-operation-bar'>
        <div className='atc-rows'>
          第
          <InputNumber className='atc-rows-setting' min={1} />
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
});

export default ElementConfigure;
