import React from 'react';
import Modal from 'antd/es/modal';
import Input from 'antd/es/input';
import InputNumber from 'antd/es/input-number';
import Form from 'antd/es/form';

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 12 },
};

const ColumnModal = (props) => {
  const { visible, onOk, onCancel, form, formValue } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;
  function sumbit() {
    validateFields((err, value) => {
      if (err) return;
      onOk(value);
    });
  }
  return (
    <Modal
      title='修改'
      visible={visible}
      onOk={sumbit}
      onCancel={onCancel}
      maskClosable={false}
      afterClose={() => resetFields()}
    >
      <Form>
        <Form.Item label='索引' {...formItemLayout}>
          {
            getFieldDecorator('dataIndex', {
              initialValue: formValue.dataIndex,
            })(
              <Input disabled />,
            )
          }
        </Form.Item>
        <Form.Item label='名称' {...formItemLayout}>
          {
            getFieldDecorator('title', {
              initialValue: formValue.title,
              rules: [{ required: true, message: '请输入名称' }],
            })(
              <Input />,
            )
          }
        </Form.Item>
        <Form.Item label='宽度' {...formItemLayout}>
          {
            getFieldDecorator('width', {
              initialValue: formValue.width,
            })(
              <InputNumber min={0} style={{ width: '100%' }} />,
            )
          }
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(ColumnModal);
