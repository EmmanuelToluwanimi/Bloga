import React from 'react';
import './article.css';
// import { useParams } from 'react-router-dom';
// import { LinearProgress } from '@material-ui/core';
import bloglp from "../assets/image/bloglp.jpg";

function Article() {

    const sectionName = 'article';
    const content = `<p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Minima tempora nisi corrupti,
        reiciendis quas ex fuga sequi corporis ipsam! Laborum totam,
        quam dignissimos nesciunt nulla suscipit labore inventore voluptates assumenda!
    </p>`;

    function createMarkup() {
        return {
            __html: content
        };
    };


    // console.log(post);
    // if (isLoading) {
    //     return (
    //         <div style={{ marginTop: '60px' }}>
    //             <LinearProgress variant="indeterminate" color="primary" />
    //         </div>
    //     )
    // };

    return (
        <>
            <main id={sectionName} className="article_container">
                <div className="article_holder">
                    <div className="article_date">
                        {/* Published: {new Date(post.published_date).toDateString()} */}
                        Tuesday
                    </div>

                    <h1 className="article_title">Anjonauuuuuuuuuuuuuuuuuuuuuu</h1>

                    <div className="article_info">
                        <div className="article_category">Sports category</div>

                        <div className="article_author">
                            <img src={bloglp} alt="text" className="author_img" />
                            <div className="author_name">Tolulope</div>
                        </div>

                    </div>

                    <div className="article_img">
                        <img src={bloglp} alt="article banner" />
                    </div>



                    <div className="article_content" dangerouslySetInnerHTML={createMarkup()}>
                        {/* {post.content} */}

                    </div>


                </div>
            </main>


        </>
    )
}

export default Article;
