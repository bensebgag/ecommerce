import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
interface RideDetailCardProps {
  locationImages: string[];
  dateTime: Date;
  paymentStatus: "Paid" | "Pending" | "Failed";
  Invoice: string;
}

const { width: screenWidth } = Dimensions.get("window");
const imageWidth = screenWidth * 0.2;
const imageHeight = imageWidth * 0.4;

export const PaymentDetail: React.FC<RideDetailCardProps> = ({
  locationImages,
  dateTime,
  paymentStatus,
  Invoice,
}) => {
  const getPaymentStatusStyle = () => {
    switch (paymentStatus) {
      case "Paid":
        return {
          backgroundColor: "#E0F2F1",
          borderColor: "#4DB6AC",
          textColor: "#00796B",
        };
      case "Pending":
        return {
          backgroundColor: "#FFFDE7",
          borderColor: "#FFEE58",
          textColor: "#F9A825",
        };
      case "Failed":
        return {
          backgroundColor: "#FFEEEE",
          borderColor: "#EF9A9A",
          textColor: "#C62828",
        };
      default:
        return {
          backgroundColor: "#ECEFF1",
          borderColor: "#B0BEC5",
          textColor: "#455A64",
        };
    }
  };

  const paymentStyle = getPaymentStatusStyle();

  return (
    <View style={styles.card}>
      <View style={styles.sliderContainer}>
        <Text style={styles.sliderTitle}>Bill</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          decelerationRate="fast"
          snapToInterval={imageWidth + styles.image.marginRight} // Update snap interval
          snapToAlignment="start"
        >
          {locationImages.map((uri, index) => (
            <Image
              key={index}
              source={typeof uri === "string" ? { uri } : uri}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
          {locationImages.length === 0 && (
            <View style={[styles.image, styles.placeholderImage]}>
              <MaterialIcons
                name="image-not-supported"
                size={30}
                color="#B0BEC5"
              />
              <Text style={styles.placeholderText}>No images</Text>
            </View>
          )}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons
            name="newspaper-outline"
            size={18}
            color="#F38344"
            style={styles.icon}
          />

          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Invoice</Text>
            <Text style={styles.detailValue}>{Invoice}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome
            name="calendar-o"
            size={16}
            color="#F38344"
            style={styles.icon}
          />

          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{dateTime.toString()}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <FontAwesome
            name="credit-card-alt"
            size={16}
            color="#F38344"
            style={styles.icon}
          />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Payment Status</Text>
            <View
              style={[
                styles.paymentBadge,
                {
                  backgroundColor: paymentStyle.backgroundColor,
                  borderColor: paymentStyle.borderColor,
                },
              ]}
            >
              <Text
                style={[styles.paymentText, { color: paymentStyle.textColor }]}
              >
                {paymentStatus}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12, // Smaller radius
    padding: 14, // Reduced padding
    marginHorizontal: 12, // Reduced horizontal margin
    marginVertical: 8, // Reduced vertical margin
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3, // Slightly smaller shadow radius
    elevation: 2, // Adjusted elevation
  },
  sliderContainer: {
    marginBottom: 16, // Reduced margin
  },
  sliderTitle: {
    fontSize: 15, // Smaller font size
    fontWeight: "600",
    color: "#424242",
    marginBottom: 8, // Reduced margin
  },
  scrollViewContent: {
    paddingLeft: 0,
  },
  image: {
    width: imageWidth, // Uses updated smaller imageWidth
    height: imageHeight, // Uses updated smaller imageHeight
    borderRadius: 8, // Smaller radius for images
    marginRight: 10, // Reduced space between images
    backgroundColor: "#F5F5F5",
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E0E0E0",
  },
  placeholderText: {
    marginTop: 4,
    color: "#9E9E9E",
    fontSize: 10, // Smaller text
  },
  detailsContainer: {
    marginBottom: 8, // Reduced margin
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8, // Reduced padding
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
    marginBottom: 10, // Reduced space
  },
  icon: {
    marginRight: 12, // Reduced margin
    width: 18, // Ensure icons align well
    textAlign: "center",
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11, // Smaller label
    color: "#616161",
    marginBottom: 2, // Reduced margin
  },
  detailValue: {
    fontSize: 14, // Smaller value
    color: "#333333",
    fontWeight: "500",
  },
  paymentBadge: {
    paddingHorizontal: 8, // Reduced padding
    paddingVertical: 3, // Reduced padding
    borderRadius: 10, // Smaller radius
    borderWidth: 1,
    alignSelf: "flex-start",
    marginTop: 2, // Reduced margin
  },
  paymentText: {
    fontSize: 11, // Smaller text
    fontWeight: "500",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF5350",
    paddingVertical: 10, // Reduced padding
    borderRadius: 8, // Smaller radius
    marginTop: 12, // Reduced margin
  },
  cancelButtonIcon: {
    marginRight: 6, // Reduced margin
  },
  cancelButtonText: {
    color: "white",
    fontSize: 14, // Smaller text
    fontWeight: "600",
  },
});
