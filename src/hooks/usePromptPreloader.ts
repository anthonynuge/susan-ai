import { useState, useEffect } from "react";
import { useNavigation } from "react-router-dom";

const usePromptPreloader = () => {
  const navigation = useNavigation();

  const [preLoaderVal, setPreLoaderVal] = useState('');

  useEffect(() => {
    // if waitin gon prompt 
    if (navigation.formData) {
      const userPrompt = navigation.formData.get('user_prompt');
      setPreLoaderVal(typeof userPrompt === 'string' ? userPrompt : '');
    } else {
      setPreLoaderVal('');
    }

  }, [navigation.formData])

  return { preLoaderVal }
}

export default usePromptPreloader;
