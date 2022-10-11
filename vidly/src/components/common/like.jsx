import React, { Component } from 'react';

//input liked, output raise onclick event has to raise the toggle the value

const Like = (props) => {
    let classes ="fa fa-heart";
            if(!props.liked) classes+="-o"
            
    return ( <i  onClick={props.OnClick} className={classes} style={{cursor:"pointer"}}area-hidden="true" 
       
    ></i>  );
}
 
export default Like;
// class Like extends Component {

    
//     render() { 
//            let classes ="fa fa-heart";
//             if(!this.props.liked) classes+="-o"
            
//         return <i  onClick={this.props.OnClick} className={classes} style={{cursor:"pointer"}}area-hidden="true" 
       
//         ></i> 
//     }
// }
 
// export default Like;