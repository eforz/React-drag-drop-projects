import { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body{
  background: #181820;
  color: #fff;
  font-size: 14px;
}
`

export default Global