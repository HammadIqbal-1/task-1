import { useEffect, useState } from "react";
import styled from "styled-components";
import Paginate from "../Components/Paginate";
import { Link, Navigate } from "react-router-dom";
// Navigate
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostFromApi } from "../store/api/actions";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const Home = () => {
  const dispatch = useDispatch();
  // useState
  const [currentPage, setCurrentPage] = useState(1);
  const [postperPage] = useState(4);
  const [filter, setFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // logout logic
  const handlelogout = () => {
    localStorage.clear();
    <Navigate to="/" />;
    window.location.reload();
  };

  // get user pic
  let userImg = localStorage.getItem("img");
  let username = localStorage.getItem("userName");

  // modal logic
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
          <CircleButton onClick={toggleModal}>
            <ImageWrapper src={userImg} alt="img" />
          </CircleButton>

          {isModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <IoIosClose
                  style={{ cursor: "pointer" }}
                  onClick={toggleModal}
                />
                <h4>user name:{username}</h4>
                <CloseButton onClick={handlelogout}>Logout</CloseButton>
              </ModalContent>
            </ModalOverlay>
          )}
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const CloseButton = styled.button`
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const CircleButton = styled.div`
  height: 55px;
  width: 55px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid gray;
`;
const ImageWrapper = styled.img`
  height: 39px;
  width: 39px;
  padding: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BoxWrapper = styled.div`
  width: 30%;
  margin: 20px;
  border: 1px solid gray;
  border-radius: 18px;
  padding: 10px;
  cursor: pointer;
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
