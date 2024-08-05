import * as React from 'react'
import * as ReactDOM from 'react-dom'

class BlogDetail extends React.Component {
    constructor (props) {
        super(props)
        this.state = { 
            likeCount: this.props.blog.likes_count,
            dislikeCount: this.props.blog.dislikes_count
        }

        this.updateLikeCounter = this.updateLikeCounter.bind(this)
        this.updateDislikeCounter = this.updateDislikeCounter.bind(this)
    }
    
    updateLikeCounter() {
        this.setState(function(state) {
            return {
                likeCount: state.likeCount + 1
            }
        })
        this.updateBlogCounter({count_for: 'like'})
    }

    updateDislikeCounter() {
        this.setState(function(state) {
            return {
                dislikeCount: state.dislikeCount + 1
            }
        })
        this.updateBlogCounter({count_for: 'dislike'})
    }

    updateBlogCounter = (data) => {
        fetch(`http://localhost:3000/api/v1/blogs/${this.props.blog.id}/update_counter`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render () {
        return(
            <div className='card rounded-0 mt-3'>
                <div className='card-body'>
                    <h3 className='card-title'>{this.props.blog.title}</h3>
                    <p className='lead'>
                        <span className='badge bg-primary'>{this.props.blog.tag}</span>
                    </p>
                    <button type="button" className="btn btn-primary position-relative" onClick={this.updateLikeCounter} style={{marginRight: 1 + 'em'}}>
                    Like
                    {
                        this.state.likeCount > 0 ?
                        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                            {this.state.likeCount}
                            <span className="visually-hidden">unread messages</span>
                        </span> : ''
                    }
                    </button>

                    <button type="button" className="btn btn-primary position-relative" onClick={this.updateDislikeCounter}>
                    Disike
                    {
                        this.state.dislikeCount > 0 ?
                        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                            {this.state.dislikeCount}
                            <span className="visually-hidden">unread messages</span>
                        </span> : ''
                    }
                    </button>
                </div>
            </div>
        )
    }
}

export default BlogDetail