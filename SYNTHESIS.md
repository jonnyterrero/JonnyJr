# Direct Answers
- RMS: i_rms = sqrt((1/T) ∫_0^T i^2(t) dt). Average (rectified): i_avg = (1/T) ∫_0^T |i(t)| dt.
- Form factor = i_rms / i_avg.
- For ramp i(t)=📄 Synthesis report saved to SYNTHESIS.md
🎉 Synthesis workflow completed successfully!
per interval, sum contributions, then normalize by T.
- Check units and use one full period T.

# Next Actions
- Identify one full period T and write piecewise i(t) over [0, T].
- Compute ∫ i^2(t) dt per interval; sum → i_rms = sqrt((1/T) total).
- Compute ∫ |i(t)| dt per interval; sum → i_avg = (1/T) total.
- Compute form factor = i_rms / i_avg; sanity-check extremes and dimensions.
- Optionally verify numerically with a small script (Python/MATLAB).

# Materials (if relevant)
- Paper, calculator or CAS, or Python/MATLAB.

# Risks & Mitigations
- Wrong period → Sketch waveform and mark T.
- Missing absolute for average → Use |i(t)|.
- Algebra slips → Keep symbols until final; then plug numbers.

# References
- RMS: https://en.wikipedia.org/wiki/Root_mean_square
- Average/rectified values: https://www.allaboutcircuits.com/textbook/alternating-current/chpt-2/rms-rectified-average-values/
- Piecewise integration refresher: https://www.khanacademy.org/math/calculus-1/integration-calc1