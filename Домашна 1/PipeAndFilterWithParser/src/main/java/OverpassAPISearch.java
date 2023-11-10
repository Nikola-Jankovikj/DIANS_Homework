import java.io.BufferedReader;
import java.io.FileWriter;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class OverpassAPISearch {

    public static void main(String[] args) {
        // Overpass QL query to find wineries in North Macedonia
        String query = "[out:json];\n" +
                "area[\"ISO3166-1\"=\"MK\"][boundary=administrative]->.searchArea;\n" +
                "(\n" +
                "  // Nodes\n" +
                "  node(area.searchArea)[\"amenity\"=\"winery\"];\n" +
                "  node(area.searchArea)[\"amenity\"=\"wine_cellar\"];\n" +
                "  node(area.searchArea)[\"craft\"=\"winery\"];\n" +
                "  node(area.searchArea)[\"shop\"=\"wine\"];\n" +
                "  node(area.searchArea)[\"tourism\"=\"winery\"];\n" +
                "  node(area.searchArea)[\"tourism\"=\"wine_tour\"];\n" +
                "  node(area.searchArea)[\"landuse\"=\"vineyard\"];\n" +
                "  node(area.searchArea)[\"landuse\"=\"winery\"];\n" +
                "  node(area.searchArea)[\"man_made\"=\"winery\"];\n" +
                "  node(area.searchArea)[\"tasting\"=\"yes\"];\n" +
                "  node(area.searchArea)[\"tasting\"=\"no\"];\n" +
                "  node(area.searchArea)[\"attraction\"=\"winery\"];\n" +
                "  node(area.searchArea)[\"produce\"=\"wine\"];\n" +
                "  node(area.searchArea)[\"product\"=\"wine\"];\n" +
                "  node(area.searchArea)[\"industrial\"=\"winery\"];\n" +
                "  node(area.searchArea)[\"leisure\"=\"wine_drinking\"];\n" +
                "\n" +
                "  // Ways\n" +
                "  way(area.searchArea)[\"amenity\"=\"winery\"];\n" +
                "  way(area.searchArea)[\"amenity\"=\"wine_cellar\"];\n" +
                "  way(area.searchArea)[\"craft\"=\"winery\"];\n" +
                "  way(area.searchArea)[\"shop\"=\"wine\"];\n" +
                "  way(area.searchArea)[\"tourism\"=\"winery\"];\n" +
                "  way(area.searchArea)[\"tourism\"=\"wine_tour\"];\n" +
                "  way(area.searchArea)[\"man_made\"=\"winery\"];\n" +
                "  way(area.searchArea)[\"tasting\"=\"yes\"];\n" +
                "  way(area.searchArea)[\"tasting\"=\"no\"];\n" +
                "  way(area.searchArea)[\"attraction\"=\"winery\"];\n" +
                "  way(area.searchArea)[\"produce\"=\"wine\"];\n" +
                "  way(area.searchArea)[\"product\"=\"wine\"];\n" +
                "  way(area.searchArea)[\"industrial\"=\"winery\"];\n" +
                "  way(area.searchArea)[\"leisure\"=\"wine_drinking\"];\n" +
                "\n" +
                ");\n" +
                "out body;\n" +
                ">;\n" +
                "out skel qt;";


        // Encode the query
        String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);

        // Create the URL for the Overpass API
        String urlString = "http://overpass-api.de/api/interpreter?data=" + encodedQuery;

        System.out.println(urlString);
        try {
            // Create a URL object
            URL url = new URL(urlString);

            // Open a connection to the URL
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Mozilla/5.0");

            // Check for successful response
            int responseCode = connection.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Get the input stream from the connection
                InputStream inputStream = connection.getInputStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

                FileWriter fileWriter = new FileWriter("output.json");
                // Read the response line by line and print to the console
                String line;
                while ((line = reader.readLine()) != null) {
                    fileWriter.write(line);
                    fileWriter.write("\n");
                }

                fileWriter.close();
                // Close the reader and the input stream
                reader.close();
                inputStream.close();
                connection.disconnect();

            } else {
                System.out.println("GET request not worked. Response Code: " + responseCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}