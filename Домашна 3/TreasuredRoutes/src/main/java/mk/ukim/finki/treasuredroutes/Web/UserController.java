package mk.ukim.finki.treasuredroutes.Web;

import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailDoesNotExist;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailInUseException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Validated
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/changemail/{newEmail}")
    public ResponseEntity<Map<String, String>> changeEmailAddress(@PathVariable String newEmail) {
        try {
            User updatedUser = userService.changeEmailAddress(newEmail, 1L);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Email changed successfully!");
            response.put("newEmail", updatedUser.getEmail());

            return ResponseEntity.ok(response);
        } catch (UserNotFoundException | EmailInUseException | EmailDoesNotExist e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }

    @PutMapping("/changepassword")
    public ResponseEntity<Map<String, String>> changePassword(@RequestBody Map<String, String> passwordData) {
        try {
            Long userId = 1L;

            String currentPassword = passwordData.get("currentPassword");
            String newPassword = passwordData.get("newPassword");
            String confirmPassword = passwordData.get("confirmPassword");

            if (!newPassword.equals(confirmPassword)) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "New password and confirm password do not match!");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            User user = userService.findById(userId);
            if (!currentPassword.equals(user.getPassword())) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "Current password is incorrect!");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

            User updatedUser = userService.changePassword(newPassword, userId);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password changed successfully!");
            response.put("newPassword", updatedUser.getPassword());

            return ResponseEntity.ok(response);
        } catch (UserNotFoundException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (EmailInUseException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, String>> getUserEmail() {
        try {
            User user = userService.findById(1L);

            Map<String, String> response = new HashMap<>();
            response.put("email", user.getEmail());
            response.put("password", user.getPassword());
            response.put("profile-picture", user.getProfilePicture());

            return ResponseEntity.ok(response);
        } catch (UserNotFoundException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
}
