import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
export default function TextEditor({ name, setData }) {
    return (
        <CKEditor
            onChange={(event, editor) => {

                setData(name, editor.getData())
            }}
            editor={ClassicEditor}
            config={{
                toolbar: {
                    items: ['undo', 'redo', '|', 'bold', 'italic', 'numberedList', 'bulletedList'],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo
                ],
                licenseKey: 'ZFZMWlg4Y0ZtTnBzcEx2ZWVsZnI1UHR3UWs3d1NzN3o0am5wN2JjRUk2bFY1SEhwNEc2R1NKbGI3MjZyZlE9PS1NakF5TkRBNU1UVT0=',
                mention: {
                    // Mention configuration
                },
                initialData: '',
            }}
        />
    )
}

