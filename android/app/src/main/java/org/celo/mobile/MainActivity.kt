package org.celo.mobile

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowManager
import com.clevertap.android.sdk.CleverTapAPI
import com.clevertap.react.CleverTapModule
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

  private var appStartedMillis: Long = 0

  override fun getMainComponentName(): String = "celo"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    appStartedMillis = System.currentTimeMillis()
    SplashScreen.show(this, R.style.SplashTheme, false)
    super.onCreate(null)
    CleverTapModule.setInitialUri(intent?.data)
  }

  override fun onResume() {
    super.onResume()
    window.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
  }

  override fun onPause() {
    super.onPause()
    window.setFlags(
      WindowManager.LayoutParams.FLAG_SECURE,
      WindowManager.LayoutParams.FLAG_SECURE
    )
  }

override fun onNewIntent(intent: Intent) {
  super.onNewIntent(intent)

  val firebaseEnabled = BuildConfig.FIREBASE_ENABLED.toBoolean()
  if (firebaseEnabled) {
    val cleverTapDefaultInstance = CleverTapAPI.getDefaultInstance(this)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      cleverTapDefaultInstance?.pushNotificationClickedEvent(intent.extras)
    }
  }
}
}
