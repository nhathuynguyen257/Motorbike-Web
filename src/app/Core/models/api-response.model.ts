import { HttpStatusCode } from "@angular/common/http";

export interface ApiResponse {
  errorMessages: string[],
  isSuccess: boolean,
  statusCode: HttpStatusCode,
  result?: object
}
