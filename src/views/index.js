import React, { useRef, useState, useEffect } from 'react';
import Modal from 'antd/es/modal';
import Icon from 'antd/es/icon';
import ElementConfigure from './ElementConfigure';
import Materiel from './Materiel';
import OperationBar from './OperationBar';
import ColumnModal from './ColumnModal';
import PreviewModal from './PreviewModal';
import { TableColumn } from '../core';
import './style';
import './index.less';

let dragIndex;
let enterIndex;
const Columns = TableColumn.initialize();

function AntdTableConfig(props) {
  const { dataSource = [], value, height, closable, onSave, onClose } = props;
  const configureRef = useRef();
  const materielRef = useRef();
  const atcLayoutRef = useRef();
  const atcContentRef = useRef();
  const [columns, setColumns] = useState([]);
  const [editVisible, setEditVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [currentColumn, setCurrentColumn] = useState({});
  const [action, setAction] = useState('');
  const columnMap = React.useMemo(() => (
    columns.reduce((a, b) => {
      a[b.dataIndex] = true;
      return a;
    }, {})
  ), [columns]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setColumns(value);
      Columns.set(value);
      updateColumns();
    }
    return () => {
      setColumns([]);
      Columns.clear();
    };
  }, [value]);

  useEffect(() => {
    atcLayoutRef.current.addEventListener('dragover', setMoveDropEffect);
    materielRef.current.addEventListener('dragenter', setEnterIndex);
    configureRef.current.addEventListener('dragstart', dragStart);
    configureRef.current.addEventListener('dragend', dragend);
    configureRef.current.addEventListener('drag', drag);
    configureRef.current.addEventListener('dragenter', dragenter);
    configureRef.current.addEventListener('dragleave', dragleave);
    configureRef.current.addEventListener('drop', drop);
    return () => {
      atcLayoutRef.current.removeEventListener('dragover', setMoveDropEffect);
      materielRef.current.removeEventListener('dragenter', setEnterIndex);
      configureRef.current.removeEventListener('dragstart', dragStart);
      configureRef.current.removeEventListener('dragend', dragend);
      configureRef.current.removeEventListener('drag', drag);
      configureRef.current.removeEventListener('dragenter', dragenter);
      configureRef.current.removeEventListener('dragleave', dragleave);
      configureRef.current.removeEventListener('drop', drop);
    };
  }, []);

  function setMoveDropEffect(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function setEnterIndex(e) {
    enterIndex = undefined;
  }
  function dragStart(e) {
    e.target.style.opacity = 0.5;
    const dragObj = e.target;
    setAction('draging');
    const columnList = Array.from(configureRef.current.children).map(
      (ele) => ele.lastElementChild,
    );
    columnList.forEach((columnObj, index) => {
      if (columnObj === dragObj) {
        dragIndex = index;
      }
    });
  }
  function dragend(e) {
    e.target.style.opacity = '';
    setAction('');
    const findColumn = Columns.get().find(
      (_) => _.dataIndex === e.target.dataset.index,
    );
    moveColumn(
      {
        x: e.clientX,
        y: e.clientY,
      },
      findColumn,
    );
  }
  function dragenter(e) {
    if (e.target.className === 'atc-column-title') {
      e.target.style.borderStyle = 'dotted';
      const enterObj = e.target;
      const columnList = Array.from(configureRef.current.children).map(
        (ele) => ele.lastElementChild,
      );
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

  function drag(e) {
    const { left, right, top, bottom } = materielRef.current.getBoundingClientRect();
    if (left <= e.clientX && right >= e.clientX && top <= e.clientY && bottom >= e.clientY) {
      setAction('droging');
    } else {
      setAction('draging');
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
    Columns.insert(
      {
        ...element,
        width: 120,
      },
      insertIndex,
    );
    updateColumns();
  }

  function editColumn(column) {
    Columns.edit(column);
    updateColumns();
    setEditVisible(false);
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
    const { left, right, top, bottom } = materielRef.current.getBoundingClientRect();
    if (left <= x && right >= x && top <= y && bottom >= y) {
      const index = Columns.get().findIndex(
        (_) => _.dataIndex === element.dataIndex,
      );
      deleteColumn(index);
    }
  }

  function restColumnConfig() {
    Modal.confirm({
      title: '恢复列表配置',
      content: '将为您恢复到初始配置，是否确认恢复？',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        Columns.set(value);
        updateColumns();
      },
    });
  }

  function saveColumns() {
    if (onSave) {
      onSave(columns);
    }
  }

  function displayEditModalVisible(element) {
    setCurrentColumn(element);
    setEditVisible(!editVisible);
  }

  function displayPreviewModalVisible() {
    setPreviewVisible(!previewVisible);
  }

  return (
    <section className='atc-layout' ref={atcLayoutRef} style={{ height }}>
      <Materiel
        action={action}
        dataSource={dataSource}
        columnMap={columnMap}
        ref={materielRef}
      />
      <section className='atc-layout-content' ref={atcContentRef}>
        <div className='atc-config-header'>
          <div className='atc-group-title'>列表配置</div>
          <div className='atc-config-tip'>
            <Icon type='info-circle' className='atc-config-tip-icon' />
            你可以通过拖放元素库中的元素来自定义列表
          </div>
        </div>
        <ElementConfigure
          ref={configureRef}
          columns={columns}
          onEdit={displayEditModalVisible}
        />
        <OperationBar
          closable={closable}
          onPreviewModal={displayPreviewModalVisible}
          onSave={saveColumns}
          onRest={restColumnConfig}
          onClose={onClose}
        />
      </section>
      <ColumnModal
        visible={editVisible}
        formValue={currentColumn}
        onOk={editColumn}
        onCancel={displayEditModalVisible}
      />
      <PreviewModal
        visible={previewVisible}
        columns={columns}
        onCancel={displayPreviewModalVisible}
      />
    </section>
  );
}

export default AntdTableConfig;
