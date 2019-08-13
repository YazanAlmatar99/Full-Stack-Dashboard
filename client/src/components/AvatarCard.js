import React from 'react';
import "../App.css"

class InfluencerCard extends React.Component {

    componentDidMount(){
        console.log(this.props.user)
    }

render(){
   
    let style = {
    background: `url('${this.props.user.picture}')`
    }


    return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp" style= {{marginTop:"150px"}}>
            <div className="mdl-card__title avatar" >
                <img className="avatar_picture" src = {this.props.user.picture}/>
                <h2 className="mdl-card__title-text" style= {{fontSize : "30px", fontWeight:"bold"}}  >Welcome {this.props.user.firstName} !</h2>
            </div>
            <div className="mdl-card__supporting-text">
                In here you can manage, view, edit and more...
            </div>
            <div className="mdl-card__actions mdl-card--border">
                <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/auth/logout">
                Sign Out
                </a>
            </div>            
        </div>
    )
}
}

 export default InfluencerCard;