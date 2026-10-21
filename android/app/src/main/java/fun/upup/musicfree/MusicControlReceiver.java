package fun.upup.musicfree;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class MusicControlReceiver extends BroadcastReceiver {
    private static final String TAG = "MusicControlReceiver";
    private static ReactApplicationContext reactContext;

    public static void setReactContext(ReactApplicationContext context) {
        reactContext = context;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getStringExtra("action");
        String payload = intent.getStringExtra("payload");
        Log.d(TAG, "Received action: " + action);

        if (reactContext != null) {
            WritableMap map = Arguments.createMap();
            map.putString("action", action);
            if (payload != null) {
                map.putString("payload", payload);
            }
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("MusicControlEvent", map);
        } else {
            Log.w(TAG, "React context not available: " + action);
        }
    }
}
