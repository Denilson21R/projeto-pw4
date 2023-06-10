import {apiUrl} from "../utils/config";

export default function FormRecipeComment({ idRecipe }) {
    return (
        <>
            <div className="col-span-full mx-10">
                <form onSubmit={handleAddComment}>
                    <div className="mt-2">
                        <textarea
                            id="comment"
                            name="comment"
                            rows={3}
                            placeholder={'Escreva um comentário...'}
                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            required={true}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className=" flex mt-2 w-1/12 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Comentar
                        </button>
                    </div>
                </form>
            </div>
        </>
    )

    function handleAddComment(event) {
        event.preventDefault()
        const comment = document.getElementById("comment").value;
        if(comment !== "") {
            const commentData = {
                text: comment,
                recipeId: idRecipe
            }
            requestAddComment(commentData)
        }
    }

    function requestAddComment(commentData) {
        apiUrl.post("/comment", commentData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            if (response.status === 201) {
                resetFormComment()
                window.location.reload() //TODO: change this to update the comments without reloading the page
            }
        })
    }

    function resetFormComment() {
        document.getElementById("comment").value = "";
    }
}