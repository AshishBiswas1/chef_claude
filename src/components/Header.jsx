import image from "/images/chef-claude.jpg";

export default function Header() {
 return (
  <header className="head">
   <img src={image} alt="chef-icon" />
   <h1>Chef Claude</h1>
  </header>
 );
}
