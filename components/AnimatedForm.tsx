import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    TextInput,
    ScrollView,
    Image,
    Platform, KeyboardAvoidingView, Modal, TouchableWithoutFeedback
} from 'react-native';


import * as ImagePicker from 'expo-image-picker';

import DropDownCategory from "@/features/categories/DropDownCategory";
import {SafeAreaView} from "react-native-safe-area-context";
import AvailabeSizes from "@/features/sizesShoes/availabeSizes";
import {createNewProduct} from "@/Util/type";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createProduct} from "@/services/apiProducts";
import {useAuth} from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import Spinner from "@/components/Spinner";

const { height } = Dimensions.get('window');
 const defualtNewProduct = {
        name: "",
        description: "",
        images: [],
        sizeValues:[],
        categoryName:"",
        discount:"",
        price:"",
        quantity:"",
 }
const ProductForm = ({setOpen,open}) => {

    const [newProduct, setNewProduct] = React.useState<createNewProduct>(defualtNewProduct);

   const {getToken}=useAuth();
   const queryClient=useQueryClient();
    const {mutate:createNewProductMutation,error,isPending}=useMutation({
        mutationFn:async (product:FormData)=>{
            const token=await getToken();
          return  createProduct(token,product);
        },
        onSuccess:()=>{
          queryClient.invalidateQueries({queryKey:['products']})
            Toast.show({
                type:'success',
                text1:"new product created successfully",
            })
            setNewProduct(defualtNewProduct);
            setImages([]);
            setOpen(false);

        },
        onError:()=>{
          setOpen(false);
         Toast.show({
             type:'error',
             text1:error? error.message:"there was an error",
         })
        }


    })

    const updateProduct = (key:string, value:any) => {
        setNewProduct(prev => ({ ...prev, [key]: value }));
    };

    const [images, setImages] = React.useState([]);
    const pickImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("We need camera roll permissions!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            const uris = result.assets.map((a) => a.uri);
            setImages(uris);
            setNewProduct((prev) => ({ ...prev, images: uris }));
        }
    };

    const onSubmit = async () => {
        try {
            const data = new FormData();

            data.append('name', newProduct.name);
            data.append('price', newProduct.price);
            data.append('description', newProduct.description);
            data.append('quantity', newProduct.quantity);
            data.append('categoryName', newProduct.categoryName);
            newProduct.sizeValues.forEach(size =>
                data.append('sizeValues', String(parseInt(size, 10)))
            );

            // append images
            newProduct.images.forEach((uri, idx) => {
                const uriParts = uri.split('/');
                const filename = uriParts[uriParts.length - 1];
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : 'image';

                data.append('images', {
                    uri,
                    name: filename,
                    type,
                } as any);
            });

            createNewProductMutation(data);
            setImages([]);

        } catch (err) {
            console.error('Error preparing form data', err);
            Toast.show({
                type: 'error',
                text1: 'Failed to upload images',
            });
        }
    };


    return (
        <Modal
            visible={open}
            animationType="slide"
            transparent
            onRequestClose={() => setOpen(false)}
        >

            <SafeAreaView style={{height:'100%'}}>
            <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <KeyboardAvoidingView
                style={styles.modalWrapper}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <View style={styles.formContainer}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 20 }}
                        nestedScrollEnabled
                        keyboardShouldPersistTaps="handled"
                    >
                        <TextInput
                            placeholder="Name"
                            style={styles.input}
                            value={newProduct.name}
                            onChangeText={(text) => updateProduct("name", text)}

                        />

                           <TextInput
                            placeholder="Price"
                            style={styles.input}
                            value={newProduct.price}
                            onChangeText={(text) => updateProduct("price", text)}

                           />
                        <Text>Select Sizes</Text>
                        <AvailabeSizes SetNewProduct={setNewProduct} />
                           <TextInput
                            placeholder="Quantity"
                            style={styles.input}
                            value={newProduct.quantity}
                              onChangeText={(text) => updateProduct("quantity", text)}

                        />
                        <TextInput
                            placeholder="Discount"
                            style={styles.input}
                            value={newProduct.discount}
                             onChangeText={(text) => updateProduct("discount", text)}

                        />

                        <DropDownCategory SetNewProduct={setNewProduct} />
                        <TextInput
                            placeholder="Description"
                            style={[styles.input, styles.multiline]}
                            multiline
                            value={newProduct.description}
                              onChangeText={(text) => updateProduct("description", text)}

                        />


                        <TouchableOpacity
                            style={styles.imagePickerBtn}
                            onPress={pickImages}
                        >
                            <Text style={styles.sectionLabel}>Select Images</Text>
                        </TouchableOpacity>
                        <ScrollView horizontal style={styles.imagePreviewContainer}>
                            {images.map((uri, i) => (
                                <Image key={i} source={{ uri }} style={styles.imagePreview} />
                            ))}
                        </ScrollView>

                        <TouchableOpacity disabled={isPending} style={styles.submitBtn} onPress={onSubmit}>
                            {isPending?<Spinner/>:
                                <Text style={styles.submitText}>Submit</Text>
                            }

                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
               </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalWrapper: {
        flex: 1,
        justifyContent: "flex-end",
    },
    formContainer: {
        height: height * 0.6,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    sectionLabel: {
    fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 16,
},
    multiline: { height: 80, textAlignVertical: "top" },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: { height: 50, width: "100%" },
    pickerIOS: { height: 150, width: "100%" },
    imagePickerBtn: {
        backgroundColor: "#eee",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 15,

    },
    imagePreviewContainer: { marginBottom: 15 },
    imagePreview: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    submitBtn: {
        backgroundColor: "#F38344",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
export default ProductForm;