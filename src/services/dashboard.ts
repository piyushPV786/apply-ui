import axiosInstance from "./index";

class DashboardServices {
  async getAllApplication() {
    const url = base + "/" + sada;
    const response = await axiosInstance.get(url);
  }
}
