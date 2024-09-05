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

  useEffect(function () {
    if (!props.attributes.imgID) {
      props.setAttributes({ imageURLGWebp: ourThemeData.themePath + "/images/nhazinha/baner-pagina-ini-1-.webp" })
    }
  }, [])

  useEffect(
    function () {
      if (props.attributes.imgID) {
        async function go() {
          const response = await apiFetch({
            path: `/wp/v2/media/${props.attributes.imgID}`,
            method: "GET"
          })
          console.log(response);
          let siteUrl = ourThemeData.siteURL

          //Small Images    
          //Salvar URL condicionas para tipo de arquivo e tamanho
          let imageURLSWebp = response.media_details.sizes['banner-small'].source_url;
  
          console.log(siteUrl)
          // Remover o domínio da URL completa
          let correctedSPath = imageURLSWebp.replace(siteUrl, '');
          // Adiciona a URL base do site novamente, mas apenas uma vez
          //console.log(correctedSPath)
          
          
          // Captura a URL base do site

          // Remove o nome do diretório repetido da URL da imagem
          props.setAttributes({

            imgURLSWebp: correctedSPath

          })

          //Medium Images   

          let imageURLMWebp = response.media_details.sizes['banner-medium'] && response.media_details.sizes['banner-medium'].source_url;
          let imageDefaultMWebp = response.media_details.sizes['medium'].source_url;

          if (imageURLMWebp) {
            let relativeImageURLMWebp = imageURLMWebp.replace(siteUrl, '');
     
            props.setAttributes({
              imgURLMWebp: relativeImageURLMWebp,
            })
          } else {
            let relativeImageURLMWebp = imageDefaultMWebp.replace(siteUrl, '');
       
            props.setAttributes({
              imgURLMWebp: relativeImageURLMWebp,
            })
          }

          //Large Images

          let imageURLGWebp = response.media_details.sizes['banner-large'] && response.media_details.sizes['banner-large'].source_url;
          let imageDefaultWebp = response.media_details.sizes['large'] && response.media_details.sizes['large'].source_url;
          let imageLastDefaultWebp = response.media_details.sizes['medium_large'].source_url;

          if (imageURLGWebp) {
            let relativeImageURLGWebp = imageURLGWebp.replace(siteUrl, '');
    
            props.setAttributes({
              imgURLGWebp: relativeImageURLGWebp,
            })
          } else {
            if (imageDefaultWebp) {
              let relativeImageURLGWebp = imageDefaultWebp.replace(siteUrl, '');
     
              props.setAttributes({
                imgURLGWebp: relativeImageURLGWebp,
              })
            } else {
              let relativeImageURLGWebp = imageLastDefaultWebp.replace(siteUrl, '');
              props.setAttributes({
                imgURLGWebp: relativeImageURLGWebp,
              })
            }
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
            allowedBlocks={["portfolios/genericheading", "portfolios/genericbutton"]}
          />
        </div>
      </div>
    </div>
  )
}
