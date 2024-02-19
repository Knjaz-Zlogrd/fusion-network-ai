import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppDispatch, RootState } from "../../store";
import { addCategory, removeCategory } from "../../store/categoriesSlice";
import { useSelector } from "react-redux";
import { Heading, HStack, VStack, Box, Tag } from "@chakra-ui/react";

const INIT_CATEGORIES = [
  { id: "sports", title: "Sports" },
  { id: "outdoorActivities", title: "Outdoor Activities" },
  { id: "indoorActivities", title: "Indoor Activities" },
  { id: "artsAndCrafts", title: "Arts and Crafts" },
  { id: "music", title: "Music" },
  { id: "dance", title: "Dance" },
  { id: "cooking", title: "Cooking" },
  { id: "reading", title: "Reading" },
  { id: "gardening", title: "Gardening" },
  { id: "gaming", title: "Gaming" },
  { id: "yoga", title: "Yoga" },
  { id: "meditation", title: "Meditation" },
  { id: "volunteering", title: "Volunteering" },
  { id: "learning", title: "Learning" },
  { id: "socializing", title: "Socializing" },
];

interface Category {
  id: string;
  title: string;
}

const Categories = () => {
  const selectedCategories = useSelector(
    (state: RootState) => state.categoriesSlice.categories
  );

  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    INIT_CATEGORIES.filter(
      (category) => !selectedCategories.find((item) => item.id == category.id)
    )
  );

  const dispatch = useAppDispatch();

  const handleAddCategory = (category: Category) => {
    dispatch(addCategory(category));
    setAvailableCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== category.id)
    );
  };

  const handleRemoveCategory = (category: Category) => {
    dispatch(removeCategory(category.id));
    setAvailableCategories((prevCategories) => [...prevCategories, category]);
  };

  return (
    <VStack w="full">
      <Heading as="h2" size="lg" marginBottom="4">
        Select Categories
      </Heading>
      <HStack>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          borderColor="gray.150"
          p="4"
          h="700px"
          w="200px"
          bg="app.accent"
        >
          <VStack>
            {availableCategories.map((value, index) => {
              return (
                <Tag
                  _hover={{ cursor: "pointer" }}
                  size="lg"
                  key={index}
                  bg="app.primary"
                  color="white"
                  onClick={() => handleAddCategory(value)}
                >
                  {value.title}
                </Tag>
              );
            })}
          </VStack>
        </Box>
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        <Box
          borderWidth="1px"
          borderRadius="lg"
          borderColor="gray.150"
          p="4"
          h="700px"
          w="200px"
          bg="app.accent"
        >
          <VStack>
            {selectedCategories.map((value, index) => {
              return (
                <Tag
                  bg="app.primary"
                  color="white"
                  key={index}
                  _hover={{ cursor: "pointer" }}
                  size="lg"
                  onClick={() => handleRemoveCategory(value)}
                >
                  {value.title}
                </Tag>
              );
            })}
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
};

export default Categories;
