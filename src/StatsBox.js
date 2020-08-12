import React from 'react';
import './StatsBox.css';
import {
    Card,
    CardContent,
    Typography
} from "@material-ui/core";

function StatsBox({title, cases, total}) {
    return (
        <Card className="statsBox">
            <CardContent>
                <Typography className="statsBox-title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="statsBox-cases">{cases}</h2>
                <Typography className="statsBox-total" color="textSecondary">
                    {total}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default StatsBox;