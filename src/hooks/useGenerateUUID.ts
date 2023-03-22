import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const useGenerateUUID = () => {
	const [uuid, setUuid] = useState(uuidv4())

	const regenerate = () => setUuid(uuidv4())

	return [uuid, regenerate]
}

export default useGenerateUUID
