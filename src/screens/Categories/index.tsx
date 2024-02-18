import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
  const [availableCategories, setAvailableCategories] =
    useState<Category[]>(INIT_CATEGORIES);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleAddCategory = (category: Category) => {
    setSelectedCategories((prevCategories) => [...prevCategories, category]);
    setAvailableCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== category.id)
    );
  };

  const handleRemoveCategory = (category: Category) => {
    setAvailableCategories((prevCategories) => [...prevCategories, category]);
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== category.id)
    );
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
            {availableCategories.map((value) => {
              return (
                <Tag
                  _hover={{ cursor: "pointer" }}
                  size="lg"
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
            {selectedCategories.map((value) => {
              return (
                <Tag
                  bg="app.primary"
                  color="white"
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
