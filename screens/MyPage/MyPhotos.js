import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  useWindowDimensions,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { Container, LoadingContainer } from "../../components/Shared";
import { currentUsernameVar } from "../../apollo";

export const SEE_PHOTOS_QUERY = gql`
  query SeePhotos($username: String!) {
    seePhotos(username: $username) {
      photo
      isPublic
      post {
        id
      }
      record {
        id
      }
      isMine
      createdAt
    }
  }
`;

const MyPhotos = ({ navigation }) => {
  const username = currentUsernameVar();
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);

  const { data, loading, error, refetch } = useQuery(SEE_PHOTOS_QUERY, {
    variables: { username: username },
    fetchPolicy: "network-only",
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading || !data?.seePhotos) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="small" color="white" />
      </LoadingContainer>
    );
  }
  if (data?.seePhotos.length === 0) {
    return (
      <LoadingContainer>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "JostMedium",
            paddingBottom: 100,
          }}
        >
          Nothing to show
        </Text>
      </LoadingContainer>
    );
  }

  // Sort the photos by a timestamp field in descending order
  const sortedPhotos = data.seePhotos
    .flatMap((photo) => {
      let photos = [];
      if (photo.record && photo.record.id) {
        photos.push({
          ...photo,
          key: `record-${photo.record.id}`,
        });
      }
      if (photo.post && photo.post.id) {
        photos.push({
          ...photo,
          key: `post-${photo.post.id}`,
        });
      }
      return photos;
    })
    .sort(
      (a, b) =>
        new Date(parseInt(b.createdAt)) - new Date(parseInt(a.createdAt))
    );

  const renderItem = ({ item }) => {
    const navigateToDetail = () => {
      if (item.record && item.record.id) {
        navigation.navigate("RecordDetail", { id: item.record.id });
      } else if (item.post && item.post.id) {
        navigation.navigate("PostDetail", { id: item.post.id });
      }
    };
    return (
      <TouchableOpacity onPress={navigateToDetail}>
        <Image
          source={{ uri: item.photo }}
          style={{ width: width / numColumns, height: width / numColumns }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <FlatList
        numColumns={numColumns}
        data={sortedPhotos}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="white"
          />
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </Container>
  );
};

export default MyPhotos;
