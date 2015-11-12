package edu.gvsu.cis.lafeldtb.gvbooker;

import android.os.Parcel;
import android.os.Parcelable;

import java.lang.reflect.Array;
import java.util.ArrayList;

/**
 * Created by Benjamin on 10/25/2015.
 */
public class User implements Parcelable {
    private String username;
    private String password;
    private String[] dummyReservations;
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
    
    /**making the object parceable*/

    private int mData;

    public int describeContents() {
        return 0;
    }

    public void writeToParcel(Parcel out, int flags) {
        out.writeInt(mData);
        out.writeString(username);
        out.writeString(password);
        out.writeStringArray(dummyReservations);
        //TODO: figure out how to write reservations
    }

    public static final Parcelable.Creator<User> CREATOR
            = new Parcelable.Creator<User>() {
        public User createFromParcel(Parcel in) {
            return new User(in);
        }

        public User[] newArray(int size) {
            return new User[size];
        }


    };

    private User(Parcel in) {
        mData = in.readInt();
        username = in.readString();
        password = in.readString();
    //    dummyReservations = in.readStringArray();
    }


}
