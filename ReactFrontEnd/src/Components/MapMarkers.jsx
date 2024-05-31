//beginning of logic for creating multiple map markers for parks with more than one address


function getLatLong() {
    const [long, setLong] = useState([]);
    const [lat, setLat] = useState([]);

    const coordURL = "https://nominatim.openstreetmap.org/search?street="+street+"&postalcode="+postalcode+"&format=json";

    axios
    .get(coordURL, 
  { headers: { 'User-Agent': 'wiegmank@gmail.com' }  } )
    .then(response => {
      
      console.log(response.data[0])
      setLong(response.data[0].lon);
      setLat(response.data[0].lat)
    })
    .catch(function(e) {
      console.log(e);
    });
   
}
      //for multiple map markers
        // getLatLong(address);

        //TODO 1
        //finish API call to nominatim to convert street address into lat/long
        //remember to add header with email address

        //TODO 2
        //Use getCoords on physicalAddresses to get coordinates for new map markers

        //TODO 3
        //add lat & long keys/values to these physical addresses

        //TODO4
        //map over addresses to create markers in map component

            //latlong query URI
    //   https://nominatim.openstreetmap.org/search?<params>


    

    // function getCoords(address) {
    //     let street = address.line1; //street address with spaces
    //     let postalcode = address.postalCode;

    //     //this encodes the street to be proper URI format
    //     console.log("ADDRESS: ")
    //     console.log(street)
    //     street = encodeURI(street) //street address parsed into URI format
    //     console.log("ADDRESS FORMATTED...")
    //     console.log(street)
    //     console.log(parkInfo)
    
    // }
    
    // getCoords(physicalAddresses[0])