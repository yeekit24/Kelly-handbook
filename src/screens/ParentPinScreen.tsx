import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList, WorkbookContext } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "ParentPin">;

export default function ParentPinScreen({ route, navigation }: Props) {
  const { state } = useContext(WorkbookContext);
  const [pin, setPin] = useState("");

  const { next, params } = route.params;
  const enabled = state!.settings.parentPinEnabled;

  const unlock = () => {
    if (!enabled) {
      navigation.replace(next as any, params);
      return;
    }
    if (pin === state!.settings.parentPin) {
      navigation.replace(next as any, params);
    } else {
      Alert.alert("Wrong PIN", "Try again");
      setPin("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Parent Mode</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        placeholder="Enter PIN"
        keyboardType="number-pad"
        secureTextEntry
        style={styles.input}
      />
      <Pressable style={styles.btn} onPress={unlock}>
        <Text style={styles.btnText}>Unlock</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", gap: 12, backgroundColor: "#fafafa" },
  title: { fontSize: 26, fontWeight: "900", textAlign: "center" },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 14, fontSize: 18 },
  btn: { backgroundColor: "#e6f0ff", padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { fontSize: 18, fontWeight: "900" },
});
