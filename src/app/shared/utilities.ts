import { IdisplayImage } from '../models/iContest';

export const untrustedStyle = function (display: IdisplayImage): string {
    if (!display) { return ''; }
    if (display.image) {
      return `url('${display.image}')`;
    } else {
      return `url("data:image/svg+xml;utf-8,\
    <svg viewbox='0 0 100 100'  xmlns='http://www.w3.org/2000/svg'>\
      <g >\
        <rect x='0' y='0' width='100%'  fill='none' />\
        <svg >\
          <text x='50%' y='50%' >${display.text}</text>\
        </svg>\
      </g>\
    </svg>")`;
    }
};

// <rect rx='20' ry='20' x='0' y='0' width='100%' stroke='green' fill='none' stroke-width='20'/>\


