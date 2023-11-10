import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

public class JsonReader {

    public static void main(String[] args) {
        try {
            // Specify the path to your JSON file
            File jsonFile = new File("output.json");

            // Create an ObjectMapper instance
            ObjectMapper objectMapper = new ObjectMapper();

            // Read the JSON file into a JsonNode
            JsonNode rootNode = objectMapper.readTree(jsonFile);

            // Get the "elements" array
            JsonNode elementsNode = rootNode.get("elements");

            HashMap<String, Node> database = new HashMap<>();
            List<Node> nodeList = new ArrayList<>();

            List<Way> wayList = new ArrayList<>();


            // Iterate through each element
            if (elementsNode.isArray()) {
                Iterator<JsonNode> elementsIterator = elementsNode.elements();
                while (elementsIterator.hasNext()) {
                    JsonNode elementNode = elementsIterator.next();

                    // Get the "tags" object within each element
                    JsonNode tagsNode = elementNode.path("tags");

                    JsonNode type = elementNode.path("type");
                    String node = type.asText();

                    // Get the value for the "name" field
                    nodeList.add(processNode(elementNode, database));


                }
                //nodeList.forEach(node -> System.out.println(node.id));
            }
            for (String key : database.keySet()) {
                System.out.println(database.get(key));
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static Node processNode(JsonNode elementNode, HashMap<String, Node> db){


        JsonNode tagsNode = elementNode.path("tags");
        String nameValue = tagsNode.path("name").asText();
        String enNameValue = tagsNode.path("name:en").asText();
        String phone = tagsNode.path("phone").asText();
        String email = tagsNode.path("email").asText();

        JsonNode type = elementNode.path("type");
        String id = elementNode.path("id").asText();
        if(type.asText().equals("way")){
            JsonNode nodes = elementNode.path("nodes");
            id = nodes.get(0).asText();

        }

        String lat = elementNode.path("lat").asText();
        String lon = elementNode.path("lon").asText();

        if(nameValue.isEmpty()){
            nameValue = enNameValue;
        }
        Node newNode = new Node(nameValue, phone, email, id, lat, lon);
//        newNode.isWay = false;
//        if (type.asText().equals("way")) {
//            newNode.isWay = true;
//        }
        if (db.containsKey(id)) {
            db.get(id).lon = lon;
            db.get(id).lat = lat;
        }
        else if(!newNode.name.isEmpty()){
            db.put(id, newNode);
        }



        return newNode;

    }

}
