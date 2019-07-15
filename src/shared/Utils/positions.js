export const absolute = ({ x = 'top', y = 'left' } = {} ) => `
  position: absolute;
  ${x}: 0;
  ${y}: 0;
`