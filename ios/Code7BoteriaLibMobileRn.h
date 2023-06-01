
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNCode7BoteriaLibMobileRnSpec.h"

@interface Code7BoteriaLibMobileRn : NSObject <NativeCode7BoteriaLibMobileRnSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Code7BoteriaLibMobileRn : NSObject <RCTBridgeModule>
#endif

@end
