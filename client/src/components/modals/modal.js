import React from 'react';
import {Box, Button, Heading, Layer, Text} from "grommet";
import {FormClose} from 'grommet-icons';


function Modal({full, onClose, icon, title, subTitle,
    displayPrimaryButton, displaySecondaryButton,
    secondaryLabel,
    onSecondaryClick,
    primaryLabel,
    onPrimaryClick, children, isPrimaryBtnDisabled
}) {
    return (
        <Layer full={full} margin="large" modal onClickOutside={onClose} onEsc={onClose} position="center">
            <Box direction="column" fill="vertical" justify="between" >
                <Box
                    direction="column"
                    flex="grow"
                    justify="between"
                    overflow="auto"
                    pad="medium"
                    width={"500px"}
                >
                    <Box direction="row" fill="horizontal" justify="between">
                        <Box direction="row" flex={false} gap="small">
                            {icon && <Box justify="center">
                                {icon}
                            </Box>}
                            {title && <Heading level={2} margin="none" size="small">
                                {title}
                            </Heading>}
                        </Box>
                        <Box justify="center">
                            <Button
                                icon={<FormClose />}
                                onClick={onClose}
                            />
                        </Box>
                    </Box>
                    {subTitle && <Text>{subTitle}</Text>}
                    <Box direction="column" fill="vertical" justify="between" overflow="auto" pad={{top: 'medium'}}>
                        <Box fill="horizontal" flex="grow" overflow="auto">{children}</Box>
                        {(displayPrimaryButton || displaySecondaryButton) && <Box
                            direction="row"
                            gap="medium"
                            height={{min: '36px'}}
                            justify="end"
                            margin={{ bottom: 'small', top: 'medium' }}
                        >
                            {displaySecondaryButton && <Button
                                label={secondaryLabel}
                                onClick={onSecondaryClick}
                            />}
                            {displayPrimaryButton && <Button
                                label={primaryLabel}
                                onClick={onPrimaryClick}
                                primary
                                disabled={isPrimaryBtnDisabled}
                            />}
                        </Box>}
                    </Box>
                </Box>
            </Box>
        </Layer>
    );
}

export default Modal;

{/*{...!full && {*/}
{/*    width: ['xsmall', 'small'].includes(size) ? undefined : 'medium'*/}
{/*}}*/}