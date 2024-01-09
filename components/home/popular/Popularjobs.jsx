import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import styles from "./popularjobs.style";
import axios from "axios";

const Popularjobs = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const options = {
          method: "GET",
          url: "https://jsearch.p.rapidapi.com/search",
          params: {
            query: "Popular Jobs",
            page: "1",
            num_pages: "1",
          },
          headers: {
            "X-RapidAPI-Key":
              "4e3e166a71mshb3ac759c47d06fdp1ad209jsn477b20138460",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        };

        const response = await axios(options);
        // console.log(response.data);
        setData(response.data);
        setSelectedJob(response.data.data[0]?.job_id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity onPress={() => router.push("/search/Popular Jobs")}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : (
          <FlatList
            data={data.data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleCardPress={() => {
                  setSelectedJob(item.job_id);
                  router.push(`/job-details/${item.job_id}`);
                }}
                selectedJob={selectedJob}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
