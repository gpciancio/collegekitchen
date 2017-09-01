import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import YouTubeIframe from './YoutubeIframe';
// import YouTube from './YouTube';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      html: true,
      ingredients: [],
      recipe_ids: [],
      recipes: [],
      ingredient: '',
      value: '',
      ingredientParams: []
    }
    this.max_recipes = 5
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getSampleRecipe = this.getSampleRecipe.bind(this);
  }

  componentWillMount() {
    // getSampleRecipe();
  }

  handleSubmit(event) {
      this.state.ingredientParams.push(this.state.value);
      event.preventDefault();
      this.getSampleRecipe( this.state.ingredientParams );
      this.setState({ value: '' });
  }

  handleChange(event) {
    var value = '';
    value = this.state.value
    this.setState({ value: event.target.value });
    event.target.value = '';
  }

  getSampleRecipe( ingredientParams ) {
    console.log("test");
    // var urlExtension = '';
    // ingredientParams.forEach( ( ingredient ) => urlExtension + `&allowedIngredient[]=${ingredient}`  )
    //
    // axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd&q=${urlExtension}`)
    // .then( ( response ) => {
    //   console.log("response", response);
    //   var matches = response.data.matches;
    //   var recipe_ids = matches.slice(0, this.max_recipes).map( match => match.id );
    //
    //   console.log("recipe_ids", recipe_ids);
    //   this.setState({ recipe_ids: recipe_ids },
    //     () => {
    //       for (var i = 0; i < this.state.recipe_ids.length; i++) {
    //         axios.get(`http://api.yummly.com/v1/api/recipe/${recipe_ids[i]}?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd`)
    //         .then(( response ) => {
    //
    //           var recipes = this.state.recipes
    //
    //           var name = response.data.name.slice(13);
    //           var url = response.data.source.sourceRecipeUrl;
    //           var recipeObject = {};
    //           recipeObject['url'] = url
    //           recipeObject['name'] = name
    //           recipes.push( recipeObject );
    //
    //           var ingredientsArray = this.state.ingredients;
    //           var object = {};
    //           object[name] = matches[0].ingredients;
    //
    //           ingredientsArray.push( object );
    //           this.setState({ recipes: recipes, ingredients: ingredientsArray })
    //
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         })
    //       }
    //     }
    //   )
    //
    // })
    // .catch( ( err ) => {
    //   console.log(err);
    // }
  // )
}//closing axios get

//   getRecipeVideo() {
//     axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+to+cook+tacos&type=GET&key=AIzaSyCLkyxK-2pRusMpOy3ZrDWRnnq9iE1kpGI`)
//     .then( ( response ) => {
//
//     })
//   .catch( ( err ) => {
//     console.log(err);
//   });
// }


  render() {
    return (
      <div className="App">

        <form onSubmit={ this.handleSubmit }>
          <label>
          Enter Ingredient:
          <input type="text" value={ this.state.value } onChange={ this.handleChange } />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul className="media-list">
        {
          this.state.recipes.map( ( recipe ) => {

              return (
              <div>
                <li className="media">
                  <div className="media-left">
                    <a href={ recipe.url }>{ recipe.name }</a>
                    <img className='media-object' src="" alt=""></img>
                  </div>
                </li>
                <div className="media-body"></div>
                  <h4 className="media-heading">list of ingredients{}</h4>
                  </div>
                );
            })
         }
        </ul>
        <div id="weather" className="weather">

        <YouTubeIframe />
        </div>
      </div>
    );
  };
}

export default App;
