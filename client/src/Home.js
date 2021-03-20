
import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Home extends React.Component {
    
    render() {
      return (
          <Link to="/comments">See Comments</Link>
      );
    }
}
  
export default Home;