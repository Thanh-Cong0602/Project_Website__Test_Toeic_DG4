import React, { useEffect, useState } from 'react'
import HeaderPage from '../HeaderPage/HeaderPage';
import { getAllQuestionVocabulary } from '../../../../Api/Service/vocabulary.service'
import { Checkbox, Table, Space, Tag, Form, Modal } from 'antd';
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
    getAllQuestionVocabulary('questions').then((res) => {
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
      key: "num"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "TextQuestion",
      dataIndex: "textQuestion",
      key: "textQuestion",
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "OptionAnswers",
    //   dataIndex: "optionAnswers",
    //   key: "optionAnswers",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="large" style={{ cursor: "pointer" }}>
          <Tag style={{ fontSize: '14px' }} color="green" >
            Edit
          </Tag>
          <Tag style={{ fontSize: '14px' }} color="red" >
            Delete
          </Tag>
        </Space>
      ),
    }
  ];

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
    </>
  )
}

export default QuestionVocabulary