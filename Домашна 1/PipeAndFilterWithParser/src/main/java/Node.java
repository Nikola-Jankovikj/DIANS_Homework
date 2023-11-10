public class Node {
    String name;
    String phone;
    String email;
    String id;
    String lat;
    String lon;


    @Override
    public String toString() {
        return "Node{" +
                "name='" + name + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", id='" + id + '\'' +
                ", lat='" + lat + '\'' +
                ", lon='" + lon + '\'' +
                '}';
    }

    public Node(String name, String phone, String email, String id, String lat, String lon) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.id = id;
        this.lat = lat;
        this.lon = lon;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
