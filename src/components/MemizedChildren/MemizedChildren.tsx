import { memo } from 'react'

const MemizedChildren = ({children}) => {
  return (
    <>
    {children}
    </>
  )
}

export default memo(MemizedChildren)