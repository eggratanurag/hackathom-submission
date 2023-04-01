
const DayCounter = (uploadDate) => {
    var today = new Date();
    var createdOn = new Date(uploadDate);
    var msInDay = 24 * 60 * 60 * 1000;
    
    createdOn.setHours(0,0,0,0);
    today.setHours(0,0,0,0)
    
    var diff = (+today - +createdOn)/msInDay
 
   
    return diff === 0? "uploaded today"
         : diff === 1? "uploaded yesterday"
         : diff <= 30 ?`uploaded ${diff} days ago`
         : diff <= 60 ?`uploaded a month ago`
         : "uploaded months ago"
        
   
}

const MonthBasedDate = (uploadDate) => {
    var createdOn = new Date(uploadDate);
     const monthName = createdOn.toLocaleString('default', { month: 'long' })
     const day = createdOn.toLocaleString('default', { day: 'numeric' })

    return (day + " " + monthName)
}

export {DayCounter, MonthBasedDate};
