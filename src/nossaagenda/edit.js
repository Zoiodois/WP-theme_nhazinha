import { BlockControls, useBlockProps, RichText } from "@wordpress/block-editor"

export default function Edit(props) {

    const blockProps = useBlockProps()

    return (

        <div {...blockProps}>
            <div>Esse é o bloco da agenda</div>
                    

        </div>
    )
}