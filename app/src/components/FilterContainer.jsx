import styled from "styled-components";

const FilterContainer = () => {
  return (
    <FilterSection>
      <Button>All</Button>
      <Button>Breakfast</Button>
      <Button>Lunch</Button>
      <Button>Dinner</Button>
    </FilterSection>
  );
};

export default FilterContainer;

const FilterSection = styled.section`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  background-color: #ff4343;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ea2727;
  }
`;
