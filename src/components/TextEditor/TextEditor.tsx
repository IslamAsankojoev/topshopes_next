import cn from 'classnames'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import { FC, useEffect, useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import { ITextEditor } from './TextEditor.interface'
import styles from './TextEditor.module.scss'

const TextEditor: FC<ITextEditor> = ({
	placeholder,
	onChange,
	error,
	value,
}) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())

	const [isUpdated, setIsUpdated] = useState(false)
	const [isFocused, setIsFocused] = useState(false)

	useEffect(() => {
		if (!isUpdated) {
			const defaultValue = value ? value : ``
			const blocksFromHtml = htmlToDraft(defaultValue)
			const contentState = ContentState.createFromBlockArray(
				blocksFromHtml.contentBlocks,
				blocksFromHtml.entityMap
			)
			const newEditorState = EditorState.createWithContent(contentState)
			setEditorState(newEditorState)
		}
		console.log(value)
	}, [value, isUpdated])

	const onEditorStateChange = (editorState: EditorState) => {
		setIsUpdated(true)
		setEditorState(editorState)

		return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
	}

	return (
		<div>
			<label>
				<span>{placeholder}</span>

				<div>
					<Editor
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						toolbarClassName={'EditorToolbar'}
						editorClassName={styles.editor}
						editorState={editorState}
						onEditorStateChange={onEditorStateChange}
						spellCheck
						wrapperClassName={
							isFocused ? styles.wrapperFocused : styles.wrapper
						}
						placeholder={'Write something...'}
						toolbar={{
							options: [
								'inline',
								'blockType',
								'fontSize',
								'list',
								'textAlign',
								'colorPicker',
								'link',
								'emoji',
								'history',
							],
						}}
					/>
				</div>

				{error && <div>{error.message}</div>}
			</label>
		</div>
	)
}

export default TextEditor
