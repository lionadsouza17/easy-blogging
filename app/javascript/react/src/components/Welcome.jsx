import * as React from 'react'
import { createRoot } from 'react-dom/client';
import BlogList from './BlogList'

class Welcome extends React.Component{
    render() {
        return(
            <div className='container'>
                <h1>Welcome to all creative blogs!</h1>
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