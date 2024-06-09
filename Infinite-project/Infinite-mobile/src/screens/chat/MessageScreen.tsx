import React, {useCallback, useEffect, useState} from 'react';
import {
  Box,
  HStack,
  IconButton,
  useTheme,
  Input,
  Text,
  VStack,
  ScrollView,
  Image,
} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';
import {getUserConversation, sendMessage} from '../../api/auth.api';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {useAutoUpdateMessages} from '../../hooks';

const audioRecorderPlayer = new AudioRecorderPlayer();

export const MessagingScreen = ({navigation}: any) => {
  const selectedUser = useRoute().params?.participant;
  const currentConversation = useRoute().params?.conversation;
  const [conversation, setConversation] = useState(currentConversation);
  const [isRecording, setIsRecording] = useState(false);
  const {user} = useSelector((state: any) => state.auth);

  const colors = useTheme().colors;
  const [text, setText] = useState<string>('');
  const [record, setRecording] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);
  const [attachment, setAttachment] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);

  const [messages, setMessages] = useState<
    {message: string; attachment: string | null}[] | []
  >([]);

  const handleSendMessages = async () => {
    if (text.length < 1 && !attachment) {
      return;
    }

    const payload = {
      recipient: selectedUser?._id, // Use optional chaining for safety
      text,
      attachment,
    };

    const request = await sendMessage(payload);

    if (request.ok) {
      handleFetchConversation();
    }

    setText('');
    setAttachment(null);
  };

  const handleFetchConversation = useCallback(async () => {
    if (conversation?._id) {
      const request = await getUserConversation(conversation?._id);
      if (request.ok) {
        setConversation(request.data?.data);
      }
    }
  }, [conversation?._id]);

  useAutoUpdateMessages(conversation?._id, setConversation);

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      // Check if the action was not cancelled
      setAttachment(result.assets[0]);
    }
  };

  const handleRecordAudio = async () => {
    if (isRecording) {
      audioRecorderPlayer.addRecordBackListener(e => {});
      const result = await audioRecorderPlayer.stopRecorder();
      console.log(result);
      setIsRecording(false);
      setRecording(result);
    } else {
      audioRecorderPlayer.removeRecordBackListener();
      await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
    }
  };

  return (
    <Box safeArea flex={1}>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        bgColor={'white'}
        py={'3'}
        px={'4'}>
        <HStack alignItems={'center'}>
          <IconButton
            onPress={() => navigation.goBack()}
            rounded={'full'}
            icon={<Feather name={'chevron-left'} size={23} color={'black'} />}
          />
          <Text fontSize={'md'} fontWeight={'bold'} numberOfLines={1}>
            {`${selectedUser?.firstName} ${selectedUser?.lastName}`}
          </Text>
        </HStack>
        <HStack alignItems={'center'}>
          <IconButton
            rounded={'full'}
            icon={<Feather name={'search'} size={20} color={'black'} />}
          />
          <IconButton
            rounded={'full'}
            icon={<Feather name={'align-justify'} size={20} color={'black'} />}
          />
        </HStack>
      </HStack>

      <Box flex={1} py={'2'}>
        <ScrollView>
          {conversation?.messages?.map((message, index) => (
            <VStack
              key={index}
              px={'4'}
              my={'1'}
              alignItems={
                message?.sender?._id === user?.id ? 'flex-end' : 'flex-start' // Use optional chaining for safety
              }>
              <Box
                bgColor={
                  message?.sender?._id === user?.id ? 'primary.500' : 'gray.600' // Use optional chaining for safety
                }
                p={'3'}
                borderRadius={'2'}
                maxWidth={'80%'}>
                <Text color={'white'} fontSize={'md'}>
                  {message?.text}
                </Text>
                {message?.image && (
                  <Box>
                    <Image
                      source={{uri: message.image}}
                      alt="attachment"
                      style={{width: 100, height: 100}}
                    />
                  </Box>
                )}
              </Box>
            </VStack>
          ))}
        </ScrollView>
      </Box>
      <HStack alignItems={'center'} bgColor={'white'} py={'3'} px={'4'}>
        <HStack alignItems={'center'}>
          <IconButton
            onPress={handlePickImage}
            rounded={'full'}
            icon={
              <Feather name={'plus'} size={25} color={colors.primary[500]} />
            }
          />
        </HStack>
        <Box flex={1}>
          <Input
            isDisabled={isRecording}
            rounded={'full'}
            value={text}
            onChangeText={e => setText(e)}
          />
        </Box>
        <HStack alignItems={'center'}>
          <IconButton
            onPress={handlePickImage}
            rounded={'full'}
            icon={
              <Feather name={'image'} size={20} color={colors.primary[500]} />
            }
          />

          {text.length < 1 ? (
            <IconButton
              onPress={handleRecordAudio}
              rounded={'full'}
              size={'sm'}
              icon={
                <Feather
                  name={isRecording ? 'stop-circle' : 'mic'}
                  size={20}
                  color={colors.primary[500]}
                />
              }
            />
          ) : (
            <IconButton
              onPress={handleSendMessages}
              rounded={'full'}
              size={'sm'}
              icon={
                <Feather name={'send'} size={20} color={colors.primary[500]} />
              }
            />
          )}
        </HStack>
      </HStack>
    </Box>
  );
};
