import React from 'react';

class YouTubeIframe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
      <div className="page-header">
          <h1>Cooking Videos by the Pros! <small>This content will set you up with the skills to cook any of the recipes you find</small></h1>
            <iframe src="https://www.powr.io/plugins/video-gallery/view?unique_label=f1d39152_1504210605&external_type=iframe" width="100%" height="600" frameBorder="0" title="YouTubeIframe"></iframe>
            </div>
        </div>
    )
  }
}

export default YouTubeIframe;
