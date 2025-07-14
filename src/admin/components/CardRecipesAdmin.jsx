import Swal from 'sweetalert2'
import { Link } from 'react-router';


export const CardRecipesAdmin = ({ recipe, handleDelete }) => {
    const { name, image, _id } = recipe;
    const host = import.meta.env.VITE_LOCAL_HOST
    const imageUrl = `${host}uploads/${image}`;
    const urlBase = import.meta.env.VITE_API_URL_BASE;

    return (
        <article className="card h-100">
            <div className="ratio ratio-1x1">
                <img className="card-img-top object-fit-cover" src={imageUrl} />
            </div>
            <div className="card-body">
                <h5 className="card-title fw-bold">{name}</h5>
                <div className="d-flex justify-content-between mt-3">
                    <Link to={`/edit/recipe/${_id}`} className="btn btn-green-border">Editar</Link>
                    <button
                        className="btn btn-red"
                        onClick={() => {
                            // se ejecuta la alerta
                            Swal.fire({
                                title: `¿Eliminar "${name}"?`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3fbd5fff',
                                cancelButtonColor: '#f14f33ff',
                                confirmButtonText: 'Eliminar',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    //isConfirmes es una propiedad de result. Si se confirma, elimina la receta
                                    handleDelete(_id);
                                    // Lanza otra alerta para avisar de que se eliminó correctamente
                                    Swal.fire('Eliminado', 'La receta ha sido eliminada.', 'success');
                                }
                            });
                        }}
                    >Eliminar</button>
                </div>

            </div>
        </article>
    )
}
