import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { Comment } from '../comment';
import { combineLatest } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
	selector: 'app-blogg',
	templateUrl: './blogg.component.html',
	styleUrls: ['./blogg.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BloggComponent implements OnInit {
	comments: any[] = [];
	constructor(private _dataService: DataService) {
		let _this = this;
		this._dataService.getComment()
			.subscribe(res => {
				res.map((x: Comment, index) => {
					console.log(x);
					x.Person = x.Person.slice(1,-1)
					x.Text = x.Text.slice(1,-1);
					_this.comments.push(x);
				});
			}, error => { }, 
			() => {
				this.comments.sort((a, b) => {
					if (a.Timestamp > b.Timestamp) {
						return 1;
					} if (a.Timestamp < b.Timestamp) {
						return -1;
					}
					return 0;
				});
			});
	}

	addComment(f: NgForm) {
		let time = new Date();
		let comment = new Comment(f.value.text, f.value.name, time);
		this._dataService.postComment(comment).subscribe(
			x => console.log('onNext: %s', x),
			e => console.log('onError: %s', e),
			() => console.log("Reload"));
	}

	ngOnInit() {
	}

}