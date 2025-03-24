import { Link } from "expo-router";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFetch from "../../services/useFetch";
import { fetchMovies } from "../../services/api";

export default function Index() {
  const {
    data: movies,
    loading,
    error,
  } = useFetch<Movie[]>(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-white pt-12">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-2xl font-bold">Latest Movies</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        {loading && <Text className="text-gray-500">Loading...</Text>}

        {error && <Text className="text-red-500">Error: {error.message}</Text>}

        {movies?.map((movie: any) => (
          <TouchableOpacity key={movie.id} className="mr-4">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              className="w-32 h-48 rounded-lg"
            />
            <Text
              numberOfLines={1}
              className="w-32 mt-2 text-center font-medium"
            >
              {movie.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
