import ProductComponent from "@/features/proudcts/Product";
import {Product as ProductTypes} from "@/Util/type";
import {View} from "react-native";

interface P extends Omit<ProductTypes, 'quantity'|'categoryId'|'discount'|'reviews'|'availableSizes'|'category'|'description'>{}

interface Props {
    product1: P;
    product2?: P;
}

export default function DisplayInRows({product1, product2}: Props): JSX.Element {
    return(
        <View className="flex flex-row w-full px-4 gap-4">
            <View className="flex-1">
                <ProductComponent
                    key={product1.id}
                    name={product1.name}
                    price={product1.price}
                    id={product1.id}
                    typesChoose={product1.typesChoose}
                />
            </View>

            {product2 ? (
                <View className="flex-1">
                    <ProductComponent
                        key={product2.id}
                        name={product2.name}
                        price={product2.price}
                        id={product2.id}
                        typesChoose={product2.typesChoose}
                    />
                </View>
            ) : (
                <View className="flex-1" />
            )}
        </View>
    );
}