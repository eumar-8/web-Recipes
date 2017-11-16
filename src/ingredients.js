import React,{Component}from 'react'
import swal from 'sweetalert'

class Ingredients extends Component{
  constructor(props){
    super(props);
    this.state={}
    this.addIngredient=this.addIngredient.bind(this)
      }

   addIngredient(){
     if(this.quantity.value=== ""){
       return swal("opss","missing the quantity","error")
     }
     if(this.ingredient.value===''){
       return swal("eyyy","it's almost done, missin the ingredient","error")
     }else{
     this.props.addIngredient(this.quantity.value,this.ingredient.value);
     this.quantity.value =''
     this.ingredient.value =''
   }}
render(){
return(
  <div className="row">
    <div className="form-inline form-group">
      <div className="col-xs-1 col-sm-2"></div>
      <div className="col-xs-4 col-sm-3">
        <label htmlFor="quantity">Quantity</label>
        <input type="text"
        ref={(input)=>{this.quantity=input}}
        className="form-control"
        id="quantity"
        placeholder="Quantity"/>
      </div>
      <div className="col-xs-4 col-sm-3">
        <label htmlFor="ingredient">Ingredient</label>
        <input type="text"
        ref={(input)=>{this.ingredient=input}}
        className="form-control"
        id="ingredient"
        placeholder="Ingredient"/>
      </div>
      <div className="col-xs-1 col-sm-1">
        <button type="button" className="btn btn-info" onClick={this.addIngredient}>Add</button>
      </div>
    </div>
  </div>
)
}

}

export  default Ingredients;
