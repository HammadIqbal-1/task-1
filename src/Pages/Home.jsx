import { useEffect, useState } from "react";
import styled from "styled-components";
import Paginate from "../Components/Paginate";
import { Link } from "react-router-dom";
import Search from "../Components/Search";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostFromApi } from "../store/actionSlice";

const Home = () => {
  const { wishList } = useSelector((state) => state.wishList);

  const [currentPage, setCurrentPage] = useState(1);
  const [postperPage] = useState(4);

  const dispatch = useDispatch();

  const postData = useSelector((state) => state.apiData?.postData?.posts);
  const isLoading = useSelector((state) => state?.apiData?.isLoading);
  const isError = useSelector((state) => state?.apiData?.isError);

  useEffect(() => {
    dispatch(fetchPostFromApi());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred.</div>;
  }


  // Pagination logic
  const indexOfLastPost = currentPage * postperPage;
  const indexOfFirstPost = indexOfLastPost - postperPage;
  const currentPosts = postData?.slice(indexOfFirstPost, indexOfLastPost);

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
          {currentPosts?.map((e) => (
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
        totalPosts={postData?.length}
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
