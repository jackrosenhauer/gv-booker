package edu.gvsu.cis.lafeldtb.gvbooker;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import java.util.ArrayList;


public class ContentCreateAccount extends ActionBarActivity implements View.OnClickListener {


    EditText editUsername;
    EditText editPassword;
    Button confirmButton;
    String username;
    String password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_content_create_account);

        editUsername = (EditText) findViewById(R.id.edit_username);
        editPassword = (EditText) findViewById(R.id.edit_password);
        confirmButton = (Button) findViewById(R.id.confirm_button);
        confirmButton.setOnClickListener(this);




    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_content_create_account, menu);
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
        if(v == confirmButton)
        {
            username = editUsername.getText().toString();
            password = editPassword.getText().toString();

            if(username.equals("") || password.equals(""))
            {
                Toast.makeText(getApplicationContext(), "Invalid username or password", Toast.LENGTH_SHORT).show();
            } else
            {
                User noob = new User(username, password);
                Intent toLogin = new Intent(getApplicationContext(), Login.class);
                toLogin.putExtra("newUser", noob);
                startActivity(toLogin);


            }
        }
    }

    @Override
    public void onBackPressed() {
    }
}
