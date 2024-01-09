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
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import styles from "./nearbyjobs.style";
import axios from "axios";

const Nearbyjobs = ({ title, search, showAll }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const options = {
          method: "GET",
          url: "https://jsearch.p.rapidapi.com/search",
          params: {
            query: search || "Nearby Jobs, Pakistan",
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
        <Text style={styles.headerTitle}>{title}</Text>
        {showAll && (
          <TouchableOpacity onPress={() => router.push("/search/Nearby Jobs")}>
            <Text style={styles.headerBtn}>Show all</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : (
          data?.data?.map((job) => (
            <NearbyJobCard
              key={job?.job_id}
              job={job}
              handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
