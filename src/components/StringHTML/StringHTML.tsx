import { FC } from 'react'

const StringHTML: FC<any> = (props) => {
	const { children, others } = props
	return <div {...others} dangerouslySetInnerHTML={{ __html: children }} />
}

export default StringHTML
