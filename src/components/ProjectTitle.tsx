// const ProjectTitle = ( name: string ) => {

//     return (
//         <h2>{name}</h2>
//     )
// }
interface IProjectTitle {
    name: string
}

function ProjectTitle ({ name }: IProjectTitle) {

    return (
        <h2>{name}</h2>
    )
}

export default ProjectTitle