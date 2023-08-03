import React, { useState, useEffect } from 'react'
import '../ModalCustom.css'
import { createQuestion } from '../../../../Api/Service/vocabulary.service';
import { updateQuestion } from '../../../../Api/Service/vocabulary.service';
import { getAllVocabularies } from '../../../../Api/Service/vocabulary.service';
import { Modal, Form, Input, Button, Row, Col, Radio, Select } from 'antd';
import { toast } from "react-toastify";

function ModalQuestionVocabulary(props) {
  const { isOpenForm, onClose, title, form, reloadData } = props;
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getAllVocabularies('vocabularies').then((res) => {
      const _options = res.data.data.map((item) => ({
        value: item.id,
        label: item.word,
      }));
      setOptions(_options)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  const handleCreateVocabulary = (values) => {
    const requestBody = {
      id: values.id,
      type: 'vocabulary',
      objectTypeId: values.objectTypeId,
      level: values.level,
      textQuestion: values.textQuestion,
      optionAnswers: {
        answerA: values.answerA,
        answerB: values.answerB,
        answerC: values.answerC,
        answerD: values.answerD,
        correctAnswer: values.correctAnswer
      }
    }
    console.log(requestBody)
    createQuestion('questions/create', requestBody).then((res) => {
      handleCancel()
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }

  const handleUpdateVocabulary = (values) => {
    const requestBody = {
      id: values.id,
      type: 'vocabulary',
      objectTypeId: values.objectTypeId,
      level: values.level,
      textQuestion: values.textQuestion,
      optionAnswers: {
        answerA: values.answerA,
        answerB: values.answerB,
        answerC: values.answerC,
        answerD: values.answerD,
        correctAnswer: values.correctAnswer
      }
    }
    updateQuestion(`questions?id=${values.id}`, requestBody).then((res) => {
      handleCancel();
      toast.success(res.data.message, { autoClose: 2000 });
      reloadData();
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 });
    });
  }

  const onFinish = (values) => {
    values.id ? handleUpdateVocabulary(values) : handleCreateVocabulary(values)
  };

  const onFinishFailed = () => {
    toast.error("Create Question for Vocabulary Failed", { autoClose: 1000 })
  };

  return (
    <Modal
      className='custom__modal'
      title={title}
      open={isOpenForm}
      form={form}
      width={700}
      onCancel={handleCancel}
      footer={[
        <Button form="formQuestion"
          key="back"
          onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          form="formQuestion"
          key="submit"
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>,
      ]}
    >
      <Form id='formQuestion' form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item name="id" hidden="true">
          <Input />
        </Form.Item>
        <Form.Item label="Question of Vocabulary" name="objectTypeId"
          rules={[{ required: true, message: 'Please input Vocabulary' },]}>
          <Select className='custom__input_modal'
            showSearch
            placeholder="Please Select Vocabulary"
            optionFilterProp="children"
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            defaultValue={form.getFieldValue('objectTypeId') ? form.getFieldValue('objectTypeId') : []}
            options={options}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          ></Select>
        </Form.Item>
        <Form.Item name="level" label="Level"
          rules={[{ required: true, message: 'Please choose Level' },]}>
          <Radio.Group>
            <Radio value="easy">Easy</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="hard">Hard</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Text Question" name="textQuestion"
          rules={[{ required: true, message: 'Please input Text Question' },]}>
          <Input className='custom__input_modal' />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Answer A" name="answerA"
              rules={[{ required: true, message: 'Please input answer A' },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Answer B" name="answerB"
              rules={[{ required: true, message: 'Please input answer B' },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Answer C" name="answerC"
              rules={[{ required: true, message: 'Please input answer C' },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Answer D" name="answerD"
              rules={[{ required: true, message: 'Please input answer D' },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Correct Answer" name="correctAnswer"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please input Correct Answer!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || [getFieldValue('answerA'), getFieldValue('answerB'), getFieldValue('answerC'), getFieldValue('answerD')].includes(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Correct Answer must be one of four answer!'));
              },
            }),
          ]}>
          <Input className='custom__input_modal' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalQuestionVocabulary