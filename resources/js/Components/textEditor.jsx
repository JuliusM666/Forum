import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
    ClassicEditor,
    AccessibilityHelp,
    AutoImage,
    AutoLink,
    Autosave,
    Bold,
    Essentials,
    GeneralHtmlSupport,
    ImageBlock,
    ImageInline,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    Italic,
    Link,
    List,
    Paragraph,
    SelectAll,
    SpecialCharacters,
    Undo,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
export default function TextEditor({ name, setData, data = '' }) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);
    return (
        <div className="ck-main-container">
            <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                <div className="editor-container__editor">
                    <div ref={editorRef}>{isLayoutReady &&
                        <CKEditor
                            onChange={(event, editor) => {

                                setData(name, editor.getData())
                            }}
                            editor={ClassicEditor}
                            config={{
                                toolbar: {
                                    items: [
                                        'undo',
                                        'redo',
                                        '|',
                                        'bold',
                                        'italic',
                                        '|',
                                        'link',
                                        'insertImageViaUrl',
                                        '|',
                                        'bulletedList',
                                        'numberedList',
                                        '|',

                                    ],
                                    shouldNotGroupWhenFull: false
                                },
                                plugins: [
                                    AccessibilityHelp,
                                    AutoImage,
                                    AutoLink,
                                    Autosave,
                                    Bold,
                                    Essentials,
                                    GeneralHtmlSupport,
                                    ImageBlock,
                                    ImageInline,
                                    ImageInsertViaUrl,
                                    ImageResize,
                                    ImageStyle,
                                    ImageToolbar,
                                    Italic,
                                    Link,
                                    List,
                                    Paragraph,
                                    SelectAll,
                                    SpecialCharacters,
                                    Undo,

                                ],
                                htmlSupport: {
                                    allow: [
                                        {
                                            name: /^.*$/,
                                            styles: true,
                                            attributes: true,
                                            classes: true
                                        }
                                    ]
                                },
                                image: {
                                    toolbar: ['imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage']
                                },
                                link: {
                                    addTargetToExternalLinks: true,
                                    defaultProtocol: 'https://',
                                    decorators: {
                                        toggleDownloadable: {
                                            mode: 'manual',
                                            label: 'Downloadable',
                                            attributes: {
                                                download: 'file'
                                            }
                                        }
                                    }
                                },
                                placeholder: 'Type or paste your content here!',
                                licenseKey: 'ZFZMWlg4Y0ZtTnBzcEx2ZWVsZnI1UHR3UWs3d1NzN3o0am5wN2JjRUk2bFY1SEhwNEc2R1NKbGI3MjZyZlE9PS1NakF5TkRBNU1UVT0=',
                                initialData: data,

                            }}

                        />}
                    </div>
                </div>
            </div>
        </div>


    )
}

