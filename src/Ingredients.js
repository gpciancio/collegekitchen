import {Button, Icon} from 'react-materialize'
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



render() {
  return (
    <Modal
    	header='Modal Header'
    	trigger={<Button waves='light'>OR ME!<Icon right>insert_chart</Icon></Button>}>
    	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
    		incididunt ut labore et dolore magna aliqua.</p>
    </Modal>
  );
}

export default App;
