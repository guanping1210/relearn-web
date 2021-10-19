// 服务器渲染 SSR
const ServerPage = ({ msg }) => {
  return (
    <div>
      <p>我是服务端渲染的</p>
    </div>
  );
};

export default ServerPage;

// 服务端渲染获取数据的方式 -> 每次页面请求时都会运行
export async function getServerSideProps() {
  // api 请求
  // const res = await fetch()
  const msg = "我是服务端渲染的";

  return {
    props: {
      msg,
    },
  };
}
