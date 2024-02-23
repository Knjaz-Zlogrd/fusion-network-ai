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
  { id: "worldDomination", title: "World Domination" },
  { id: "sprintPlanning", title: "Sprint Planning :(" },
  { id: "nerdConvention", title: "Nerd Conventions" },
  { id: "doomsdayDeviceBuilding", title: "Doomsday Device Building" },
  { id: "takingTheHobbitsToIsengard", title: "Taking the hobbits to Isengard" },
  { id: "timeTraveling", title: "Time Traveling" },
  { id: "sillyWalking", title: "Silly Walking" },
  { id: "mainFramHacking", title: "Mainframe Hacking" },
  { id: "bigRocks", title: "Big Rocks Handling" },
  { id: "artsAndCrafts", title: "Arts and Crafts" },
  { id: "music", title: "Music" },
  { id: "outdoorActivities", title: "Outdoor Activities" },
  { id: "indoorActivities", title: "Indoor Activities" },
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
};

type CategoriesProps = {
  currentUser: User | undefined;
  ownKey: string | undefined;
};

const Categories = ({ currentUser, ownKey }: CategoriesProps) => {
  const dispatch = useAppDispatch();

  // const selectedCategories = useAppSelector(
  //   (state) => state.categoriesSlice.categories
  // );

  const selectedCategories = currentUser?.categories;

  const [availableCategories, setAvailableCategories] = useState(
    INIT_CATEGORIES.filter(
      (category) => !selectedCategories?.find((item) => item?.id == category.id)
    )
  );

  const reference = ref(db, "users/" + ownKey);

  const handleAddCategory = (categoryToAdd: Category) => {
    const categories = currentUser?.categories || [];
    if (currentUser) {
      set(reference, {
        ...currentUser,
        categories: [
          ...categories,
          { id: categoryToAdd.id, title: categoryToAdd.title },
        ],
      });
    }
    // dispatch(addCategory(category));
    setAvailableCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== categoryToAdd.id)
    );
  };

  const handleRemoveCategory = (categoryToRemove: Category) => {
    // dispatch(removeCategory(categoryId));
    if (currentUser) {
      const updatedCategories = currentUser.categories.filter(
        (cat) => cat.id !== categoryToRemove.id
      );
      set(reference, { ...currentUser, categories: updatedCategories });
    }
    if (categoryToRemove) {
      setAvailableCategories((prevCategories) => [
        ...prevCategories,
        categoryToRemove,
      ]);
    }
  };

  return (
    <VStack>
      <HStack>
        <VStack>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            borderColor="gray.150"
            p="4"
            h="750px"
            w="250px"
            bg="app.accent"
            boxShadow="md"
            sx={{
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              scrollbarWidth: "none",
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "24px",
              },
              _hover: {
                "&::-webkit-scrollbar-thumb": {
                  background: "grey",
                },
              },
            }}
          >
            <VStack>
              <Heading as="h4" size="sm" marginBottom="4">
                Available Categories
              </Heading>
              {availableCategories.map((value, index) => {
                return (
                  <Tag
                  textAlign="center"
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
          <Box
            borderWidth="1px"
            borderRadius="lg"
            borderColor="gray.150"
            p="4"
            h="750px"
            w="250px"
            bg="app.accent"
            boxShadow="md"
            sx={{
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              scrollbarWidth: "none",
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "24px",
              },
              _hover: {
                "&::-webkit-scrollbar-thumb": {
                  background: "grey",
                },
              },
            }}
          >
            <VStack>
              <Heading as="h4" size="sm" marginBottom="4">
                Added Categories
              </Heading>
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
