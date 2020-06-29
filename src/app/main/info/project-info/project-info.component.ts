import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from 'src/app/shared/services/project/project-data.service';
import { Project } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-project-info',
    templateUrl: './project-info.component.html',
    styleUrls: ['./project-info.component.less', '../../../shared/styles/info.less']
})


export class ProjectInfoComponent implements OnInit {
    project: Project;

    // project = {
    //     title: 'Tetraedrum',
    //     description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    //                   Aenean commodo ligula eget dolor. Aenean massa.
    //                   Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
    //                   ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
    //                   em. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
    //                   aliquet nec, vulputate eget, arcu.
    //                   In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`,
    //     createdAt: '21/06/20',
    // };

    constructor(private projectDataService: ProjectDataService) {}

    ngOnInit(): void {
        this.projectDataService
            .getProjectData()
            .subscribe((project: Project) => {
                this.project = project;
            });
    }

    checkManagerEmail(event: any): void {
        console.log(event.data.email);
    }
}