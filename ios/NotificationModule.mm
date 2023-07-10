#import "NotificationModule.h"
#import <React/RCTLog.h>
#import <React/RCTUtils.h>
#import <React/RCTConvert.h>

@implementation NotificationModule

RCT_EXPORT_MODULE(NotificationModule);

RCT_EXPORT_METHOD(sendNotification:(NSString *)title
                  message:(NSString *)message
                  filePath:(NSString *)filePath)
{
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  UNAuthorizationOptions options = UNAuthorizationOptionAlert + UNAuthorizationOptionSound;
  
  [center requestAuthorizationWithOptions:options
                        completionHandler:^(BOOL granted, NSError *_Nullable error) {
                          if (!granted) {
                            RCTLogError(@"User has declined notifications");
                          }
                        }];
  
  UNMutableNotificationContent *content = [UNMutableNotificationContent new];
  content.title = title;
  content.body = message;
  content.sound = [UNNotificationSound defaultSound];
  
  if (filePath != nil && filePath.length > 0) {
    NSURL *fileURL = [NSURL fileURLWithPath:filePath];
    NSError *fileError;
    NSDictionary *fileAttributes = [[NSFileManager defaultManager] attributesOfItemAtPath:fileURL.path error:&fileError];
    if (fileError == nil) {
      NSDictionary *userInfo = @{
        @"url": fileURL.absoluteString,
        @"name": fileURL.lastPathComponent,
        @"size": fileAttributes[NSFileSize] ?: @(0)
      };
      content.userInfo = userInfo;
    }
  }
  
  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:@"Notification" content:content trigger:nil];
  [center addNotificationRequest:request withCompletionHandler:^(NSError *_Nullable error) {
    if (error != nil) {
      RCTLogError(@"Failed to send notification: %@", error);
    }
  }];
}

@end
