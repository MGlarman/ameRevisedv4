const API_URL = "https://ame-server-lcrm.onrender.com";

useEffect(() => {
  const checkLoginStatus = async () => {
    try {
      const userRes = await fetch(`${API_URL}/api/user/data`, {
        method: "GET",
        credentials: "include",
      });
      if (userRes.ok) {
        const data = await userRes.json();
        setIsUserLoggedIn(true);
        setCurrentUser(data.username || "");
      }

      const adminRes = await fetch(`${API_URL}/api/admin/data`, {
        method: "GET",
        credentials: "include",
      });
      if (adminRes.ok) setIsAdminLoggedIn(true);
    } catch (err) {
      console.error(err);
      setIsUserLoggedIn(false);
      setIsAdminLoggedIn(false);
      setCurrentUser("");
    } finally {
      setLoading(false);
    }
  };

  checkLoginStatus();
}, []);

const handleUserLogout = async () => {
  try {
    await fetch(`${API_URL}/api/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsUserLoggedIn(false);
    setCurrentUser("");
  } catch (err) {
    console.error(err);
  }
};

const handleAdminLogout = async () => {
  try {
    await fetch(`${API_URL}/api/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsAdminLoggedIn(false);
  } catch (err) {
    console.error(err);
  }
};
