import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Admin = {
  __typename?: 'Admin';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  type: AdminRole;
  updatedAt: Scalars['DateTime'];
};

export type AdminLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AdminRegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  type: AdminRole;
};

/** Enum For Type of Admin Roles i.e. Master, Admin & Normal */
export enum AdminRole {
  Admin = 'admin',
  Master = 'master',
  Normal = 'normal'
}

export type Benefit = {
  __typename?: 'Benefit';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  benefit: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type BenefitInput = {
  active: Scalars['Boolean'];
  benefit: Scalars['String'];
};

export type DashboardEmployee = {
  __typename?: 'DashboardEmployee';
  employeeId: Employee;
  score: Scalars['Float'];
  userId: User;
};

export type DashboardEmployer = {
  __typename?: 'DashboardEmployer';
  employerId: Employer;
  jobId: EmployerJob;
  score: Scalars['Float'];
  userId: User;
};

/** Enum For Designation of Employee */
export enum DesignationEnum {
  Director = 'director',
  Manager = 'manager',
  Techlead = 'techlead'
}

export type Domain = {
  __typename?: 'Domain';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  domain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DomainInput = {
  active: Scalars['Boolean'];
  domain: Scalars['String'];
};

export type EmailVerifyInput = {
  id: Scalars['String'];
  token: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  _id: Scalars['ID'];
  aadharCard?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currentAddress?: Maybe<Scalars['String']>;
  currentPay?: Maybe<Scalars['Float']>;
  dob?: Maybe<Scalars['DateTime']>;
  domain?: Maybe<Domain>;
  expectedPay?: Maybe<Scalars['Float']>;
  fresher?: Maybe<Scalars['Boolean']>;
  gender?: Maybe<EmployeeGenderEnum>;
  industry?: Maybe<Industry>;
  latitude?: Maybe<Scalars['Float']>;
  linkedIn?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
  longitude?: Maybe<Scalars['Float']>;
  panCard?: Maybe<Scalars['String']>;
  qualification?: Maybe<Qualification>;
  radius?: Maybe<Scalars['Float']>;
  relevantExp?: Maybe<UserExpInYearMonths>;
  resume?: Maybe<Scalars['String']>;
  shortDescription?: Maybe<Scalars['String']>;
  skills: Array<Skill>;
  subDomain: Array<SubDomain>;
  totalExp?: Maybe<UserExpInYearMonths>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userSurvey: Array<UserSurvey>;
  workExp: Array<UserWorkExp>;
};

/** Enum For Gender of Employee */
export enum EmployeeGenderEnum {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other'
}

export type Employer = {
  __typename?: 'Employer';
  _id: Scalars['ID'];
  attritionRate?: Maybe<Scalars['Float']>;
  benefits?: Maybe<Array<Benefit>>;
  companyImage?: Maybe<Scalars['String']>;
  companyLetterHead?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  currentAddress?: Maybe<Scalars['String']>;
  employerVerified?: Maybe<Scalars['Boolean']>;
  employerVerifyStatus?: Maybe<EmployerVerifyStatusEnum>;
  gstNo?: Maybe<Scalars['String']>;
  jobs?: Maybe<Array<EmployerJob>>;
  landline?: Maybe<Scalars['Float']>;
  lastTurnover?: Maybe<Scalars['Float']>;
  linkedIn?: Maybe<Scalars['String']>;
  noOfEmployees?: Maybe<Scalars['Float']>;
  noOfHiring?: Maybe<Scalars['Float']>;
  noOfLocations?: Maybe<Scalars['Float']>;
  panNo?: Maybe<Scalars['String']>;
  registeredAddress?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userSurvey: Array<UserSurvey>;
};

export type EmployerJob = {
  __typename?: 'EmployerJob';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  domain?: Maybe<Domain>;
  industry?: Maybe<Industry>;
  jobDesc?: Maybe<Scalars['String']>;
  jobStatus?: Maybe<EmployerJobStatusEnum>;
  jobTitle?: Maybe<Scalars['String']>;
  jobType?: Maybe<EmployerJobTypeEnum>;
  latitude?: Maybe<Scalars['Float']>;
  listingComplete?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Location>;
  longitude?: Maybe<Scalars['Float']>;
  maxPay?: Maybe<Scalars['Float']>;
  minPay?: Maybe<Scalars['Float']>;
  minRequiredExp?: Maybe<UserExpInYearMonths>;
  qualification?: Maybe<Qualification>;
  radius?: Maybe<Scalars['Float']>;
  skills: Array<Skill>;
  subDomain: Array<SubDomain>;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type EmployerJobInput = {
  _id?: InputMaybe<Scalars['ID']>;
  domain?: InputMaybe<Scalars['ID']>;
  industry?: InputMaybe<Scalars['ID']>;
  jobDesc?: InputMaybe<Scalars['String']>;
  jobStatus?: InputMaybe<EmployerJobStatusEnum>;
  jobTitle?: InputMaybe<Scalars['String']>;
  jobType?: InputMaybe<EmployerJobTypeEnum>;
  latitude?: InputMaybe<Scalars['Float']>;
  listingComplete?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<Scalars['ID']>;
  longitude?: InputMaybe<Scalars['Float']>;
  maxPay?: InputMaybe<Scalars['Float']>;
  minPay?: InputMaybe<Scalars['Float']>;
  minRequiredExp?: InputMaybe<UserExpInYearMonthsInput>;
  qualification?: InputMaybe<Scalars['ID']>;
  radius?: InputMaybe<Scalars['Float']>;
  skills?: InputMaybe<Array<Scalars['ID']>>;
  subDomain?: InputMaybe<Array<Scalars['ID']>>;
};

/** Enum For status of job like open or closed */
export enum EmployerJobStatusEnum {
  Closed = 'Closed',
  Open = 'Open'
}

/** Enum For Type of job like fulltime, part-time, contract, etc. */
export enum EmployerJobTypeEnum {
  Contract = 'Contract',
  Fulltime = 'Fulltime',
  Project = 'Project'
}

/** Enum for steps of employer profile verification */
export enum EmployerVerifyStatusEnum {
  DocumentsPending = 'DocumentsPending',
  DocumentsUploaded = 'DocumentsUploaded'
}

export type Industry = {
  __typename?: 'Industry';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  industry: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IndustryInput = {
  active: Scalars['Boolean'];
  industry: Scalars['String'];
};

export type Interests = {
  __typename?: 'Interests';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  employee?: Maybe<Scalars['Boolean']>;
  employeeId: Employee;
  employer?: Maybe<Scalars['Boolean']>;
  employerId: Employer;
  jobId: EmployerJob;
  updatedAt: Scalars['DateTime'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  location: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LocationInput = {
  active: Scalars['Boolean'];
  location: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBenefit: Benefit;
  addDomain: Domain;
  addEmployerJob: Scalars['String'];
  addIndustry: Industry;
  addLocation: Location;
  addQualification: Qualification;
  addSkill: Skill;
  addSkills: Scalars['Boolean'];
  addSubDomain: SubDomain;
  addSurvey: Survey;
  adminRegister: Admin;
  markInterest: Scalars['Boolean'];
  register: User;
  updateBenefit: Benefit;
  updateDomain: Domain;
  updateEmployee: Employee;
  updateEmployer: Employer;
  updateEmployerJob: EmployerJob;
  updateIndustry: Industry;
  updateLocation: Location;
  updateQualification: Qualification;
  updateSkill: Skill;
  updateSurveyQuestion: Survey;
};


export type MutationAddBenefitArgs = {
  input: BenefitInput;
};


export type MutationAddDomainArgs = {
  input: DomainInput;
};


export type MutationAddIndustryArgs = {
  input: IndustryInput;
};


export type MutationAddLocationArgs = {
  input: LocationInput;
};


export type MutationAddQualificationArgs = {
  input: QualificationInput;
};


export type MutationAddSkillArgs = {
  input: SkillInput;
};


export type MutationAddSkillsArgs = {
  input: Array<SkillInput>;
};


export type MutationAddSubDomainArgs = {
  input: SubDomainInput;
};


export type MutationAddSurveyArgs = {
  input: SurveyInput;
};


export type MutationAdminRegisterArgs = {
  input: AdminRegisterInput;
};


export type MutationMarkInterestArgs = {
  employeeId?: InputMaybe<Scalars['String']>;
  employerId?: InputMaybe<Scalars['String']>;
  interest: Scalars['Boolean'];
  jobId?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUpdateBenefitArgs = {
  input: UpdateBenefitInput;
};


export type MutationUpdateDomainArgs = {
  input: UpdateDomainInput;
};


export type MutationUpdateEmployeeArgs = {
  input: UpdateEmployeeInput;
};


export type MutationUpdateEmployerArgs = {
  input: UpdateEmployerInput;
};


export type MutationUpdateEmployerJobArgs = {
  input: EmployerJobInput;
};


export type MutationUpdateIndustryArgs = {
  input: UpdateIndustryInput;
};


export type MutationUpdateLocationArgs = {
  input: UpdateLocationInput;
};


export type MutationUpdateQualificationArgs = {
  input: UpdateQualificationInput;
};


export type MutationUpdateSkillArgs = {
  input: UpdateSkillInput;
};


export type MutationUpdateSurveyQuestionArgs = {
  input: UpdateSurveyInput;
};

export type Qualification = {
  __typename?: 'Qualification';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  qualification: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type QualificationInput = {
  active: Scalars['Boolean'];
  qualification: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  adminLogin: Scalars['String'];
  adminLogout: Scalars['Boolean'];
  allBenefits: Array<Benefit>;
  allDomains: Array<Domain>;
  allIndustries: Array<Industry>;
  allLocations: Array<Location>;
  allQualifications: Array<Qualification>;
  allSkills: Array<Skill>;
  allSubDomains: Array<SubDomain>;
  allSurveyQuestion: Array<Survey>;
  employeeExplore: Array<DashboardEmployer>;
  employerExplore: Array<DashboardEmployee>;
  getAllEmployees: Array<Employee>;
  getAllEmployers: Array<Employer>;
  getEmployee: Employee;
  getEmployer: Employer;
  getEmployerAllJobs: Array<EmployerJob>;
  getJobDetails: EmployerJob;
  getMatched: Array<Interests>;
  getMyInterests: Array<Interests>;
  getShownInterests: Array<Interests>;
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  resendVerifyEmail: Scalars['Boolean'];
  updateProfileStatus: Scalars['Boolean'];
  updateSurveyStatus: Scalars['Boolean'];
  updateUserImage: Scalars['Boolean'];
  user: User;
  verifyEmail: Scalars['Boolean'];
  verifyEmployer: Scalars['Boolean'];
};


export type QueryAdminLoginArgs = {
  input: AdminLoginInput;
};


export type QueryAllSurveyQuestionArgs = {
  type?: InputMaybe<SurveyType>;
};


export type QueryEmployerExploreArgs = {
  jobId: Scalars['String'];
};


export type QueryGetJobDetailsArgs = {
  jobId: Scalars['String'];
};


export type QueryGetMatchedArgs = {
  jobId?: InputMaybe<Scalars['String']>;
};


export type QueryGetMyInterestsArgs = {
  jobId?: InputMaybe<Scalars['String']>;
};


export type QueryGetShownInterestsArgs = {
  jobId?: InputMaybe<Scalars['String']>;
};


export type QueryLoginArgs = {
  input: LoginInput;
};


export type QueryResendVerifyEmailArgs = {
  input: EmailVerifyInput;
};


export type QueryUpdateUserImageArgs = {
  image: Scalars['String'];
};


export type QueryVerifyEmailArgs = {
  input: EmailVerifyInput;
};


export type QueryVerifyEmployerArgs = {
  input: UpdateEmployerVerifyInput;
};

export type RegisterInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  number: Scalars['String'];
  password: Scalars['String'];
  type: UserRole;
};

export type Skill = {
  __typename?: 'Skill';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  skill: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SkillInput = {
  active: Scalars['Boolean'];
  skill: Scalars['String'];
};

export type SubDomain = {
  __typename?: 'SubDomain';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  domain: Domain;
  subDomain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SubDomainInput = {
  active: Scalars['Boolean'];
  domain: Scalars['String'];
  subDomain: Scalars['String'];
};

export type Survey = {
  __typename?: 'Survey';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  type: SurveyType;
  updatedAt: Scalars['DateTime'];
};

export type SurveyInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  type: SurveyType;
};

/** Enum For Type of Survey User Roles i.e. Employer & Employee */
export enum SurveyType {
  Employee = 'employee',
  Employer = 'employer'
}

export type UpdateBenefitInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  benefit?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateDomainInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  domain?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateEmployeeInput = {
  aadharCard?: InputMaybe<Scalars['String']>;
  currentAddress?: InputMaybe<Scalars['String']>;
  currentPay?: InputMaybe<Scalars['Float']>;
  dob?: InputMaybe<Scalars['DateTime']>;
  domain?: InputMaybe<Scalars['ID']>;
  expectedPay?: InputMaybe<Scalars['Float']>;
  fresher?: InputMaybe<Scalars['Boolean']>;
  gender?: InputMaybe<EmployeeGenderEnum>;
  industry?: InputMaybe<Scalars['ID']>;
  latitude?: InputMaybe<Scalars['Float']>;
  linkedIn?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['ID']>;
  longitude?: InputMaybe<Scalars['Float']>;
  panCard?: InputMaybe<Scalars['String']>;
  qualification?: InputMaybe<Scalars['ID']>;
  radius?: InputMaybe<Scalars['Float']>;
  relevantExp?: InputMaybe<UserExpInYearMonthsInput>;
  resume?: InputMaybe<Scalars['String']>;
  shortDescription?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Array<Scalars['ID']>>;
  subDomain?: InputMaybe<Array<Scalars['ID']>>;
  totalExp?: InputMaybe<UserExpInYearMonthsInput>;
  userSurvey?: InputMaybe<Array<UserSurveyInput>>;
  workExp?: InputMaybe<Array<UserWorkExpInput>>;
};

export type UpdateEmployerInput = {
  attritionRate?: InputMaybe<Scalars['Float']>;
  benefits?: InputMaybe<Array<Scalars['ID']>>;
  companyImage?: InputMaybe<Scalars['String']>;
  companyLetterHead?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  currentAddress?: InputMaybe<Scalars['String']>;
  employerVerifyStatus?: InputMaybe<EmployerVerifyStatusEnum>;
  gstNo?: InputMaybe<Scalars['String']>;
  landline?: InputMaybe<Scalars['Float']>;
  lastTurnover?: InputMaybe<Scalars['Float']>;
  linkedIn?: InputMaybe<Scalars['String']>;
  noOfEmployees?: InputMaybe<Scalars['Float']>;
  noOfHiring?: InputMaybe<Scalars['Float']>;
  noOfLocations?: InputMaybe<Scalars['Float']>;
  panNo?: InputMaybe<Scalars['String']>;
  registeredAddress?: InputMaybe<Scalars['String']>;
  userSurvey?: InputMaybe<Array<UserSurveyInput>>;
};

export type UpdateEmployerVerifyInput = {
  _id: Scalars['ID'];
  employerVerified: Scalars['Boolean'];
};

export type UpdateIndustryInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  industry?: InputMaybe<Scalars['String']>;
};

export type UpdateLocationInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  location?: InputMaybe<Scalars['String']>;
};

export type UpdateQualificationInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  qualification?: InputMaybe<Scalars['String']>;
};

export type UpdateSkillInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  skill?: InputMaybe<Scalars['String']>;
};

export type UpdateSurveyInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  options?: InputMaybe<Array<Scalars['String']>>;
  question?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  isAccountVerified: Scalars['Boolean'];
  isProfileCompleted: Scalars['Boolean'];
  isSurveyCompleted: Scalars['Boolean'];
  lastName: Scalars['String'];
  number: Scalars['String'];
  type: UserRole;
  updatedAt: Scalars['DateTime'];
};

export type UserExpInYearMonths = {
  __typename?: 'UserExpInYearMonths';
  months: Scalars['String'];
  years: Scalars['String'];
};

export type UserExpInYearMonthsInput = {
  months: Scalars['String'];
  years: Scalars['String'];
};

/** Enum For Type of User Roles i.e. Employer & Employee */
export enum UserRole {
  Employee = 'employee',
  Employer = 'employer'
}

export type UserSurvey = {
  __typename?: 'UserSurvey';
  selectedOption: Scalars['String'];
  survey: Survey;
};

export type UserSurveyInput = {
  selectedOption: Scalars['String'];
  survey: Scalars['String'];
};

export type UserWorkExp = {
  __typename?: 'UserWorkExp';
  company: Scalars['String'];
  current: Scalars['Boolean'];
  desc: Scalars['String'];
  designation: DesignationEnum;
  end?: Maybe<Scalars['DateTime']>;
  expectedJoinigDate?: Maybe<Scalars['DateTime']>;
  lastDateAtCurrentEmployer?: Maybe<Scalars['DateTime']>;
  onNotice: Scalars['Boolean'];
  start: Scalars['DateTime'];
};

export type UserWorkExpInput = {
  company: Scalars['String'];
  current: Scalars['Boolean'];
  desc: Scalars['String'];
  designation: DesignationEnum;
  end?: InputMaybe<Scalars['DateTime']>;
  expectedJoinigDate?: InputMaybe<Scalars['DateTime']>;
  lastDateAtCurrentEmployer?: InputMaybe<Scalars['DateTime']>;
  onNotice: Scalars['Boolean'];
  start: Scalars['DateTime'];
};

export type AllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLocationsQuery = { __typename?: 'Query', allLocations: Array<{ __typename?: 'Location', _id: string, location: string, active: boolean }> };

export type AllQualificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllQualificationsQuery = { __typename?: 'Query', allQualifications: Array<{ __typename?: 'Qualification', _id: string, qualification: string, active: boolean }> };

export type GetAllEmployersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmployersQuery = { __typename?: 'Query', getAllEmployers: Array<{ __typename?: 'Employer', _id: string, companyName?: string | null, employerVerified?: boolean | null, companyLetterHead?: string | null }> };

export type GetInfoEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInfoEmployeesQuery = { __typename?: 'Query', getAllEmployees: Array<{ __typename?: 'Employee', _id: string, shortDescription?: string | null, radius?: number | null, latitude?: number | null, longitude?: number | null, fresher?: boolean | null, currentPay?: number | null, expectedPay?: number | null, linkedIn?: string | null, resume?: string | null, gender?: EmployeeGenderEnum | null, currentAddress?: string | null, createdAt: any, updatedAt: any, dob?: any | null, user: { __typename?: 'User', firstName: string, lastName: string, email: string, number: string, isAccountVerified: boolean, isProfileCompleted: boolean, isSurveyCompleted: boolean }, location?: { __typename?: 'Location', location: string } | null, qualification?: { __typename?: 'Qualification', qualification: string } | null, industry?: { __typename?: 'Industry', industry: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, skills: Array<{ __typename?: 'Skill', skill: string }>, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string, domain: { __typename?: 'Domain', domain: string } }>, workExp: Array<{ __typename?: 'UserWorkExp', company: string, desc: string, designation: DesignationEnum, onNotice: boolean, start: any, end?: any | null, expectedJoinigDate?: any | null, lastDateAtCurrentEmployer?: any | null }>, totalExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null, relevantExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null }> };

export type GetInfoEmployersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInfoEmployersQuery = { __typename?: 'Query', getAllEmployers: Array<{ __typename?: 'Employer', _id: string, companyName?: string | null, companyImage?: string | null, companyLetterHead?: string | null, employerVerified?: boolean | null, employerVerifyStatus?: EmployerVerifyStatusEnum | null, noOfHiring?: number | null, noOfLocations?: number | null, noOfEmployees?: number | null, landline?: number | null, registeredAddress?: string | null, linkedIn?: string | null, currentAddress?: string | null, attritionRate?: number | null, createdAt: any, updatedAt: any, lastTurnover?: number | null, user: { __typename?: 'User', firstName: string, lastName: string, email: string, number: string, isAccountVerified: boolean, isProfileCompleted: boolean, isSurveyCompleted: boolean }, jobs?: Array<{ __typename?: 'EmployerJob', jobTitle?: string | null, jobDesc?: string | null, jobType?: EmployerJobTypeEnum | null, jobStatus?: EmployerJobStatusEnum | null, listingComplete?: boolean | null, radius?: number | null, latitude?: number | null, longitude?: number | null, minPay?: number | null, maxPay?: number | null, createdAt: any, updatedAt: any, location?: { __typename?: 'Location', location: string } | null, qualification?: { __typename?: 'Qualification', qualification: string } | null, industry?: { __typename?: 'Industry', industry: string } | null, domain?: { __typename?: 'Domain', domain: string } | null, skills: Array<{ __typename?: 'Skill', skill: string }>, subDomain: Array<{ __typename?: 'SubDomain', subDomain: string, domain: { __typename?: 'Domain', domain: string } }>, minRequiredExp?: { __typename?: 'UserExpInYearMonths', years: string, months: string } | null }> | null, benefits?: Array<{ __typename?: 'Benefit', benefit: string }> | null }> };

export type AllIndustriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllIndustriesQuery = { __typename?: 'Query', allIndustries: Array<{ __typename?: 'Industry', _id: string, industry: string, active: boolean }> };

export type AllDomainsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDomainsQuery = { __typename?: 'Query', allDomains: Array<{ __typename?: 'Domain', _id: string, domain: string, active: boolean }> };

export type AllSubDomainsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSubDomainsQuery = { __typename?: 'Query', allSubDomains: Array<{ __typename?: 'SubDomain', _id: string, subDomain: string, domain: { __typename?: 'Domain', _id: string, domain: string } }> };

export type AllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSkillsQuery = { __typename?: 'Query', allSkills: Array<{ __typename?: 'Skill', _id: string, skill: string, active: boolean }> };

export type AllSurveyQuestionQueryVariables = Exact<{
  type?: InputMaybe<SurveyType>;
}>;


export type AllSurveyQuestionQuery = { __typename?: 'Query', allSurveyQuestion: Array<{ __typename?: 'Survey', _id: string, question: string, options: Array<string>, type: SurveyType, createdAt: any, updatedAt: any, active: boolean }> };

export type AllBenefitsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBenefitsQuery = { __typename?: 'Query', allBenefits: Array<{ __typename?: 'Benefit', _id: string, benefit: string, active: boolean }> };

export type AdminLoginQueryVariables = Exact<{
  input: AdminLoginInput;
}>;


export type AdminLoginQuery = { __typename?: 'Query', adminLogin: string };

export type VerifyEmployerQueryVariables = Exact<{
  input: UpdateEmployerVerifyInput;
}>;


export type VerifyEmployerQuery = { __typename?: 'Query', verifyEmployer: boolean };

export type AddLocationMutationVariables = Exact<{
  input: LocationInput;
}>;


export type AddLocationMutation = { __typename?: 'Mutation', addLocation: { __typename?: 'Location', location: string, _id: string } };

export type AddQualificationMutationVariables = Exact<{
  input: QualificationInput;
}>;


export type AddQualificationMutation = { __typename?: 'Mutation', addQualification: { __typename?: 'Qualification', qualification: string, _id: string } };

export type AddIndustryMutationVariables = Exact<{
  input: IndustryInput;
}>;


export type AddIndustryMutation = { __typename?: 'Mutation', addIndustry: { __typename?: 'Industry', industry: string, _id: string } };

export type AddDomainMutationVariables = Exact<{
  input: DomainInput;
}>;


export type AddDomainMutation = { __typename?: 'Mutation', addDomain: { __typename?: 'Domain', domain: string, _id: string } };

export type AddSkillMutationVariables = Exact<{
  input: SkillInput;
}>;


export type AddSkillMutation = { __typename?: 'Mutation', addSkill: { __typename?: 'Skill', skill: string, _id: string } };

export type AddBenefitMutationVariables = Exact<{
  input: BenefitInput;
}>;


export type AddBenefitMutation = { __typename?: 'Mutation', addBenefit: { __typename?: 'Benefit', benefit: string, _id: string } };

export type AddSurveyMutationVariables = Exact<{
  input: SurveyInput;
}>;


export type AddSurveyMutation = { __typename?: 'Mutation', addSurvey: { __typename?: 'Survey', question: string, options: Array<string>, _id: string } };

export type UpdateLocationMutationVariables = Exact<{
  input: UpdateLocationInput;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation: { __typename?: 'Location', location: string, active: boolean } };

export type UpdateQualificationMutationVariables = Exact<{
  input: UpdateQualificationInput;
}>;


export type UpdateQualificationMutation = { __typename?: 'Mutation', updateQualification: { __typename?: 'Qualification', qualification: string, active: boolean } };

export type UpdateIndustryMutationVariables = Exact<{
  input: UpdateIndustryInput;
}>;


export type UpdateIndustryMutation = { __typename?: 'Mutation', updateIndustry: { __typename?: 'Industry', industry: string, active: boolean } };

export type UpdateSkillMutationVariables = Exact<{
  input: UpdateSkillInput;
}>;


export type UpdateSkillMutation = { __typename?: 'Mutation', updateSkill: { __typename?: 'Skill', skill: string, active: boolean } };

export type UpdateDomainMutationVariables = Exact<{
  input: UpdateDomainInput;
}>;


export type UpdateDomainMutation = { __typename?: 'Mutation', updateDomain: { __typename?: 'Domain', domain: string, active: boolean } };

export type UpdateBenefitMutationVariables = Exact<{
  input: UpdateBenefitInput;
}>;


export type UpdateBenefitMutation = { __typename?: 'Mutation', updateBenefit: { __typename?: 'Benefit', benefit: string, active: boolean } };

export type UpdateSurveyMutationVariables = Exact<{
  input: UpdateSurveyInput;
}>;


export type UpdateSurveyMutation = { __typename?: 'Mutation', updateSurveyQuestion: { __typename?: 'Survey', options: Array<string>, question: string, _id: string, active: boolean } };


export const AllLocationsDocument = gql`
    query AllLocations {
  allLocations {
    _id
    location
    active
  }
}
    `;

/**
 * __useAllLocationsQuery__
 *
 * To run a query within a React component, call `useAllLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLocationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllLocationsQuery(baseOptions?: Apollo.QueryHookOptions<AllLocationsQuery, AllLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllLocationsQuery, AllLocationsQueryVariables>(AllLocationsDocument, options);
      }
export function useAllLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLocationsQuery, AllLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllLocationsQuery, AllLocationsQueryVariables>(AllLocationsDocument, options);
        }
export type AllLocationsQueryHookResult = ReturnType<typeof useAllLocationsQuery>;
export type AllLocationsLazyQueryHookResult = ReturnType<typeof useAllLocationsLazyQuery>;
export type AllLocationsQueryResult = Apollo.QueryResult<AllLocationsQuery, AllLocationsQueryVariables>;
export const AllQualificationsDocument = gql`
    query AllQualifications {
  allQualifications {
    _id
    qualification
    active
  }
}
    `;

/**
 * __useAllQualificationsQuery__
 *
 * To run a query within a React component, call `useAllQualificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllQualificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllQualificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllQualificationsQuery(baseOptions?: Apollo.QueryHookOptions<AllQualificationsQuery, AllQualificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllQualificationsQuery, AllQualificationsQueryVariables>(AllQualificationsDocument, options);
      }
export function useAllQualificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllQualificationsQuery, AllQualificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllQualificationsQuery, AllQualificationsQueryVariables>(AllQualificationsDocument, options);
        }
export type AllQualificationsQueryHookResult = ReturnType<typeof useAllQualificationsQuery>;
export type AllQualificationsLazyQueryHookResult = ReturnType<typeof useAllQualificationsLazyQuery>;
export type AllQualificationsQueryResult = Apollo.QueryResult<AllQualificationsQuery, AllQualificationsQueryVariables>;
export const GetAllEmployersDocument = gql`
    query GetAllEmployers {
  getAllEmployers {
    _id
    companyName
    employerVerified
    companyLetterHead
  }
}
    `;

/**
 * __useGetAllEmployersQuery__
 *
 * To run a query within a React component, call `useGetAllEmployersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEmployersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEmployersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEmployersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllEmployersQuery, GetAllEmployersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEmployersQuery, GetAllEmployersQueryVariables>(GetAllEmployersDocument, options);
      }
export function useGetAllEmployersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEmployersQuery, GetAllEmployersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEmployersQuery, GetAllEmployersQueryVariables>(GetAllEmployersDocument, options);
        }
export type GetAllEmployersQueryHookResult = ReturnType<typeof useGetAllEmployersQuery>;
export type GetAllEmployersLazyQueryHookResult = ReturnType<typeof useGetAllEmployersLazyQuery>;
export type GetAllEmployersQueryResult = Apollo.QueryResult<GetAllEmployersQuery, GetAllEmployersQueryVariables>;
export const GetInfoEmployeesDocument = gql`
    query GetInfoEmployees {
  getAllEmployees {
    _id
    user {
      firstName
      lastName
      email
      number
      isAccountVerified
      isProfileCompleted
      isSurveyCompleted
    }
    shortDescription
    radius
    latitude
    longitude
    location {
      location
    }
    qualification {
      qualification
    }
    industry {
      industry
    }
    domain {
      domain
    }
    skills {
      skill
    }
    subDomain {
      domain {
        domain
      }
      subDomain
    }
    fresher
    workExp {
      company
      desc
      designation
      onNotice
      start
      end
      expectedJoinigDate
      lastDateAtCurrentEmployer
    }
    totalExp {
      years
      months
    }
    relevantExp {
      years
      months
    }
    currentPay
    expectedPay
    linkedIn
    resume
    gender
    currentAddress
    createdAt
    updatedAt
    dob
  }
}
    `;

/**
 * __useGetInfoEmployeesQuery__
 *
 * To run a query within a React component, call `useGetInfoEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInfoEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInfoEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInfoEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<GetInfoEmployeesQuery, GetInfoEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInfoEmployeesQuery, GetInfoEmployeesQueryVariables>(GetInfoEmployeesDocument, options);
      }
export function useGetInfoEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInfoEmployeesQuery, GetInfoEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInfoEmployeesQuery, GetInfoEmployeesQueryVariables>(GetInfoEmployeesDocument, options);
        }
export type GetInfoEmployeesQueryHookResult = ReturnType<typeof useGetInfoEmployeesQuery>;
export type GetInfoEmployeesLazyQueryHookResult = ReturnType<typeof useGetInfoEmployeesLazyQuery>;
export type GetInfoEmployeesQueryResult = Apollo.QueryResult<GetInfoEmployeesQuery, GetInfoEmployeesQueryVariables>;
export const GetInfoEmployersDocument = gql`
    query GetInfoEmployers {
  getAllEmployers {
    _id
    user {
      firstName
      lastName
      email
      number
      isAccountVerified
      isProfileCompleted
      isSurveyCompleted
    }
    companyName
    companyImage
    companyLetterHead
    employerVerified
    employerVerifyStatus
    noOfHiring
    noOfLocations
    noOfEmployees
    jobs {
      jobTitle
      jobDesc
      jobType
      jobStatus
      listingComplete
      location {
        location
      }
      qualification {
        qualification
      }
      industry {
        industry
      }
      domain {
        domain
      }
      skills {
        skill
      }
      subDomain {
        domain {
          domain
        }
        subDomain
      }
      radius
      latitude
      longitude
      minPay
      maxPay
      minRequiredExp {
        years
        months
      }
      createdAt
      updatedAt
    }
    benefits {
      benefit
    }
    landline
    registeredAddress
    linkedIn
    currentAddress
    noOfHiring
    attritionRate
    createdAt
    updatedAt
    lastTurnover
  }
}
    `;

/**
 * __useGetInfoEmployersQuery__
 *
 * To run a query within a React component, call `useGetInfoEmployersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInfoEmployersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInfoEmployersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInfoEmployersQuery(baseOptions?: Apollo.QueryHookOptions<GetInfoEmployersQuery, GetInfoEmployersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInfoEmployersQuery, GetInfoEmployersQueryVariables>(GetInfoEmployersDocument, options);
      }
export function useGetInfoEmployersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInfoEmployersQuery, GetInfoEmployersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInfoEmployersQuery, GetInfoEmployersQueryVariables>(GetInfoEmployersDocument, options);
        }
export type GetInfoEmployersQueryHookResult = ReturnType<typeof useGetInfoEmployersQuery>;
export type GetInfoEmployersLazyQueryHookResult = ReturnType<typeof useGetInfoEmployersLazyQuery>;
export type GetInfoEmployersQueryResult = Apollo.QueryResult<GetInfoEmployersQuery, GetInfoEmployersQueryVariables>;
export const AllIndustriesDocument = gql`
    query AllIndustries {
  allIndustries {
    _id
    industry
    active
  }
}
    `;

/**
 * __useAllIndustriesQuery__
 *
 * To run a query within a React component, call `useAllIndustriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllIndustriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllIndustriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllIndustriesQuery(baseOptions?: Apollo.QueryHookOptions<AllIndustriesQuery, AllIndustriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllIndustriesQuery, AllIndustriesQueryVariables>(AllIndustriesDocument, options);
      }
export function useAllIndustriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllIndustriesQuery, AllIndustriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllIndustriesQuery, AllIndustriesQueryVariables>(AllIndustriesDocument, options);
        }
export type AllIndustriesQueryHookResult = ReturnType<typeof useAllIndustriesQuery>;
export type AllIndustriesLazyQueryHookResult = ReturnType<typeof useAllIndustriesLazyQuery>;
export type AllIndustriesQueryResult = Apollo.QueryResult<AllIndustriesQuery, AllIndustriesQueryVariables>;
export const AllDomainsDocument = gql`
    query AllDomains {
  allDomains {
    _id
    domain
    active
  }
}
    `;

/**
 * __useAllDomainsQuery__
 *
 * To run a query within a React component, call `useAllDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllDomainsQuery(baseOptions?: Apollo.QueryHookOptions<AllDomainsQuery, AllDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllDomainsQuery, AllDomainsQueryVariables>(AllDomainsDocument, options);
      }
export function useAllDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllDomainsQuery, AllDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllDomainsQuery, AllDomainsQueryVariables>(AllDomainsDocument, options);
        }
export type AllDomainsQueryHookResult = ReturnType<typeof useAllDomainsQuery>;
export type AllDomainsLazyQueryHookResult = ReturnType<typeof useAllDomainsLazyQuery>;
export type AllDomainsQueryResult = Apollo.QueryResult<AllDomainsQuery, AllDomainsQueryVariables>;
export const AllSubDomainsDocument = gql`
    query AllSubDomains {
  allSubDomains {
    _id
    subDomain
    domain {
      _id
      domain
    }
  }
}
    `;

/**
 * __useAllSubDomainsQuery__
 *
 * To run a query within a React component, call `useAllSubDomainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSubDomainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSubDomainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSubDomainsQuery(baseOptions?: Apollo.QueryHookOptions<AllSubDomainsQuery, AllSubDomainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSubDomainsQuery, AllSubDomainsQueryVariables>(AllSubDomainsDocument, options);
      }
export function useAllSubDomainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSubDomainsQuery, AllSubDomainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSubDomainsQuery, AllSubDomainsQueryVariables>(AllSubDomainsDocument, options);
        }
export type AllSubDomainsQueryHookResult = ReturnType<typeof useAllSubDomainsQuery>;
export type AllSubDomainsLazyQueryHookResult = ReturnType<typeof useAllSubDomainsLazyQuery>;
export type AllSubDomainsQueryResult = Apollo.QueryResult<AllSubDomainsQuery, AllSubDomainsQueryVariables>;
export const AllSkillsDocument = gql`
    query AllSkills {
  allSkills {
    _id
    skill
    active
  }
}
    `;

/**
 * __useAllSkillsQuery__
 *
 * To run a query within a React component, call `useAllSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSkillsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllSkillsQuery(baseOptions?: Apollo.QueryHookOptions<AllSkillsQuery, AllSkillsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSkillsQuery, AllSkillsQueryVariables>(AllSkillsDocument, options);
      }
export function useAllSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSkillsQuery, AllSkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSkillsQuery, AllSkillsQueryVariables>(AllSkillsDocument, options);
        }
export type AllSkillsQueryHookResult = ReturnType<typeof useAllSkillsQuery>;
export type AllSkillsLazyQueryHookResult = ReturnType<typeof useAllSkillsLazyQuery>;
export type AllSkillsQueryResult = Apollo.QueryResult<AllSkillsQuery, AllSkillsQueryVariables>;
export const AllSurveyQuestionDocument = gql`
    query AllSurveyQuestion($type: SurveyType) {
  allSurveyQuestion(type: $type) {
    _id
    question
    options
    type
    createdAt
    updatedAt
    active
  }
}
    `;

/**
 * __useAllSurveyQuestionQuery__
 *
 * To run a query within a React component, call `useAllSurveyQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllSurveyQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllSurveyQuestionQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAllSurveyQuestionQuery(baseOptions?: Apollo.QueryHookOptions<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>(AllSurveyQuestionDocument, options);
      }
export function useAllSurveyQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>(AllSurveyQuestionDocument, options);
        }
export type AllSurveyQuestionQueryHookResult = ReturnType<typeof useAllSurveyQuestionQuery>;
export type AllSurveyQuestionLazyQueryHookResult = ReturnType<typeof useAllSurveyQuestionLazyQuery>;
export type AllSurveyQuestionQueryResult = Apollo.QueryResult<AllSurveyQuestionQuery, AllSurveyQuestionQueryVariables>;
export const AllBenefitsDocument = gql`
    query AllBenefits {
  allBenefits {
    _id
    benefit
    active
  }
}
    `;

/**
 * __useAllBenefitsQuery__
 *
 * To run a query within a React component, call `useAllBenefitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllBenefitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllBenefitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllBenefitsQuery(baseOptions?: Apollo.QueryHookOptions<AllBenefitsQuery, AllBenefitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllBenefitsQuery, AllBenefitsQueryVariables>(AllBenefitsDocument, options);
      }
export function useAllBenefitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllBenefitsQuery, AllBenefitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllBenefitsQuery, AllBenefitsQueryVariables>(AllBenefitsDocument, options);
        }
export type AllBenefitsQueryHookResult = ReturnType<typeof useAllBenefitsQuery>;
export type AllBenefitsLazyQueryHookResult = ReturnType<typeof useAllBenefitsLazyQuery>;
export type AllBenefitsQueryResult = Apollo.QueryResult<AllBenefitsQuery, AllBenefitsQueryVariables>;
export const AdminLoginDocument = gql`
    query AdminLogin($input: AdminLoginInput!) {
  adminLogin(input: $input)
}
    `;

/**
 * __useAdminLoginQuery__
 *
 * To run a query within a React component, call `useAdminLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminLoginQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminLoginQuery(baseOptions: Apollo.QueryHookOptions<AdminLoginQuery, AdminLoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminLoginQuery, AdminLoginQueryVariables>(AdminLoginDocument, options);
      }
export function useAdminLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminLoginQuery, AdminLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminLoginQuery, AdminLoginQueryVariables>(AdminLoginDocument, options);
        }
export type AdminLoginQueryHookResult = ReturnType<typeof useAdminLoginQuery>;
export type AdminLoginLazyQueryHookResult = ReturnType<typeof useAdminLoginLazyQuery>;
export type AdminLoginQueryResult = Apollo.QueryResult<AdminLoginQuery, AdminLoginQueryVariables>;
export const VerifyEmployerDocument = gql`
    query VerifyEmployer($input: UpdateEmployerVerifyInput!) {
  verifyEmployer(input: $input)
}
    `;

/**
 * __useVerifyEmployerQuery__
 *
 * To run a query within a React component, call `useVerifyEmployerQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmployerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyEmployerQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEmployerQuery(baseOptions: Apollo.QueryHookOptions<VerifyEmployerQuery, VerifyEmployerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyEmployerQuery, VerifyEmployerQueryVariables>(VerifyEmployerDocument, options);
      }
export function useVerifyEmployerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyEmployerQuery, VerifyEmployerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyEmployerQuery, VerifyEmployerQueryVariables>(VerifyEmployerDocument, options);
        }
export type VerifyEmployerQueryHookResult = ReturnType<typeof useVerifyEmployerQuery>;
export type VerifyEmployerLazyQueryHookResult = ReturnType<typeof useVerifyEmployerLazyQuery>;
export type VerifyEmployerQueryResult = Apollo.QueryResult<VerifyEmployerQuery, VerifyEmployerQueryVariables>;
export const AddLocationDocument = gql`
    mutation AddLocation($input: LocationInput!) {
  addLocation(input: $input) {
    location
    _id
  }
}
    `;
export type AddLocationMutationFn = Apollo.MutationFunction<AddLocationMutation, AddLocationMutationVariables>;

/**
 * __useAddLocationMutation__
 *
 * To run a mutation, you first call `useAddLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLocationMutation, { data, loading, error }] = useAddLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddLocationMutation(baseOptions?: Apollo.MutationHookOptions<AddLocationMutation, AddLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLocationMutation, AddLocationMutationVariables>(AddLocationDocument, options);
      }
export type AddLocationMutationHookResult = ReturnType<typeof useAddLocationMutation>;
export type AddLocationMutationResult = Apollo.MutationResult<AddLocationMutation>;
export type AddLocationMutationOptions = Apollo.BaseMutationOptions<AddLocationMutation, AddLocationMutationVariables>;
export const AddQualificationDocument = gql`
    mutation AddQualification($input: QualificationInput!) {
  addQualification(input: $input) {
    qualification
    _id
  }
}
    `;
export type AddQualificationMutationFn = Apollo.MutationFunction<AddQualificationMutation, AddQualificationMutationVariables>;

/**
 * __useAddQualificationMutation__
 *
 * To run a mutation, you first call `useAddQualificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddQualificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addQualificationMutation, { data, loading, error }] = useAddQualificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddQualificationMutation(baseOptions?: Apollo.MutationHookOptions<AddQualificationMutation, AddQualificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddQualificationMutation, AddQualificationMutationVariables>(AddQualificationDocument, options);
      }
export type AddQualificationMutationHookResult = ReturnType<typeof useAddQualificationMutation>;
export type AddQualificationMutationResult = Apollo.MutationResult<AddQualificationMutation>;
export type AddQualificationMutationOptions = Apollo.BaseMutationOptions<AddQualificationMutation, AddQualificationMutationVariables>;
export const AddIndustryDocument = gql`
    mutation AddIndustry($input: IndustryInput!) {
  addIndustry(input: $input) {
    industry
    _id
  }
}
    `;
export type AddIndustryMutationFn = Apollo.MutationFunction<AddIndustryMutation, AddIndustryMutationVariables>;

/**
 * __useAddIndustryMutation__
 *
 * To run a mutation, you first call `useAddIndustryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddIndustryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addIndustryMutation, { data, loading, error }] = useAddIndustryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddIndustryMutation(baseOptions?: Apollo.MutationHookOptions<AddIndustryMutation, AddIndustryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddIndustryMutation, AddIndustryMutationVariables>(AddIndustryDocument, options);
      }
export type AddIndustryMutationHookResult = ReturnType<typeof useAddIndustryMutation>;
export type AddIndustryMutationResult = Apollo.MutationResult<AddIndustryMutation>;
export type AddIndustryMutationOptions = Apollo.BaseMutationOptions<AddIndustryMutation, AddIndustryMutationVariables>;
export const AddDomainDocument = gql`
    mutation AddDomain($input: DomainInput!) {
  addDomain(input: $input) {
    domain
    _id
  }
}
    `;
export type AddDomainMutationFn = Apollo.MutationFunction<AddDomainMutation, AddDomainMutationVariables>;

/**
 * __useAddDomainMutation__
 *
 * To run a mutation, you first call `useAddDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDomainMutation, { data, loading, error }] = useAddDomainMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddDomainMutation(baseOptions?: Apollo.MutationHookOptions<AddDomainMutation, AddDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddDomainMutation, AddDomainMutationVariables>(AddDomainDocument, options);
      }
export type AddDomainMutationHookResult = ReturnType<typeof useAddDomainMutation>;
export type AddDomainMutationResult = Apollo.MutationResult<AddDomainMutation>;
export type AddDomainMutationOptions = Apollo.BaseMutationOptions<AddDomainMutation, AddDomainMutationVariables>;
export const AddSkillDocument = gql`
    mutation AddSkill($input: SkillInput!) {
  addSkill(input: $input) {
    skill
    _id
  }
}
    `;
export type AddSkillMutationFn = Apollo.MutationFunction<AddSkillMutation, AddSkillMutationVariables>;

/**
 * __useAddSkillMutation__
 *
 * To run a mutation, you first call `useAddSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSkillMutation, { data, loading, error }] = useAddSkillMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSkillMutation(baseOptions?: Apollo.MutationHookOptions<AddSkillMutation, AddSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSkillMutation, AddSkillMutationVariables>(AddSkillDocument, options);
      }
export type AddSkillMutationHookResult = ReturnType<typeof useAddSkillMutation>;
export type AddSkillMutationResult = Apollo.MutationResult<AddSkillMutation>;
export type AddSkillMutationOptions = Apollo.BaseMutationOptions<AddSkillMutation, AddSkillMutationVariables>;
export const AddBenefitDocument = gql`
    mutation AddBenefit($input: BenefitInput!) {
  addBenefit(input: $input) {
    benefit
    _id
  }
}
    `;
export type AddBenefitMutationFn = Apollo.MutationFunction<AddBenefitMutation, AddBenefitMutationVariables>;

/**
 * __useAddBenefitMutation__
 *
 * To run a mutation, you first call `useAddBenefitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBenefitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBenefitMutation, { data, loading, error }] = useAddBenefitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddBenefitMutation(baseOptions?: Apollo.MutationHookOptions<AddBenefitMutation, AddBenefitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBenefitMutation, AddBenefitMutationVariables>(AddBenefitDocument, options);
      }
export type AddBenefitMutationHookResult = ReturnType<typeof useAddBenefitMutation>;
export type AddBenefitMutationResult = Apollo.MutationResult<AddBenefitMutation>;
export type AddBenefitMutationOptions = Apollo.BaseMutationOptions<AddBenefitMutation, AddBenefitMutationVariables>;
export const AddSurveyDocument = gql`
    mutation AddSurvey($input: SurveyInput!) {
  addSurvey(input: $input) {
    question
    options
    _id
  }
}
    `;
export type AddSurveyMutationFn = Apollo.MutationFunction<AddSurveyMutation, AddSurveyMutationVariables>;

/**
 * __useAddSurveyMutation__
 *
 * To run a mutation, you first call `useAddSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSurveyMutation, { data, loading, error }] = useAddSurveyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSurveyMutation(baseOptions?: Apollo.MutationHookOptions<AddSurveyMutation, AddSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSurveyMutation, AddSurveyMutationVariables>(AddSurveyDocument, options);
      }
export type AddSurveyMutationHookResult = ReturnType<typeof useAddSurveyMutation>;
export type AddSurveyMutationResult = Apollo.MutationResult<AddSurveyMutation>;
export type AddSurveyMutationOptions = Apollo.BaseMutationOptions<AddSurveyMutation, AddSurveyMutationVariables>;
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($input: UpdateLocationInput!) {
  updateLocation(input: $input) {
    location
    active
  }
}
    `;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;

/**
 * __useUpdateLocationMutation__
 *
 * To run a mutation, you first call `useUpdateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLocationMutation, { data, loading, error }] = useUpdateLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
      }
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;
export const UpdateQualificationDocument = gql`
    mutation UpdateQualification($input: UpdateQualificationInput!) {
  updateQualification(input: $input) {
    qualification
    active
  }
}
    `;
export type UpdateQualificationMutationFn = Apollo.MutationFunction<UpdateQualificationMutation, UpdateQualificationMutationVariables>;

/**
 * __useUpdateQualificationMutation__
 *
 * To run a mutation, you first call `useUpdateQualificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQualificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQualificationMutation, { data, loading, error }] = useUpdateQualificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateQualificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQualificationMutation, UpdateQualificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQualificationMutation, UpdateQualificationMutationVariables>(UpdateQualificationDocument, options);
      }
export type UpdateQualificationMutationHookResult = ReturnType<typeof useUpdateQualificationMutation>;
export type UpdateQualificationMutationResult = Apollo.MutationResult<UpdateQualificationMutation>;
export type UpdateQualificationMutationOptions = Apollo.BaseMutationOptions<UpdateQualificationMutation, UpdateQualificationMutationVariables>;
export const UpdateIndustryDocument = gql`
    mutation UpdateIndustry($input: UpdateIndustryInput!) {
  updateIndustry(input: $input) {
    industry
    active
  }
}
    `;
export type UpdateIndustryMutationFn = Apollo.MutationFunction<UpdateIndustryMutation, UpdateIndustryMutationVariables>;

/**
 * __useUpdateIndustryMutation__
 *
 * To run a mutation, you first call `useUpdateIndustryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIndustryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIndustryMutation, { data, loading, error }] = useUpdateIndustryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIndustryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIndustryMutation, UpdateIndustryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIndustryMutation, UpdateIndustryMutationVariables>(UpdateIndustryDocument, options);
      }
export type UpdateIndustryMutationHookResult = ReturnType<typeof useUpdateIndustryMutation>;
export type UpdateIndustryMutationResult = Apollo.MutationResult<UpdateIndustryMutation>;
export type UpdateIndustryMutationOptions = Apollo.BaseMutationOptions<UpdateIndustryMutation, UpdateIndustryMutationVariables>;
export const UpdateSkillDocument = gql`
    mutation UpdateSkill($input: UpdateSkillInput!) {
  updateSkill(input: $input) {
    skill
    active
  }
}
    `;
export type UpdateSkillMutationFn = Apollo.MutationFunction<UpdateSkillMutation, UpdateSkillMutationVariables>;

/**
 * __useUpdateSkillMutation__
 *
 * To run a mutation, you first call `useUpdateSkillMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSkillMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSkillMutation, { data, loading, error }] = useUpdateSkillMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSkillMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSkillMutation, UpdateSkillMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSkillMutation, UpdateSkillMutationVariables>(UpdateSkillDocument, options);
      }
export type UpdateSkillMutationHookResult = ReturnType<typeof useUpdateSkillMutation>;
export type UpdateSkillMutationResult = Apollo.MutationResult<UpdateSkillMutation>;
export type UpdateSkillMutationOptions = Apollo.BaseMutationOptions<UpdateSkillMutation, UpdateSkillMutationVariables>;
export const UpdateDomainDocument = gql`
    mutation UpdateDomain($input: UpdateDomainInput!) {
  updateDomain(input: $input) {
    domain
    active
  }
}
    `;
export type UpdateDomainMutationFn = Apollo.MutationFunction<UpdateDomainMutation, UpdateDomainMutationVariables>;

/**
 * __useUpdateDomainMutation__
 *
 * To run a mutation, you first call `useUpdateDomainMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDomainMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDomainMutation, { data, loading, error }] = useUpdateDomainMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDomainMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDomainMutation, UpdateDomainMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDomainMutation, UpdateDomainMutationVariables>(UpdateDomainDocument, options);
      }
export type UpdateDomainMutationHookResult = ReturnType<typeof useUpdateDomainMutation>;
export type UpdateDomainMutationResult = Apollo.MutationResult<UpdateDomainMutation>;
export type UpdateDomainMutationOptions = Apollo.BaseMutationOptions<UpdateDomainMutation, UpdateDomainMutationVariables>;
export const UpdateBenefitDocument = gql`
    mutation UpdateBenefit($input: UpdateBenefitInput!) {
  updateBenefit(input: $input) {
    benefit
    active
  }
}
    `;
export type UpdateBenefitMutationFn = Apollo.MutationFunction<UpdateBenefitMutation, UpdateBenefitMutationVariables>;

/**
 * __useUpdateBenefitMutation__
 *
 * To run a mutation, you first call `useUpdateBenefitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBenefitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBenefitMutation, { data, loading, error }] = useUpdateBenefitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBenefitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBenefitMutation, UpdateBenefitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBenefitMutation, UpdateBenefitMutationVariables>(UpdateBenefitDocument, options);
      }
export type UpdateBenefitMutationHookResult = ReturnType<typeof useUpdateBenefitMutation>;
export type UpdateBenefitMutationResult = Apollo.MutationResult<UpdateBenefitMutation>;
export type UpdateBenefitMutationOptions = Apollo.BaseMutationOptions<UpdateBenefitMutation, UpdateBenefitMutationVariables>;
export const UpdateSurveyDocument = gql`
    mutation UpdateSurvey($input: UpdateSurveyInput!) {
  updateSurveyQuestion(input: $input) {
    options
    question
    _id
    active
  }
}
    `;
export type UpdateSurveyMutationFn = Apollo.MutationFunction<UpdateSurveyMutation, UpdateSurveyMutationVariables>;

/**
 * __useUpdateSurveyMutation__
 *
 * To run a mutation, you first call `useUpdateSurveyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSurveyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSurveyMutation, { data, loading, error }] = useUpdateSurveyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSurveyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSurveyMutation, UpdateSurveyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSurveyMutation, UpdateSurveyMutationVariables>(UpdateSurveyDocument, options);
      }
export type UpdateSurveyMutationHookResult = ReturnType<typeof useUpdateSurveyMutation>;
export type UpdateSurveyMutationResult = Apollo.MutationResult<UpdateSurveyMutation>;
export type UpdateSurveyMutationOptions = Apollo.BaseMutationOptions<UpdateSurveyMutation, UpdateSurveyMutationVariables>;