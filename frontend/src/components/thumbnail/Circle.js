
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { FirstCircle } from '../../styles/component';


const Circle = props => {
    const ref = useRef(null);
    const tau = Math.PI * 2;
    const rmsArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius)
        .startAngle(0)
        .endAngle(tau)
        ;

    const vocalArc = d3
        .arc()
        .innerRadius(90)
        .outerRadius(95)
        .startAngle(tau/4)
        .endAngle(tau/4 + 2* props.vocalParameter)
        .cornerRadius(5);

    const bpmArc = d3
        .arc()
        .innerRadius(90)
        .outerRadius(95)
        .startAngle(3 * tau/4 )
        .endAngle(3 * tau/4 + 2* props.bpmParameter)
        .cornerRadius(5);


  useEffect(
    () => {
        const rmsSvg = rmsArc(props);
        const vocalSvg = vocalArc(props);
        const bpmSvg = bpmArc(props);
        const context = d3.select(ref.current);
        const contextWithRms = context.selectAll("g.arcRms").data(rmsSvg);
        const contextWithVocal = context.selectAll("g.arcVocal").data(vocalSvg);
        const contextWithBpm = context.selectAll("g.arcBpm").data(bpmSvg);
        contextWithRms.exit().remove();
        contextWithVocal.exit().remove();
        contextWithBpm.exit().remove();

        const UpdateRms = contextWithRms
            .enter()
            .append("g")
            .attr("class", "arcRms");

        const rmsPath = UpdateRms
            .append("path")
            .merge(contextWithRms.select("path.arc"));

        rmsPath
            .attr("class", "arc")
            .attr("d", rmsSvg)
            .style('fill', props.backgroundColor)

        const UpdateVocal = contextWithVocal
            .enter()
            .append("g")
            .attr("class", "arcVocal");

        const vocalPath = UpdateVocal
            .append("path")
            .merge(contextWithVocal.select("path.arc"));
    
        vocalPath
            .attr("class", "arc")
            .attr("d", vocalSvg)
            .style('fill', props.backgroundColor)

        
        const UpdateBpm = contextWithBpm
            .enter()
            .append("g")
            .attr("class", "arcBpm");

        const bpmPath = UpdateBpm
            .append("path")
            .merge(contextWithBpm.select("path.arc"));
    
            bpmPath
            .attr("class", "arc")
            .attr("d", bpmSvg)
            .style('fill', props.backgroundColor)
    },
    [props]
  );

  return (
        <FirstCircle>
            <svg width={250} height={250}>
                <g
                ref={ref}
                transform={`translate(${250 / 2}, ${250 / 2})`}
                />
            </svg>
        </FirstCircle>
  );
};

export default Circle;