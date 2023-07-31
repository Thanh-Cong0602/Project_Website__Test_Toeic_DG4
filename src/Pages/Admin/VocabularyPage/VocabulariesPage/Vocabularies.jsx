import React, { useEffect, useState, useCallback, useRef } from 'react'
import { getAllVocabularies } from '../../../../Api/Service/vocabulary.service'
import { deleteVocabulary } from '../../../../Api/Service/vocabulary.service';
import { getVocabularyCategories } from '../../../../Api/Service/vocabulary.service';
import HeaderPage from '../HeaderPage/HeaderPage';
import ModalAllVocabularies from './ModalAllVocabularies';
import { toast } from "react-toastify";
import { Checkbox, Table, Space, Tag, Form, Modal, Input, Button } from 'antd';
import { SearchOutlined, ExclamationCircleOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import Highlighter from 'react-highlight-words'

function Vocabularies() {
  const [vocabularies, setVocabularies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [id, setId] = useState("");
  const [form] = Form.useForm();
  const [categoryMap, setCategoryMap] = useState({});


  useEffect(() => {
    setIsLoading(true);
    let tempCategoryMap = {};
    getVocabularyCategories('vocabularyCategories').then((resCategories) => {
      tempCategoryMap = resCategories.data.data.reduce((accumulator, category) => {
        accumulator[category.id] = category.name;
        return accumulator;
      }, {});
      setCategoryMap(tempCategoryMap);
      return getAllVocabularies('vocabularies');

    }).then((resVocabularies) => {
      const vocabulariesWithCategory = resVocabularies.data.data.map((item, index) => {
        const categoryNames = item.categoryIds.map((categoryId) => tempCategoryMap[categoryId]);
        return {
          ...item,
          num: index + 1,
          categoryNames: categoryNames,
        };
      });
      setVocabularies(vocabulariesWithCategory);
      setIsLoading(false);

    }).catch((err) => {
      toast.error(err, { autoClose: 2000 });
      setIsLoading(false);
    });
  }, []);

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

  const reloadData = useCallback(() => {
    setIsLoading(true)
    getAllVocabularies('vocabularies').then((res) => {
      const vocabulariesWithCategory = res.data.data.map((item, index) => {
        const categoryNames = item.categoryIds.map((categoryId) => categoryMap[categoryId])
        return {
          ...item,
          num: index + 1,
          categoryNames: categoryNames,
        }
      })
      setVocabularies(vocabulariesWithCategory)
      setIsLoading(false)
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  }, [isOpenForm])

  const columns = [
    {
      title: "STT",
      dataIndex: "num",
      key: "num",
      width: '10%',
    },
    {
      title: "Word",
      dataIndex: "word",
      key: "word",
      ...getColumnSearchProps('word'),
    },
    {
      title: "Pronounce",
      dataIndex: "pronounce",
      key: "pronounce",
      ...getColumnSearchProps('pronounce'),
    },
    {
      title: "Mean",
      dataIndex: "mean",
      key: "mean",
      ...getColumnSearchProps('mean'),
    },
    {
      title: "Category",
      dataIndex: "categoryNames",
      key: "categoryNames",
      render: (categoryNames) => (
        <>
          {categoryNames.map((categoryName) => (
            <div key={categoryName}>{categoryName}</div>
          ))}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: '10%',
      render: (text) => <Checkbox checked={text}></Checkbox>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: '15%',
      render: (_, record) => (
        <Space size="large" style={{ cursor: "pointer" }}>
          <Tag style={{ fontSize: '16px' }} color="green"
            onClick={() => onClickUpdate(record)} >
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
      content: "Are you sure delete vocabulary?",
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => handleDelete(values),
      confirmLoading: isLoading,
    });
  };

  const handleDelete = (values) => {
    deleteVocabulary(`vocabularies?id=${values.id}`).then((res) => {
      toast.success(res.data.message, { autoClose: 2000 })
      reloadData()
    }).catch((err) => {
      toast.error(err.response.data.message, { autoClose: 2000 })
    })
  };

  const onClickOpenModal = useCallback((record) => {
    const requestBody = {
      id: record.id,
      word: record.word,
      pronounce: record.pronounce,
      mean: record.mean,
      vocabularyCategoryIds: record.categoryIds,
      isActive: record.isActive,
      categoryIds: record.categoryIds
    }
    form.setFieldsValue(requestBody)
    setIsOpenForm(true)
  }, [form]);

  const onClickUpdate = useCallback((record) => {
    setId(record.id);
    onClickOpenModal(record);
  }, [onClickOpenModal])

  const onClose = () => {
    setIsOpenForm(false);
    setId("");
  }

  return (
    <div>
      <HeaderPage
        title="All Vocabularies"
        setIsOpenForm={setIsOpenForm}
      />
      <div className="section-wrapper">
        <Table columns={columns}
          dataSource={vocabularies}
          loading={isLoading}
          size='Large'
          tableLayout='Fixed' />
      </div>

      <ModalAllVocabularies
        isOpenForm={isOpenForm}
        onClose={() => onClose()}
        title={id ? "Edit Vocabulary" : "Create new Vocabulary"}
        form={form}
        id={id}
        reloadData={reloadData}
      />
    </div>
  )
}

export default Vocabularies