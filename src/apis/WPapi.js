// Import axios
import axios from 'axios'

// const pour API
const apiClient = axios.create({
    baseURL: 'http://localhost/twp/wp-json/wp/v2',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    // Log WP
    auth: {
      username: "twp",
      password: "twp"
}
})
export default
{
// GET
  // Affiche toutes les Catégories de l'api
  getcategories(){
    return apiClient.get('/categories')  
  },
  // Get tous les posts d'une catégorie
  getposts(id){
    return apiClient.get(`/posts?categories=${id}`)  
  },
  // Get un post par son ID
  getpost(id){
    return apiClient.get(`/posts/${id}`)  
  },
  // Get tous les commentaires d'un post
  getcoms(id){
    return apiClient.get(`/comments?post=${id}`)  
  },


// POST
  // Créer une catégorie
  createCa(form){
    return apiClient.post(`/categories`, form)
  },
  // Créer un post
  createPo(form){
    return apiClient.post(`/posts`, form)
  },
  // Créer un commentaire
  comment(id, form){
    return apiClient.post(`/comments?post=${id}`, form)
  },


// DELETE
  // Delete un post
  deletePo(id){
    return apiClient.delete(`/posts/${id}`)
  },
  // Delete un commentaire
  deleteCo(id){
    return apiClient.delete(`/comments/${id}`)
  },
  // Delete une categorie
    // Delete de tous les posts de la catégorie
    deletepostcat(id){
      return apiClient.delete(`/posts?categories=${id}`)
    },
    // Delete de la catégorie
    deletecat(id){
      return apiClient.delete(`/categories/${id}?force=true`)
    },


// UPDATE
  // Edit un post avec les infos du form
  editPo(id, form){
    return apiClient.put(`/posts/${id}`, form)
  },

  // Edit un commentaire
  editCo(id, form){
    return apiClient.put(`/comments/${id}`, form)
  },
  // Edit catégorie
  editCat(id, form){
    return apiClient.put(`/categories/${id}`, form)
  }
}    