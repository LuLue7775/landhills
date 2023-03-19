import { StyledPages } from "@/styles/styles";

// custom pages/404.jsx !! Do not remove please or it will break build
export default function Error() {
  return (
    <StyledPages style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>404 - Something went wrong</h1>
    </StyledPages>
  )
}
