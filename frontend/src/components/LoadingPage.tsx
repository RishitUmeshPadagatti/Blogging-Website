import LoadingGif from "../assets/loading.webp"

export const LoadingPage = () => {
    return <div className="w-full h-[100vh] flex justify-center items-center">
        <img src={LoadingGif} />
    </div>
}