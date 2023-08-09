import React, { useEffect, useState, useCallback, useRef } from 'react'
import ModalQuestionVocabulary from './ModalQuestionVocabulary';
import HeaderPage from '../HeaderPage/HeaderPage';
import { getAllQuestionVocabulary } from '../../../../Api/Service/vocabulary.service'
import { deleteQuestion } from '../../../../Api/Service/vocabulary.service';
import { Table, Space, Tag, Form, Modal, Input, Button } from 'antd';
import { SearchOutlined, ExclamationCircleOutlined, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import { toast } from "react-toastify";
import Highlighter from 'react-highlight-words'

function QuestionVocabulary() {
  const [allQuestions, setAllQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    setIsLoading(true)
    getAllQuestionVocabulary('questions?type=vocabulary').then((res) => {
      const addSttToQuestions = res.data.data.reverse().map((item, index) => ({
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

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }
  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="middle"
            style={{
              margin: '5px',
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            danger
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="middle"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="middle"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="middle"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
          fontSize: '18px'
        }}
      />
    ),
    onFilter: (value, record) => {
      if (dataIndex === 'optionAnswers') {
        return record[dataIndex]?.correctAnswer?.toString().toLowerCase().includes(value.toLowerCase());
      } else {
        return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
      }
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

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
      ...getColumnSearchProps('level'),
    },
    {
      title: "Text Question",
      dataIndex: "textQuestion",
      key: "textQuestion",
      width: '30%',
      ...getColumnSearchProps('textQuestion'),
    },
    {
      title: "Answers",
      dataIndex: "optionAnswers",
      key: "optionAnswers",
      render: (text) => (
        <>
          <div>A. {text.answerA}</div>
          <div>B. {text.answerB}</div>
          <div>C. {text.answerC}</div>
          <div>D. {text.answerD}</div>
        </>),
    },
    {
      title: "Correct Answer",
      dataIndex: "optionAnswers",
      key: "optionAnswers",
      ...getColumnSearchProps('optionAnswers'),
      render: (text) => <div>{text.correctAnswer}</div>,
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
            onClick={() => onClickDelete(record)}>
            <DeleteTwoTone />
          </Tag>
        </Space>
      ),
    }
  ];

  const onClickDelete = (values) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure delete Question Vocabulary?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (values) => {
    deleteQuestion(`questions?id=${values.id}`).then((res) => {
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  };

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
  }, [form]);

  const onClickUpdate = useCallback((record) => {
    setId(record.id);
    onClickOpenModal(record);
  }, [onClickOpenModal]);

  const onClose = () => {
    setIsOpenForm(false);
    setId("");
  }
  const reloadData = useCallback(() => {
    setIsLoading(true)
    getAllQuestionVocabulary('questions?type=vocabulary').then((res) => {
      const addSttToQuestions = res.data.data.reverse().map((item, index) => ({
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
        reloadData={reloadData}
      />
    </>
  )
}

export default QuestionVocabulary