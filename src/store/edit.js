const { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps, RichText } = wp.blockEditor;
const { Button, PanelBody, PanelRow } = wp.components;

const Edit = (props) => {
    const blockProps = useBlockProps()
    const { attributes, setAttributes } = props;
    const { cards } = attributes;

    const onFileSelect = (index, media) => {
        const newCards = [...attributes.cards];
        newCards[index] = {
            ...newCards[index],
            imgID: media.id,
            imgURL: media.url,
            imgTbnURL: media.sizes.thumbnail.url
        };
        setAttributes({ cards: newCards });
    };

    const handleTextChange = (x, index) => {
        const newCards = [...attributes.cards];
        console.log(x)
        newCards[index] = {
            ...newCards[index],
            imgDescript: x
        };
        setAttributes({ cards: newCards });
    };


    return (
        <div {...blockProps}>
            <div style={{ display: 'flex', flexWrap: 'wrap', 'justify-content': 'space-around', height: 'auto' }}>
                {cards.map((card, index) => (
                    <div key={index} style={{ border: '1px solid black', backgroundColor: 'gray', display: 'block', flex: 1 }}>
                        
                        <div>
                            {card.imgURL && (
                                <img src={card.imgURL} alt={card.imgDescript} style={{ width: '80%', height: 'auto', 'margin-left': '10%' }} />
                            )}
                        </div>
                        <div style={{ 'font-size': '1.5rem' }}>

                            <RichText
                                allowedFormats={["core/bold", "core/italic"]}
                                value={card.imgDescript}
                                onChange={(x) => handleTextChange(x, index)}

                            />
                        </div>
                    </div>
                ))}
                <InspectorControls>
                    {cards.map((card, index) => (
                    
                        <div>

               
                        <div style={{outline: '1px solid black'}}>

<RichText
                                allowedFormats={["core/bold", "core/italic"]}
                                value={card.imgDescript}
                                onChange={(x) => handleTextChange(x, index)}
                                
                                />

                                </div>


                  
                        <div style={{'margin-bottom': '10px'}}>


                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => onFileSelect(index, media)}
                                value={card.imgID}
                                render={({ open }) => (
                                    <Button onClick={open} style={{ 'margin-left': '20%', 'font-size': '1.5rem' }} >Choose Image</Button>
                                )}
                                />
                        </MediaUploadCheck>
                                </div>
                                </div>
                    ))}
                </InspectorControls>
            </div>

        </div>
    );
};

export default Edit;
