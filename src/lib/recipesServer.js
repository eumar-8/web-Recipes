const baseUrl='http://localhost:8080/recipes'

export const loadRecipes=()=>{
  return fetch(baseUrl)
  .then(res=>res.json())
}

export const loadRecipe=(id)=>{
  return fetch(baseUrl + '/' + id)
  .then(res=>res.json())
}

export const createRecipe=(recipe)=>{
  return fetch(baseUrl,{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body: JSON.stringify(recipe)
  }).then(res=>res.json())
}

export const destroyRecipe=(id)=>{
  return fetch(baseUrl + '/' + id,{
    method:'DElETE',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  })
}
