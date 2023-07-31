import React, { useState, useEffect } from 'react'
import '../ModalCustom.css'
import { createQuestion } from '../../../../Api/Service/vocabulary.service';
import { updateQuestion } from '../../../../Api/Service/vocabulary.service';
import { getAllVocabularies } from '../../../../Api/Service/vocabulary.service';
import { Modal, Form, Input, Button, Row, Col, Radio } from 'antd';
import { toast } from "react-toastify";
import Select from 'react-select';

function ModalQuestionVocabulary(props) {
  const { isOpenForm, onClose, title, form, id, reloadData } = props;
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
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
      type: values.type,
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
      type: values.type,
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
    {
      values.id
        ? handleUpdateVocabulary(values)
        : handleCreateVocabulary(values)
    }
  };

  const onFinishFailed = () => {
    toast.error("Create Vocabulary Category Failed", { autoClose: 1000 })
  };
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
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
        <Form.Item label="Type" name="type"
          rules={[{ required: true, },]}>
          <Input className='custom__input_modal' />
        </Form.Item>
        <Form.Item label="Object Type" name="objectTypeId"
          rules={[{ required: true, },]}>
          <Select className='custom__input_modal'
            mode="single"
            allowClear
            placeholder="Please select Object Type"
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            value={selectedOption}
            onChange={handleChange}
            options={options}
            isSearchable
          ></Select>
        </Form.Item>
        <Form.Item name="level" label="Level"
          rules={[{ required: true, },]}>
          <Radio.Group>
            <Radio value="easy">Easy</Radio>
            <Radio value="medium">Medium</Radio>
            <Radio value="hard">Hard</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Text Question" name="textQuestion"
          rules={[{ required: true, },]}>
          <Input className='custom__input_modal' />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Enter AnswerA" name="answerA"
              rules={[{ required: true, },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Enter AnswerB" name="answerB"
              rules={[{ required: true, },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Enter AnswerC" name="answerC"
              rules={[{ required: true, },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Enter AnswerD" name="answerD"
              rules={[{ required: true, },]}>
              <Input className='custom__input_modal' />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Enter Correct Answer" name="correctAnswer"
          rules={[{ required: true, },]}>
          <Input className='custom__input_modal' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalQuestionVocabulary