import styled from '@emotion/styled'
import { FunctionComponent } from 'react'

const FooterWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
`
const Footer: FunctionComponent = function () {
  return (
    <FooterWrapper>
      Thank you for visiting my blog. Have a good day 🙋🏻‍♂️
      <br />© {new Date().getFullYear()} Cheo, powered by Gatsby.
    </FooterWrapper>
  )
}

export default Footer
