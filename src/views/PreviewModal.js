import React from 'react';
import Modal from 'antd/es/modal';
import Table from 'antd/es/table';

const PreviewModal = ({ visible, onCancel, columns }) => (
  <Modal
    title='预览'
    className='atc-preview-modal'
    bodyStyle={{ padding: 0 }}
    width={780}
    footer={null}
    visible={visible}
    onCancel={onCancel}
  >
    <Table
      columns={columns}
      dataSource={[]}
      scroll={{ x: columns.reduce((a, b) => a + (b.width || 0), 0) }}
      size='small'
    />
  </Modal>
);

export default React.memo(PreviewModal, (prevProps, nextProps) => {
  if (prevProps.visible !== nextProps.visible) return false;
  return true;
});
