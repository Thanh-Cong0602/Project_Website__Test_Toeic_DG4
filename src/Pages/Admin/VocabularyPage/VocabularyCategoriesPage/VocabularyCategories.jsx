import React, { useEffect, useState, useCallback, useRef} from 'react'
import HeaderPage from '../HeaderPage/HeaderPage';
import { getVocabularyCategories } from '../../../../Api/Service/vocabulary.service'
import { deleteVocabularyCategory } from '../../../../Api/Service/vocabulary.service';
import ModalVocabulary from './ModalVocabulary';
import { Checkbox, Table, Space, Tag, Form, Modal, Button, Input} from 'antd';
import { ExclamationCircleOutlined, EditTwoTone, DeleteTwoTone, SearchOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Highlighter from 'react-highlight-words'

function VocabularyCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    setIsLoading(true)
    getVocabularyCategories('vocabularyCategories').then((res) => {
      const addSttToCategories = res.data.data.map((item, index) => ({
        ...item,
        num: index + 1,
      }
      ))
      setCategories(addSttToCategories)
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
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
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
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? 'blue' : undefined,
          fontSize: '18px',
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
      key: "num"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps('name'),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => <Checkbox checked={text}></Checkbox>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="large" style={{ cursor: "pointer" }}>
          <Tag 
          style={{ fontSize: '14px' }} color="green" onClick={() => onClickUpdate(record)}>
              <EditTwoTone />
          </Tag>
          <Tag style={{ fontSize: '14px' }} color="red" onClick={() => onClickDelete(record)}>
           <DeleteTwoTone style={{color: 'red !important'}}/>
          </Tag>
        </Space>
      ),
    }
  ];

  const onClickOpenModal = useCallback((record) => {
    const requestBody = {
      id: record.id,
      name: record.name,
      isActive: record.isActive,
    };
    form.setFieldsValue(requestBody)
    setIsOpenForm(true);
  }, [form]);


  const handleDelete = (values) => {
    deleteVocabularyCategory(`vocabularyCategories?id=${values.id}`).then((res) => {
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }

  const onClickUpdate = useCallback((record) => {
    setId(record.id);
    onClickOpenModal(record);
  }, [onClickOpenModal]);

  const onClickDelete = (values) => {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure delete vocabulary category?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  }

  const reloadData = useCallback(() => {
    setIsLoading(true)
    getVocabularyCategories('vocabularyCategories').then((res) => {
      const addSttToCategories = res.data.data.map((item, index) => ({
        ...item,
        num: index + 1,
      }))
      setCategories(addSttToCategories)
      setIsLoading(false)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [])
  const onClose = () => {
    setIsOpenForm(false);
    setId("");
  }
  return (
    <div>
      <HeaderPage
        title="Vocabulary Categories"
        setIsOpenForm={setIsOpenForm}
      />

      <div className="section-wrapper">
        <Table columns={columns}
          dataSource={categories}
          loading={isLoading}
          size='Large'
          tableLayout='Fixed'
        />
      </div>

      <ModalVocabulary
        isOpenForm={isOpenForm}
        onClose={() => onClose()}
        title={id ? "Edit Category" : "Create new Category"}
        form={form}
        id={id}
        reloadData={() => reloadData()}
      />
    </div>
  )
}

export default VocabularyCategories