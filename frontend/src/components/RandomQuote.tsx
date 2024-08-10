import quotes from "../assets/quotes";

export default function RandomQuote(){
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="text-white cursor-default">
            <div className="">
                <div className="text-2xl font-bold p-4">"{randomQuote.sentence}"</div>
                <p className="p-4">-{randomQuote.person}</p>
            </div>
        </div>
    )
}