const NewTrip = () => {
    return (
        <div>
            <h1>Add a new trip</h1>
            <form>
                <h3>Basic Trip Info: </h3>
                <label for='tripName'>Trip Name: </label>
                <input type='text' name='tripName' placeholder='trip name'></input>
                <label for='date-start'>Date Start: </label>
                <input type='date' name='date-start' placeholder='date start'></input>
                <label for='date-end'>Date End: </label>
                <input type='date' name='date-end' placeholder='date end'></input>
                <label for='people'>People: </label>
                <input type='text' name='people' placeholder='people'></input>
                <h3>Transportation: </h3>
                <label for='when'>Time of Departure: </label>
                <input type='datetime' name='when' placeholder='date to travel'></input>
                <label for='cost'>Cost of Transportation: </label>
                <input type='number' name='cost' placeholder='cost'></input>
                <label for='booked'>Booking Status: </label>
                <input type='boolean' name='booked' placeholder='booked?'></input>
                <h3>Packing List: </h3>
                <textarea type='text' name='packingList'></textarea>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default NewTrip;
