import styled from 'styled-components';
import {
  useAuthRecipes,
  useAuthLikeRecipes,
} from '../../hooks/Auth/useAuthRecipes';
import UserRacipeCards from './UserRecipeCards';
import {
  RecipeDetailHeader,
  RecipeDetailTitleStyle,
} from '../../styles/recipeDetailStyle';
const UserRecipe = ({ profileOwnerId }: { profileOwnerId: string }) => {
  const { data: authRecipe } = useAuthRecipes(Number(profileOwnerId));
  const { data: authLickeRecipe } = useAuthLikeRecipes(Number(profileOwnerId));

  if (authRecipe === undefined || authLickeRecipe === undefined) return null;

  return (
    <>
      <UserRecipeContainer>
        <LikeRecipe>
          <LikeRecipeHeader>
            <Title>Likes Recipe</Title>
          </LikeRecipeHeader>
          <UserRacipeCards recipes={authLickeRecipe}>
            아직 좋아요를 누른 레시피가 없습니다!
          </UserRacipeCards>
        </LikeRecipe>
        <MyRecipe>
          <LikeRecipeHeader>
            <Title>My Recipe</Title>
          </LikeRecipeHeader>
          <UserRacipeCards recipes={authRecipe}>
            아직 등록된 레시피가 없습니다! <br></br>
            나만의 레시피를 등록해 보세요!
          </UserRacipeCards>
        </MyRecipe>
      </UserRecipeContainer>
    </>
  );
};

const UserRecipeContainer = styled.section`
  width: 72vh;
  height: 80vh;
  background-color: ${({ theme }) => theme.mainWhite};
  border-radius: 1rem;
  border: 1px ${({ theme }) => theme.darkGrey};
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media (max-width: ${({ theme }) => theme.bpLarge}) {
    width: 60vh;
  }
  @media (max-width: ${({ theme }) => theme.bpMedium}) {
    height: 70vh;
  }

  @media (max-width: ${({ theme }) => theme.bpSmallest}) {
    width: 50vh;
    height: 50vh;
  }
`;
const LikeRecipe = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  height:50%;
`;
const Title = styled.h3`
  ${RecipeDetailTitleStyle}
`;
const LikeRecipeHeader = styled.div`
  ${RecipeDetailHeader}
  margin-bottom: ${({ theme }) => theme.spacingSemiMedium};
`;
const MyRecipe = styled.div`
  ${({ theme }) => theme.mixins.flexBox('column')}
  height:50%;
`;

export default UserRecipe;
