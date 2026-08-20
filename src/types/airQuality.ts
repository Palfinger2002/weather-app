export interface AirQualityResponse {
  current: {
    pm2_5: number;
    us_aqi: number;
  };
}
