import React, { useCallback, useEffect, useState } from 'react'
import ModalQuestionVocabulary from './ModalQuestionVocabulary';
import HeaderPage from '../HeaderPage/HeaderPage';
import { getAllQuestionVocabulary } from '../../../../Api/Service/vocabulary.service'
import { Checkbox, Table, Space, Tag, Form, Modal } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { toast } from "react-toastify";
function QuestionVocabulary() {
  const [allQuestions, setAllQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [categoryIds, setCategoryIds] = useState([])
  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true)
    getAllQuestionVocabulary('questions?type=vocabulary').then((res) => {
      const addSttToQuestions = res.data.data.map((item, index) => ({
        ...item,
        num: index + 1,
      }
      ))
      setAllQuestions(addSttToQuestions)
      setIsLoading(false)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])

  const columns = [
    {
      title: "STT",
      dataIndex: "num",
      key: "num",
      width: '10%'
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "TextQuestion",
      dataIndex: "textQuestion",
      key: "textQuestion",
      width: '30%',
    },
    {
      title: "Answers",
      dataIndex: "optionAnswers",
      key: "optionAnswers",
      render: (text) => (
        <>
          <div><a>A. {text.answerA}</a></div>
          <div><a>B. {text.answerB}</a></div>
          <div><a>C. {text.answerC}</a></div>
          <div><a>D. {text.answerD}</a></div>
        </>),
    },
    {
      title: "Correct Answer",
      dataIndex: "optionAnswers",
      key: "optionAnswers",
      render: (text) => <a>{text.correctAnswer}</a>
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: '10%',
      render: (_, record) => (
        <Space size="large" style={{ cursor: "pointer" }}>
          <Tag style={{ fontSize: '16px' }} color="green"
            onClick={() => onClickUpdate(record)}
          >
            <EditTwoTone />
          </Tag>
          <Tag style={{ fontSize: '16px' }} color="red"
          >
            <DeleteTwoTone />
          </Tag>
        </Space>
      ),
    }
  ];

  const onClickOpenModal = useCallback((record) => {
    const requestBody = {
      id: record.id,
      type: record.type,
      objectTypeId: record.objectTypeId,
      level: record.level,
      textQuestion: record.textQuestion,
      audioQuestion: record.audioQuestion,
      images: record.images,
      optionAnswers: record.optionAnswers,
      answerA: record.optionAnswers.answerA,
      answerB: record.optionAnswers.answerB,
      answerC: record.optionAnswers.answerC,
      answerD: record.optionAnswers.answerD,
      correctAnswer: record.optionAnswers.correctAnswer,
    }
    form.setFieldsValue(requestBody)
    setIsOpenForm(true)
  }, [form])

  const onClickUpdate = useCallback((record) => {
    setId(record.id);
    onClickOpenModal(record);
  }, [onClickOpenModal])
  const onClose = () => {
    setIsOpenForm(false);
    setId("");
  }
  const reloadData = useCallback(() => {
    setIsLoading(true)
    getAllQuestionVocabulary('questions?type=vocabulary').then((res) => {
      const addSttToQuestions = res.data.data.map((item, index) => ({
        ...item,
        num: index + 1,
      }
      ))
      setAllQuestions(addSttToQuestions)
      setIsLoading(false)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [isOpenForm])
  return (
    <>
      <HeaderPage
        title="All Questions Vocabulary"
        setIsOpenForm={setIsOpenForm}
      />
      <div className="section-wrapper">
        <Table columns={columns}
          dataSource={allQuestions}
          loading={isLoading}
          size='Large'
          tableLayout='Fixed' />
      </div>

      <ModalQuestionVocabulary
        isOpenForm={isOpenForm}
        onClose={() => onClose()}
        title={id ? "Edit Question Vocabulary" : "Create new Question Vocabulary"}
        form={form}
        id={id}
        reloadData={reloadData}
      />
    </>
  )
}

export default QuestionVocabulary