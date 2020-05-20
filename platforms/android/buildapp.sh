
export ANDROID_HOME=~/Android/Sdk

./gradlew assembleRelease
~/Android/Sdk/build-tools/29.0.1/zipalign -v -p 4 app/build/outputs/apk/release/app-release-unsigned.apk mnact-unsigned-aligned.apk
~/Android/Sdk/build-tools/29.0.1/apksigner sign --ks ~/Send/ActAppInfo/app-key/mnactapp-key.jks --out mnact.v2.0.2.apk mnact-unsigned-aligned.apk
~/Android/Sdk/build-tools/29.0.1/apksigner verify mnact.v2.0.2.apk
./gradlew clean
