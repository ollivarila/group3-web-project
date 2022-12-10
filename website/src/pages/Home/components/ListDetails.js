import ItemForm from "./ItemForm"
const form = ItemForm
const ListDetails = () => {

    return (
        <div className="workout-details">
          <h4>{form.details.name}</h4>
          <p><strong>Amount: </strong>{form.details.amount}</p>
          <p><strong>Unit: </strong>{form.details.unit}</p>
        </div>
      )
}

export default ListDetails