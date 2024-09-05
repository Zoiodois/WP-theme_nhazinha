import { ToolbarGroup, ToolbarButton } from "@wordpress/components"
import { RichText, BlockControls, useBlockProps } from "@wordpress/block-editor"

export default function Edit(props) {
    const blockProps = useBlockProps()
    function handleTextChange(x){
        props.setAttributes({ firstTitle: x })
    }
    function handleTextChangeTwo(x){
        props.setAttributes({ secondTitle: x })
    }


    return (
        <div {...blockProps}>
        <BlockControls>
          
        </BlockControls>
        <RichText
          allowedFormats={["core/bold", "core/italic"]}
          tagName="h1"
          //className={`headline headline--${props.attributes.size}`}
          value={props.attributes.firstTitle}
          onChange={handleTextChange}
        />
        <RichText
          allowedFormats={["core/bold", "core/italic"]}
          tagName="h1"
          //className={`headline headline--${props.attributes.size}`}
          value={props.attributes.secondTitle}
          onChange={handleTextChangeTwo}
        />
      </div>

    )


}