package mk.ukim.finki.homework1;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import mk.ukim.finki.homework1.classes.elements.Element;
import mk.ukim.finki.homework1.classes.filters.Filter;
import mk.ukim.finki.homework1.classes.filters.FilterAmenityAndTourism;
import mk.ukim.finki.homework1.classes.filters.FilterName;
import mk.ukim.finki.homework1.classes.openStreetMap.OpenStreetMap;
import mk.ukim.finki.homework1.classes.pipe.Pipe;
import mk.ukim.finki.homework1.classes.processNodeData.ProcessNodeData;
import mk.ukim.finki.homework1.classes.urlToJson.JsonData;

import java.io.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class Main {
    private static final String queryFilePath = "QueryString.txt";
    public static final HashMap<String, Element> elementsById = new HashMap<>();
    private static final List<Filter<Element>> FILTERS = new ArrayList<Filter<Element>>(Arrays.asList(
            new FilterAmenityAndTourism(),
            new FilterName()
    ));

    public static void main(String[] args) throws IOException {

        String query = null;
        try {
            query = new String(Files.readAllBytes(Paths.get(queryFilePath)));
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (query != null) {
            query = URLEncoder.encode(query, StandardCharsets.UTF_8);
        }

        OpenStreetMap openStreetMap = new OpenStreetMap(query);
        String apiUrl = openStreetMap.getApiUrlForQueryString();

        JsonData jsonData = new JsonData(apiUrl);
        try {
            jsonData.getDataFromApiUrlToJson();
        } catch (Exception e) {
            e.printStackTrace();
        }

        File jsonFile = new File("output.json");
        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode rootNode = null;
        try {
            rootNode = objectMapper.readTree(jsonFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        JsonNode elementsNode = rootNode.get("elements");
        List<Element> elementList = new ArrayList<>();
        Pipe<Element> pipe = new Pipe<>();
        FILTERS.forEach(pipe::addFilter);


        for (JsonNode node : elementsNode) {
            ProcessNodeData processedData = new ProcessNodeData(node);
            Element element = processedData.processNodeData();
            if (elementsById.containsKey(element.getId())) {
                elementsById.get(element.getId()).setLon(element.getLon());
                elementsById.get(element.getId()).setLat(element.getLat());
            }
            else {
                elementsById.put(element.getId(), element);
            }
        }

        for (Element element : elementsById.values()) {
            element = pipe.runFilter(element);
            if(element != null) elementList.add(element);
        }



        FileWriter fileWriter = new FileWriter("bean.csv");
        elementList.forEach(e -> {
            try {
                fileWriter.write(e.toString() + "\n");
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

    }
}
