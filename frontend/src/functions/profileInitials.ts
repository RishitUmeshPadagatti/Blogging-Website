export function profileInitials(s: string): string{
    const words = s.split(" ")
    if (words.length>1){
        const first = words[0][0]
        const last = words[words.length-1][0]
        return (first+last).toUpperCase()
    }
    else if (words.length==1){
        return (words[0][0]+words[0][1]).toUpperCase()
    }
    else {
        return "U"
    }
}