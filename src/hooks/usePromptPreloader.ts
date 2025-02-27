import { useState, useEffect } from "react";
import { useNavigation } from "react-router-dom";

const usePromptPreloader = () => {
  const navigation = useNavigation();

  const [preLoaderVal, setPreLoaderVal] = useState('');

  useEffect(() => {
    // if waitin gon prompt 
    if (navigation.formData) {
      setPreLoaderVal(navigation.formData.get('user_prompt') || '');
    } else {
      setPreLoaderVal('');
    }

  }, [navigation.formData])

  return { preLoaderVal }
}

export default usePromptPreloader;
