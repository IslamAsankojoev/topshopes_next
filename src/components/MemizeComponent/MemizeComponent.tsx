import { memo, FC, ReactNode } from 'react'

const MemizeComponent:FC<{component: ReactNode}> = ({component}) => {
  return (
    <>
    {component}
    </>
  )
}

export default memo(MemizeComponent)