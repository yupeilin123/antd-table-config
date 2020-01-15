import React, { useRef, useState, useEffect } from 'react';
import InputNumber from 'antd/es/input-number';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
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

let dragIndex;
let enterIndex;

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

  useEffect(() => {
    atcLayoutRef.current.addEventListener('dragover', setMoveDropEffect);
    configureRef.current.addEventListener('dragstart', dragStart);
    configureRef.current.addEventListener('dragend', dragend);
    configureRef.current.addEventListener('dragenter', dragenter);
    configureRef.current.addEventListener('dragleave', dragleave);
    configureRef.current.addEventListener('drop', drop);
    return () => {
      atcLayoutRef.current.removeEventListener('dragover', setMoveDropEffect);
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
    const findColumn = columns.find((_) => _.dataIndex === e.target.dataset.index);
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
      if (enterIndex || enterIndex === 0) {
        if (columns[enterIndex].dataIndex) {
          addColumn(element, enterIndex + 1);
        } else {
          replaceColumn(element, enterIndex);
        }
      } else {
        addColumn(element, columns.length);
      }
    } else {
      e.preventDefault();
      if (dragIndex !== enterIndex) {
        swapColumn(dragIndex, enterIndex);
      }
    }
    enterIndex = undefined;
  }

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
    const { x, y } = layout;
    const { left, right, top, bottom } = configureRef.current.getBoundingClientRect();
    if (left > x || right < x || top > y || bottom < y) {
      const index = columns.findIndex((_) => _.dataIndex === element.dataIndex);
      deleteColumn(index);
    }
  }

  function displayEditModalVisible(column) {
    setModalVisible(!modalVisible);
    setCurrentColumn(column);
  }

  function restColumnConfig() {
    Modal.confirm({
      title: '清空列表配置',
      content: '将为您情况所有的列配置项，是否确认情况？',
      onOk: () => {
        Columns.clear();
        updateColumns();
      },
    });
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
            <Button onClick={restColumnConfig}>重置</Button>
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
