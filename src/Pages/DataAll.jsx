import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { IoMdHeart } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { addToWishList, removeFromWishList } from "../store/wishListSlice";

const DataAll = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const [fav, setFav] = useState(true);

  const [data, setData] = useState({ posts: [{}] });

  // useEffect for calling the api
  useEffect(() => {
    handleGetSinglePost();
  }, []);

  //  hitting api
  const handleGetSinglePost = async () => {
    try {
      const singlePost = await fetch(`https://dummyjson.com/posts/${param.id}`);
      const res = await singlePost.json();
      setData(res);
    } catch (error) {
      console.log("failed to get the post", error);
    }
  };

  return (
    <>
      <Container>
        <BoxWrapper>
          <div>
            <IconWrapper>
              <NavigationLink to="/">
                <RxCross2 />
              </NavigationLink>
              {fav ? (
                <CiHeart
                  onClick={() => {
                    dispatch(addToWishList(data)), setFav(false);
                  }}
                />
              ) : (
                <IoMdHeart
                  onClick={() => {
                    dispatch(removeFromWishList({id:data.id})), setFav(true);
                  }}
                />
              )}
            </IconWrapper>
            <h4>{data.title}</h4>
            <p>{data.body}</p>
            <TagsAndReactionsWrapper>
              <span>{data.tags}</span>
              <span>{data.reactions}</span>
            </TagsAndReactionsWrapper>
          </div>
        </BoxWrapper>
      </Container>
    </>
  );
};
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  margin-top: 8rem;
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
const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

export default DataAll;
