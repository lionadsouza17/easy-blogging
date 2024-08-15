import * as React from 'react'
import { createRoot } from 'react-dom/client';
// importing components from react-router-dom package
import {
    Link
} from "react-router-dom";

import BlogList from './BlogList';

class Welcome extends React.Component{
    render() {
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-10 mx-auto'>
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <img src="/images/blog_logo.png" 
                                    alt="Logo" 
                                    style={{
                                    width: '100px',   // Set the width of the image
                                    height: 'auto'    // Maintain aspect ratio
                                }}
                                />
                            </div>
                            <div className="col-auto">
                                <h1>Guide the world with your blog!</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <BlogList />
            </div>
         )   
    }
}

const container = document.getElementById('welcome');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <React.StrictMode>
        <Welcome />
    </React.StrictMode>
);

export default Welcome