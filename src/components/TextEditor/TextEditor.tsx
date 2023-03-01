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
						// toolbar={{
						// 	options: [
						// 		'inline',
						// 		'blockType',
						// 		'fontSize',
						// 		'list',
						// 		'textAlign',
						// 		'colorPicker',
						// 		'link',
						// 		'emoji',
						// 		'history',
						// 	],
						// }}
						// add toolbar options with excludes
						toolbar={{
							options: [
								'inline',
								'fontSize',
								'blockType',
								'list',
								'textAlign',
								'link',
							],
							inline: {
								options: ['bold', 'italic', 'underline', 'monospace'],
								suppressContentEditableWarning: true,
								suppressHydrationWarning: true,
							},
							blockType: {
								options: [
									'Normal',
									'H1',
									'H2',
									'H3',
									'H4',
									'H5',
									'H6',
									'Blockquote',
									'Code',
								],
								inDropdown: true,
								suppressContentEditableWarning: true,
								suppressHydrationWarning: true,
							},
							fontSize: {
								options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72],
								inDropdown: true,
								suppressContentEditableWarning: true,
								suppressHydrationWarning: true,
							},
							list: {
								inDropdown: true,
								suppressContentEditableWarning: true,
								suppressHydrationWarning: true,
							},
							textAlign: {
								inDropdown: true,
								suppressContentEditableWarning: true,
								suppressHydrationWarning: true,
							},
							link: {
								suppressContentEditableWarning: true,
								suppressHydrationWarning: true,
							},
						}}
					/>
				</div>

				{error && <div>{error.message}</div>}
			</label>
		</div>
	)
}

export default TextEditor
