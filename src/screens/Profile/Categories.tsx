import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppDispatch, RootState, useAppSelector } from "../../store";
import { addCategory, removeCategory } from "../../store/categoriesSlice";
import { Heading, HStack, VStack, Box, Tag } from "@chakra-ui/react";
import { User, getKeyFromFirebaseId } from "../../store/usersSlice";
import { db, writeUserData } from "../../firebaseConfig";
import { ref, set } from "@firebase/database";

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

export type Category = {
  id: string;
  title: string;
}

type CategoriesProps = {
  currentUser: User | undefined;
}

const Categories = ({currentUser}: CategoriesProps) => {
  const dispatch = useAppDispatch();

  // const selectedCategories = useAppSelector(
  //   (state) => state.categoriesSlice.categories
  // );

  const selectedCategories = currentUser?.categories;

  const ownUid = useAppSelector((state) => state.loginSlice.uid)
  const ownKey = useAppSelector((state) => getKeyFromFirebaseId(state.usersSlice, ownUid ?? ''));

  const [availableCategories, setAvailableCategories] = useState(
    INIT_CATEGORIES.filter(
      (category) => !selectedCategories?.find((item) => item?.id == category.id)
    )
  );

  const reference = ref(db, 'users/' + ownKey);

  const handleAddCategory = (categoryToAdd: Category) => {
    const categories = currentUser?.categories || [];
    if (currentUser) {
      set(reference, {...currentUser, categories: [...categories, {id: categoryToAdd.id, title: categoryToAdd.title}]});
    }
    // dispatch(addCategory(category));
    setAvailableCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== categoryToAdd.id)
    );
  };

  const handleRemoveCategory = (categoryToRemove: Category) => {
    // dispatch(removeCategory(categoryId));
    if (currentUser) {
      const updatedCategories = currentUser.categories.filter(cat => cat.id !== categoryToRemove.id);
      set(reference, {...currentUser, categories: updatedCategories});
    }
    if (categoryToRemove) {
      setAvailableCategories((prevCategories) => [...prevCategories, categoryToRemove]);
    }
  };

  return (
    <VStack>
      <HStack>
        <VStack>
          <Heading as="h4" size="sm" marginBottom="4">
            Available Categories
          </Heading>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            borderColor="gray.150"
            p="4"
            h="700px"
            w="200px"
            bg="app.accent"
            boxShadow="md"
          >
            <VStack>
              {availableCategories.map((value, index) => {
                return (
                  <Tag
                    _hover={{ cursor: "pointer", bg: "app.secondary" }}
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
        </VStack>
        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        <VStack>
          <Heading as="h4" size="sm" marginBottom="4">
            Added Categories
          </Heading>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            borderColor="gray.150"
            p="4"
            h="700px"
            w="200px"
            bg="app.accent"
            boxShadow="md"
          >
            <VStack>
              {selectedCategories?.map((value, index) => {
                return (
                  <Tag
                    bg="app.primary"
                    color="white"
                    key={index}
                    _hover={{ cursor: "pointer", bg: "app.secondary" }}
                    size="lg"
                    onClick={() => handleRemoveCategory(value)}
                  >
                    {value?.title}
                  </Tag>
                );
              })}
            </VStack>
          </Box>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Categories;
