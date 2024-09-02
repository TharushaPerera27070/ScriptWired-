import { useState, useEffect } from "react";//back-end
import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./not_found_page";

const ArticlePage = () => {

    const [articleInfo, setArticalInfo] = useState({ upvotes: 0, comments:[] }); //back-end
    
    useEffect(() => {
       setArticalInfo({ upvotes: 3, comments: []});  //back-end 
    });

    const { articleId } = useParams();
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