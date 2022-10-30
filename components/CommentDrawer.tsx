import { ReactNode, useEffect, useState } from "react";
import styles from "./CommentDrawer.module.scss";

type Props = {
  isOpen: Boolean;
  onClose: () => void;
  children?: ReactNode;
};

const CommentDrawer = (props: Props) => {
  const { isOpen = false, onClose, children } = props;
  const [open, setOpen] = useState<Boolean>(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <div>
      <div
        className={styles.comment_drawer}
        style={open ? {} : { visibility: "hidden" }}
      >
        <div
          className={styles.mask}
          onClick={() => {
            if (typeof onClose === "function") {
              onClose();
            }
          }}
        ></div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default CommentDrawer;
