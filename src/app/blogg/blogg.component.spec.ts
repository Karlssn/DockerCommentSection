import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggComponent } from './blogg.component';

describe('BloggComponent', () => {
  let component: BloggComponent;
  let fixture: ComponentFixture<BloggComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
