import apiFetch from "@wordpress/api-fetch"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck
} from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"

export default function Edit(props) {
  const blockProps = useBlockProps()
  /*
  useEffect(function () {
    if (!props.attributes.imgURL) {
      props.setAttributes({ imgURL: ourThemeData.themePath + "/images/home-banner.png" })
    }
  }, [])*/

  useEffect(
    function () {
      if (props.attributes.imgID) {
        async function go() {
          const response = await apiFetch({
            path: `/wp/v2/media/${props.attributes.imgID}`,
            method: "GET"
          })
          console.log(response);
          //Salvar URL condicionas para tipo de arquivo e tamanho
          let imageURLSWebp =response.media_details.sizes['banner-small'].webp_url;
          let imageURLMWebp = response.media_details.sizes['banner-medium'].webp_url;
          let imageURLGWebp = response.media_details.sizes['banner-large'] && response.media_details.sizes['banner-large'].webp_url;

          let imageDefaultWebp =response.media_details.sizes['large'].webp_url;

          props.setAttributes({ 
        
            imgURLSWebp: imageURLSWebp,
            imgURLMWebp: imageURLMWebp
   
          })

          if(imageURLGWebp) {
            props.setAttributes({
                imgURLGWebp: imageURLGWebp,
            })
          } else {
            props.setAttributes({
              
            imgURLGWebp: imageDefaultWebp,
          })
          }

 
       

        }
        go()
      }
    },
    [props.attributes.imgID]
  )

  function onFileSelect(x) {
 
    props.setAttributes({ imgID: x.id })

  }

  return (
    <div {...blockProps}>
     <InspectorControls>
        <PanelBody title="Background" initialOpen={true}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({ open }) => {
                  return <Button onClick={open}>Choose Image</Button>
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className="page-banner">

          <img className="page-banner__bg-image" src={props.attributes.imgURLGWebp} alt="" />
       
        <div className="page-banner__content container t-center c-white">
        <InnerBlocks
            allowedBlocks={["portfolios/genericheading","portfolios/genericbutton"]}
          />
        </div>
      </div>
    </div>
  )
}
