import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoryCard = ({ title, imgUrl }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-20 w-20 bg-gray-300 p-4 rounded"
      />

      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}s
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
