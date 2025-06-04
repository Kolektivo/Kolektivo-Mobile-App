package org.celo.mobile

import android.content.Context
import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import okhttp3.OkHttpClient

class UserAgentClientFactory(private val context: Context) : OkHttpClientFactory {

  override fun createNewNetworkModuleClient(): OkHttpClient {
    return OkHttpClientProvider
      .createClientBuilder(context)
      .addInterceptor(UserAgentInterceptor())
      .build()
  }
}
