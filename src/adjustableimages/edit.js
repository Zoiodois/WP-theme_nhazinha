import apiFetch from "@wordpress/api-fetch"
import {
  Button,
  PanelBody,
  PanelRow,
  TextControl,
  Popover,
  Icon,
  ColorPalette
} from "@wordpress/components"
import {

  useBlockProps,
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  __experimentalLinkControl as LinkControl,
  RichText
} from "@wordpress/block-editor"
import { useEffect, useState } from "@wordpress/element"


import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, ToolbarItem, DuotonePicker, DuotoneSwatch } from '@wordpress/components';



export default function Edit(props) {
  const blockProps = useBlockProps()
  const altText = props.attributes.altText;

  const DUOTONE_PALETTE = [
    { colors: ['#8c00b7', '#fcff41'], name: 'Purple and yellow', slug: 'purple-yellow' },
    { colors: ['#000097', '#ff4747'], name: 'Blue and red', slug: 'blue-red' },
  ]

  const COLOR_PALETTE = [
    { color: '#ff4747', name: 'Red', slug: 'red' },
    { color: '#fcff41', name: 'Yellow', slug: 'yellow' },
    { color: '#000097', name: 'Blue', slug: 'blue' },
    { color: '#8c00b7', name: 'Purple', slug: 'purple' },
  ]
  const [duotone, setDuotone] = useState(['#000000', '#ffffff']);

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
          // Remover o domínio da URL completa
          let correctedSPath = imageURLSWebp.replace(siteUrl, '');
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

  function buttonHandler() {
    setIsLinkPickerVisible(prev => !prev)
  }

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink })
  }
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)
  const [isDuoToneVisible, setIsDuoToneVisible] = useState(false)
 
  const closeDuotonePopover = () => {
    setIsDuoToneVisible(false);
  };

  return (
    <div {...blockProps}>


      <InspectorControls>
        <PanelBody title="Select Image" initialOpen={true}>
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
          <PanelRow>
            <TextControl
              label="Alt Text"
              value={altText}
              onChange={(value) => setAttributes({ altText: value })}
            />
          </PanelRow>
          <PanelRow>
            <BlockControls>
              <ToolbarGroup>
                <ToolbarButton
                  icon="align-full-width"
                  label="Alinhar Largura Total"
                  onClick={() => props.setAttributes({ align: 'full' })}
                />
                <ToolbarButton
                  icon="align-wide"
                  label="Alinhar Largura Ampla"
                  onClick={() => props.setAttributes({ align: 'wide' })}
                />
                <ToolbarButton
                  icon="image-filter"
                  label="Duo Tone"
                  onClick={() => setIsDuoToneVisible(true)}
                />

                <ToolbarGroup>
                  <ToolbarButton onClick={buttonHandler} icon="admin-links" />
                </ToolbarGroup>


              </ToolbarGroup>
              <ToolbarGroup>
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={onFileSelect}
                    value={props.attributes.imgID}
                    render={({ open }) => {
                      return <Button onClick={open}>Substituir</Button>
                    }}
                  />
                </MediaUploadCheck>
              </ToolbarGroup>
            </BlockControls>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
       {isLinkPickerVisible && (
        <Popover position="middle center">
          <LinkControl
            settings={[]}
            value={props.attributes.linkObject}
            onChange={handleLinkChange}
          />
          <Button
            variant="primary"
            onClick={() => setIsLinkPickerVisible(false)}
            style={{ display: "block", width: "100%" }}
          >
            Confirm Link
          </Button>
        </Popover>
      )}
      {isDuoToneVisible && (
        <Popover onClose={closeDuotonePopover} position="middle center">

          <DuotonePicker
            duotonePalette={DUOTONE_PALETTE}
            colorPalette={COLOR_PALETTE}
            value={duotone}
            onChange={setDuotone}
          />
          <DuotoneSwatch values={duotone} />

        </Popover>
      )}
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
