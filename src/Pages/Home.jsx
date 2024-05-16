import { useEffect, useState } from "react";
import styled from "styled-components";
import Paginate from "../Components/Paginate";
import { Link } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostFromApi } from "../store/api/actions";
import { IoSearchOutline } from "react-icons/io5";

const Home = () => {
  const dispatch = useDispatch();
  // useState
  const [currentPage, setCurrentPage] = useState(1);
  const [postperPage] = useState(4);
  const [filter, setFilter] = useState("");

  //useSelector
  const { wishList, postData, isLoading, isError } = useSelector(
    (state) => state.apiData
  );
  // console.log(postData, "postData");

  // useEffect
  useEffect(() => {
    dispatch(fetchPostFromApi());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred.</div>;
  }

  // Filtering logic
  const filteredPosts = postData.posts?.filter((e) =>
    e.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postperPage;
  const indexOfFirstPost = indexOfLastPost - postperPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <HeartWrapper>
          <Wrapper>
            <FilterWrapper
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="find anything"
            />
            <SearchBox>
              <IoSearchOutline />
            </SearchBox>
          </Wrapper>
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
                  <div></div>
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
        totalPosts={filteredPosts?.length}
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FilterWrapper = styled.input`
  padding: 10px;
  border-radius: 18px;
  border: 1px solid gray;
`;
const SearchBox = styled.div`
  display: flex;
  position: relative;
  top: 0;
  right: 25px;
  cursor: pointer;
  justify-content: center;
`;

export default Home;
