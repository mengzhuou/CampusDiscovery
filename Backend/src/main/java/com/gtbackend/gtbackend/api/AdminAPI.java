package com.gtbackend.gtbackend.api;

import com.gtbackend.gtbackend.dao.EventRepository;
import com.gtbackend.gtbackend.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminAPI {
    private EventRepository eventRepository;

    @Autowired
    public AdminAPI(EventRepository eventRepository){
        this.eventRepository = eventRepository;
    }

    @PostMapping("/addEvent")
    @Secured("ROLE_ADMIN")
    public void addEvent(Principal principal,@RequestBody Map<String, String> body) throws IllegalArgumentException{
        Event event = new Event(body.get("title"), body.get("email"),
                body.get("description"), body.get("location"), body.get("time"));
        eventRepository.save(event);
        System.out.println(principal);
    }
    @DeleteMapping("/removeEvent")
    @Secured("ROLE_ADMIN")
    public void removeEvent(@RequestParam String id) throws NumberFormatException{
        Integer Event_id = Integer.valueOf(id);

        eventRepository.deleteEventAdmin(Event_id);
    }

    @PatchMapping("/updateTitle")
    @Secured("ROLE_ADMIN")
    public void updateTitle(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Integer id = Integer.valueOf(body.get("id"));
        String title = body.get("title");
        eventRepository.updateTitleAdmin(id, title);
    }
    @PatchMapping("/updateDescription")
    @Secured("ROLE_ADMIN")
    public void updateDescription(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Integer id = Integer.valueOf(body.get("id"));
        String description = body.get("description");
        eventRepository.updateDescriptionAdmin(id,description);
    }
    @PatchMapping("/updateLocation")
    @Secured("ROLE_ADMIN")
    public void updateLocation(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Integer id = Integer.valueOf(body.get("id"));
        String location = body.get("location");
        eventRepository.updateLocationAdmin(id,location);
    }
    @PatchMapping("/updateTime")
    @Secured("ROLE_ADMIN")
    public void updateTime(Principal principal, @RequestBody Map<String, String> body) throws NumberFormatException{
        Integer id = Integer.valueOf(body.get("id"));
        String time = body.get("time");
        eventRepository.updateTimeAdmin(id,time);
    }
}
