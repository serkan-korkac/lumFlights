import DashboardMain from "@/components/DashboardMain";
import axiosInstance from "@/lib/api";
import { ReservationResponse, Reservation, Profile } from "@/types";
export default async function Dashboard() {
    let reservations: Reservation[] = [];
    const {data} = await axiosInstance.get<ReservationResponse>('/reservations/all/?pageNumber=1')
    reservations = data.reservations;
    const {data: profile} = await axiosInstance.post<Profile>('/auth/profile');
    return (
        <>
          <DashboardMain reservations={reservations}  role={profile.role}/>
        </>
      );
}
