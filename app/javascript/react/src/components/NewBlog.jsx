import * as React from 'react'
import { useState, useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import ServerSideError from './ServerSideError'

const NewBlog = () => {
    const blogsTags = [
        { label: 'USA', value: 'USA' },
        { label: 'India', value: "India" },
        { label: 'Dubai', value: "Dubai"},
        { label: 'UK', value: 'UK' }
    ]

    const [isServerSideError, setIsServerSideError] = useState(false)
    const [serverErrors, setServerErrors] = useState([])

    const [formField, setFormField] = useState({
        title: '',
        tag: blogsTags[0].value
    })

    const handleBlogSubmit = (event) => {
        event.preventDefault();
        console.log(formField)
        createBlog(formField)
    }

    const handleFormFields = (event) => {
        setFormField({ ...formField, [event.target.name]: event.target.value})
    }

    const createBlog = (data) => {
        fetch(`/api/v1/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Sucess:', data)
            if(data['status'] === 'failure') {
                setIsServerSideError(true)
                setServerErrors(data['data'])
            } else {
                setIsServerSideError(false)
                setServerErrors([])
                window.location.href = ''
            }
                
        })
        .catch((error) => {
            console.log("Error:", error)
        })
    }

    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Write your blog and guide the world!</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleBlogSubmit}>
                        <div className="modal-body">
                            { isServerSideError && <ServerSideError errors={serverErrors}/> }
                            <div className='form-group'>
                                <label className='form-label mt-3 mb-3'>Title</label>
                                <input type="text" className='form-control form-control-lg rounded-0' value={formField.title} onChange={event => handleFormFields(event)} name="title"/>
                            </div>

                            <div className='form-group'>
                                <label className='form-label mt-3 mb-3'>Select the country</label>
                                <select className='form-select form-select-lg rounded-0' value={formField.tag} onChange={event => handleFormFields(event)} name="tag">
                                    {blogsTags.map(tag => (
                                        <option key={tag.value} value={tag.value}>{tag.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Create Blog</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewBlog;