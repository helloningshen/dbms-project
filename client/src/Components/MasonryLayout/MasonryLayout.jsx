// import styles of this component
import styles from "./MasonryLayout.module.css"
import Masonry from "react-masonry-css"
import MasonryBox from './MasonryBox/MasonryBox';

// MasonryLayout Component
const MasonryLayout = ({ images, files }) => {
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
      {files.map(item => (
        <MasonryBox
          key={item.id}
          filename={item.filename}
          authorName={item.author}
          type={item.type}
          wallSrc={item.thumbnail.src}
          userProf={item.thumbnail.user.src}
          userName={item.thumbnail.user.name}
          userJob={item.thumbnail.user.job}
          id={item.id}
          path={item.file_path}
          mimetype={item.file_mimetype}
        />
      ))}
    </Masonry>
  )
}

export default MasonryLayout