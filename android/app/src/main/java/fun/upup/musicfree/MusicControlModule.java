package fun.upup.musicfree;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.module.annotations.ReactModule;
import android.content.Intent;

@ReactModule(name = MusicControlModule.NAME)
public class MusicControlModule extends ReactContextBaseJavaModule {
    public static final String NAME = "MusicControlModule";

    public MusicControlModule(ReactApplicationContext reactContext) {
        super(reactContext);
        MusicControlReceiver.setReactContext(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void sendControlEvent(String action, String payload, Promise promise) {
        MusicControlReceiver receiver = new MusicControlReceiver();
        Intent intent = new Intent();
        intent.putExtra("action", action);
        intent.putExtra("payload", payload);
        receiver.onReceive(getReactApplicationContext(), intent);
        promise.resolve("Event sent: " + action);
    }
}
