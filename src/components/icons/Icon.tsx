import React from 'react'
import * as icons from 'react-icons/fa'

type TypeIcon = keyof typeof icons

const MyIcons = ({ iconName }: { iconName: TypeIcon }, props) => {
  const Icon = icons[iconName]
  return <Icon {...props} />
}

export default MyIcons
