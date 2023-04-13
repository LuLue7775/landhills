import { StyledImage, StyledObjectContent } from '@/styles/styles'

export default function Object({ object }) {
    return (
        <div>
            {object?.object_image?.guid ?
                <StyledImage
                    className="images"
                    draggable="false"
                    src={object.object_image.guid}
                    alt="image"
                    style={{ height: 'auto', width: `${object.object_width}px`, maxWidth: `${object.object_width}px` }}
                /> : ''}

            {object.object_content ?
                <StyledObjectContent
                    className="editor object circular-medium"
                    object_width={object.object_width}
                    circular_medium={object?.is_editor_font_circular_medium === '1'}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(object?.object_content) }} />
                : ''
            }

        </div>)
}
