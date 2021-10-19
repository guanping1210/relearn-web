// 引入组件级别的样式
import styles from "./Button.module.scss";

const CustButton = () => {
  return <div className={styles.success}>我是自定义组件</div>;
};

export default CustButton;
