import { useEffect, useState } from "react";
import styled from "styled-components";
import Paginate from "../Components/Paginate";
import { Link } from "react-router-dom";
import Search from "../Components/Search";
import { IoMdHeart } from "react-icons/io";
import { useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";

const Home = () => {
  // useState
  const { wishList } = useSelector((state) => state.wishList);

  const [data, setData] = useState({ posts: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [postperPage] = useState(4);

  // Pagination logic
  const indexOfLastPost = currentPage * postperPage;
  const indexOfFirstPost = indexOfLastPost - postperPage;
  const currentPosts = data.posts.slice(indexOfFirstPost, indexOfLastPost);

  // Fetch data for all posts
  const handleDataForAllPosts = async () => {
    try {
      const post = await fetch("https://dummyjson.com/posts");
      const res = await post.json();
      setData(res);
    } catch (err) {
      console.log("error while fetching data", err);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    handleDataForAllPosts();
  }, []);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <HeartWrapper>
          <Search />
          <NavigationLink to="/fav">
            {wishList.length > 0 ? <IoMdHeart /> : <CiHeart />}
            {wishList.length}
          </NavigationLink>
        </HeartWrapper>
        <Container>
          {currentPosts.map((e) => (
            <BoxWrapper key={e.id}>
              <NavigationLink to={`/dataAll/${e.id}`}>
                <div>
                  <h4>{e.title}</h4>
                  <p>{e.body.slice(0, 80).trimEnd() + "..."}</p>
                  <TagsAndReactionsWrapper>
                    <span>{Array.from(e.tags).join(" ")}</span>
                    <span>{e.reactions}</span>
                  </TagsAndReactionsWrapper>
                </div>
              </NavigationLink>
            </BoxWrapper>
          ))}
        </Container>
      </div>
      <Paginate
        currentPage={currentPage}
        postPerPage={postperPage}
        totalPosts={data.posts.length}
        paginate={paginate}
      />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
`;

const BoxWrapper = styled.div`
  width: 30%;
  margin: 20px;
  border: 1px solid gray;
  border-radius: 18px;
  padding: 10px;
`;

const TagsAndReactionsWrapper = styled.div`
  display: flex;
  color: gray;
  justify-content: space-between;
`;
const NavigationLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const HeartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

export default Home;
