

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavigationBar() {

   const location = useLocation();
   const [url, setUrl] = useState(null);
   useEffect(() => {
      setUrl(location.pathname);
   }, [location]);
   
    return ( 
        <ul className='NavigationBar'>
          <li class=".active">
             <Link to="/" className={url === "/" ?" active" : ""}>Home</Link>
          </li>
          <li>
             <Link to="/einsatzplaner" className={url === "/einsatzplaner" ?" active" : ""}>Einsatzplaner</Link>
          </li>
          <li>
             <Link to="/stundenzettel" className={url === "/stundenzettel" ?" active" : ""}>Stundenzettel</Link>
          </li>
       </ul>
    );
}