import { Editor } from "../components/CreateBlog/Editor"
import { Navbar } from "../components/Navbar"

export default function Blog(){
    return (
        <div>
            <Navbar/>
            <Editor/>
            {/* <Editor 
                blogId={"cbd51c59-662b-4971-a8ea-ee036bcb76bb"} 
                titleContent={"The Impact of AI on Modern Workplaces"} 
                blogContent={"The impact of artificial intelligence (AI) on modern workplaces is profound and multifaceted, driving significant transformations in how businesses operate and employees perform their roles. AI technologies, from machine learning algorithms to advanced automation, are reshaping industries by enhancing efficiency, accuracy, and productivity. For instance, AI-driven tools can analyze vast amounts of data swiftly, providing insights that drive strategic decision-making and streamline operations. Automation of repetitive tasks reduces human error and frees up employees to focus on more complex, creative, and value-added activities.  However, this shift also brings challenges. The rise of AI raises concerns about job displacement as routine tasks become automated, necessitating reskilling and upskilling for workers to remain relevant in an evolving job market. There is also an ethical dimension, as companies must navigate issues related to privacy, data security, and the responsible use of AI technologies.  Ultimately, the integration of AI into modern workplaces offers significant benefits but requires thoughtful implementation and a focus on supporting workers through transitions. By addressing these challenges proactively, businesses can harness the power of AI to drive innovation and create a more dynamic and efficient work environment."} 
                tagsContent={["AI","Automation","Workplace","Technology","FutureOfWork"]}/> */}
        </div>
    )
}