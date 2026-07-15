import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Colors from '../../constants/Colors';
import {PostsContext} from '../../context/PostsContext';
import {AuthContext} from '../../context/AuthContext';

const MAX_CHARACTERS = 500;

const CreatePostScreen = ({navigation}) => {
  const [post, setPost] = useState('');
  const [attachment, setAttachment] = useState(null);

  const {addPost} = useContext(PostsContext);
  const {user} = useContext(AuthContext);

  const name = user?.displayName || 'Social Connect User';
  const username =
    user?.email?.split('@')[0] ||
    (user?.uid ? `user_${user.uid.slice(0, 6)}` : 'socialconnect');
  const avatarInitial = name.charAt(0).toUpperCase();

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera to take photos or videos.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    if (Platform.Version >= 33) {
      const imagePermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Media Permission',
          message: 'App needs access to your photos to attach images to posts.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );
      const videoPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        {
          title: 'Media Permission',
          message: 'App needs access to your videos to attach media to posts.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );

      return (
        imagePermission === PermissionsAndroid.RESULTS.GRANTED &&
        videoPermission === PermissionsAndroid.RESULTS.GRANTED
      );
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your gallery to attach photos or videos to posts.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const handleLaunchGallery = async () => {
    const permission = await requestGalleryPermission();
    if (!permission) {
      Alert.alert('Permission denied', 'Gallery access is required to select media.');
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          Alert.alert('Image Picker Error', response.errorMessage);
          return;
        }
        const asset = response.assets?.[0];
        if (asset?.uri) {
          setAttachment({
            uri: asset.uri,
            type: asset.type,
            fileName: asset.fileName,
          });
        }
      },
    );
  };

  const handleLaunchCamera = async () => {
    const permission = await requestCameraPermission();
    if (!permission) {
      Alert.alert('Permission denied', 'Camera access is required to take photos.');
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          Alert.alert('Camera Error', response.errorMessage);
          return;
        }
        const asset = response.assets?.[0];
        if (asset?.uri) {
          setAttachment({
            uri: asset.uri,
            type: asset.type,
            fileName: asset.fileName,
          });
        }
      },
    );
  };

  const handlePost = () => {
    if (post.trim().length === 0 && !attachment) {
      Alert.alert('Error', 'Please write something or attach media.');
      return;
    }

    addPost(post.trim(), name, attachment, user?.uid || null);

    setPost('');
    setAttachment(null);

    Alert.alert('Success', 'Post created successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        <Text style={styles.heading}>Create Post</Text>

        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarInitial}</Text>
          </View>

          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subtitle}>@{username}</Text>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#888"
          multiline
          maxLength={MAX_CHARACTERS}
          value={post}
          onChangeText={setPost}
        />

        {attachment?.uri ? (
          <View style={styles.attachmentPreview}>
            {attachment.type?.startsWith('image') ? (
              <Image
                source={{uri: attachment.uri}}
                style={styles.attachmentImage}
              />
            ) : (
              <Text style={styles.attachmentText}>
                Attached: {attachment.fileName || 'Media file'}
              </Text>
            )}
            <TouchableOpacity
              style={styles.removeAttachmentButton}
              onPress={() => setAttachment(null)}>
              <Text style={styles.removeAttachmentText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <Text style={styles.counter}>
          {post.length} / {MAX_CHARACTERS}
        </Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleLaunchGallery}>
            <Text style={styles.actionText}>📷 Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={handleLaunchCamera}>
            <Text style={styles.actionText}>🎥 Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionText}>😊 Feeling</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionText}>📍 Location</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handlePost}
          disabled={post.trim().length === 0 && !attachment}
          style={[
            styles.postButton,
            post.trim().length === 0 && !attachment &&
              styles.disabledButton,
          ]}>
          <Text style={styles.postButtonText}>
            Post
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  avatarText: {
    color: Colors.white,
    fontSize: 26,
    fontWeight: 'bold',
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },

  subtitle: {
    color: Colors.gray,
    marginTop: 3,
  },

  input: {
    minHeight: 220,
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 18,
    fontSize: 17,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  attachmentPreview: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },

  attachmentImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  attachmentText: {
    padding: 16,
    color: Colors.text,
    fontSize: 15,
  },

  removeAttachmentButton: {
    padding: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },

  removeAttachmentText: {
    color: Colors.white,
    fontWeight: 'bold',
  },

  counter: {
    textAlign: 'right',
    marginHorizontal: 25,
    marginTop: 8,
    color: Colors.gray,
  },

  actionsContainer: {
    marginTop: 25,
    marginHorizontal: 20,
  },

  actionCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },

  postButton: {
    backgroundColor: Colors.primary,
    margin: 20,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  disabledButton: {
    backgroundColor: '#BFC7D5',
  },

  postButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
});