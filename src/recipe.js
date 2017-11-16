import React, {Component} from 'react';
import IngredientList from './ingredientList';
import {Link} from 'react-router-dom'
import{loadRecipe}from './lib/recipesServer'



class Recipe extends  Component {
  state = {}

  componentDidMount(){
    loadRecipe(this.props.match.params.recipeId)
    .then(recipe=>this.setState({recipe}))
    console.log(this.props.recipe)
  }

  render(){
    if(!this.state.recipe) return null;
    return( //<div>{this.state.recipe && this.state.recipe.name}</div>
      <div className='animated zoomIn col-xs-12 col-sm-12 col-md-12 col-lg-12'>
        <div className="  thumbnail">
          <img id="img-food"src={this.state.recipe.image} alt={this.state.recipe.name}/>
          <div className=" animated fadeInUpBig caption">
            <h3 className="recipe-tittle">{this.state.recipe.name}</h3>
            <div className=" animated fadeInDown">
              <div className=" text ">
                <p className="recipe-description">{this.state.recipe.description}</p>
                <IngredientList ingredients={this.state.recipe.ingredients}></IngredientList>
              </div></div>


          </div>
          <div className="btn-show-more ">
            <Link to={'/'}><button type="button" className=" animated fadeInDown btn btn-info">show less</button></Link>

          </div>
        </div>

     </div>

  )}
}

export default Recipe
