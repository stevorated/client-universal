export default ({ who = 'all', length = '.5s', how='ease' }) => `
  transition: ${who} ${length} ${how};  
`