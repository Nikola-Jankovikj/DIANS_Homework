package mk.ukim.finki.treasuredroutes.Web;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailDoesNotExist;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.EmailInUseException;
import mk.ukim.finki.treasuredroutes.Model.Exceptions.UserNotFoundException;
import mk.ukim.finki.treasuredroutes.Model.User;
import mk.ukim.finki.treasuredroutes.Service.UserService;
import mk.ukim.finki.treasuredroutes.auth.AuthenticationService;
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
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationService authenticationService;

    @PutMapping("/changemail/{newEmail}")
    public ResponseEntity<Map<String, String>> changeEmailAddress(@PathVariable String newEmail) {
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            User updatedUser = userService.changeEmailAddress(newEmail, user.getId());

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
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body(null);
        }
        try {
            Long userId = user.getId();

            String currentPassword = passwordData.get("currentPassword");
            String newPassword = passwordData.get("newPassword");
            String confirmPassword = passwordData.get("confirmPassword");

            if (!newPassword.equals(confirmPassword)) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "New password and confirm password do not match!");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
            }

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
        User user;
        try {
            user = authenticationService.getAuthenticatedUser();
        } catch (EmailDoesNotExist e) {
            return ResponseEntity.badRequest().body(null);
        }

        Map<String, String> response = new HashMap<>();
        response.put("email", user.getEmail());
        response.put("password", user.getPassword());
        response.put("profile-picture", user.getProfilePicture());

        return ResponseEntity.ok(response);
    }
}
