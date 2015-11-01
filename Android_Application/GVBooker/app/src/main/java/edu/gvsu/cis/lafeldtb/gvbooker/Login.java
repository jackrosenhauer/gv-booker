package edu.gvsu.cis.lafeldtb.gvbooker;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.HashMap;


public class Login extends ActionBarActivity implements View.OnClickListener {

    String username;
    String password;
    EditText usernameEdit;
    EditText passwordEdit;
    Button loginButton;

    //map of users for testing
    HashMap<String, User> dummyUsers = new HashMap<>();
   // ArrayList<User> dumbUsers = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        usernameEdit = (EditText) findViewById(R.id.username_editor);
        passwordEdit = (EditText) findViewById(R.id.password_editor);
        loginButton = (Button) findViewById(R.id.login_button);
        loginButton.setOnClickListener(this);

        //test user for debugging
        User test = new User("test", "test");

        //dumbUsers.add(test);
        dummyUsers.put(test.getUsername(), test);

    }

    @Override
    public void onClick(View v) {
        if(v == loginButton)
        {
            //TODO: set an on click for the login screen
            username = usernameEdit.getText().toString();
            password = passwordEdit.getText().toString();
            if(dummyUsers.containsKey(username)) {
                if (dummyUsers.get(username).validPassword(username, password)) {
                    Intent i = new Intent(getApplicationContext(), UserProfile.class);
                    //i.putExtra("username", username);
                    i.putExtra("user", dummyUsers.get(username));
                    startActivity(i);
                } else {
                    Toast.makeText(getApplicationContext(), "Invalid username or password", Toast.LENGTH_SHORT).show();
                }
            }else {
                Toast.makeText(getApplicationContext(), "Invalid username or password", Toast.LENGTH_SHORT).show();
            }
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_login, menu);
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



}
