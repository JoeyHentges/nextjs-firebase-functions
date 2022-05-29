import React, { useState, forwardRef, useCallback } from 'react';
import { useSnackbar, SnackbarContent } from 'notistack';
import { Typography, Button, Card, CardActions, IconButton, Collapse, Paper } from '@mui/material';
import { Close as CloseIcon, ExpandMore as ExpandMoreIcon, CheckCircle } from '@mui/icons-material';
import styled from 'styled-components';

const SnackbarContentContainer = styled(SnackbarContent)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    min-width: 344px !important;
  }
`;

const CardContainer = styled(Card)`
  background-color: #dbb842;
  width: 100%;
`;

const CardActionsContainer = styled(CardActions)`
  padding: 8px 8px 8px 16px;
  justify-content: space-between;
`;

const BoldTypography = styled(Typography)`
  font-weight: bold;
`;

const Icons = styled.div`
  margin-left: auto;
`;

const IconButtonContainer = styled(IconButton)`
  padding: 8px 8px;
  transform: rotate(0deg);
  transition: ${({ theme }) =>
    theme.transitions.create('transform', { duration: theme.transitions.duration.shortest })};

  &.expandOpen {
    transform: rotate(180deg);
  }
`;

const CollapsePaper = styled(Paper)`
  padding: 16px;
`;

const PaperButton = styled(Button)`
  padding: none;
  text-transform: none;
`;

const CheckCircleIcon = styled(CheckCircle)`
  font-size: 20;
  color: #b3b3b3;
  padding-right: 4px;
`;

const CustomSnackMessage = forwardRef<HTMLDivElement, { id: string | number; message: string | React.ReactNode }>(
  (props, ref) => {
    const { id, message } = props;

    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((oldExpanded) => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    return (
      <SnackbarContentContainer ref={ref}>
        <CardContainer>
          <CardActionsContainer>
            <BoldTypography variant="subtitle2">{message}</BoldTypography>
            <Icons>
              <IconButtonContainer
                aria-label="Show more"
                className={expanded && 'expandOpen'}
                onClick={handleExpandClick}
              >
                <ExpandMoreIcon />
              </IconButtonContainer>
              <IconButtonContainer onClick={handleDismiss}>
                <CloseIcon />
              </IconButtonContainer>
            </Icons>
          </CardActionsContainer>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CollapsePaper>
              <Typography gutterBottom>PDF ready</Typography>
              <PaperButton size="small">
                <CheckCircleIcon />
                Download now
              </PaperButton>
            </CollapsePaper>
          </Collapse>
        </CardContainer>
      </SnackbarContentContainer>
    );
  }
);

export default CustomSnackMessage;
