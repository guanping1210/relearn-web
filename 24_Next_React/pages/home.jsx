// 引入自定义组件
import CustomButton from "../component/Button";
import Image from "next/image";
// 存放到public，提供静态访问路径
// import profilePic from "../images/th.jpg";

// msg 是外部数据
const HomePage = ({ msg }) => {
  return (
    <div>
      <p>home page</p>
      <h4>数据获取和显示：</h4>
      <p>{msg}</p>
      <h4>自定义组件：</h4>
      <div>
        <CustomButton />
      </div>
      <h4>next自带的图片组件：</h4>
      <Image src="/th.jpg" alt="me" width="64" height="64" />
    </div>
  );
};

export default HomePage;

// 从外部获取数据
export async function getStaticProps() {
  // 可以调用API获取数据
  // const res = await fetch('')
  const msg = "我是接口获取的数据";
  console.log("静态页面打印一次，刷新页面不会答应");
  return {
    props: {
      msg,
    },
  };
}
