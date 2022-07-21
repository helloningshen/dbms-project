// import styles of this component
import styles from "../../css/masonry-layout.module.css"
import Masonry from "react-masonry-css"
import Masonry2 from "./masonry-box/masonry";

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
        <Masonry2
          key={item.id}
          filename={item.name}
          authorName={item.author}
          originalFileName={item.originalFileName}
          id={item.id}
          url={item.url}
        />
      ))}
    </Masonry>
  )
}

export default MasonryLayout