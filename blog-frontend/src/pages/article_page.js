import { useState, useEffect } from "react";//back-end
import { useParams } from "react-router-dom";
import axios from 'axios';//use for request data from the back-end
import articles from "./article-content";
import NotFoundPage from "./not_found_page";

const ArticlePage = () => {

    const [articleInfo, setArticalInfo] = useState({ upvotes: 0, comments:[] }); // =>
    const { articleId } = useParams();

    useEffect(() => {
       const loadArticalInfo = async () => {
        const response = await axios.get(`/api/articles/${articleId}`);
        const newArticleInfo = response.data;
        setArticalInfo(newArticleInfo);  
       }
        loadArticalInfo();
    });                                                                          // <= back-end                         

   
    const article = articles.find(article => article.name === articleId);
    
    if(!article){
        return <NotFoundPage/>
    }
    return(
    <>
       <h1>{article.title}</h1>
       <p>This article has {articleInfo.upvotes} upvote(s)</p>
       {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
       ))}
    </>
    );
}

export default ArticlePage;