import React from 'react';
import MyGoals from '../components/MyGoals/VideoLikesList';
import './content.module.css';
import Nav from './nav';

const Content = (props) =>{
   return(
       <div className="Content">
        <Nav />
            <div className="list">
                <MyGoals tasks={props.tasks}/>
            </div>   
       </div>
   ); 
}

export default Content;