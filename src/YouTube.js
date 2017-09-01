import React, { Component } from 'react';
import axios from 'axios';

class YouTube extends Component {
  constructor(props){
    super(props);
    this.state = {
      'maxResults': '1',
      'part': 'snippet',
      'q': 'how to cook',
      'type': 'GET'
    }
  }

  // buildApiRequest('GET',
  //                 '/youtube/v3/search',
  //                 {'maxResults': '3',
  //                  'part': 'snippet',
  //                  'q': 'how to cook pizza',
  //                  'type': 'GET'});


  componentWillMount() {
    buildApiRequest();
  }

  // let recipeVideo_ids = [];
  getRecipeVideo() {
    axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+to+cook+${recipeVideo_ids}&type=GET&key=AIzaSyCLkyxK-2pRusMpOy3ZrDWRnnq9iE1kpGI`)

    // axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+to+cook+${recipeVideo_ids}&type=GET&key=AIzaSyCLkyxK-2pRusMpOy3ZrDWRnnq9iE1kpGI`)


    .then( ( response ) => {
      console.log( 'RESPONSE', response );
      var matchesVids = response.data.matchesVids;
      for( var index = 0; index < matchesVids.length; index++ ) {
        var recipeVideo_ids = matchesVids[index].id;
        this.state.recipeVideo_ids.push(recipeVideo_ids);
      }
      for (var i = 0; i < recipeVideo_ids.length; i++) {
        // axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=how+to+cook+${recipeVideo_ids}&type=GET&key={YOUR_API_KEY}`)
        // .then((response) => {
        //   console.log(response );
        // })
        // .catch((err) => {
        //   console.log(err);
        // })
      }
    })
    .catch( ( err ) => {
      console.log(err);
    }
  )
  }
  render() {
    return (
      <div className="YouTube">
      Hello Tube
      </div>
    );
  }
}

export default YouTube;
