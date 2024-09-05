import { BlockControls, useBlockProps, RichText } from "@wordpress/block-editor"

export default function Edit(props) {

    const blockProps = useBlockProps()
    function handleTextChange(x) {
        props.setAttributes({ shortcode: x })
    }

    return (

        <div {...blockProps}>
            <div>Esse é o bloco do footer</div>
            <div>Digite abaixo o código do formulário:</div>
                       
            <RichText
                className="shortcode-input"
                value={props.attributes.shortcode}
                onChange={handleTextChange}
                placeholder="Digite o shortcode aqui"
            />

        </div>
    )
}