import { ACTIONS } from "./action";

export const newBlogReducer = (newBlog, action) => {
    switch (action.type) {
        case ACTIONS.SET_NEW_BLOG_USER:
            return {
                ...newBlog,
                author: {
                    ...newBlog.author,
                    userId: action.payload.uid,
                    displayName: action.payload.displayName
                }
            }

        case ACTIONS.ADD_NEW_BLOG_COVER_IMG:
            return {
                ...newBlog,
                coverImg: action.payload.coverImg
            }

        case ACTIONS.ADD_NEW_BLOG_TITLE:
            return {
                ...newBlog,
                title: action.payload.title
            }

        case ACTIONS.ADD_NEW_BLOG_CONTENT:
            return {
                ...newBlog,
                content: action.payload.content
            }

        case ACTIONS.CHANGE_NEW_BLOG_STATUS:
            return {
                ...newBlog,
                published: action.payload.published,
                createdAt: action.payload.createdAt
            }

        case ACTIONS.RESET_BLOG:
            return {
                ...newBlog,
                title: action.payload.title,
                published: action.payload.published,
                coverImg: action.payload.coverImg,
                content: action.payload.content,
                createdAt: action.payload.createdAt
            }

        default:
            return newBlog;
    }
}