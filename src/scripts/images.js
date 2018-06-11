/*
  TODO: Appena finisce bike modificare il get_weapon in modo tale
  che legga il vettore
*/

function get_weapon(name) {
  switch(name) {
    case "SPEAR":
      return document.getElementById("poSpear");
      break;
    case "CANNON":
      return document.getElementById("poCannon");
      break;
    case "WAND":
      return document.getElementById("poWand");
      break;
    case "BOW":
      return document.getElementById("poBow");
      break;
    case "SWORD":
      return document.getElementById("poSword");
      break;
    default:
      console.log("L'arma non esiste");
      break;
  }
}