import { useRouter } from "next/router";

const IndexPage = () => {
  const router = useRouter();
  return (
    <div>
      <h4>useRouter</h4>
      <span onClick={() => router.push("/home")}>点击我，跳转去home页面</span>
    </div>
  );
};

export default IndexPage;
