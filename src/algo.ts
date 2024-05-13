

export const solve = (grid: boolean[][]) => {
  const edges: Record<number, number[]> = {}
  const visited: boolean[] = [];
  const back: number[] = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if ( cell === false ) return;
      if ( edges[j] === undefined ) edges[j] = []
      edges[j].push(i)
    })
    visited[i] = false
    back[i] = -1
  })

  const dfs = (s: number): boolean => {
    if ( edges[s] === undefined ) return false;
    visited[s] = true;
    for ( const v of edges[s] ) {
      if ( back[v] === -1 ) {
        back[v] = s
        visited[s] = false
        return true;
      }
    }
    for ( const v of edges[s] ) {
      if ( back[v] !== -1 && visited[back[v]] === false ) {
        if ( dfs(back[v]) ) {
          back[v] = s
          visited[s] = false
          return true
        }
      }
    }
    visited[s] = false;
    return false
  }

  return Object.keys(edges).reduce((acc, cur) => 
    acc + ( dfs(parseInt(cur, 10)) ? 1 : 0 )
  , 0)
}