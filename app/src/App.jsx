import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterData, setFilterdata] = useState(null);
  const [selectedbtn, setSelectedbtn] = useState("all");

  const filterFood = (type) => {
    if (type === "all") {
      setSelectedbtn("all");
      setFilterdata(data);
      return;
    }

    const filterValue = data?.filter((item) =>
      item.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilterdata(filterValue);
    setSelectedbtn(type);
    return;
  };

  const filterBtn = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
    {
      name: "Brunch",
      type: "Brunch",
    },
  ];

  const fetchFoodData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(BASE_URL);
      setData(res.data);
      setFilterdata(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error Occur");
    }
  };

  const searchFood = (ev) => {
    const searchItem = ev.target.value;

    const filterValue = data?.filter((item) =>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilterdata(filterValue);
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading....</div>;

  return (
    <>
      <Container>
        <HeaderSection>
          <div className="logo">
            <img src="/Foody Zone.svg" alt="logo image" />
          </div>
          <div className="searchInput">
            <input placeholder="Search Food..." onChange={searchFood} />
          </div>
        </HeaderSection>
        <FilterSection>
          {filterBtn.map((value) => (
            <Button 
            isSelected = {selectedbtn === value.type}
            key={value.name} onClick={() => filterFood(value.type)}>
              {value.name}
            </Button>
          ))}
        </FilterSection>
      </Container>
      <SearchResult foodData={filterData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderSection = styled.section`
  height: 150px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .searchInput {
    input {
      background-color: #454242;
      color: white;
      border: 1px solid #c14444;
      border-radius: 5px;
      height: 40px;
      width: 285px;
      font-size: 16px;
      padding: 0 15px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 110px;
  }
`;

const FilterSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  background-color: ${({isSelected})=> (isSelected ? "#575151" : "#ff4343")};
  outline: 1px solid ${({isSelected})=> (isSelected ? "white" : "#ff4343")};
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #575151;
  }
`;
