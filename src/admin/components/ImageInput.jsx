

export const ImageInput = ({ name, onChange }) => {
    return (
        <div className="mb-3">
            <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                //value={image}
                onChange={onChange}
            />
        </div>
    )
}
