export type RepoInput = {
  owner: string;
  repo: string;
  ref: string;
};

export type WorkflowStatus = {
  conclusion: string;
  status: string;
};

export type Status = {
  ref: string;
  status: string;
};

export type GitHubStatus = RepoInput & WorkflowStatus;

export type DashboardComponent = RepoInput &
  WorkflowStatus & {
    badge: string;
  };
