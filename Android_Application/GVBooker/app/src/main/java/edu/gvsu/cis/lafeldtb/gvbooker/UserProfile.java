package edu.gvsu.cis.lafeldtb.gvbooker;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;


public class UserProfile extends ActionBarActivity implements View.OnClickListener {

    public User person;
    private TextView usernameLabel;
    private Button createReservationButton;
    private Button reservedRoomsButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user_profile);
        usernameLabel = (TextView) findViewById(R.id.username_label);
        createReservationButton = (Button) findViewById(R.id.create_reservation_button);
        createReservationButton.setOnClickListener(this);
        reservedRoomsButton = (Button) findViewById(R.id.reserved_rooms_button);
        reservedRoomsButton.setOnClickListener(this);

        Intent j = getIntent();
        person = j.getParcelableExtra("user");
        usernameLabel.setText(person.getUsername());

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_user_profile, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onClick(View v) {

    }
}
