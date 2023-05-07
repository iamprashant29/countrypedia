import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class BaseService {
  protected httpClient!: HttpClient;
  static baseInjector: Injector;

  constructor() {
    const injector = BaseService.baseInjector;
    if (injector) {
      this.httpClient = injector.get(HttpClient);
    } else {
      console.error("Could not get injector from DependencyInjectorService!!!");
    }
  }

  static getBaseInjector(): Injector {
    return BaseService.baseInjector;
  }

  static setBaseInjector(injector: Injector): void {
    BaseService.baseInjector = injector;
  }
}
