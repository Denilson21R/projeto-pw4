export default function RecipeComments({commentList}) {
    return (
        <div className="mx-10 mt-3">
            <div className="font-bold text-1xl">Comentários</div>
            <ul className="divide-y divide-gray-200">
                {commentList.length > 0 ? (commentList.map((comment) => (
                    <li key={comment.id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{comment.User.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.text}</p>
                            </div>
                        </div>
                    </li>
                ))): (
                    <span className="mt-3 inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        Nenhum comentário encontrado
                    </span>
                )}
            </ul>
        </div>
    )
}