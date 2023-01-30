// Import the main component
import { Viewer, Worker } from '@react-pdf-viewer/core'
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import React from 'react'

export const Pdf: React.FC<{ document: string }> = ({ document }) => {
	if (!document) {
		return <div></div>
	}
	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js">
			<div style={{ maxHeight: '600px', overflowY: 'auto' }}>
				<Viewer fileUrl={document} />
			</div>
		</Worker>
	)
}
