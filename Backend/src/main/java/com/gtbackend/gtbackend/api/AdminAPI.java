package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.EventRepository;
import com.gtbackend.gtbackend.dao.UserRepository;
import com.gtbackend.gtbackend.model.Event;
import com.gtbackend.gtbackend.model.User;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
public class AdminAPI {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Autowired
    public AdminAPI(EventRepository eventRepository, UserRepository userRepository){
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/addEvent")
    @Secured("ROLE_ADMIN")
    public void addEvent(Principal principal,@RequestBody Map<String, String> body) throws IllegalArgumentException, DateTimeParseException {
        boolean invited = Boolean.valueOf(body.get("invite"));
        int capacity = Integer.valueOf(body.get("capacity"));
        LocalDateTime time = LocalDateTime.parse(body.get("time"));
        double longitude = Double.valueOf(body.get("longitude"));
        double latitude = Double .valueOf(body.get("latitude"));
        Optional<User> user = userRepository.findById(principal.getName());
        if(user.isEmpty()){
            throw new NoSuchElementException("User Not Found");
        }
        Event event = new Event(body.get("title"), user.get(),
                body.get("description"), body.get("location"), longitude, latitude, time, invited, capacity);
        eventRepository.save(event);
        System.out.println(principal);
    }
    @DeleteMapping("/removeEvent")
    @Secured("ROLE_ADMIN")
    public void removeEvent(@RequestParam String id) throws NumberFormatException{
        Long Event_id = Long.valueOf(id);
        eventRepository.deleteEventAdmin(Event_id);
    }

    @PatchMapping("/updateTitle")
    @Secured("ROLE_ADMIN")
    public void updateTitle(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String title = body.get("title");
        eventRepository.updateTitleAdmin(id, title);
    }

    @PatchMapping("/updateEmail")
    @Secured("ROLE_ADMIN")
    public void updateEmail(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String title = body.get("email");
        eventRepository.updateEmailAdmin(id, title);
    }

    @PatchMapping("/updateDescription")
    @Secured("ROLE_ADMIN")
    public void updateDescription(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String description = body.get("description");
        eventRepository.updateDescriptionAdmin(id,description);
    }
    @PatchMapping("/updateLocation")
    @Secured("ROLE_ADMIN")
    public void updateLocation(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        String location = body.get("location");
        eventRepository.updateLocationAdmin(id,location);
    }
    @PatchMapping("/updateTime")
    @Secured("ROLE_ADMIN")
    public void updateTime(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Long id = Long.valueOf(body.get("id"));
        LocalDateTime time = LocalDateTime.parse(body.get("time"));
        eventRepository.updateTimeAdmin(id,time);
    }
}
