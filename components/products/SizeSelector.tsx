import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { ISize } from '../../interfaces';

interface Props {
    selectedSize?: ISize;
    sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({selectedSize, sizes}) => {
  return (
    <Box sx={{
        margin: '-6px -2px -1px'
    }}>
        {
            sizes.map((size) => (
                <Button
                    key={size}
                    size='small'
                    color={selectedSize === size ? 'primary' : 'info'}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}

export default SizeSelector;