import React, { useRef, useState, useEffect } from 'react';
import InputNumber from 'antd/es/input-number';
import Button from 'antd/es/button';
import Icon from 'antd/es/icon';
import ElementConfigure from './ElementConfigure';
import ColumnModal from './ColumnModal';
import { TableColumn } from '../core';
import DndComp from '../components/DndComp';
import './style';
import './index.less';

const data = [{
  title: '姓名',
  dataIndex: 'patientName',
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '出生日期',
  dataIndex: 'birthday',
}, {
  title: '采样日期',
  dataIndex: 'deliverDay',
}, {
  title: '报告日期',
  dataIndex: 'reportDay',
}, {
  title: '检测方案',
  dataIndex: 'prodcde',
}, {
  title: '样本类型',
  dataIndex: 'sampleType',
}];

const Columns = TableColumn.initialize();

function AntdTableConfig(props) {
  const { dataSource = [] } = props;
  const configureRef = useRef();
  const elementGroupRef = useRef();
  const atcLayoutRef = useRef();
  const [columns, setColumns] = useState(Columns.data || []);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentColumn, setCurrentColumn] = useState({});
  const [lines, setLines] = useState(undefined);
  const columnMap = columns.reduce((a, b) => { a[b.dataIndex] = true; return a; }, {});

  function setMoveDropEffect(e) {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  }

  useEffect(() => {
    if (atcLayoutRef.current) {
      atcLayoutRef.current.addEventListener('dragover', setMoveDropEffect);
    }
    return () => {
      atcLayoutRef.current.removeEventListener('dragover', setMoveDropEffect);
    };
  }, []);

  function updateColumns() {
    setColumns([...Columns.data]);
  }

  function addColumn(element, insertIndex) {
    Columns.insert({
      ...element,
      width: 120,
    }, insertIndex);
    updateColumns();
    if (lines) {
      setLines();
    }
  }

  function editColumn(column) {
    Columns.edit(column);
    updateColumns();
    setModalVisible(!modalVisible);
  }

  function swapColumn(sourceIndex, targetIndex) {
    Columns.swap(sourceIndex, targetIndex);
    updateColumns();
  }

  function replaceColumn(column, targetIndex) {
    Columns.replace(column, targetIndex);
    updateColumns();
  }

  function deleteColumn(targetIndex) {
    Columns.delete(targetIndex);
    updateColumns();
  }

  function moveColumn(layout, element) {
    if (elementGroupRef.current) {
      const { x, y } = layout;
      const configAreaRect = elementGroupRef.current.getBoundingClientRect();
      if (configAreaRect.left <= x && configAreaRect.top <= y
        && configAreaRect.right >= x && configAreaRect.bottom >= y) {
        const index = columns.findIndex((_) => _.dataIndex === element.dataIndex);
        Columns.delete(index);
        updateColumns();
      }
    }
  }

  function displayEditModalVisible(column) {
    setModalVisible(!modalVisible);
    setCurrentColumn(column);
  }


  return (
    <section className='atc-layout' ref={atcLayoutRef}>
      <section className='atc-slider' ref={elementGroupRef} data-drag-type='element'>
        <div className='atc-group-title'>元素库</div>
        <div className='atc-elements-container'>
          {
            (data || []).map((element) => (
              <DndComp
                key={element.dataIndex}
                className='atc-element'
                element={element}
                disable={columnMap[element.dataIndex]}
              >
                {element.title}
              </DndComp>
            ))
          }
        </div>
      </section>
      <section className='atc-layout-content'>
        <div className='atc-config-header'>
          <div className='atc-group-title'>列表配置</div>
          <div className='atc-config-tip'>
            <Icon type='info-circle' className='atc-config-tip-icon' />
            你可以通过拖放元素库中的元素来自定义列表
            <div style={{ paddingLeft: 20 }}>添加的行数多余一行时，按第一行添加</div>
          </div>
        </div>
        <ElementConfigure
          ref={configureRef}
          columns={columns}
          onOpen={displayEditModalVisible}
          onMove={moveColumn}
          onSwap={swapColumn}
          onReplace={replaceColumn}
          onAdd={addColumn}
        />
        <div className='atc-operation-bar'>
          <div className='atc-rows'>
            第
            <InputNumber className='atc-rows-setting' min={1} max={columns.length + 1} value={lines} onChange={(value) => setLines(value)} />
            行
          </div>
          <div className='atc-rows-btn atc-rows-add' onClick={addColumn.bind(this, {}, lines - 1)}>
            <Icon type='plus-circle' className='atc-rows-icon' />
            添加
          </div>
          <div className='atc-operation-divider' />
          <div className='atc-rows-btn atc-rows-delete' onClick={deleteColumn.bind(this, lines - 1)}>
            <Icon type='delete' className='atc-rows-icon' />
            删除
          </div>
          <div className='atc-operation-btns'>
            <Button>重置</Button>
            <Button className='atc-operation-btn' type='primary' ghost>预览</Button>
            <Button className='atc-operation-btn' type='primary'>保存</Button>
          </div>
        </div>
      </section>
      <ColumnModal
        visible={modalVisible}
        formValue={currentColumn}
        onOk={editColumn}
        onCancel={displayEditModalVisible}
      />
    </section>
  );
}

export default AntdTableConfig;
