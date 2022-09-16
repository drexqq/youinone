import React from 'react';
interface IProjectTitle {
    name: string
}

function ProjectTitle ({ name }: IProjectTitle) {

    return (
        <h2>{name}</h2>
    )
}

export default ProjectTitle