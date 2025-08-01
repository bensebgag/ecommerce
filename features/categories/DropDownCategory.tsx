
import React, {useEffect, useState} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {useGategories} from "@/features/categories/useGategories";
import {createNewProduct} from "@/Util/type";
import Spinner from "@/components/Spinner";
interface IProps {
    SetNewProduct:  React.Dispatch<React.SetStateAction<createNewProduct>>
}
export default function DropDownCategory({SetNewProduct}:IProps) {

    const {data:categores,isLoading}=useGategories();

    const [selected, setSelected] = useState('chose category');

    const [custom, setCustom] = useState('');

    useEffect(() => {

        SetNewProduct(pre => ({
            ...pre,
            categoryName: selected === 'other' && custom.trim() ? custom : selected
        }));    }, [selected,custom]);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selected}
                onValueChange={value => setSelected(value)}
                style={styles.picker}
            >
                {
                  isLoading ?<Spinner/>:categores?.map((c)=><Picker.Item key={c.id} label={c.name} value={c.name} />)
                }

                <Picker.Item label="Other..." value="other" />
            </Picker>

            {selected === 'other' && (
                <TextInput
                    style={styles.input}
                    placeholder="Type your option here"
                    value={custom}
                    onChangeText={(text)=>{
                        console.log(text);
                      setCustom(text)
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor:"#ddd",
        borderRadius:12
    },

    picker: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
    },

    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 8,
    },
});
