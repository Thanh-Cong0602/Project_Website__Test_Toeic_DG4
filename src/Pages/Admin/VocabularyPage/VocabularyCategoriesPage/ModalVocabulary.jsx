import React, { useEffect, useState } from 'react'
import '../ModalCustom.css'
import { updateVocabularyCategory } from '../../../../Api/Service/vocabulary.service';
import { createVocabularyCategory } from '../../../../Api/Service/vocabulary.service';
import { Modal, Form, Input, Checkbox, Button } from 'antd';
import { toast } from "react-toastify";

function ModalVocabulary(props) {
  const { isOpenForm, onClose, title, form, id, reloadData } = props;
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(form.getFieldValue("isActive"))
  }, [form])

  const handleChange = (e) => {
    setStatus(e.target.checked);
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const handleUpdateVocabulary = (values) => {
    updateVocabularyCategory(`vocabularyCategories?id=${id}`, values)
      .then((res) => {
        handleCancel();
        toast.success(res.data.message, { autoClose: 2000 });
        reloadData();
      })
      .catch((err) => {
        toast.error(err.response.data.message, { autoClose: 2000 });
      });
  };

  const handleCreateVocabulary = (values) => {
    createVocabularyCategory('vocabularyCategories/create', values).then((res) => {
      handleCancel()
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  };

  const onFinish = (values) => {
    values.id
      ? handleUpdateVocabulary(values)
      : handleCreateVocabulary(values)
  };

  const onFinishFailed = () => {
    toast.error("Create Vocabulary Category Failed", { autoClose: 1000 })
  };
  return (
    <Modal
      className='custom__modal'
      title={title}
      open={isOpenForm}
      form={form}
      width={500}
      onCancel={handleCancel}
      footer={[
        <Button form="formCategory"
          key="back"
          onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          form="formCategory"
          key="submit"
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>,
      ]}
    >
      <Form id='formCategory' form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item name="id" hidden="true">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name"
          rules={[{ required: true, message: 'Please input Category Name' },]}>
          <Input className='custom__input_modal' />
        </Form.Item>
        <Form.Item label="Status" name="isActive" valuePropName='checked'>
          <Checkbox checked={status} onChange={handleChange}></Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalVocabulary