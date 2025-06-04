package org.celo.mobile

import android.os.Build
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response

class UserAgentInterceptor : Interceptor {

  override fun intercept(chain: Interceptor.Chain): Response {
    val originalRequest = chain.request()
    val requestWithUserAgent = originalRequest.newBuilder()
      .removeHeader("User-Agent")
      .addHeader(
        "User-Agent",
        // Format we want: Valora/1.0.0 (Android 12; Pixel 5)
        String.format(
          "Valora/%s (Android %s; %s)",
          BuildConfig.VERSION_NAME,
          Build.VERSION.RELEASE,
          Build.MODEL
        )
      )
      .build()

    return chain.proceed(requestWithUserAgent)
  }
}

