
const user = {
  id: 123,
  profile: {
    name: "John Doe",
    address: {
      city: "Los Angeles",
      zipcode: "90001"
    }
  }
};


const { id = "Information not available", profile } = user ?? {};
const name = profile?.name ?? "Information not available";
const city = profile?.address?.city ?? "Information not available";
const zipcode = profile?.address?.zipcode ?? "Information not available";


const result = `User ${name} (ID: ${id}) lives in ${city} (ZIP: ${zipcode})`;

console.log(result);