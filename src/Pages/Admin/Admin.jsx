import React, { useState } from 'react';
import Navbar from '../../Components/Admin/Navbar/Navbar';
import Sidebar from '../../Components/Admin/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import VocabularyCategories from './VocabularyPage/VocabularyCategoriesPage/VocabularyCategories';
import Vocabularies from './VocabularyPage/VocabulariesPage/Vocabularies';
import QuestionVocabulary from './VocabularyPage/QuestionVocabularyPage/QuestionVocabulary';
import ManageAccount from './ManageUserPage/ManageAccount';
import { Layout } from 'antd';
const { Content } = Layout;
const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content >
          <Routes>
            <Route path="/vocabularycategories" element={<VocabularyCategories />} />
            <Route path="/vocabularies" element={<Vocabularies />} />
            <Route path="/vocabularyquestion" element={<QuestionVocabulary />} />
            <Route path="/manageaccount" element={<ManageAccount />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;