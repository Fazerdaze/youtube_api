import React, { Component } from 'react';
import Goal from './Goal/Goal';

class GoalsList extends Component {
   
   deleteGoal(goalId){

}

render() {
    return (
        
        <div className="goals">
        {
        this.props.goals.map((goal, index) => {
        return <Goal goalid={goal.id} goal={goal}
        updateCallback={this.props.onUpdate.bind(this)} 
        deleteCallback={this.props.onDelete.bind(this)} key={goal.id} />
           })
        }
        </div>);
        }
};
export default GoalsList;