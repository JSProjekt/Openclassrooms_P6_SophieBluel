
/** tabler API **/

export async function getWorks() {
  const requete = await fetch("http://localhost:5678/api/works");
  return requete.json();
}
export async function getCategory() {
  const requete = await fetch("http://localhost:5678/api/categories");
  return requete.json();
}