import * as React from 'react'
import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import BlogDetail from './BlogDetail'
import EmptyBlogMessage from './EmptyBlogMessage'
import Loader from './Loader'
import NewBlog from './NewBlog'

const BlogList = () => {
    const blogsTags = [
        { label: 'All', value: 0 },
        { label: 'India', value: 1 },
        { label: 'Dubai', value: 2}
    ]

    const [blogsList, setBlogsList] = useState([])
    const [selectedOption, setSelectedOption] = useState([blogsTags[0].value])
    const [isShowAlert, setIsShowAlert] = useState(false)
    const [isShowLoader, setIsShowLoader] = useState(true)

    const blogsUrl = "http://localhost:3000/api/v1/blogs"

    const fetchBlogsList = () => {
        setIsShowLoader(false)
        fetch(blogsUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setBlogsList(data)
            if(data.length == 0){
                setIsShowAlert(true)
            }else
            {
                setIsShowAlert(false)
            }
        })
    }

    useEffect(() => {
        fetchBlogsList()
    }, [])

    const updateSelectedItem = (event) => {
        setIsShowLoader(false)
        setIsShowAlert(false)
        setBlogsList([])
        setSelectedOption(event.target.value)
        fetch(blogsUrl + `?tags=${blogsTags[event.target.value].label}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setBlogsList(data)
            if(data.length == 0){
                setIsShowAlert(true)
                setIsShowLoader(true)
            }
        })
    }

    return(
        <div className='row'>
            <div className='col-lg-10 mx-auto'>
                <p className='lead fw-bold'>Filter Blogs by Tags</p>
                <button type="button" className="btn btn-primary mt-3 mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create a new Blog
                </button>
                <select className='form-select form-select-lg' value={selectedOption} onChange={event => updateSelectedItem(event)}>
                    {blogsTags.map(tag => (
                        <option key={tag.value} value={tag.value}>{tag.label}</option>
                    ))}
                </select>
                { blogsList.length > 0 ?
                    blogsList.map((blog) =>
                        <BlogDetail blog={blog} key={blog.id}/>
                    ) : <Loader isShowLoader={isShowLoader}/>
                }
                { isShowAlert && <EmptyBlogMessage tagname={blogsTags[selectedOption].label}/> }
            </div>
            <NewBlog />
        </div>
    )
}

export default BlogList