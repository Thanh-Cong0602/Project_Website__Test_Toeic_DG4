import React, { useCallback, useEffect, useState } from 'react'
import '../ModalCustom.css'
import { updateVocabularyCategory } from '../../../../Api/Service/vocabulary.service';
import { createVocabularyCategory } from '../../../../Api/Service/vocabulary.service';
import { Modal, Form, Input, Checkbox, Button } from 'antd';
import { toast } from "react-toastify";

function ModalVocabulary(props) {
  const { isOpenForm, onClose, title, form, id, reloadData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(form.getFieldValue("isActive"))
  }, [])

  const handleChange = (e) => {
    setStatus(e.target.checked);
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const handleUpdateVocabulary = useCallback(values => {
    updateVocabularyCategory(`vocabularyCategories?id=${id}`, values).then((res) => {
      handleCancel()
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [handleCancel, reloadData])

  const handleCreateVocabulary = (values) => {
    createVocabularyCategory('vocabularyCategories/create', values).then((res) => {
      handleCancel()
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }
  
  const onFinish = (values) => {
    {
      values.id
        ? handleUpdateVocabulary(values)
        : handleCreateVocabulary(values)
    }
  }
  return (
    <Modal
      className='custom__modal'
      title={title}
      open={isOpenForm}
      form={form}
      width={500}
      onCancel={handleCancel}
      footer={[
        <Button form="formVocabulary" key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          form="formVocabulary"
          key="submit"
          type="primary"
          htmlType="submit"
          loading={isLoading} >
          Save
        </Button>,
      ]}
    >
      <Form id='formVocabulary' form={form} onFinish={onFinish}>
        <Form.Item name="id" hidden="true">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name" >
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