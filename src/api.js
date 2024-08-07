export const apiUsers = {
  search: '',
  skip: 0,
  limit: 30,
  sort: {
    field: '',
    direction: ''
  },
  getUsers: async function () {
    const querySearch = this.search ? `/search?q=${this.search}&` : '?'
    const querySort = this.sort.field && this.sort.direction ? `sortBy=${this.sort.field}&order=${this.sort.direction}&` : ''
    const querySkip = this.skip ? `skip=${this.skip}&` : ''
    
    try {
      const result = await fetch(`https://dummyjson.com/users${querySearch}${querySort}${querySkip}`)
      return await result.json()
    } catch (error) {
      console.error(error);
      return false
    }
  }
}  

export async function getUserInfo(id) {
  try {
    const result = await fetch(`https://dummyjson.com/users/${id}`)
    return await result.json()
  } catch (error) {
    console.error(error);
    return false
  }
}

