import Input from "../components/input"
import styles from '/styles/feed.module.css'
import List from "../components/list"
import Searchbar from "../components/searchbar"
import { db } from '../firebase/firebaseConfig'
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, addDoc, getDocs, getDoc } from 'firebase/firestore'
import Post from '../components/post'
import BtnArrowUp from '../components/btnArrowUp'
import Footer from '../components/footer'
import Profilefeed from "../components/profileFeed"

export const getServerSideProps = async(context) => {
    const res = await getDocs(collection(db, "posts"))
    const post = res.docs
    .map((post) => post.data())
    const res1 = await getDocs(collection(db, "tags"))
    const tag = res1.docs
    .map((tag) => tag.data())
    if(post.length && tag.length){
       return{  
                props : {
                    post: post,
                    tag: tag,
                }
            } 
    }
    else{
        return{
            props: {},
        }
    }
}

const [isFiltered, setIsFiltered] = useState(false)



export default function Feed({post, tag}){
    
    return(
        <div className={styles.feedPage}><div>
            {tag.map((tag) => {
                console.log({tag})
            return(
                <div key={tag._id} >
               <button onClick={() => (handleTags())}>{tag.value}</button>
               </div>
            )
          })} </div>
        <div className={styles.header}>
            <div className={styles.left}><img src={'/images/Logo.svg'}/></div>
            <div className={styles.center}><Searchbar /></div>
            <div className={styles.right}><Profilefeed/></div></div>
        <div className={styles.content}>
            <div className={styles.left}><List/></div>
            <div className={styles.center}><div className={styles.firstinput}><Input /> </div>
                <div className={styles.feed}>
                <div className={styles.posts}>
                   isFiltered ? 'something' :
                {post.map((post) => {
                  return(
                      <div key={post._id} className={styles.post}>
                     <Post post={post}></Post>
                     </div>
                  )
                })}
                </div>
                </div>
            </div>
            <div className={styles.feedFooter}>
                <div className={styles.feedBtnArrowUp}>
                <BtnArrowUp/></div>
                <Footer/>
            </div>
        </div>
        </div>

    )
}