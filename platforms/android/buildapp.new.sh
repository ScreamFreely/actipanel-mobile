export ANDROID_HOME=/root/Android/Sdk
# export ANDROID_HOME=~/Android/Sdk

rm -f idioke-unsigned-aligned.apk
./gradlew assembleRelease
# zipalign -v -p 4 app/build/outputs/apk/release/app-release-unsigned.apk idioke-unsigned-aligned.apk
# apksigner sign --ks /home/nkfx/Send/ActAppInfo/app-key/mnactapp-key.jks --out idioke.v1.1.7.apk idioke-unsigned-aligned.apk
# apksigner verify idioke.v1.1.7.apk
# ./gradlew clean
sudo /root/Android/Sdk/build-tools/29.0.1/zipalign -v -p 4 app/build/outputs/apk/release/app-release-unsigned.apk idioke-unsigned-aligned.apk
sudo /root/Android/Sdk/build-tools/29.0.1/apksigner sign --ks /home/nkfx/Send/ActAppInfo/app-key/mnactapp-key.jks --out idioke.v1.1.7.apk idioke-unsigned-aligned.apk
sudo /root/Android/Sdk/build-tools/29.0.1/apksigner  verify idioke.v1.1.7.apk
./gradlew clean