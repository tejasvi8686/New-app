import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useLocalSearchParams, router, Link } from "expo-router";
import { NewsDataType } from "@/types";
import axios from "axios";
import Loading from "@/components/Loading";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { NewsItem } from "@/components/NewsList";

type Props = {};

const SearchScreen: React.FC<Props> = () => {
  const { query, country, category } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();

  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async (category: string = "") => {
    try {
      let categoryString = category ? `&category=${category}` : "";
      let countryString = country ? `&country=${country}` : "";
      let queryString = query ? `&q=${query}` : "";

      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString} `;
      const response = await axios.get(URL);

      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color="black" />
            </TouchableOpacity>
            
          ),

          
          title: "Search",
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size={"large"} />
        ) : (
          <FlatList
            data={news}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => `list_item${index}`}
            renderItem={({ index, item }) => {
              return (
                <Link href={`/news/${item.article_id}`} asChild key={index}>
                  <TouchableOpacity>
                    <NewsItem item={item} />
                  </TouchableOpacity>
                </Link>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
