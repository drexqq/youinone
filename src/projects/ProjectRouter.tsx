import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, PageLayout } from '../styles/LayoutStyle';
import Intro from '../components/Intro';
import NotFound from '../components/NotFound';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Memo from './Memo/Memo';
import TodoList from './TodoList/Todolist';

function ProjectRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <PageLayout>
          <Routes>
            <Route path="/" element={<Intro />}></Route>
            <Route path="/todo" element={<TodoList />}></Route>
            <Route path="/memo" element={<Memo />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </PageLayout>
      </Layout>
      <Footer />
    </BrowserRouter>
  );
}

export default ProjectRouter;
