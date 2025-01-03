import { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    Emoji, EmojiActivity, EmojiFlags, EmojiFood, EmojiNature, EmojiObjects, EmojiPeople,
    EmojiPlaces, EmojiSymbols
} from '@/utils/emojiCkeditor/src';
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
    return (
        <div className="ck-main-container">
            <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                <div className="editor-container__editor">
                    <div ref={editorRef}>
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
                                        'emoji',

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
                                    Emoji,
                                    EmojiPeople,
                                    EmojiNature,
                                    EmojiPlaces,
                                    EmojiFood,
                                    EmojiActivity,
                                    EmojiObjects,
                                    EmojiSymbols,
                                    EmojiFlags,
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
                                licenseKey: import.meta.env.VITE_CKEDITOR5_KEY,
                                initialData: data,

                            }}

                        />
                    </div>
                </div>
            </div>
        </div>


    )
}

