import { useState, useEffect } from "react";//back-end
import { useParams } from "react-router-dom";
import axios from 'axios';//use for request data from the back-end
import articles from "./article-content";
import NotFoundPage from "./not_found_page";
import CommentsList from "../reusable components/comments_list";
import AddCommentForm from "../reusable components/add_comment_form";
import useUser from "../hooks/use_user";

const ArticlePage = () => {

    const [articleInfo, setArticalInfo] = useState({ upvotes: 0, comments:[] }); // =>
    const { articleId } = useParams();

    const { user, isLoading } = useUser();

    useEffect(() => {
       const loadArticalInfo = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.get(`/api/articles/${articleId}`,{ headers });
        const newArticleInfo = response.data;
        setArticalInfo(newArticleInfo);  
       }
        loadArticalInfo();
    });                                                                          // <= back-end                         

   
    const article = articles.find(article => article.name === articleId);
    
    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
        const updatedArticle = response.data;
        setArticalInfo(updatedArticle);
    }

    if(!article){
        return <NotFoundPage/>
    }
    return(
    <>
       <h1>{article.title}</h1>
       <div className="upvotes-section">
        {user 
            ?<button onClick={addUpvote} >Upvote</button>
            :<button>Log In to upvote</button> 
        }
       <p>This article has {articleInfo.upvotes} upvote(s)</p>
       </div>
       {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
       ))}
         
         {user 

         ?<AddCommentForm
          articleName={articleId}
          onArticleUpdated={updatedArticle => setArticalInfo(updatedArticle)} />
         :<button>Log In to add a comment</button>
        
        }
        <CommentsList comments={articleInfo.comments}/>

    </>
    );
}

export default ArticlePage;