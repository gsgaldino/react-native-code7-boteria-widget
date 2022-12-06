import React, { useState } from 'react';
import { Text, View } from 'react-native';

import CarouselActions from './components/CarouselActions';
import CarouselCardButton from './components/CarouselButton';

import CarouselWrapper from './components/CarouselWrapper';
import CarouselSlider from './components/CarouselSlider';
import CarouselSliderContent from './components/CarouselSliderContent';
import CarouselCardInfo from './components/CarouselCardInfo';
import CustomImage from './components/CustomImage';
import { useSocketContext } from '../../../../../../context/Socket/Component';

import { Message } from 'types/Message';
import { styles } from './styles';

const SLIDE_WIDTH = 210;

// interface ICarouselProps {
//   message: {
//     carousel: {
//       cards: Card[];
//     };
//   };
//   onCarouselButtonClick: Function;
//   handleClickImage: Function;
// }

export default (message: Message) => {
  const [slidePosition, setSlidePosition] = useState(0);
  const { handleCarouselButtonClick } = useSocketContext();

  const previousDisabled = slidePosition === 0;
  const nextDisabled =
    Math.abs(slidePosition) ===
    (message?.carousel?.cards?.length as number) - 1;

  const handleNextSlide = () => {
    if (nextDisabled) return;
    setSlidePosition((prevState) => prevState - 1);
  };

  const handlePreviousSlide = () => {
    if (previousDisabled) return;
    setSlidePosition((prevState) => prevState + 1);
  };

  const handleButtonClick = ({ clickedButton, clickedCard }: any) => {
    handleCarouselButtonClick({ clickedButton, clickedCard });
  };

  const checkButtonIsEmpty = (button: any) => {
    return button?.label === '';
  };

  const checkHasInfo = (card: any) => {
    return card?.title !== '' || card?.description !== '';
  };

  return (
    <>
      <CarouselWrapper>
        <CarouselSlider>
          <CarouselSliderContent style={{ left: slidePosition * SLIDE_WIDTH }}>
            {message?.carousel?.cards?.map((card) => (
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
                      <CarouselCardButton
                        key={button?._id}
                        onPress={() =>
                          handleButtonClick({
                            clickedCard: card,
                            clickedButton: button,
                          })
                        }
                      >
                        {button?.label}
                      </CarouselCardButton>
                    )
                )}
              </View>
            ))}
          </CarouselSliderContent>
        </CarouselSlider>
        {(message?.carousel?.cards?.length as number) > 1 && (
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
