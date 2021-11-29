function searchQuery(query, pageNumber){
    const apiKey = '23472343-684e35cdd5517f1d2662ecb2d'
    return (fetch(`https://pixabay.com/api/?q=${query}&page=${pageNumber}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {return response.json()}))
    .catch(error => console.log(error))
}

const api = {
    searchQuery
}

export default api