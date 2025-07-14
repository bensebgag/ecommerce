import {View, StyleSheet, TouchableOpacity, Text} from "react-native";
import React, {useEffect, useState} from "react";
import {createNewProduct} from "@/Util/type";
interface IProps {
    SetNewProduct: React.Dispatch<React.SetStateAction<createNewProduct>>
}

export default  function AvailabeSizes({SetNewProduct}:IProps ){
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const sizes = ['31','32','33','34','35','36','37','38','39','40','41','42','43','44'];
    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size)
                ? prev.filter(s => s !== size)
                : [...prev, size]
        );

    };
    useEffect(() => {
       SetNewProduct((pre)=>({...pre,sizeValues:selectedSizes}))
    }, [selectedSizes]);

    return (
       <View style={styles.sizesContainer} >
           {sizes.map(size => {
               const isSelected = selectedSizes.includes(size);
               return (
                   <TouchableOpacity
                       key={size}
                       onPress={() => toggleSize(size)}
                       style={[
                           styles.sizeButton,
                           isSelected && styles.sizeButtonSelected,
                       ]}
                   >
                       <Text
                           style={[
                               styles.sizeText,
                               isSelected && styles.sizeTextSelected,
                           ]}
                       >
                           {size}
                       </Text>
                   </TouchableOpacity>
               );
           })}
       </View>
   )

}
const styles = StyleSheet.create({

    sizesContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 15,
    },
    sizeButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        margin: 4,
    },
    sizeButtonSelected: {
        backgroundColor: '#dfb15c',
        borderColor: 'white',
    },
    sizeText: {
        fontSize: 14,
        color: '#333',
    },
    sizeTextSelected: {
        color: '#fff',
    },
})