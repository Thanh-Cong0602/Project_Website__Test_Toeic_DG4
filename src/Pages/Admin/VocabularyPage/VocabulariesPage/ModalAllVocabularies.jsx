import React, { useState, useEffect } from 'react'
import '../ModalCustom.css'
import { updateVocabulary } from '../../../../Api/Service/vocabulary.service'
import { createVocabulary } from '../../../../Api/Service/vocabulary.service'
import { getVocabularyCategories } from '../../../../Api/Service/vocabulary.service'
import { Modal, Form, Input, Checkbox, Button, Select } from 'antd';
import { toast } from "react-toastify";
function ModalAllVocabularies(props) {
  const { isOpenForm, onClose, title, form, id, reloadData } = props;
  const [status, setStatus] = useState(false);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    setStatus(form.getFieldValue("isActive"))
  }, []);

  const getAllCategories = () => {
    getVocabularyCategories('vocabularyCategories').then((res) => {
      const _options = [];
      res.data.data.forEach((item) => {
        _options.push({
          value: item.id,
          label: item.name
        })
      });
      setOptions(_options);
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  };

  useEffect(() => {
    if (isOpenForm) {
      getAllCategories()
    }
  }, [isOpenForm]);

  const handleChange = (e) => {
    setStatus(e.target.checked);
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const handleUpdateVocabulary = (values) => {
    updateVocabulary(`vocabularies?id=${id}`, values).then((res) => {
      handleCancel()
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  };

  const handleCreateVocabulary = (values) => {
    createVocabulary('vocabularies/create', values).then((res) => {
      handleCancel()
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  };

  const onFinish = (values) => {
    {
      values.id
        ? handleUpdateVocabulary(values)
        : handleCreateVocabulary(values)
    }
  };

  const onFinishFailed = () => {
    toast.error("Create Vocabulary Failed", { autoClose: 1000 })
  };

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
          htmlType="submit" >
          Save
        </Button>,
      ]}
    >
      <Form id='formVocabulary' form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item name="id" hidden="true">
          <Input />
        </Form.Item>
        <Form.Item label="Word" name="word"
          rules={[{ required: true, },]}>
          <Input className='custom__input_modal' />
        </Form.Item>
        <Form.Item label="Pronounce" name="pronounce"
          rules={[{ required: true, },]}>
          <Input className='custom__input_modal' />
        </Form.Item>
        <Form.Item label="Mean" name="mean"
          rules={[{ required: true, },]}>
          <Input className='custom__input_modal' />
        </Form.Item>
        <Form.Item label="Category" name="categoryIds"
          rules={[{ required: true, },]}>
          <Select className='custom__input_modal'
            mode="multiple"
            allowClear
            placeholder="Please select Category"
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