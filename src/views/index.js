import React, { useRef, useState, useEffect } from 'react';
import ElementConfigure from './ElementConfigure';
import { TableColumn } from '../core';
import DndElement from '../components/DndElement';
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
  const [columns, setColumns] = useState([]);

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

  function addColumn(layout, element) {
    if (configureRef.current) {
      const { x, y, w = 120, h = 40 } = layout;
      const configAreaRect = configureRef.current.getBoundingClientRect();
      if (configAreaRect.left <= x && configAreaRect.top <= y
        && configAreaRect.right >= x + w && configAreaRect.bottom >= y + h) {
        Columns.add(element);
        updateColumns();
      }
    }
  }

  function deleteOrEditColumn(layout, element) {
    if (elementGroupRef.current) {
      const { x, y, w = 120, h = 40 } = layout;
      const configAreaRect = elementGroupRef.current.getBoundingClientRect();
      if (configAreaRect.left <= x && configAreaRect.top <= y
        && configAreaRect.right >= x && configAreaRect.bottom >= y) {
        Columns.delete(element);
        updateColumns();
      }
    }
  }

  return (
    <section className='atc-layout' ref={atcLayoutRef}>
      <section className='atc-slider' ref={elementGroupRef} data-drag-type='element'>
        <div className='atc-group-title'>元素库</div>
        <div className='atc-elements-container'>
          {
            (data || []).map((element) => (
              <DndElement
                key={element.dataIndex}
                className='atc-element'
                element={element}
                onDrop={addColumn}
              >
                {element.title}
              </DndElement>
            ))
          }
        </div>
      </section>
      <section className='atc-layout-content'>
        <ElementConfigure onDrop={deleteOrEditColumn} columns={columns} ref={configureRef} />
      </section>
    </section>
  );
}

export default AntdTableConfig;
