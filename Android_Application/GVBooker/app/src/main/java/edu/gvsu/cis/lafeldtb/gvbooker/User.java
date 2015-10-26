package edu.gvsu.cis.lafeldtb.gvbooker;

import java.util.ArrayList;

/**
 * Created by Benjamin on 10/25/2015.
 */
public class User {
    private String username;
    private String password;
    private ArrayList<Reservation> reservations;

    public User (String username, String password)
    {
        this.username = username;
        this.password = password;
    }

    public String getUsername()
    {
        return this.username;
    }

    public boolean validPassword(String username, String password) {
        if (this.username.equals(username)) {
            if (this.password.equals(password))
                return true;
        }
        return false;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }


}
