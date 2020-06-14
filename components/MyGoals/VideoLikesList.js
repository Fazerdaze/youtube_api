import React, { Component } from 'react';
import './VideoLikesList.module.css';
import VideoCounter from './VideoLikes/VideoCounter';
import GoalsList from './VideoLikes/GoalsList';
import { post, del } from '../../libs/ajax';

class MyGoals extends Component {

    constructor(props) {
        super();
        console.log(props.tasks)
        this.state = {
            goals: props.tasks     
        };

        this.updateGoal=this.updateGoal.bind(this);
        this.deleteGoal=this.deleteGoal.bind(this);
        this.changeFilter=this.changeFilter.bind(this);
    }

    changeFilter(filterValue){
        this.setState({filter:filterValue})
    }


    deleteGoal(goalID) {
        del('/goalid', {goalID}).then(o => {
            console.log('lig', o);
            const newGoalsList = this.state.goals.filter((g) => {
                return g.id !== o.data.id;
            });
            
            this.setState({goals: newGoalsList});
        });
    }

    updateGoal(goal){
        post('/status', { goal })
        .then(o=> {
            console.log('log', o);
            this.state.goals.forEach((g)=>{
                if(g.id === o.data.id) {
                    g.isDone = o.data.isDone;
                } 
            });
            this.setState({goals: this.state.goals});
        });
    }

    render() {
        let { goals} = this.state;

        return (
            <div className="goalsForm">
                <GoalsList goals={goals} 
                onUpdate={this.updateGoal}
                onDelete={this.deleteGoal}
                />
                <VideoCounter goals={goals}  />   
            </div>);
    }
};
export default MyGoals;
