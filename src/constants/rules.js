export default {
    required: (v) => {
      if (parseInt(v) >= 0) return true;
      return !!v || "Required Field";
    },
    phone: (value) => {
      if (!value) return true;
      const startRe = /^[6789]/;
      const fullRe = /^[6789]\d{9}$/;
    
      if (!startRe.test(value)) {
        return "Invalid number.";
      } else if (!fullRe.test(value)) {
        return "Phone number must be 10 digits";
      }
    
      return true;
    },
  };