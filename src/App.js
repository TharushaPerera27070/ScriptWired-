import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './nav_bar';
import HomePage from './pages/home_page';
import AboutPage from './pages/about_page';
import ArticlePage from './pages/article_page';
import ArticleListPage from './pages/articles_list';
import NotFoundPage from './pages/not_found_page';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavBar/>
      <div id ="page-body">
        <Routes>
        <Route path = "/" element={<HomePage />} />
        <Route path = "/about" element={<AboutPage />} /> 
        <Route path = "/articles" element={<ArticleListPage />} />
        <Route path = "/articles/:articleId" element={<ArticlePage />} />
        <Route path = "*" element={<NotFoundPage />} />
        </Routes>
       

      </div>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
