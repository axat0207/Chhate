import React from 'react'
import {Helmet} from  'react-helmet-async'


const Title = ({
    title = "Chat App",
    description = "This App allows to chat with anyone"
}) => {
  return (
    // <Helmet>
    //     <title>{title}</title>
    //     <meta name="description" content={description} />
    // </Helmet>
    <>
    Hello</>
  )
}

export default Title
