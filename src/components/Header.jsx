import logo from '../assets/logo.jpg';
 

export default function Header() {
 
   
    return(
    <header id="main-header">
        <div id="title">
            <img src={logo} alt="" />
            <h1>Shinobi Lakeview Retreat</h1>
        </div>
         
    </header>
);
}