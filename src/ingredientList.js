import React,{Component}from 'react'

class IngredientList extends Component{

  displayIngredient(){
    return this.props.ingredients.map((item, i) => {
    
      var li;
      if(this.props.canDelete) {
        li = <li key={i}>{item.quantity}-{item.ingredient} - <a  onClick={()=>this.props.removeIngredient(i)}>Delete</a></li>
      } else {
        li = <li key={i}>{item.quantity}-{item.ingredient}</li>;
      }
      return li;
    });
  }

  render(){
    return(
      <ul>
        {this.displayIngredient()}
      </ul>

    );
  }

}

export  default IngredientList;
