import React,{Component} from 'react';

import Dropzone from 'react-dropzone';
import request from 'superagent';

import Ingredients from './ingredients';
import IngredientList from './ingredientList';
import swal from 'sweetalert';
import {createRecipe} from'./lib/recipesServer';
//import React from 'react';
//import { findDOMNode } from 'react-dom';
//import $ from 'jquery';

const CLOUDINARY_UPLOAD_PRESET = 'zjwe4avo';
const CLOUDINARY_UPLOAD_URL = ' https://api.cloudinary.com/v1_1/eumar-8/image/upload';

class Submit extends  Component {
  description=null;

  constructor(props){
    super(props);
    this.state={
      recipes:[],//JSON.parse(localStorage.getItem('recipes'))||[],
      newIngredients: [],
      uploadedFileCloudinaryUrl: ''
    };
    this.submitrecipie=this.submitrecipie.bind(this)
    this.onImageDrop=this.onImageDrop.bind(this)
    this.removeIngredient=this.removeIngredient.bind(this)


  }

  onImageDrop(files){
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        console.log(response.body.secure_url)
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  removeIngredient(i) {
    var newIngredients =this.state.newIngredients.filter((_,index)=>{return i!==index})
    this.setState({
      newIngredients: newIngredients
    })
  }



  submitrecipie(){

    let newRecipe = {
      image:this.state.uploadedFileCloudinaryUrl,
      name: this.name.value,
      description: this.description.value,
      ingredients: this.state.newIngredients || []
    };
    console.log(this.state.newIngredients)
    if(this.state.uploadedFileCloudinaryUrl===""){
      return swal("Opss!", "missing an image!", "error")
    }
    if(this.name.value ===""){
      return swal("Wooow!","dont forget assign a  very nice recipe name ","error")
    }
    if(this.description.value===""){
      return swal("ups!", "There is not a description", "error")
    }
    if(this.state.newIngredients.length===0){
      return swal("ups!", "There are not a ingredients", "error")

    }else{


    let recipes = this.state.recipes.concat([newRecipe])
    localStorage.setItem('recipes',JSON.stringify(recipes))
    this.setState({recipes});
      this.name.value =''

      createRecipe(newRecipe)
      .then(()=> console.log("recip added"))




     this.description.value =''
     window.location.href = '/';

}}
    addIngredient(quantity,ingredient){

      this.setState({newIngredients:this.state.newIngredients.concat([{quantity, ingredient}])})
    }

  render(){
    return(

  <div className=" container row">
    <div className="col-xs-0 col-sm-2"></div>
    <div className="col-xs-12 col-sm-8">
      <h1 className=" tittle-submit text-center">Hi there! please Submit your recipe</h1>
    </div>

      <form>
        <div className="row">
          <div className="col-xs-2 col-sm-3 .col-md-2"></div>
          <div className=" dropzone-div col-xs-8 col-sm-7 .col-md-8">
            {this.state.uploadedFileCloudinaryUrl !== '' ? null:
              <Dropzone
                id="Dropzone-img"
                multiple={false}
                accept="image/*"
                onDrop={ this.onImageDrop}>
                <p id="text-drop-zone">Drop an image or click to select a file to upload.</p>
              </Dropzone>}
              <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                  <div>
                    <img  id="img-food"alt={this.state.uploadedFile.name}src={this.state.uploadedFileCloudinaryUrl} />
                  </div>}
              </div>
            </div>
            <div className="col-xs-2 col-sm-4"></div>
          </div>
          <div className="row">
            <div className="col-xs-1 col-sm-2"></div>
            <div className="col-xs-10 col-sm-8">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text"
                  ref={(input)=>{this.name=input;}}
                  className="form-control"
                  id="name"
                  placeholder="enter the name of recipie"/>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea className="form-control"
                  ref={(textarea)=>{this.description=textarea;}}
                  id="description"
                  placeholder="Enter a brief description"/>

            </div>
                <IngredientList ingredients={this.state.newIngredients}  removeIngredient={this.removeIngredient} canDelete={true}/>
                </div>
              </div>
              <Ingredients addIngredient={(quantity,ingredient)=>{this.addIngredient(quantity,ingredient)}}/>

              <div className="row">

                    <div className="btn-sub-div col-xs-12 col-sm-12">
                <button  type="button" className="btn btn-default" onClick={this.submitrecipie}>Submit Recipe</button>
                </div>
              </div>
  </form>
  </div>



    )
  }

}
export default Submit;
