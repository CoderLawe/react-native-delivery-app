import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeauturedRow";
import client, { urlFor } from "../sanity";

const HomeScreen = () => {
  const Navigation = useNavigation();

  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"]{
          ...,
          restaurants[] -> {
            ...,
            dishes[]->,
            type-> {
              name
            }
          },
        }
        
    `
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  // useEffect(() => {
  //   const items = fetch(
  //     "https://b7nklrlw.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22featured%22%5D%7B%0A%20%20...%2C%0A%20%20restaurants%5B%5D%20-%3E%20%7B%0A%20%20%20%20...%2C%0A%20%20%20%20dishes%5B%5D-%3E%2C%0A%20%20%20%20type-%3E%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%7D%0A"
  //   ).then(() => {
  //     setFeaturedCategories(items);
  //   });

  //   console.log("items", items);
  // }, []);
  console.log("featuredCategories", featuredCategories);

  return (
    // Safearea view makes it that the content is not cut off at the top or bottom
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}

      <View className="flex-row pb-3 items-center mx-4  space-x-2 px-4">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-6 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>

          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>
      {/* Search box section */}

      <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3 items-center">
          {/* SearchIcon */}
          <MagnifyingGlassIcon color="#00CCBB" size={20} />
          <TextInput
            placeholder="Restaurants and Cuisines"
            keyboardType="default"
          />
        </View>
        <View>
          <AdjustmentsVerticalIcon color="#00CCBB" />
        </View>
      </View>

      {/* Scrollable section 1 */}
      <ScrollView className="bg-gray-100">
        {/* Top categories section */}
        <Categories />
        {/* Featured rows */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
