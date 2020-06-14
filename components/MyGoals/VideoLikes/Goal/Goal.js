import React, { Component } from 'react';
import { Checkbox } from '@material-ui/core';
import './Goal.module.css'

class Goal extends Component {

    constructor(props) {
        super();

        this.parentDeleteCallback=props.deleteCallback;
        this.parentUpdateCallback=props.updateCallback;
        this.toggleGoalStatus=this.toggleGoalStatus.bind(this);
        this.deleteGoal=this.deleteGoal.bind(this)

    }

    deleteGoal(e) {

        let r = confirm("Вы готовы удалить задачу?");
        if (r == true) {
            this.parentDeleteCallback(this.props.goal)
        }  
    }

    toggleGoalStatus(e) {
        let goal ={...this.props.goal};
        goal.isDone= !goal.isDone, 
           
        this.parentUpdateCallback(goal);
    }

    render() {
        return (
            <div className="goal">

                <div className={ this.props.goal.isDone ? "goal_done" : "goal"} >
                    <Checkbox defaultChecked color="default" inputProps={{ 'aria-label': 'checkbox with default color' }} 
                    defaultChecked={this.props.goal.isDone} onClick={this.toggleGoalStatus} />
                    {this.props.goal.name}
                    <span className="delete"
                        onClick={this.deleteGoal}>x</span>
                        <div className="info">
                            <div className="video">
                                <iframe width="560" height="315" src={this.props.goal.video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <div className="title"><h2>{this.props.goal.name}</h2></div>
                        <div className="channels">{this.props.goal.channel} </div>
                        <div className="descriptions"><p>{this.props.goal.subscribe}</p></div>
                    </div>      
                </div>
            </div>
            
        );
    }

}

export default Goal;
