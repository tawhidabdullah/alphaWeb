import React from 'react'


interface Props {
    string: string
}
const HtmlString = ({ string }: Props) => {
    return <div dangerouslySetInnerHTML={{ __html: string }} />
};

export default HtmlString; 