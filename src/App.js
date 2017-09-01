import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import YouTubeIframe from './YoutubeIframe';
import Weather from './weather';
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
    var urlExtension = '';
    ingredientParams.forEach( ( ingredient ) => urlExtension + `&allowedIngredient[]=${ingredient}`  )

    axios.get(`http://api.yummly.com/v1/api/recipes?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd&q=${urlExtension}`)
    .then( ( response ) => {
      var matches = response.data.matches;
      var recipe_ids = matches.slice(0, this.max_recipes).map( match => match.id );

      this.setState({ recipe_ids: recipe_ids },
        () => {

          for (var i = 0; i < this.state.recipe_ids.length; i++) {
            axios.get(`http://api.yummly.com/v1/api/recipe/${recipe_ids[i]}?_app_id=71956da8&_app_key=180ad96efd0415a982da2e0ab65c3fdd`)
            .then(( response ) => {

              var recipes = this.state.recipes
              console.log( 'DATA', response.data);
              var name = response.data.name.slice(13);
              var url = response.data.source.sourceRecipeUrl;
              var recipeObject = {};
              recipeObject['url'] = url
              recipeObject['name'] = name
              recipes.push( recipeObject );

              var ingredientsArray = this.state.ingredients;
              var object = {};
              object[name] = matches[0].ingredients;

              ingredientsArray.push( object );
              this.setState({ recipes: recipes, ingredients: ingredientsArray })
              console.log('updated state object', this.state);

            })
            .catch((err) => {
              console.log(err);
            })
          }
        }
      )

    })
    .catch( ( err ) => {
      console.log(err);
    }
  )
  }

  // getRecipeVideo() {
  //   axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+to+cook+${recipeVideo_ids}&type=GET&key={YOUR_API_KEY}`)
  //   .then( ( response ) => {
  //     console.log( 'RESPONSE', response );
  //     var matchesVids = response.data.matchesVids;
  //     for( var index = 0; index < matchesVids.length; index++ ) {
  //       var recipeVideo_ids = matchesVids[index].id;
  //       this.state.recipeVideo_ids.push( recipeVideo_ids );
  //     }

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
        <ul>
        {
          this.state.recipes.map( ( recipe ) => {
            console.log( 'RECIPE', recipe);
              return (
                  <li>
                    <a href={ recipe.url }>{ recipe.name }</a>
                  </li>
                );
            })
         }
        </ul>
        <div id="weather" className="weather">
        <Weather />
        <YouTubeIframe />
        </div>
      </div>
    );
  }
 }

export default App;
