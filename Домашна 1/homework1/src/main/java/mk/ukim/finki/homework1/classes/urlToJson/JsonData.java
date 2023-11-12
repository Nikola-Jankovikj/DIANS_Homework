package mk.ukim.finki.homework1.classes.urlToJson;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class JsonData {
    private final String apiUrl;

    public JsonData(String apiUrl) {
        this.apiUrl = apiUrl;
    }

    public void getDataFromApiUrlToJson() throws IOException {
        URL url = new URL(apiUrl);

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("User-Agent", "Mozilla/5.0");

        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {

            InputStream inputStream = connection.getInputStream();
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

            FileWriter fileWriter = new FileWriter("jsonData.json");
            String line;
            while ((line = reader.readLine()) != null) {
                fileWriter.write(line);
                fileWriter.write("\n");
            }

            fileWriter.close();
            reader.close();
            inputStream.close();
            connection.disconnect();
        } else {
            System.out.println("GET request not worked. Response Code: " + responseCode);
        }
    }
}
