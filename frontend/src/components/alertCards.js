export default function AlertCards(props){
    if(props.listSize === 0) {
        return (
            <div className="flex justify-center">
                {props.text}
            </div>
        )
    }

}