package mk.ukim.finki.homework1.classes.processNodeData;

import com.fasterxml.jackson.databind.JsonNode;
import mk.ukim.finki.homework1.classes.elements.Element;

public class ProcessNodeData {
    JsonNode elementNode;

    public ProcessNodeData(JsonNode elementNode) {
        this.elementNode = elementNode;
    }

    public Element processNodeData() {
        JsonNode tagsNode = elementNode.path("tags");
        String nameValue = tagsNode.path("name").asText();
        String enNameValue = tagsNode.path("name:en").asText();
        String amenity = tagsNode.path("amenity").asText();
        String tourism = tagsNode.path("tourism").asText();
        String historic = tagsNode.path("historic").asText();
        String religion = tagsNode.path("religion").asText();
        //String phone = tagsNode.path("phone").asText();
        //String email = tagsNode.path("email").asText();

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
        return new Element(id, nameValue, amenity, tourism, historic, religion, lat, lon);
    }


}
