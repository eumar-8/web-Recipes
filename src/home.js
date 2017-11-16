import React,{Component} from 'react';
import IngredientList from './ingredientList';
import {Tooltip} from 'react-lightweight-tooltip';
import {Link} from 'react-router-dom'
import{loadRecipes,destroyRecipe}from './lib/recipesServer'
class Home extends  Component {
  constructor(props){
    super();
    this.state={
      recipes:[],//JSON.parse(localStorage.getItem('recipes'))||[],
      newRecipes:[]
    }
    this.displayRecipes=this.displayRecipes.bind(this)
    this.removeRecipes=this.removeRecipes.bind(this)
    this.showContent=this.showContent.bind(this)

  }

  componentDidMount(){
    loadRecipes()
    .then(recipes=>this.setState({recipes}))
  }



  showContent(i){
    var newRecipes = this.state.recipes;
    newRecipes[i].showMore = !newRecipes[i].showMore;
    this.setState({ recipes: newRecipes });
  }

    removeRecipes(id) {
    // var newRecipes =this.state.recipes.filter((_,index)=>{return i!==index})
     //var itemToRemove=i;
     //var recipes =this.state.recipes
    //if(itemToRemove !== -1) {
    	//recipes.splice(i, 1);

    //}
    // localStorage.setItem('newRecipes',JSON.stringify(newRecipes))
    // localStorage.removeItem(i)

    // this.setState({
    //   recipes: newRecipes
    // })

    const updatedRecipes = this.state.recipes.filter((recipe)=>{return recipe.id!==id});
    this.setState({
      recipes: updatedRecipes
    })
    destroyRecipe(id)




    }

  displayRecipes(){
    let resultArray=[]
    this.state.recipes.map((recipe,i)=>{
      return resultArray.push(
      <div key={i} className='animated zoomIn col-xs-12 col-sm-4 col-md-3 col-lg-4'>
        <div className="  thumbnail">
          <div id="remove">
          <Tooltip  className="Tooltip"content="click to remove">
            <a onClick={()=>{this.removeRecipes(recipe.id)}}>
              <span className="glyphicon glyphicon-remove"></span>
            </a>
          </Tooltip>
          </div>
          <img id="img-food"src={recipe.image} alt={recipe.name}/>
          <div className=" animated fadeInUpBig caption">
            <h3 className="recipe-tittle">{recipe.name}</h3>
            { recipe.showMore && <div className=" animated fadeInDown"><div className=" text ">
                <p className="recipe-description">{recipe.description}</p>
                <IngredientList ingredients={recipe.ingredients}></IngredientList>
              </div></div>
            }

          </div>
          <div className="btn-show-more ">
            <Link to={'/recipe/' + recipe.id}><button type="button" className=" animated fadeInDown btn btn-info">show more</button></Link>

          </div>
        </div>

     </div>

    )
  });
    return resultArray


  }



  render(){
    return(
      <div className='row'>
        <h1 className="  tittle-home">very tasty recipes!</h1>
          {this.displayRecipes()}

        </div>




    )
  }

}
export default Home;
