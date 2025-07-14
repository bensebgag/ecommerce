import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useNavigation, useLocalSearchParams, router } from 'expo-router';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PaymentScreen() {
    const navigation = useNavigation();
    const { totalAmount } = useLocalSearchParams();
    const total = typeof totalAmount === 'string' ? parseFloat(totalAmount) : 0;

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('card');

    const handleGoBack = () => {
        if (navigation.canGoBack()) navigation.goBack();
        else router.replace('/chart');
    };

    const formatCardNumber = (text: string) => {
        // Remove any non-digit characters
        const cleaned = text.replace(/\D/g, '');
        // Add space after every 4 digits
        const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
        return formatted.substring(0, 19); // Limit to 16 digits (19 with spaces)
    };

    const formatExpDate = (text: string) => {
        // Remove any non-digit characters
        const cleaned = text.replace(/\D/g, '');

        if (cleaned.length >= 3) {
            return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
        }

        return cleaned;
    };

    const handleSubmit = () => {
        if (!cardNumber || !cardName || !expDate || !cvv) {
            Alert.alert('Incomplete Form', 'Please fill in all the required fields');
            return;
        }

        setLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Payment Successful',
                'Your order has been placed successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/(tabs)')
                    }
                ]
            );
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                            <FontAwesome5 name="arrow-left" size={20} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Payment</Text>
                        <View style={styles.placeholderView} />
                    </View>

                    {/* Order Summary */}
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryTitle}>Order Summary</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Order Total</Text>
                            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>$5.99</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Tax</Text>
                            <Text style={styles.summaryValue}>${(total * 0.08).toFixed(2)}</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>${(total + 5.99 + (total * 0.08)).toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Payment Method Selector */}
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentMethodsContainer}>
                        <TouchableOpacity
                            style={[styles.paymentMethod, selectedPayment === 'card' && styles.selectedPayment]}
                            onPress={() => setSelectedPayment('card')}
                        >
                            <AntDesign name="creditcard" size={24} color={selectedPayment === 'card' ? "#F97316" : "#666"} />
                            <Text style={[styles.paymentText, selectedPayment === 'card' && styles.selectedPaymentText]}>Credit Card</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.paymentMethod, selectedPayment === 'paypal' && styles.selectedPayment]}
                            onPress={() => setSelectedPayment('paypal')}
                        >
                            <FontAwesome5 name="paypal" size={24} color={selectedPayment === 'paypal' ? "#F97316" : "#666"} />
                            <Text style={[styles.paymentText, selectedPayment === 'paypal' && styles.selectedPaymentText]}>PayPal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.paymentMethod, selectedPayment === 'apple' && styles.selectedPayment]}
                            onPress={() => setSelectedPayment('apple')}
                        >
                            <FontAwesome name="apple" size={24} color={selectedPayment === 'apple' ? "#F97316" : "#666"} />
                            <Text style={[styles.paymentText, selectedPayment === 'apple' && styles.selectedPaymentText]}>Apple Pay</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Card Details Form */}
                    {selectedPayment === 'card' && (
                        <View style={styles.cardForm}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Card Number</Text>
                                <View style={styles.inputWithIcon}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="4242 4242 4242 4242"
                                        placeholderTextColor="#999"
                                        value={cardNumber}
                                        onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                                        keyboardType="numeric"
                                        maxLength={19}
                                    />
                                    <View style={styles.cardIcons}>
                                        <FontAwesome5 name="cc-visa" size={20} color="#1A1F71" style={styles.cardIcon} />
                                        <FontAwesome5 name="cc-mastercard" size={20} color="#EB001B" style={styles.cardIcon} />
                                        <FontAwesome5 name="cc-amex" size={20} color="#2E77BC" style={styles.cardIcon} />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Cardholder Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="John Doe"
                                    placeholderTextColor="#999"
                                    value={cardName}
                                    onChangeText={setCardName}
                                />
                            </View>

                            <View style={styles.rowInputs}>
                                <View style={[styles.inputGroup, {flex: 1, marginRight: 10}]}>
                                    <Text style={styles.inputLabel}>Expiration Date</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="MM/YY"
                                        placeholderTextColor="#999"
                                        value={expDate}
                                        onChangeText={(text) => setExpDate(formatExpDate(text))}
                                        keyboardType="numeric"
                                        maxLength={5}
                                    />
                                </View>

                                <View style={[styles.inputGroup, {flex: 1}]}>
                                    <Text style={styles.inputLabel}>CVV</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="123"
                                        placeholderTextColor="#999"
                                        value={cvv}
                                        onChangeText={(text) => setCvv(text.replace(/\D/g, '').substring(0, 3))}
                                        keyboardType="numeric"
                                        maxLength={3}
                                        secureTextEntry
                                    />
                                </View>
                            </View>
                        </View>
                    )}

                    {selectedPayment === 'paypal' && (
                        <View style={styles.alternativePayment}>
                            <FontAwesome5 name="paypal" size={50} color="#003087" />
                            <Text style={styles.alternativeText}>You'll be redirected to PayPal to complete your payment</Text>
                        </View>
                    )}

                    {selectedPayment === 'apple' && (
                        <View style={styles.alternativePayment}>
                            <FontAwesome name="apple" size={50} color="#000" />
                            <Text style={styles.alternativeText}>You'll be redirected to Apple Pay to complete your payment</Text>
                        </View>
                    )}

                    {/* Shipping Address */}
                    <View style={styles.addressSection}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Shipping Address</Text>
                            <TouchableOpacity>
                                <Text style={styles.editLink}>Change</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.addressCard}>
                            <View style={styles.addressRow}>
                                <Ionicons name="location-outline" size={20} color="#666" />
                                <View style={styles.addressTextContainer}>
                                    <Text style={styles.addressName}>John Doe</Text>
                                    <Text style={styles.addressText}>123 Main Street, Apt 4B</Text>
                                    <Text style={styles.addressText}>New York, NY 10001</Text>
                                    <Text style={styles.addressText}>United States</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={styles.payButton}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <Text style={styles.payButtonText}>Processing...</Text>
                        ) : (
                            <Text style={styles.payButtonText}>Pay ${(total + 5.99 + (total * 0.08)).toFixed(2)}</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.secureInfo}>
                        <MaterialCommunityIcons name="shield-check-outline" size={18} color="#666" />
                        <Text style={styles.secureText}>Secure payment processing</Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: 'white',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    placeholderView: {
        width: 40,
    },
    summaryCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#666',
    },
    summaryValue: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F97316',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 24,
        marginBottom: 12,
        marginLeft: 16,
    },
    cardForm: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    },
    rowInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputWithIcon: {
        position: 'relative',
    },
    cardIcons: {
        position: 'absolute',
        right: 12,
        top: 15,
        flexDirection: 'row',
    },
    cardIcon: {
        marginLeft: 8,
    },
    payButton: {
        backgroundColor: '#F97316',
        borderRadius: 12,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 8,
    },
    payButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    secureInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        marginTop: 8,
    },
    secureText: {
        color: '#666',
        fontSize: 14,
        marginLeft: 6,
    },
    paymentMethodsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 8,
    },
    paymentMethod: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 4,
    },
    selectedPayment: {
        borderColor: '#F97316',
        backgroundColor: '#FFF7ED',
    },
    paymentText: {
        fontSize: 12,
        marginTop: 8,
        color: '#666',
    },
    selectedPaymentText: {
        color: '#F97316',
        fontWeight: '500',
    },
    alternativePayment: {
        backgroundColor: 'white',
        borderRadius: 12,
        marginHorizontal: 16,
        marginTop: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    alternativeText: {
        textAlign: 'center',
        marginTop: 16,
        color: '#666',
        fontSize: 15,
    },
    addressSection: {
        marginHorizontal: 16,
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    editLink: {
        color: '#F97316',
        fontSize: 15,
        fontWeight: '500',
    },
    addressCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    addressTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    addressName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    addressText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
    },
});