import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BookingForm.module.css";
 

export default function BookingForm({facility}){
    const[date,setDate] = useState("");
    const[inTime,setInTime] = useState("");
    const[outTime,setOutTime] = useState("");
    const[allBooking,setAllBooking] = useState([]);

    const getBookings = ()=>{
        axios.get("https://adda-mock-server.onrender.com/bookings")
        .then(res=>{
            let filterBooking = res.data?.filter((ele)=>ele.facility===facility)
            setAllBooking(filterBooking);
        }).catch(err=>console.log(err));
    }

    const checkAvailability = ()=>{
        let arrival = Number(inTime.split(":").join(""));
        let departure = Number(outTime.split(":").join(""));
        for(var a=0; a<allBooking.length; a++){
            let departureTime = Number(allBooking[a].outTime.split(":").join(""));
            let arrivalTime = Number(allBooking[a].inTime.split(":").join(""));
        
            if(allBooking[a].date === date && departureTime > arrival && arrivalTime < departure){
                 return alert("Booking Failed, Already Booked")
            }
        }

        let inTimeHr = new Date(date + " " + inTime).getHours();
        let inTimeMin = new Date(date + " " + inTime).getMinutes();
        let outTimeHr = new Date(date + " " + outTime).getHours();
        let outTimeMin = new Date(date + " " + outTime).getMinutes();
        let totalCost = 0;
        let timeInMin = ((outTimeHr*60)+outTimeMin) - ((inTimeHr*60)+inTimeMin)

        if(facility === "Clubhouse"){
           if(inTimeHr < 16 && outTimeHr <= 16){
               let hrDiff = outTimeHr - inTimeHr;
               let minDiff = outTimeMin - inTimeMin;
               totalCost = (hrDiff + (minDiff/60)) * 100
           }else if(inTimeHr >= 16){
               let hrDiff = outTimeHr - inTimeHr;
               let minDiff = outTimeMin - inTimeMin;
               totalCost = (hrDiff + (minDiff/60)) * 500
           }else{ 
               let firstHalfHr = 16 - inTimeHr;
               let firstHalfCost = (firstHalfHr - (inTimeMin/60)) * 100;
               let secondHalfHr = outTimeHr - 16;
               let secondHalfCost = (secondHalfHr + (outTimeMin/60)) * 500;
               totalCost = firstHalfCost + secondHalfCost
           }    
        }else{
               let hrDiff = outTimeHr - inTimeHr;
               let minDiff = outTimeMin - inTimeMin;
               totalCost = (hrDiff + (minDiff/60)) * 50
        }
        return {totalCost,timeInMin};
    }

    useEffect(()=>{
       getBookings();
    },[facility])


    const submitForm = (e)=>{
        e.preventDefault();
        let bookingDetails = {
            booking_id : Math.floor(Math.random() * (100000-10000)),
            facility:facility,
            date : date,
            inTime : inTime,
            outTime : outTime
        }

        let cost = checkAvailability();
        if(typeof(cost)==="object"){
        let id="";
        axios.post("https://adda-mock-server.onrender.com/bookings",bookingDetails)
        .then(res=>{
                id=res.data.id;
            alert(`Booked, Rs. ${cost.totalCost}`);
            getBookings();
            // setTimeout(()=>{
            //     axios.delete(`https://adda-mock-server.onrender.com/bookings/${id}`)
            //     .then(res=>console.log(res.data)).catch(err=>console.log(err))
            // },30000) 
            
        }).catch(err=>console.log(err));
    }

        setDate("");
        setInTime("");
        setOutTime("");

    }

    return(
        <div className={styles.BookingForm_mainDiv}>
            <h2 style={{textAlign:"center"}}>{facility} booking form :</h2>
            {
                facility==="Clubhouse"?
                <p>(10am to 4pm: Rs. 100/hour, 4pm to 10pm: Rs. 500/hour)</p>
                :<p>(Rs. 50/hour)</p>
            }
            <form onSubmit={submitForm}>
                <label>Enter Date:</label>
                <input value={date} required onChange={(e)=>setDate(e.target.value)} type="date" />
                <label>Enter Arrival Time:</label>
                <input value={inTime} required onChange={(e)=>setInTime(e.target.value)} type="time" min="10:00" max="21:30" />
                <label>Enter Departure Time:</label>
                <input value={outTime} required onChange={(e)=>setOutTime(e.target.value)} type="time" min="10:00" max="22:00" />
                <input style={{margin:"auto"}} type="submit" value="Submit" />
            </form>
        </div>
    )
}