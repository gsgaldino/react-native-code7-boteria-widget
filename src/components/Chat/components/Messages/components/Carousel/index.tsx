import React, { useState } from 'react';
import { Text, View, Linking } from 'react-native';

import {
  CarouselActions,
  CarouselButton,
  CarouselCardInfo,
  CarouselSlider,
  CarouselSliderContent,
  CarouselWrapper,
  CustomImage,
} from './components';

import {
  Button,
  Card,
  CarouselDestinationTypes,
  IHandleCarouselButtonClickProps,
  SocketPayload,
  MessageTypes,
} from '../../../../../../types';
import type { IMessageComponentProps } from '../MessageComponent';

import { styles } from './styles';

export default (props: IMessageComponentProps) => {
  const [slidePosition, setSlidePosition] = useState(0);

  const sendAction = (action: SocketPayload) => {
    return action;
    // console.log('Sending carousel action ...', action);
  };

  const previousDisabled = slidePosition === 0;
  const nextDisabled =
    Math.abs(slidePosition) ===
    (props.message?.carousel?.cards?.length as number) - 1;

  const handleNextSlide = () => {
    if (nextDisabled) return;
    setSlidePosition((prevState) => prevState + 1);
  };

  const handlePreviousSlide = () => {
    if (previousDisabled) return;
    setSlidePosition((prevState) => prevState - 1);
  };

  const handleOpenLink = async (url: string) => {
    await Linking.openURL(url);
  };

  const handleButtonClick = async ({
    clickedButton,
    clickedCard,
  }: IHandleCarouselButtonClickProps) => {
    const { destination } = clickedButton;

    if (destination?.type === CarouselDestinationTypes.URL) {
      handleOpenLink(destination?.value as string);
    }

    if (destination?.type === CarouselDestinationTypes.PHONE) {
      const treated = destination?.value?.replace(/[^A-Z0-9]/gi, '');
      handleOpenLink(`tel:+55${treated}`);
    }

    const socketActionPayload: SocketPayload = {
      type: MessageTypes.CAROUSEL,
      data: { clickedButton, clickedCard },
    };

    sendAction(socketActionPayload);
  };

  const checkButtonIsEmpty = (button: Button) => {
    return button?.label === '';
  };

  const checkHasInfo = (card: Card) => {
    return card?.title !== '' || card?.description !== '';
  };

  return (
    <>
      <CarouselWrapper>
        <CarouselSlider>
          <CarouselSliderContent
            slidePosition={slidePosition}
            onSlidePosition={setSlidePosition}
          >
            {props.message?.carousel?.cards?.map((card) => (
              <View key={card._id}>
                {card.imageUrl ? <CustomImage src={card.imageUrl} /> : <Text />}
                <CarouselCardInfo hasInfo={checkHasInfo(card)}>
                  <Text
                    style={[
                      styles.carouselCardInfoText,
                      styles.carouselCardInfoTitle,
                    ]}
                  >
                    {card.title}
                  </Text>
                  <Text style={styles.carouselCardInfoText}>
                    {card.description}
                  </Text>
                </CarouselCardInfo>
                {card?.buttons?.map(
                  (button) =>
                    !checkButtonIsEmpty(button) && (
                      <CarouselButton
                        key={button?._id}
                        onPress={() =>
                          handleButtonClick({
                            clickedCard: card,
                            clickedButton: button,
                          })
                        }
                      >
                        {button?.label}
                      </CarouselButton>
                    )
                )}
              </View>
            ))}
          </CarouselSliderContent>
        </CarouselSlider>
        {(props.message?.carousel?.cards?.length as number) > 1 && (
          <CarouselActions
            onPrevious={handlePreviousSlide}
            onNext={handleNextSlide}
            previousDisabled={previousDisabled}
            nextDisabled={nextDisabled}
          />
        )}
      </CarouselWrapper>
    </>
  );
};
