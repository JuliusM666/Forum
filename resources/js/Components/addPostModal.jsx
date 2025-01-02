import Card from "./card"
import FadeWrapper from "./fadeWrapper";
import CloseButton from './closeButton';
import FormInput from "./formInput";
import TextEditor from "./textEditor";
import ValidationError from "./validationError";
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from "react";
export default function AddPostModal({ topics, defaultID, isVisible, close, componentRef }) {
    const [activeTheme, setActiveTheme] = useState('')
    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        title: '',
        message: '',
        theme_id: defaultID,

    })
    function clearForm() {
        clearErrors()
        reset()

    }
    useEffect(() => {
        for (const element of document.getElementsByTagName('option')) {
            if (element.value == defaultID) {
                element.setAttribute("selected", true)
                setActiveTheme(element.innerHTML)
                break
            }
        }
        if (isVisible == false) {
            clearForm()
        }

    }, [isVisible])

    function submit(e) {
        e.preventDefault()
        post('/post', {
            preserveScroll: true,
            onSuccess: () => { clearForm(), close() }

        })

    }
    return (
        <div ref={componentRef}>
            <FadeWrapper isVisible={isVisible}>
                <div id="modal" className="fixed z-30 top-1/2 xl:w-1/3 lg:w-2/5 md:w-7/12 sm:w-11/12 m-auto left-0 right-0  transform -translate-y-1/2">
                    <Card name={"Add post to " + activeTheme} ButtonComponent={<CloseButton handleOnClick={() => close()} />}>
                        <div className="bg-slate-100 rounded-b-lg text-slate-600">
                            <form onSubmit={submit}>
                                <div className="p-2">
                                    <FormInput errors={errors.title} name={"title"} value={data.title} setData={setData} title={"Post title"} required={true} type={"text"} />
                                </div>
                                <PostInput setActiveTheme={setActiveTheme} errors={errors.theme_id} name={"theme_id"} value={data.theme_id} setData={setData} topics={topics} />
                                <div className="border-slate-200 border-y-2 p-2">
                                    <TextEditor setData={setData} name={"message"} />
                                </div>
                                <div className="p-2">
                                    <ValidationError errors={errors.message} />
                                </div>



                                <div className="p-2">
                                    <button disabled={processing} className='bg-blue-300 rounded-3xl hover:bg-opacity-80  py-2 px-4 text-center w-full font-semibold max-h-fit text-slate-200'><i className='fa fa-plus-circle mr-2' />New Post</button>
                                </div>

                            </form>
                        </div>
                    </Card>
                </div>
            </FadeWrapper>
        </div>
    )
}

function PostInput({ setActiveTheme, topics, value, setData, name, errors }) {
    return (
        <div className="grid grid-cols-1 gap-1 p-2">

            <label className="text-slate-600 text-md font-semibold" htmlFor="themes">Choose topic*</label>
            <select value={value} onChange={(e) => { setData(name, e.target.value); setActiveTheme(e.target.options[e.target.selectedIndex].text) }} className="rounded-md w-full text-slate-600 border-slate-600 bg-slate-50" id="themes" >

                {Object.keys(topics).map(function (keyName, keyIndex) {

                    return (
                        <OptionGroup key={keyName} label={topics[keyName].title}>
                            {Object.keys(topics[keyName].themes).map(function (name, index) {

                                return (<option key={index} value={topics[keyName].themes[name].id}>{topics[keyName].themes[name].title}</option>)
                            })}
                        </OptionGroup>
                    )

                })}

            </select>
            <ValidationError errors={errors} />

        </div >
    )
}
function OptionGroup({ children, label }) {
    return (<optgroup className="font-semibold" label={label}>
        {children}

    </optgroup>)
}