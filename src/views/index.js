import React, { useRef, useState, useEffect } from 'react';
import InputNumber from 'antd/es/input-number';
import Button from 'antd/es/button';
import Table from 'antd/es/table';
import Modal from 'antd/es/modal';
import Icon from 'antd/es/icon';
import ElementConfigure from './ElementConfigure';
import ColumnModal from './ColumnModal';
import { TableColumn } from '../core';
import DndComp from '../components/DndComp';
import './style';
import './index.less';

let dragIndex;
let enterIndex;
const Columns = TableColumn.initialize();


function AntdTableConfig(props) {
  const { dataSource = [], value = [], height, closable, onSave, onClose } = props;
  const configureRef = useRef();
  const elementGroupRef = useRef();
  const atcLayoutRef = useRef();
  const [columns, setColumns] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState();
  const [currentColumn, setCurrentColumn] = useState({});
  const [lineNumber, setLineNumber] = useState(undefined);
  const columnMap = columns.reduce((a, b) => { a[b.dataIndex] = true; return a; }, {});

  useEffect(() => {
    if (Array.isArray(value) && value.length) {
      Columns.set(value);
      updateColumns();
    }
  }, [value]);

  useEffect(() => {
    atcLayoutRef.current.addEventListener('dragover', setMoveDropEffect);
    elementGroupRef.current.addEventListener('dragenter', setEnterIndex);
    configureRef.current.addEventListener('dragstart', dragStart);
    configureRef.current.addEventListener('dragend', dragend);
    configureRef.current.addEventListener('dragenter', dragenter);
    configureRef.current.addEventListener('dragleave', dragleave);
    configureRef.current.addEventListener('drop', drop);
    return () => {
      atcLayoutRef.current.removeEventListener('dragover', setMoveDropEffect);
      elementGroupRef.current.removeEventListener('dragenter', setEnterIndex);
      configureRef.current.removeEventListener('dragstart', dragStart);
      configureRef.current.removeEventListener('dragend', dragend);
      configureRef.current.removeEventListener('dragenter', dragenter);
      configureRef.current.removeEventListener('dragleave', dragleave);
      configureRef.current.removeEventListener('drop', drop);
    };
  }, []);

  function setMoveDropEffect(e) {
    e.dataTransfer.dropEffect = 'move';
    e.preventDefault();
  }

  function setEnterIndex() {
    enterIndex = undefined;
  }

  function dragStart(e) {
    e.target.style.opacity = 0.5;
    const dragObj = e.target;
    const columnList = Array.from(configureRef.current.children).map((ele) => ele.lastElementChild);
    columnList.forEach((columnObj, index) => {
      if (columnObj === dragObj) {
        dragIndex = index;
      }
    });
  }
  function dragend(e) {
    e.target.style.opacity = '';
    const findColumn = Columns.get().find((_) => _.dataIndex === e.target.dataset.index);
    moveColumn({
      x: e.clientX,
      y: e.clientY,
    }, findColumn);
  }
  function dragenter(e) {
    if (e.target.className === 'atc-column-title') {
      e.target.style.borderStyle = 'dotted';
      const enterObj = e.target;
      const columnList = Array.from(configureRef.current.children).map((ele) => ele.lastElementChild);
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
      if (typeof enterIndex === 'number') {
        if (Columns.get()[enterIndex].dataIndex) {
          addColumn(element, enterIndex + 1);
        } else {
          replaceColumn(element, enterIndex);
        }
      } else {
        addColumn(element, Columns.get().length);
      }
    } else {
      e.preventDefault();
      if (dragIndex !== enterIndex && typeof enterIndex === 'number') {
        swapColumn(dragIndex, enterIndex);
      }
    }
    enterIndex = undefined;
  }

  function updateColumns() {
    setColumns(Columns.get());
  }

  function addColumn(element, insertIndex) {
    Columns.insert({
      ...element,
      width: 120,
    }, insertIndex);
    updateColumns();
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
    const { x, y } = layout;
    const { left, right, top, bottom } = configureRef.current.getBoundingClientRect();
    if (left > x || right < x || top > y || bottom < y) {
      const index = Columns.get().findIndex((_) => _.dataIndex === element.dataIndex);
      deleteColumn(index);
    }
  }

  function handleAddColumn() {
    if (typeof lineNumber === 'number') {
      addColumn({}, lineNumber - 1);
      setLineNumber();
    }
  }

  function handleDeleteColumn() {
    if (typeof lineNumber === 'number') {
      deleteColumn(lineNumber - 1);
      setLineNumber();
    }
  }

  function displayModalVisible(column, type) {
    setModalVisible(!modalVisible);
    setCurrentColumn(column);
    setModalType(type);
  }

  function restColumnConfig() {
    Modal.confirm({
      title: '清空列表配置',
      content: '将为您情况所有的列配置项，是否确认情况？',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        Columns.clear();
        updateColumns();
      },
    });
  }

  function saveColumns() {
    if (onSave) {
      onSave(columns);
    }
  }

  return (
    <section className='atc-layout' ref={atcLayoutRef} style={{ height }}>
      <section className='atc-slider' ref={elementGroupRef} data-drag-type='element'>
        <div className='atc-group-title'>元素库</div>
        <div className='atc-elements-container'>
          {
            (dataSource || []).map((element) => (
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
          onOpen={displayModalVisible}
        />
        <div className='atc-operation-bar'>
          <div className='atc-rows'>
            第
            <InputNumber
              className='atc-rows-setting'
              min={1}
              max={columns.length + 1}
              value={lineNumber}
              onChange={(v) => setLineNumber(v)}
            />
            行
          </div>
          <div className='atc-rows-btn atc-rows-add' onClick={handleAddColumn}>
            <Icon type='plus-circle' className='atc-rows-icon' />
            添加
          </div>
          <div className='atc-operation-divider' />
          <div className='atc-rows-btn atc-rows-delete' onClick={handleDeleteColumn}>
            <Icon type='delete' className='atc-rows-icon' />
            删除
          </div>
          <div className='atc-operation-btns'>
            <Button onClick={restColumnConfig}>重置</Button>
            <Button className='atc-operation-btn' type='primary' ghost onClick={displayModalVisible.bind(this, {}, 'preview')}>预览</Button>
            <Button className='atc-operation-btn' type='primary' onClick={saveColumns}>保存</Button>
            {closable && <Button className='atc-operation-btn' onClick={onClose}>关闭</Button>}
          </div>
        </div>
      </section>
      <ColumnModal
        visible={modalType === 'edit' && modalVisible}
        formValue={currentColumn}
        onOk={editColumn}
        onCancel={displayModalVisible.bind(this, {}, 'edit')}
      />
      <Modal
        title='预览'
        className='atc-preview-modal'
        bodyStyle={{ padding: 0 }}
        width={780}
        footer={null}
        visible={modalType === 'preview' && modalVisible}
        onCancel={displayModalVisible.bind(this, {}, 'preview')}
      >
        <Table
          columns={columns}
          dataSource={[]}
          scroll={{ x: columns.reduce((a, b) => (a + b.width), 0) }}
          size='small'
        />
      </Modal>
    </section>
  );
}

export default AntdTableConfig;
