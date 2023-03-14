import React, {useEffect} from "react";
import {AiOutlineClose, AiOutlinePicture} from "react-icons/ai";

export const ImageUpload = ({selectedFile, setSelectedFile, preview, setPreview}) => {
    //const [selectedFile, setSelectedFile] = useState()
    //const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const closePreview = () => {
        setPreview(undefined)
        setSelectedFile(undefined)
    }

    return (
        <div>
            <label htmlFor={"upload"}>
                <AiOutlinePicture/>
            </label>
            <input type='file' onChange={onSelectFile} id={"upload"} className={"hidden"}/>
            {selectedFile &&
                <div className={"relative cursor-default"}>
                    <img src={preview} className={"rounded"}/>
                    <AiOutlineClose className={"absolute top-0 right-0 text-4xl cursor-pointer"}
                                    onClick={closePreview}/>
                </div>
            }
        </div>
    )
}