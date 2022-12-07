import { useState } from 'react';
import styled from 'styled-components';
import RecipeCard from '../../components/recipe/RecipeCard';
import { MediumTitle } from '../../styles/commonStyle';
import CustomIcon from '../../components/icons/CustomIcon';
import { theme } from '../../styles/theme';
import { BaseComponentType } from '../../types/common/baseComponentType';
import mockData from '../../util/mockData';
import { RandomRecipes } from '../../hooks/Recipe/useRecipes';

interface SuggestRecipe {
  recipes: RandomRecipes[];
}
const SuggestionRecipe = ({ recipes }: SuggestRecipe) => {
  const CARD_WIDTH_SIZE = 130;
  const CARDS_WIDTH_SIZE = 128;
  const [slidePx, setSlidePx] = useState(0);

  const toPrev = () => {
    slidePx < 0 && setSlidePx(slidePx + CARD_WIDTH_SIZE);
    console.log(slidePx);
  };

  const toNext = () => {
    slidePx > -CARDS_WIDTH_SIZE && setSlidePx(slidePx - CARD_WIDTH_SIZE);
    console.log(slidePx);
  };

  return (
    <SuggestionRecipeContainer>
      <RecipeCards>
        <Wrap results={slidePx}>
          {recipes.map((recipe) => {
            return (
              <RecipeCard
                key={recipe.dish_id}
                img={recipe.image_url1}
                title={recipe.name}
                channelUuid={recipe.dish_id}
                views={recipe.views}
                likes={recipe.likes}
                creator={recipe.nickname ? recipe.nickname : 'FoodFinder'}
                onMoreClick={() => console.log('onmore')}
              />
            );
          })}
        </Wrap>
      </RecipeCards>
      <PrevButton onClick={() => toPrev()}>
        <CustomIcon name="prev" size="2.5vh" color={theme.mainBlack} />
      </PrevButton>
      <NextButton onClick={() => toNext()}>
        <CustomIcon name="next" size="2.5vh" color={theme.mainBlack} />
      </NextButton>
    </SuggestionRecipeContainer>
  );
};

const SuggestionRecipeContainer = styled.div`
  position: relative;
`;

const RecipeCards = styled.div`
  max-width: 128vh;
  height: 25vh;
  overflow: hidden;
`;
const Wrap = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixins.flexBox('row', 'center', 'centrt')}
  gap: 2vh;
  transform: translateX(${({ results }) => `${results}vh`});
  transition: all 0.3s;
`;

const PrevButton = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  position: absolute;
  cursor: pointer;
  top: 40%;
  left: -1.3%;
  background-color: ${({ theme }) => theme.mainWhite};
  width: 4vh;
  height: 4vh;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const NextButton = styled.div`
  ${({ theme }) => theme.mixins.flexBox}
  position: absolute;
  cursor: pointer;
  top: 40%;
  right: -1.3%;
  background-color: ${({ theme }) => theme.mainWhite};
  width: 4vh;
  height: 4vh;
  border-radius: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export default SuggestionRecipe;