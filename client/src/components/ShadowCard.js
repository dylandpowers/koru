import { Card } from 'antd';
import styled from 'styled-components';

const ShadowCard = styled(Card)`
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  min-width: 600px;
  max-width: 600px;
  min-height: 300px;
`;

export default ShadowCard;