import { Pipe, PipeTransform } from '@angular/core';
import { Repo } from '../models/Repo';

@Pipe({
  name: 'repo'
})
export class RepoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let repo:Repo = {
      html_url:value.html_url,
      repo_name:value.name,
      major_lang:value.language,
      repo_description:value.description,
      created_at:value.created_at,
      updated_at:value.updated_at,
      owner:value.owner.login
    }
    return repo;
  }

}
