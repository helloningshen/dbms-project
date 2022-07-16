// import styles of this component
import styles from "./MasonryLayout.module.css"
import Masonry from "react-masonry-css"
import MasonryBox from './MasonryBox/MasonryBox';

// MasonryLayout Component
const MasonryLayout = ({ images, docs }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles["my-masonry-grid"]}
      columnClassName={styles["my-masonry-grid_column"]}
    >
      {docs && docs.map(item => (
        <MasonryBox
          key={item.id}
          filename={item.filename}
          authorName={item.author}
          wallSrc={item.thumbnail.src}
          userProf={item.thumbnail.user.src}
          userName={item.thumbnail.user.name}
          userJob={item.thumbnail.user.job}
          id={item.id}
          url={item.url}
        />
      ))}
    </Masonry>
  )
}

export default MasonryLayout