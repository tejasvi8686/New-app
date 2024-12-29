import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { NewsDataType } from "@/types";
import Loading from "@/components/Loading";
import { Colors } from "@/constants/Colors";
import Moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

export default function NewsDetails(props: Props) {
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      renderBookmark(news[0].article_id);
    }
  }, [isLoading]);

  const getNews = async () => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get(URL);
      //console.log(response.data);

      if (response && response.data) {
        setNews(response.data.results);
        console.log(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const saveBookmark = async (newsId: string) => {
    setBookmark(true);
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((value: string) => value === newsId);

        if (data == null) {
          res.push(newsId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("News Saved");
        }
      } else {
        let bookmark = [];
        bookmark.push(newsId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("News Saved");
      }
    });
  };

  const removeBookmark = async (newsId: string) => {
    setBookmark(false);
    const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      return res.filter((id: string) => id !== newsId);
    });

    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
    alert("News Removed");
  };

  const renderBookmark = async (newsId: string) => {
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);

      if (res != null) {
        let data = res.find((value: string) => value === newsId);
        return data == null ? setBookmark(false) : setBookmark(true);
      }
    });
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

          headerRight: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name={bookmark ? "heart" : "heart-outline"}
                size={22}
                color={bookmark ? "red" : "black"}
                onPress={() =>
                  bookmark
                    ? removeBookmark(news[0].article_id)
                    : saveBookmark(news[0].article_id)
                }
              />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />
      {isLoading ? (
        <Loading size={"large"} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          <Text style={styles.title}>{news[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>
              {" "}
              {Moment(news[0].pubDate).format("MMMM, DD, hh:mm a")}
            </Text>
            <Text style={styles.newsInfo}> {news[0].source_name}</Text>
          </View>
          <Image source={{ uri: news[0].image_url }} style={styles.newsImg} />
          {news[0].description ? (
            <Text style={styles.newsContent}> {news[0].description}</Text>
          ) : (
            <Text style={styles.newsContent}> {news[0].content}</Text>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },

  newsImg: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    letterSpacing: 0.6,
    color: Colors.black,
  },

  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  newsInfo: {
    fontSize: 12,
    color: Colors.darkGrey,
  },

  newsContent: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});
