package mk.ukim.finki.homework1;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import mk.ukim.finki.homework1.classes.elements.Element;
import mk.ukim.finki.homework1.classes.filters.*;
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

        File jsonFile = new File("jsonData.json");
        ObjectMapper objectMapper = new ObjectMapper();

        JsonNode rootNode = null;
        try {
            rootNode = objectMapper.readTree(jsonFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        JsonNode elementsNode = rootNode.get("elements");
        List<Element> elementList = new ArrayList<>();
        Pipe<Element> museumPipe = new Pipe<>();
        museumPipe.addFilter(new MuseumFilter());
        museumPipe.addFilter(new NameFilter());

        Pipe<Element> archPipe = new Pipe<>();
        archPipe.addFilter(new ArchaeologicalSiteFilter());
        archPipe.addFilter(new NameFilter());

        Pipe<Element> monasteryPipe = new Pipe<>();
        monasteryPipe.addFilter(new MonasteryReligionFilter());
        monasteryPipe.addFilter(new MonasteryTagsFilter());
        monasteryPipe.addFilter(new NameFilter());


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
            Element element1 = museumPipe.runFilter(element);
            if(element1 != null) elementList.add(element1);
            Element element2 = monasteryPipe.runFilter(element);
            if(element2 != null) elementList.add(element2);
            Element element3 = archPipe.runFilter(element);
            if(element3 != null) elementList.add(element3);
        }



        FileWriter fileWriter = new FileWriter("output.csv");
        elementList.forEach(e -> {
            try {
                fileWriter.write(e.toString() + "\n");
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

    }
}
