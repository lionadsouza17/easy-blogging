import * as React from 'react'
import * as ReactDOM from 'react-dom'

const EmptyBlogMessage = (props) => {
    return(
        <div>
            <div className="mt-5 alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oops!</strong>No Blogs found with this country: {props.tagname}. Please select another country from the list.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
    )
}

export default EmptyBlogMessage;