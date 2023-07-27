import React, { useState, useEffect, useCallback } from 'react'
import '../ModalCustom.css'
import { updateVocabulary } from '../../../../Api/Service/vocabulary.service'
import { createVocabulary } from '../../../../Api/Service/vocabulary.service'
import { getVocabularyCategories } from '../../../../Api/Service/vocabulary.service'
import { Modal, Form, Input, Checkbox, Button, Select } from 'antd';
import { toast } from "react-toastify";
function ModalAllVocabularies(props) {
  const { isOpenForm, onClose, title, form, id, reloadData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setStatus(form.getFieldValue("isActive")) 
  }, [])

  const getAllCategories = () => {
    getVocabularyCategories('vocabularyCategories').then((res) => {
      const _options = [];
      res.data.data.forEach((item, index) => {
        _options.push({
          value: item.id,
          label: item.name
        })
      });
      setOptions(_options);
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }

  useEffect(() => {
    if (isOpenForm) {
      getAllCategories()
    }
  }, [isOpenForm])

  const handleChange = (e) => {
    setStatus(e.target.checked);
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };
  const handleUpdateVocabulary = useCallback((values) => {
    updateVocabulary(`vocabularies?id=${id}`, values).then((res) => {
      handleCancel()
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [handleCancel, reloadData])

  const handleCreateVocabulary = (values) => {
    createVocabulary('vocabularies/create', values).then((res) => {
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
    <Modal className='custom__modal'
      title={title}
      open={isOpenForm}
      form={form}
      width={500}
      onCancel={handleCancel}
      footer={[
        <Button form="formVocabulary"
          key="back"
          onClick={handleCancel}>
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
        <Form.Item label="Word" name="word">
          <Input className='custom__input_modal' />
        </Form.Item>
        <Form.Item label="Pronounce" name="pronounce">
          <Input className='custom__input_modal' />
        </Form.Item>
        <Form.Item label="Mean" name="mean">
          <Input className='custom__input_modal' />
        </Form.Item>
        <Form.Item label="Category" name="categoryIds">
          <Select
            mode="multiple"
            allowClear
            placeholder="Please select"
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            defaultValue={form.getFieldValue('categoryIds') ? form.getFieldValue('categoryIds') : []}
            options={options}
          ></Select>
        </Form.Item>
        <Form.Item label="Status" name="isActive" valuePropName='checked'>
          <Checkbox checked={status} onChange={handleChange}></Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalAllVocabularies