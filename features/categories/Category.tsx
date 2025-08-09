import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS } from "@/Util/Colors";
import { useGategories } from "@/features/categories/useGategories";
import { Category } from "@/Util/type";
import Spinner from "@/components/Spinner";
import { useNavigation } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const byDufalte = {
  id: null,
  name: "All",
};

const CategorySlider = () => {
  const { setParams } = useNavigation();

  const { data: categories, isLoading, isError, error } = useGategories();
  const newCategories = [byDufalte, ...(categories ?? [])];
  const [selectedCategory, setSelectedCategory] = useState<Category>(byDufalte);

  function handleClickOnCategory(category: Category) {
    setSelectedCategory(category);
    setParams({ id: category.id });
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-xl text-red-500">{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text className={"text-xl mb-4 font-medium text-gray-950"}>
        Shop by Category
      </Text>
      <FlatList
        data={newCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => (item.id === null ? "" : item.id.toString())}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory.id === item.id && styles.selectedItem,
            ]}
            onPress={() => handleClickOnCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory.id === item.id && styles.selectedText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedItem: {
    backgroundColor: COLORS.Primary,
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    color: "#fff",
  },
});

export default CategorySlider;
