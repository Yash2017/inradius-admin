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
  benefit: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type BenefitInput = {
  benefit: Scalars['String'];
};

export type DashboardEmployee = {
  __typename?: 'DashboardEmployee';
  domain: Scalars['String'];
  employeeId: Scalars['ID'];
  firstName: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  industry: Scalars['String'];
  lastName: Scalars['String'];
  location: Scalars['String'];
  score: Scalars['Float'];
  userId: Scalars['ID'];
};

export type DashboardEmployer = {
  __typename?: 'DashboardEmployer';
  companyImage: Scalars['String'];
  companyName: Scalars['String'];
  domain: Scalars['String'];
  employerId: Scalars['ID'];
  industry: Scalars['String'];
  jobDesc: Scalars['String'];
  jobId: Scalars['ID'];
  jobTitle: Scalars['String'];
  jobType: Scalars['String'];
  location: Scalars['String'];
  score: Scalars['Float'];
  userId: Scalars['ID'];
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
  createdAt: Scalars['DateTime'];
  domain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DomainInput = {
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
  interests: Array<User>;
  latitude?: Maybe<Scalars['Float']>;
  linkedIn?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
  longitude?: Maybe<Scalars['Float']>;
  panCard?: Maybe<Scalars['String']>;
  qualification?: Maybe<Qualification>;
  radius?: Maybe<Scalars['Float']>;
  relevantExp?: Maybe<UserExpInYearMonths>;
  resume?: Maybe<Scalars['String']>;
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
  interests: Array<User>;
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
  createdAt: Scalars['DateTime'];
  industry: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type IndustryInput = {
  industry: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  location: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LocationInput = {
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
  register: User;
  updateEmployee: Employee;
  updateEmployer: Employer;
  updateEmployerJob: EmployerJob;
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


export type MutationRegisterArgs = {
  input: RegisterInput;
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

export type Qualification = {
  __typename?: 'Qualification';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  qualification: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type QualificationInput = {
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
  createdAt: Scalars['DateTime'];
  skill: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SkillInput = {
  skill: Scalars['String'];
};

export type SubDomain = {
  __typename?: 'SubDomain';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  domain: Domain;
  subDomain: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type SubDomainInput = {
  domain: Scalars['String'];
  subDomain: Scalars['String'];
};

export type Survey = {
  __typename?: 'Survey';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  type: SurveyType;
  updatedAt: Scalars['DateTime'];
};

export type SurveyInput = {
  options: Array<Scalars['String']>;
  question: Scalars['String'];
  type: SurveyType;
};

/** Enum For Type of Survey User Roles i.e. Employer & Employee */
export enum SurveyType {
  Employee = 'employee',
  Employer = 'employer'
}

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
  start: Scalars['DateTime'];
};

export type UserWorkExpInput = {
  company: Scalars['String'];
  current: Scalars['Boolean'];
  desc: Scalars['String'];
  designation: DesignationEnum;
  end?: InputMaybe<Scalars['DateTime']>;
  start: Scalars['DateTime'];
};

export type AllLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllLocationsQuery = { __typename?: 'Query', allLocations: Array<{ __typename?: 'Location', _id: string, location: string }> };

export type AllQualificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllQualificationsQuery = { __typename?: 'Query', allQualifications: Array<{ __typename?: 'Qualification', _id: string, qualification: string }> };

export type AllIndustriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllIndustriesQuery = { __typename?: 'Query', allIndustries: Array<{ __typename?: 'Industry', _id: string, industry: string }> };

export type AllDomainsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllDomainsQuery = { __typename?: 'Query', allDomains: Array<{ __typename?: 'Domain', _id: string, domain: string }> };

export type AllSubDomainsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSubDomainsQuery = { __typename?: 'Query', allSubDomains: Array<{ __typename?: 'SubDomain', _id: string, subDomain: string, domain: { __typename?: 'Domain', _id: string, domain: string } }> };

export type AllSkillsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSkillsQuery = { __typename?: 'Query', allSkills: Array<{ __typename?: 'Skill', _id: string, skill: string }> };

export type AllSurveyQuestionQueryVariables = Exact<{
  type?: InputMaybe<SurveyType>;
}>;


export type AllSurveyQuestionQuery = { __typename?: 'Query', allSurveyQuestion: Array<{ __typename?: 'Survey', _id: string, question: string, options: Array<string>, type: SurveyType, createdAt: any, updatedAt: any }> };

export type AllBenefitsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllBenefitsQuery = { __typename?: 'Query', allBenefits: Array<{ __typename?: 'Benefit', _id: string, benefit: string }> };

export type AdminLoginQueryVariables = Exact<{
  input: AdminLoginInput;
}>;


export type AdminLoginQuery = { __typename?: 'Query', adminLogin: string };

export type AddLocationMutationVariables = Exact<{
  input: LocationInput;
}>;


export type AddLocationMutation = { __typename?: 'Mutation', addLocation: { __typename?: 'Location', location: string } };

export type AddQualificationMutationVariables = Exact<{
  input: QualificationInput;
}>;


export type AddQualificationMutation = { __typename?: 'Mutation', addQualification: { __typename?: 'Qualification', qualification: string } };


export const AllLocationsDocument = gql`
    query AllLocations {
  allLocations {
    _id
    location
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
export const AllIndustriesDocument = gql`
    query AllIndustries {
  allIndustries {
    _id
    industry
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
export const AddLocationDocument = gql`
    mutation AddLocation($input: LocationInput!) {
  addLocation(input: $input) {
    location
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