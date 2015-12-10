package edu.gvsu.cis.lafeldtb.gvbooker;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
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
    private Button logoutButton;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_user_profile);
        mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);

        // use this setting to improve performance if you know that changes
        // in content do not change the layout size of the RecyclerView
        mRecyclerView.setHasFixedSize(true);

        // use a linear layout manager
        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        // specify an adapter
        mAdapter = new MyAdapter(new String[]{"Room 1", "Room 2", "MAK 121", "MAK 1213C", "LOH 165", "DEV 203A", "Reservation 1", "Reservation 2", "Hello", "Goodbye"});
        mRecyclerView.setAdapter(mAdapter);


        usernameLabel = (TextView) findViewById(R.id.username_label);
       // createReservationButton = (Button) findViewById(R.id.create_reservation_button);
        //createReservationButton.setOnClickListener(this);
        //reservedRoomsButton = (Button) findViewById(R.id.reserved_rooms_button);
        //reservedRoomsButton.setOnClickListener(this);
        logoutButton = (Button) findViewById(R.id.logoutButton);
        logoutButton.setOnClickListener(this);

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
//        if(v == reservedRoomsButton)
//        {
//            Intent i = new Intent(getApplicationContext(), ReservedRooms.class);
//            startActivity(i);
//        }
        if(v == logoutButton)
        {
            Intent i = new Intent(getApplicationContext(), Login.class);
            i.putExtra("newUser", person);
            startActivity(i);
            finish();
        }
    }

    @Override
    public void onBackPressed() {

    }
}
