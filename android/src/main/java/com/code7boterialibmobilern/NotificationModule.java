package com.code7boterialibmobilern;

import androidx.annotation.NonNull;
import android.app.Notification;
import android.app.NotificationChannel;
import android.os.Build;
import android.content.Context;
import android.app.NotificationManager;
import android.content.Intent;
import android.app.PendingIntent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = NotificationModule.NAME)
public class NotificationModule extends ReactContextBaseJavaModule {
  public static final String NAME = "NotificationModule";

  private static final String CHANNEL_ID = "Code7BoteriaLibMobileRn";
  private static final String CHANNEL_NAME = "Boteria";
  private static final String CHANNEL_DESCRIPTION = "Chat app created by Code7 Boteria";

  public NotificationModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod
  public void sendNotification(String title, String message) {
    Context context = getReactApplicationContext();
    NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      NotificationChannel channel = new NotificationChannel(
        CHANNEL_ID,
        CHANNEL_NAME,
        NotificationManager.IMPORTANCE_DEFAULT
      );
      channel.setDescription(CHANNEL_DESCRIPTION);
      notificationManager.createNotificationChannel(channel);
    }

    Intent intent = context
      .getPackageManager()
      .getLaunchIntentForPackage(context.getPackageName());

    PendingIntent pendingIntent = PendingIntent.getActivity(
      context,
      0,
      intent,
      PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
    );

    Notification.Builder builder = new Notification.Builder(context, CHANNEL_ID)
      .setSmallIcon(android.R.drawable.ic_dialog_info)
      .setContentTitle(title)
      .setContentText(message)
      .setContentIntent(pendingIntent)
      .setAutoCancel(true);

    notificationManager.notify(0, builder.build());
  }
}
