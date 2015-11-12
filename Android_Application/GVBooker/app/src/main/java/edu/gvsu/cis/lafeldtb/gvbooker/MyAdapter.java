package edu.gvsu.cis.lafeldtb.gvbooker;

import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import static android.support.v4.app.ActivityCompat.startActivity;


/**
 * Created by Benjamin on 11/10/2015.
 */
public class MyAdapter extends RecyclerView.Adapter<MyAdapter.ViewHolder> {
    private String[] mDataset;



    public static class ViewHolder extends RecyclerView.ViewHolder {

        public TextView mTextView;

        public ViewHolder(TextView v) {

            super(v);
            mTextView = v;

        }



    }


    public MyAdapter(String[] myDataset) {
        mDataset = myDataset;
    }


    @Override
    public MyAdapter.ViewHolder onCreateViewHolder(ViewGroup parent,
                                                   int viewType) {

        TextView v = (TextView) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.breif_room_info, parent, false);


        ViewHolder vh = new ViewHolder(v);
        return vh;
    }


    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent i = new Intent(v.getContext(), ReservationAttributes.class);
                String data = ((TextView) v.findViewById(R.id.textView2)).getText().toString();
                i.putExtra("name", data);
                v.getContext().startActivity(i);
            }
        });
        holder.mTextView.setText(mDataset[position]);

    }


    @Override
    public int getItemCount() {
        return mDataset.length;
    }

    //TODO: on click for the view, be able to go to the reservation information when clicked

}
