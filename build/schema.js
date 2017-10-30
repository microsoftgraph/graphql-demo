const typeDefs = ` 
enum automaticRepliesStatus {
 disabled 
 alwaysEnabled 
 scheduled 
} 
enum externalAudienceScope {
 none 
 contactsOnly 
 all 
} 
enum attendeeType {
 required 
 optional 
 resource 
} 
enum freeBusyStatus {
 free 
 tentative 
 busy 
 oof 
 workingElsewhere 
 unknown 
} 
enum activityDomain {
 unknown 
 work 
 personal 
 unrestricted 
} 
enum bodyType {
 text 
 html 
} 
enum importance {
 low 
 normal 
 high 
} 
enum inferenceClassificationType {
 focused 
 other 
} 
enum calendarColor {
 lightBlue 
 lightGreen 
 lightOrange 
 lightGray 
 lightYellow 
 lightTeal 
 lightPink 
 lightBrown 
 lightRed 
 maxColor 
 auto 
} 
enum responseType {
 none 
 organizer 
 tentativelyAccepted 
 accepted 
 declined 
 notResponded 
} 
enum sensitivity {
 normal 
 personal 
 private 
 confidential 
} 
enum recurrencePatternType {
 daily 
 weekly 
 absoluteMonthly 
 relativeMonthly 
 absoluteYearly 
 relativeYearly 
} 
enum dayOfWeek {
 sunday 
 monday 
 tuesday 
 wednesday 
 thursday 
 friday 
 saturday 
} 
enum weekIndex {
 first 
 second 
 third 
 fourth 
 last 
} 
enum recurrenceRangeType {
 endDate 
 noEnd 
 numbered 
} 
enum eventType {
 singleInstance 
 occurrence 
 exception 
 seriesMaster 
} 
enum meetingMessageType {
 none 
 meetingRequest 
 meetingCancelled 
 meetingAccepted 
 meetingTenativelyAccepted 
 meetingDeclined 
} 
enum plannerPreviewType {
 automatic 
 noPreview 
 checklist 
 description 
 reference 
} 
enum operationStatus {
 NotStarted 
 Running 
 Completed 
 Failed 
} 
enum onenotePatchInsertPosition {
 After 
 Before 
} 
enum onenotePatchActionType {
 Replace 
 Append 
 Delete 
 Insert 
 Prepend 
} 
enum onenoteSourceService {
 Unknown 
 OneDrive 
 OneDriveForBusiness 
 OnPremOneDriveForBusiness 
} 
enum onenoteUserRole {
 Owner 
 Contributor 
 Reader 
 None 
} 
type entity {
 id: ID
}  
type directoryObject {
 id: ID
}  
type device {
#true if the account is enabled; otherwise, false. Required.
 accountEnabled: Boolean
#The any operator is required for filter expressions on multi-valued properties. Not nullable. Required.
 alternativeSecurityIds: [alternativeSecurityId]
#The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 approximateLastSignInDateTime: String
#Unique client specified GUID to represent the device. Required.
 deviceId: String
 deviceMetadata: String
 deviceVersion: Int
#The display name for the device. Required.
 displayName: String
#true if the device complies with Mobile Device Management (MDM) policies; otherwise, false.
 isCompliant: Boolean
#true if the device is managed by a Mobile Device Management (MDM) app such as Intune; otherwise, false.
 isManaged: Boolean
#The last time at which the object was synced with the on-premises directory.The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 onPremisesLastSyncDateTime: String
#true if this object is synced from an on-premises directory; false if this object was originally synced from an on-premises directory but is no longer synced; null if this object has never been synced from an on-premises directory (default).
 onPremisesSyncEnabled: Boolean
#The type of operating system on the device. Required.
 operatingSystem: String
#The version of the operating system on the device. Required.
 operatingSystemVersion: String
#Not nullable.
 physicalIds: [String]
 trustType: String
#Users that are registered owners of the device. Read-only. Nullable.
 registeredOwners(id: ID): [directoryObject]
#Users that are registered users of the device. Read-only. Nullable.
 registeredUsers(id: ID): [directoryObject]
#The collection of open extensions defined for the device. Read-only. Nullable.
 extensions(id: ID): [extension]
 id: ID
}  
type extension {
 id: ID
}  
type directoryRole {
#The description for the directory role. Read-only.
 description: String
#The display name for the directory role. Read-only.
 displayName: String
#The id of the directoryRoleTemplate that this role is based on. The property must be specified when activating a directory role in a tenant with a POST operation. After the directory role has been activated, the property is read only.
 roleTemplateId: String
 id: ID
}  
type directoryRoleTemplate {
#The description to set for the directory role. Read-only.
 description: String
#The display name to set for the directory role. Read-only.
 displayName: String
 id: ID
}  
type domain {
#Indicates the configured authentication type for the domain. The value is either Managed or Federated. Managed indicates a cloud managed domain where Azure AD performs user authentication.Federated indicates authentication is federated with an identity provider such as the tenant's on-premises Active Directory via Active Directory Federation Services. Not nullable
 authenticationType: String
#This property is always null except when the verify action is used. When the verify action is used, a domain entity is returned in the response. The availabilityStatus property of the domain entity in the response is either AvailableImmediately or EmailVerifiedDomainTakeoverScheduled.
 availabilityStatus: String
#The value of the property is false if the DNS record management of the domain has been delegated to Office 365. Otherwise, the value is true. Not nullable
 isAdminManaged: Boolean
#True if this is the default domain that is used for user creation. There is only one default domain per company. Not nullable
 isDefault: Boolean
#True if this is the initial domain created by Microsoft Online Services (companyname.onmicrosoft.com). There is only one initial domain per company. Not nullable
 isInitial: Boolean
#True if the domain is a verified root domain. Otherwise, false if the domain is a subdomain or unverified. Not nullable
 isRoot: Boolean
#True if the domain has completed domain ownership verification. Not nullable
 isVerified: Boolean
#The capabilities assigned to the domain.Can include 0, 1 or more of following values: Email, Sharepoint, EmailInternalRelayOnly, OfficeCommunicationsOnline, SharePointDefaultDomain, FullRedelegation, SharePointPublic, OrgIdAuthentication, Yammer, Intune The values which you can add/remove using Graph API include: Email, OfficeCommunicationsOnline, YammerNot nullable
 supportedServices: [String]
#Status of asynchronous operations scheduled for the domain.
 state: domainState
#DNS records the customer adds to the DNS zone file of the domain before the domain can be used by Microsoft Online services.Read-only, Nullable
 serviceConfigurationRecords(id: ID): [domainDnsRecord]
#DNS records that the customer adds to the DNS zone file of the domain before the customer can complete domain ownership verification with Azure AD.Read-only, Nullable
 verificationDnsRecords(id: ID): [domainDnsRecord]
#Read-only, Nullable
 domainNameReferences(id: ID): [directoryObject]
 id: ID
}  
type domainDnsRecord {
#If false, this record must be configured by the customer at the DNS host for Microsoft Online Services to operate correctly with the domain.
 isOptional: Boolean
#Value used when configuring the name of the DNS record at the DNS host.
 label: String
#Indicates what type of DNS record this entity represents.The value can be one of the following: CName, Mx, Srv, TxtKey
 recordType: String
#Microsoft Online Service or feature that has a dependency on this DNS record.Can be one of the following values: null, Email, Sharepoint, EmailInternalRelayOnly, OfficeCommunicationsOnline, SharePointDefaultDomain, FullRedelegation, SharePointPublic, OrgIdAuthentication, Yammer, Intune
 supportedService: String
#Value to use when configuring the time-to-live (ttl) property of the DNS record at the DNS host. Not nullable
 ttl: Int
 id: ID
}  
type domainDnsCnameRecord {
 id: ID
 isOptional: Boolean
 label: String
 recordType: String
 supportedService: String
 ttl: Int
}  
type domainDnsMxRecord {
#Value used when configuring the answer/destination/value of the MX record at the DNS host.
 mailExchange: String
#Value used when configuring the Preference/Priority property of the MX record at the DNS host.
 preference: Int
 id: ID
 isOptional: Boolean
 label: String
 recordType: String
 supportedService: String
 ttl: Int
}  
type domainDnsSrvRecord {
#Value to use when configuring the Target property of the SRV record at the DNS host.
 nameTarget: String
#Value to use when configuring the port property of the SRV record at the DNS host.
 port: Int
#Value to use when configuring the priority property of the SRV record at the DNS host.
 priority: Int
#Value to use when configuring the protocol property of the SRV record at the DNS host.
 protocol: String
#Value to use when configuring the service property of the SRV record at the DNS host.
 service: String
#Value to use when configuring the weight property of the SRV record at the DNS host.
 weight: Int
 id: ID
 isOptional: Boolean
 label: String
 recordType: String
 supportedService: String
 ttl: Int
}  
type domainDnsTxtRecord {
 id: ID
 isOptional: Boolean
 label: String
 recordType: String
 supportedService: String
 ttl: Int
}  
type domainDnsUnavailableRecord {
 id: ID
 isOptional: Boolean
 label: String
 recordType: String
 supportedService: String
 ttl: Int
}  
type licenseDetails {
#Information about the service plans assigned with the license. Read-only, Not nullable
 servicePlans: [servicePlanInfo]
#Unique identifier (GUID) for the service SKU. Equal to the skuId property on the related SubscribedSku object. Read-only
 skuId: String
#Unique SKU display name. Equal to the skuPartNumber on the related SubscribedSku object; for example: "AAD_Premium". Read-only
 skuPartNumber: String
 id: ID
}  
type group {
 classification: String
#An optional description for the group.
 description: String
#The display name for the group. This property is required when a group is created and it cannot be cleared during updates. Supports $filter and $orderby.
 displayName: String
#Specifies the type of group to create. Possible values are Unified to create an Office 365 group, or DynamicMembership for dynamic groups.  For all other group types, like security-enabled groups and email-enabled security groups, do not set this property. Supports $filter.
 groupTypes: [String]
#The SMTP address for the group, for example, "serviceadmins@contoso.onmicrosoft.com". Read-only. Supports $filter.
 mail: String
#Specifies whether the group is mail-enabled. If the securityEnabled property is also true, the group is a mail-enabled security group; otherwise, the group is a Microsoft Exchange distribution group.
 mailEnabled: Boolean
#The mail alias for the group. This property must be specified when a group is created. Supports $filter.
 mailNickname: String
#Indicates the last time at which the group was synced with the on-premises directory.The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'. Read-only. Supports $filter.
 onPremisesLastSyncDateTime: String
#Contains the on-premises security identifier (SID) for the group that was synchronized from on-premises to the cloud. Read-only.
 onPremisesSecurityIdentifier: String
#true if this group is synced from an on-premises directory; false if this group was originally synced from an on-premises directory but is no longer synced; null if this object has never been synced from an on-premises directory (default). Read-only. Supports $filter.
 onPremisesSyncEnabled: Boolean
#The any operator is required for filter expressions on multi-valued properties. Read-only. Not nullable. Supports $filter.
 proxyAddresses: [String]
#Specifies whether the group is a security group. If the mailEnabled property is also true, the group is a mail-enabled security group; otherwise it is a security group. Must be false for Office 365 groups. Supports $filter.
 securityEnabled: Boolean
#Specifies the visibility of an Office 365 group. Possible values are: Private, Public, or empty (which is interpreted as Public).
 visibility: String
#Default is false. Indicates if people external to the organization can send messages to the group.
 allowExternalSenders: Boolean
#Default is false. Indicates if new members added to the group will be auto-subscribed to receive email notifications. You can set this property in a PATCH request for the group; do not set it in the initial POST request that creates the group.
 autoSubscribeNewMembers: Boolean
#Default value is true. Indicates whether the current user is subscribed to receive email conversations.
 isSubscribedByMail: Boolean
#Count of posts that the current  user has not seen since his last visit.
 unseenCount: Int
#Users and groups that are members of this group. HTTP Methods: GET (supported for all groups), POST (supported for Office 365 groups, security groups and mail-enabled security groups), DELETE (supported for Office 365 groups and security groups) Nullable.
 members(id: ID): [directoryObject]
#Groups that this group is a member of. HTTP Methods: GET (supported for all groups). Read-only. Nullable.
 memberOf(id: ID): [directoryObject]
#The user (or application) that created the group. NOTE: This is not set if the user is an administrator. Read-only.
 createdOnBehalfOf: directoryObject
#The owners of the group. The owners are a set of non-admin users who are allowed to modify this object. Limited to 10 owners. HTTP Methods: GET (supported for all groups), POST (supported for Office 365 groups, security groups and mail-enabled security groups), DELETE (supported for Office 365 groups and security groups). Nullable.
 owners(id: ID): [directoryObject]
#Read-only. Nullable.
 settings(id: ID): [groupSetting]
#The collection of open extensions defined for the group. Read-only. Nullable.
 extensions(id: ID): [extension]
#The group's conversation threads. Nullable.
 threads(id: ID): [conversationThread]
#The group's calendar. Read-only.
 calendar: calendar
#The calendar view for the calendar. Read-only.
 calendarView(id: ID): [event]
#The group's calendar events.
 events(id: ID): [event]
#The group's conversations.
 conversations(id: ID): [conversation]
#The group's profile photo
 photo: profilePhoto
#The profile photos owned by the group. Read-only. Nullable.
 photos(id: ID): [profilePhoto]
#The list of users or groups that are allowed to create post's or calendar events in this group. If this list is non-empty then only users or groups listed here are allowed to post.
 acceptedSenders(id: ID): [directoryObject]
#The list of users or groups that are not allowed to create posts or calendar events in this group. Nullable
 rejectedSenders(id: ID): [directoryObject]
#The group's drive. Read-only.
 drive: drive
 drives(id: ID): [drive]
#The list of SharePoint sites in this group. Access the default site with /sites/root.
 sites(id: ID): [site]
#Entry-point to Planner resource that might exist for a Unified Group.
 planner: plannerGroup
#Read-only.
 onenote: onenote
 id: ID
}  
type groupSetting {
#Display name of this group of settings, which comes from the associated template.
 displayName: String
#Unique identifier for the template used to create this group of settings. Read-only.
 templateId: String
#Collection of name value pairs. Must contain and set all the settings defined in the template.
 values: [settingValue]
 id: ID
}  
type conversationThread {
#The To: recipients for the thread.
 toRecipients: [recipient]
#The topic of the conversation. This property can be set when the conversation is created, but it cannot be updated.
 topic: String
#Indicates whether any of the posts within this thread has at least one attachment.
 hasAttachments: Boolean
#The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 lastDeliveredDateTime: String
#All the users that sent a message to this thread.
 uniqueSenders: [String]
#The Cc: recipients for the thread.
 ccRecipients: [recipient]
#A short summary from the body of the latest post in this converstaion.
 preview: String
#Indicates if the thread is locked.
 isLocked: Boolean
 id: ID
}  
type calendar {
#The calendar name.
 name: String
#Specifies the color theme to distinguish the calendar from other calendars in a UI. The property values are: LightBlue=0, LightGreen=1, LightOrange=2, LightGray=3, LightYellow=4, LightTeal=5, LightPink=6, LightBrown=7, LightRed=8, MaxColor=9, Auto=-1
 color: calendarColor
#Identifies the version of the calendar object. Every time the calendar is changed, changeKey changes as well. This allows Exchange to apply changes to the correct version of the object. Read-only.
 changeKey: String
#True if the user has the permission to share the calendar, false otherwise. Only the user who created the calendar can share it.
 canShare: Boolean
#True if the user can read calendar items that have been marked private, false otherwise.
 canViewPrivateItems: Boolean
#True if the user can write to the calendar, false otherwise. This property is true for the user who created the calendar. This property is also true for a user who has been shared a calendar and granted write access.
 canEdit: Boolean
#If set, this represents the user who created or added the calendar. For a calendar that the user created or added, the owner property is set to the user. For a calendar shared with the user, the owner property is set to the person who shared that calendar with the user.
 owner: emailAddress
#The events in the calendar. Navigation property. Read-only.
 events(id: ID): [event]
#The calendar view for the calendar. Navigation property. Read-only.
 calendarView(id: ID): [event]
#The collection of single-value extended properties defined for the calendar. Read-only. Nullable.
 singleValueExtendedProperties(id: ID): [singleValueLegacyExtendedProperty]
#The collection of multi-value extended properties defined for the calendar. Read-only. Nullable.
 multiValueExtendedProperties(id: ID): [multiValueLegacyExtendedProperty]
 id: ID
}  
type outlookItem {
 createdDateTime: String
 lastModifiedDateTime: String
 changeKey: String
 categories: [String]
 id: ID
}  
type event {
#The start time zone that was set when the event was created. A value of tzone://Microsoft/Custom indicates that a legacy custom time zone was set in desktop Outlook.
 originalStartTimeZone: String
#The end time zone that was set when the event was created. A value of tzone://Microsoft/Customindicates that a legacy custom time zone was set in desktop Outlook.
 originalEndTimeZone: String
#Indicates the type of response sent in response to an event message.
 responseStatus: responseStatus
#A unique identifier that is shared by all instances of an event across different calendars.
 iCalUId: String
#The number of minutes before the event start time that the reminder alert occurs.
 reminderMinutesBeforeStart: Int
#Set to true if an alert is set to remind the user of the event.
 isReminderOn: Boolean
#Set to true if the event has attachments.
 hasAttachments: Boolean
#The text of the event's subject line.
 subject: String
#The body of the message associated with the event. It can be in HTML or text format.
 body: itemBody
#The preview of the message associated with the event. It is in text format.
 bodyPreview: String
#The importance of the event: Low = 0, Normal = 1, High = 2. Possible values are: Low, Normal, High.
 importance: importance
#Possible values are: Normal, Personal, Private, Confidential.
 sensitivity: sensitivity
#The date, time, and time zone that the event starts.
 start: dateTimeTimeZone
#The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 originalStart: String
#The date, time, and time zone that the event ends.
 end: dateTimeTimeZone
#The location of the event.
 location: location
#Set to true if the event lasts all day.
 isAllDay: Boolean
#Set to true if the event has been canceled.
 isCancelled: Boolean
#Set to true if the message sender is also the organizer.
 isOrganizer: Boolean
#The recurrence pattern for the event.
 recurrence: patternedRecurrence
#Set to true if the sender would like a response when the event is accepted or declined.
 responseRequested: Boolean
#The categories assigned to the item.
 seriesMasterId: String
#The status to show: Free = 0, Tentative = 1, Busy = 2, Oof = 3, WorkingElsewhere = 4, Unknown = -1. Possible values are: Free, Tentative, Busy, Oof, WorkingElsewhere, Unknown.
 showAs: freeBusyStatus
#The event type: SingleInstance = 0, Occurrence = 1, Exception = 2, SeriesMaster = 3. Possible values are: SingleInstance, Occurrence, Exception, SeriesMaster.
 type: eventType
#The collection of attendees for the event.
 attendees: [attendee]
#The organizer of the event.
 organizer: recipient
#The URL to open the event in Outlook Web App.The event will open in the browser if you are logged in to your mailbox via Outlook Web App. You will be prompted to login if you are not already logged in with the browser.This URL can be accessed from within an iFrame.
 webLink: String
#A URL for an online meeting.
 onlineMeetingUrl: String
#The calendar that contains the event. Navigation property. Read-only.
 calendar: calendar
#The instances of the event. Navigation property. Read-only. Nullable.
 instances(id: ID): [event]
#The collection of open extensions defined for the event. Read-only. Nullable.
 extensions(id: ID): [extension]
#The collection of fileAttachment and itemAttachment attachments for the event. Navigation property. Read-only. Nullable.
 attachments(id: ID): [attachment]
#The collection of single-value extended properties defined for the event. Read-only. Nullable.
 singleValueExtendedProperties(id: ID): [singleValueLegacyExtendedProperty]
#The collection of multi-value extended properties defined for the event. Read-only. Nullable.
 multiValueExtendedProperties(id: ID): [multiValueLegacyExtendedProperty]
 id: ID
 createdDateTime: String
 lastModifiedDateTime: String
 changeKey: String
 categories: [String]
}  
type conversation {
#The topic of the conversation. This property can be set when the conversation is created, but it cannot be updated.
 topic: String
#Indicates whether any of the posts within this Conversation has at least one attachment.
 hasAttachments: Boolean
#The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 lastDeliveredDateTime: String
#All the users that sent a message to this Conversation.
 uniqueSenders: [String]
#A short summary from the body of the latest post in this converstaion.
 preview: String
 id: ID
}  
type profilePhoto {
#The height of the photo. Read-only.
 height: Int
#The width of the photo. Read-only.
 width: Int
 id: ID
}  
type baseItem {
#Identity of the user, device, or application which created the item. Read-only.
 createdBy: identitySet
#Date and time of item creation. Read-only.
 createdDateTime: String
 description: String
#ETag for the item. Read-only.
 eTag: String
#Identity of the user, device, and application which last modified the item. Read-only.
 lastModifiedBy: identitySet
#Date and time the item was last modified. Read-only.
 lastModifiedDateTime: String
#The name of the item. Read-write.
 name: String
#Parent information, if the item has a parent. Read-write.
 parentReference: itemReference
#URL that displays the resource in the browser. Read-only.
 webUrl: String
 createdByUser: user
 lastModifiedByUser: user
 id: ID
}  
type drive {
#Describes the type of drive represented by this resource. OneDrive personal drives will return personal. OneDrive for Business will return business. SharePoint document libraries will return documentLibrary. Read-only.
 driveType: String
#Optional. The user account that owns the drive. Read-only.
 owner: identitySet
#Optional. Information about the drive's storage space quota. Read-only.
 quota: quota
 sharePointIds: sharepointIds
#All items contained in the drive. Read-only. Nullable.
 items(id: ID): [driveItem]
#The root folder of the drive. Read-only.
 root: driveItem
#Collection of common folders available in OneDrive. Read-only. Nullable.
 special(id: ID): [driveItem]
 id: ID
 createdBy: identitySet
 createdDateTime: String
 description: String
 eTag: String
 lastModifiedBy: identitySet
 lastModifiedDateTime: String
 name: String
 parentReference: itemReference
 webUrl: String
 createdByUser: user
 lastModifiedByUser: user
}  
type site {
#The full title for the site. Read-only.
 displayName: String
#If present, indicates that this is the root site in the site collection. Read-only.
 root: root
#Returns identifiers useful for SharePoint REST compatibility. Read-only.
 sharepointIds: sharepointIds
#Provides details about the site's site collection. Available only on the root site. Read-only.
 siteCollection(id: ID): [site]
#The default drive (document library) for this site.
 drive: drive
#The collection of drives (document libraries) under this site.
 drives(id: ID): [drive]
#The collection of the sub-sites under this site.
 sites(id: ID): [site]
#Calls the OneNote service for notebook related operations.
 onenote: onenote
 id: ID
 createdBy: identitySet
 createdDateTime: String
 description: String
 eTag: String
 lastModifiedBy: identitySet
 lastModifiedDateTime: String
 name: String
 parentReference: itemReference
 webUrl: String
 createdByUser: user
 lastModifiedByUser: user
}  
type plannerGroup {
 id: ID
}  
type onenote {
 notebooks(id: ID): [notebook]
 sections(id: ID): [onenoteSection]
 sectionGroups(id: ID): [sectionGroup]
 pages(id: ID): [onenotePage]
 resources(id: ID): [onenoteResource]
 operations(id: ID): [onenoteOperation]
 id: ID
}  
type contract {
 contractType: String
 customerId: String
 defaultDomainName: String
 displayName: String
 id: ID
}  
type subscribedSku {
#For example, "Enabled".
 capabilityStatus: String
#The number of licenses that have been assigned.
 consumedUnits: Int
#Information about the number and status of prepaid licenses.
 prepaidUnits: licenseUnitsDetail
#Information about the service plans that are available with the SKU. Not nullable
 servicePlans: [servicePlanInfo]
#The unique identifier (GUID) for the service SKU.
 skuId: String
#The SKU part number; for example: "AAD_PREMIUM" or "RMSBASIC".
 skuPartNumber: String
#For example, "User" or "Company".
 appliesTo: String
 id: ID
}  
type organization {
#The collection of service plans associated with the tenant. Not nullable.
 assignedPlans: [assignedPlan]
 businessPhones: [String]
 city: String
 country: String
 countryLetterCode: String
#The display name for the tenant.
 displayName: String
#Not nullable.
 marketingNotificationEmails: [String]
 onPremisesLastSyncDateTime: String
 onPremisesSyncEnabled: Boolean
 postalCode: String
 preferredLanguage: String
#Not nullable.
 provisionedPlans: [provisionedPlan]
 securityComplianceNotificationMails: [String]
 securityComplianceNotificationPhones: [String]
 state: String
 street: String
#Not nullable.
 technicalNotificationMails: [String]
#The collection of domains associated with this tenant. Not nullable.
 verifiedDomains: [verifiedDomain]
 id: ID
}  
type user {
#true if the account is enabled; otherwise, false. This property is required when a user is created. Supports $filter.
 accountEnabled: Boolean
#The licenses that are assigned to the user. Not nullable.
 assignedLicenses: [assignedLicense]
#The plans that are assigned to the user. Read-only. Not nullable.
 assignedPlans: [assignedPlan]
#The telephone numbers for the user. NOTE: Although this is a string collection, only one number can be set for this property.
 businessPhones: [String]
#The city in which the user is located. Supports $filter.
 city: String
#The company name which the user is associated.
 companyName: String
#The country/region in which the user is located; for example, “US” or “UK”. Supports $filter.
 country: String
#The name for the department in which the user works. Supports $filter.
 department: String
#The name displayed in the address book for the user. This is usually the combination of the user's first name, middle initial and last name. This property is required when a user is created and it cannot be cleared during updates. Supports $filter and $orderby.
 displayName: String
#The given name (first name) of the user. Supports $filter.
 givenName: String
 imAddresses: [String]
#The user’s job title. Supports $filter.
 jobTitle: String
#The SMTP address for the user, for example, "jeff@contoso.onmicrosoft.com". Read-Only. Supports $filter.
 mail: String
#The mail alias for the user. This property must be specified when a user is created. Supports $filter.
 mailNickname: String
#The primary cellular telephone number for the user.
 mobilePhone: String
#This property is used to associate an on-premises Active Directory user account to their Azure AD user object. This property must be specified when creating a new user account in the Graph if you are using a federated domain for the user’s userPrincipalName (UPN) property. Important: The $ and  characters cannot be used when specifying this property. Supports $filter.
 onPremisesImmutableId: String
#Indicates the last time at which the object was synced with the on-premises directory; for example: "2013-02-16T03:04:54Z". The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'. Read-only.
 onPremisesLastSyncDateTime: String
#Contains the on-premises security identifier (SID) for the user that was synchronized from on-premises to the cloud. Read-only.
 onPremisesSecurityIdentifier: String
#true if this object is synced from an on-premises directory; false if this object was originally synced from an on-premises directory but is no longer synced; null if this object has never been synced from an on-premises directory (default). Read-only
 onPremisesSyncEnabled: Boolean
#Specifies password policies for the user. This value is an enumeration with one possible value being “DisableStrongPassword”, which allows weaker passwords than the default policy to be specified. “DisablePasswordExpiration” can also be specified. The two may be specified together; for example: "DisablePasswordExpiration, DisableStrongPassword".
 passwordPolicies: String
#Specifies the password profile for the user. The profile contains the user’s password. This property is required when a user is created. The password in the profile must satisfy minimum requirements as specified by the passwordPolicies property. By default, a strong password is required.
 passwordProfile: passwordProfile
#The office location in the user's place of business.
 officeLocation: String
#The postal code for the user's postal address. The postal code is specific to the user's country/region. In the United States of America, this attribute contains the ZIP code.
 postalCode: String
#The preferred language for the user. Should follow ISO 639-1 Code; for example "en-US".
 preferredLanguage: String
#The plans that are provisioned for the user. Read-only. Not nullable.
 provisionedPlans: [provisionedPlan]
#For example: ["SMTP: bob@contoso.com", "smtp: bob@sales.contoso.com"] The any operator is required for filter expressions on multi-valued properties. Read-only, Not nullable. Supports $filter.
 proxyAddresses: [String]
#The state or province in the user's address. Supports $filter.
 state: String
#The street address of the user's place of business.
 streetAddress: String
#The user's surname (family name or last name). Supports $filter.
 surname: String
#A two letter country code (ISO standard 3166). Required for users that will be assigned licenses due to legal requirement to check for availability of services in countries.  Examples include: "US", "JP", and "GB". Not nullable. Supports $filter.
 usageLocation: String
#The user principal name (UPN) of the user. The UPN is an Internet-style login name for the user based on the Internet standard RFC 822. By convention, this should map to the user's email name. The general format is alias@domain, where domain must be present in the tenant’s collection of verified domains. This property is required when a user is created. The verified domains for the tenant can be accessed from the verifiedDomains property of organization. Supports $filter and $orderby.
 userPrincipalName: String
#A string value that can be used to classify user types in your directory, such as “Member” and “Guest”. Supports $filter.
 userType: String
#Settings for the primary mailbox of the signed-in user. You can get or update settings for sending automatic replies to incoming messages, locale and time zone.
 mailboxSettings: mailboxSettings
#A freeform text entry field for the user to describe themselves.
 aboutMe: String
#The birthday of the user. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 birthday: String
#The hire date of the user. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 hireDate: String
#A list for the user to describe their interests.
 interests: [String]
#The URL for the user's personal site.
 mySite: String
#A list for the user to enumerate their past projects.
 pastProjects: [String]
#The preferred name for the user.
 preferredName: String
#A list for the user to enumerate their responsibilities.
 responsibilities: [String]
#A list for the user to enumerate the schools they have attended.
 schools: [String]
#A list for the user to enumerate their skills.
 skills: [String]
#Devices that are owned by the user. Read-only. Nullable.
 ownedDevices(id: ID): [directoryObject]
#Devices that are registered for the user. Read-only. Nullable.
 registeredDevices(id: ID): [directoryObject]
#The user or contact that is this user’s manager. Read-only. (HTTP Methods: GET, PUT, DELETE.)
 manager: directoryObject
#The users and contacts that report to the user. (The users and contacts that have their manager property set to this user.) Read-only. Nullable.
 directReports(id: ID): [directoryObject]
#The groups and directory roles that the user is a member of. Read-only. Nullable.
 memberOf(id: ID): [directoryObject]
#Directory objects that were created by the user. Read-only. Nullable.
 createdObjects(id: ID): [directoryObject]
#Directory objects that are owned by the user. Read-only. Nullable.
 ownedObjects(id: ID): [directoryObject]
 licenseDetails(id: ID): [licenseDetails]
#The collection of open extensions defined for the user. Read-only. Nullable.
 extensions(id: ID): [extension]
#The messages in a mailbox or folder. Read-only. Nullable.
 messages(id: ID): [message]
#The user's mail folders. Read-only. Nullable.
 mailFolders(id: ID): [mailFolder]
#The user's primary calendar. Read-only.
 calendar: calendar
#The user's calendars. Read-only. Nullable.
 calendars(id: ID): [calendar]
#The user's calendar groups. Read-only. Nullable.
 calendarGroups(id: ID): [calendarGroup]
#The calendar view for the calendar. Read-only. Nullable.
 calendarView(id: ID): [event]
#The user's events. Default is to show Events under the Default Calendar. Read-only. Nullable.
 events(id: ID): [event]
#The user's contacts. Read-only. Nullable.
 contacts(id: ID): [contact]
#The user's contacts folders. Read-only. Nullable.
 contactFolders(id: ID): [contactFolder]
#Relevance classification of the user's messages based on explicit designations which override inferred relevance or importance.
 inferenceClassification: inferenceClassification
#The user's profile photo. Read-only.
 photo: profilePhoto
 photos(id: ID): [profilePhoto]
#The user's OneDrive. Read-only.
 drive: drive
#A collection of drives available for this user. Read-only.
 drives(id: ID): [drive]
 planner: plannerUser
#Read-only.
 onenote: onenote
 id: ID
}  
type message {
#The date and time the message was received.
 receivedDateTime: String
#The date and time the message was sent.
 sentDateTime: String
#Indicates whether the message has attachments. This property doesn't include inline attachments, so if a message contains only inline attachments, this property is false. To verify the existence of inline attachments, parse the body property to look for a src attribute, such as <IMG src="cid:image001.jpg@01D26CD8.6C05F070">.
 hasAttachments: Boolean
#The message ID in the format specified by RFC2822.
 internetMessageId: String
#The subject of the message.
 subject: String
#The body of the message. It can be in HTML or text format.
 body: itemBody
#The first 255 characters of the message body. It is in text format.
 bodyPreview: String
#The importance of the message: Low, Normal, High.
 importance: importance
#The unique identifier for the message's parent mailFolder.
 parentFolderId: String
#The account that is actually used to generate the message.
 sender: recipient
#The mailbox owner and sender of the message.
 from: recipient
#The To: recipients for the message.
 toRecipients: [recipient]
#The Cc: recipients for the message.
 ccRecipients: [recipient]
#The Bcc: recipients for the message.
 bccRecipients: [recipient]
#The email addresses to use when replying.
 replyTo: [recipient]
#The ID of the conversation the email belongs to.
 conversationId: String
#The part of the body of the message that is unique to the current message. uniqueBody is not returned by default but can be retrieved for a given message by use of the ?$select=uniqueBody query. It can be in HTML or text format.
 uniqueBody: itemBody
#Indicates whether a read receipt is requested for the message.
 isDeliveryReceiptRequested: Boolean
#Indicates whether a read receipt is requested for the message.
 isReadReceiptRequested: Boolean
#Indicates whether the message has been read.
 isRead: Boolean
#Indicates whether the message is a draft. A message is a draft if it hasn't been sent yet.
 isDraft: Boolean
#The URL to open the message in Outlook Web App.You can append an ispopout argument to the end of the URL to change how the message is displayed. If ispopout is not present or if it is set to 1, then the message is shown in a popout window. If ispopout is set to 0, then the browser will show the message in the Outlook Web App review pane.The message will open in the browser if you are logged in to your mailbox via Outlook Web App. You will be prompted to login if you are not already logged in with the browser.This URL can be accessed from within an iFrame.
 webLink: String
#The classification of the message for the user, based on inferred relevance or importance, or on an explicit override. Possible values are: focused or other.
 inferenceClassification: inferenceClassificationType
#The fileAttachment and itemAttachment attachments for the message.
 attachments(id: ID): [attachment]
#The collection of open extensions defined for the message. Read-only. Nullable.
 extensions(id: ID): [extension]
#The collection of single-value extended properties defined for the message. Read-only. Nullable.
 singleValueExtendedProperties(id: ID): [singleValueLegacyExtendedProperty]
#The collection of multi-value extended properties defined for the message. Read-only. Nullable.
 multiValueExtendedProperties(id: ID): [multiValueLegacyExtendedProperty]
 id: ID
 createdDateTime: String
 lastModifiedDateTime: String
 changeKey: String
 categories: [String]
}  
type mailFolder {
#The mailFolder's display name.
 displayName: String
#The unique identifier for the mailFolder's parent mailFolder.
 parentFolderId: String
#The number of immediate child mailFolders in the current mailFolder.
 childFolderCount: Int
#The number of items in the mailFolder marked as unread.
 unreadItemCount: Int
#The number of items in the mailFolder.
 totalItemCount: Int
#The collection of messages in the mailFolder.
 messages(id: ID): [message]
#The collection of child folders in the mailFolder.
 childFolders(id: ID): [mailFolder]
#The collection of single-value extended properties defined for the mailFolder. Read-only. Nullable.
 singleValueExtendedProperties(id: ID): [singleValueLegacyExtendedProperty]
#The collection of multi-value extended properties defined for the mailFolder. Read-only. Nullable.
 multiValueExtendedProperties(id: ID): [multiValueLegacyExtendedProperty]
 id: ID
}  
type calendarGroup {
#The group name.
 name: String
#The class identifier. Read-only.
 classId: String
#Identifies the version of the calendar group. Every time the calendar group is changed, ChangeKey changes as well. This allows Exchange to apply changes to the correct version of the object. Read-only.
 changeKey: String
 id: ID
}  
type contact {
#The ID of the contact's parent folder.
 parentFolderId: String
#The contact's birthday. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 birthday: String
#The name the contact is filed under.
 fileAs: String
#The contact's display name.
 displayName: String
#The contact's given name.
 givenName: String
#The contact's initials.
 initials: String
#The contact's middle name.
 middleName: String
#The contact's nickname.
 nickName: String
#The contact's surname.
 surname: String
#The contact's title.
 title: String
#The phonetic Japanese given name (first name) of the contact.
 yomiGivenName: String
#The phonetic Japanese surname (last name)  of the contact.
 yomiSurname: String
#The phonetic Japanese company name of the contact.
 yomiCompanyName: String
#The contact's generation.
 generation: String
#The contact's email addresses.
 emailAddresses: [emailAddress]
#The contact's instant messaging (IM) addresses.
 imAddresses: [String]
#The contact’s job title.
 jobTitle: String
#The name of the contact's company.
 companyName: String
#The contact's department.
 department: String
#The location of the contact's office.
 officeLocation: String
#The contact's profession.
 profession: String
#The business home page of the contact.
 businessHomePage: String
#The name of the contact's assistant.
 assistantName: String
#The name of the contact's manager.
 manager: String
#The contact's home phone numbers.
 homePhones: [String]
#The contact's mobile phone number.
 mobilePhone: String
#The contact's business phone numbers.
 businessPhones: [String]
#The contact's home address.
 homeAddress: physicalAddress
#The contact's business address.
 businessAddress: physicalAddress
#Other addresses for the contact.
 otherAddress: physicalAddress
#The name of the contact's spouse.
 spouseName: String
#The user's notes about the contact.
 personalNotes: String
#The names of the contact's children.
 children: [String]
#The collection of open extensions defined for the contact. Read-only. Nullable.
 extensions(id: ID): [extension]
#The collection of single-value extended properties defined for the contact. Read-only. Nullable.
 singleValueExtendedProperties(id: ID): [singleValueLegacyExtendedProperty]
#The collection of multi-value extended properties defined for the contact. Read-only. Nullable.
 multiValueExtendedProperties(id: ID): [multiValueLegacyExtendedProperty]
#Optional contact picture. You can get or set a photo for a contact.
 photo: profilePhoto
 id: ID
 createdDateTime: String
 lastModifiedDateTime: String
 changeKey: String
 categories: [String]
}  
type contactFolder {
#The ID of the folder's parent folder.
 parentFolderId: String
#The folder's display name.
 displayName: String
#The contacts in the folder. Navigation property. Read-only. Nullable.
 contacts(id: ID): [contact]
#The collection of child folders in the folder. Navigation property. Read-only. Nullable.
 childFolders(id: ID): [contactFolder]
#The collection of single-value extended properties defined for the contactFolder. Read-only. Nullable.
 singleValueExtendedProperties(id: ID): [singleValueLegacyExtendedProperty]
#The collection of multi-value extended properties defined for the contactFolder. Read-only. Nullable.
 multiValueExtendedProperties(id: ID): [multiValueLegacyExtendedProperty]
 id: ID
}  
type inferenceClassification {
 id: ID
}  
type plannerUser {
#Read-only. Nullable. Returns the plannerPlans shared with the user.
 tasks(id: ID): [plannerTask]
#Read-only. Nullable. Returns the plannerTasks assigned to the user.
 plans(id: ID): [plannerPlan]
 id: ID
}  
type groupSettingTemplate {
#Display name of the template.
 displayName: String
#Description of the template.
 description: String
#Collection of settingTemplateValues that list the set of available settings, defaults and types that make up this template.
 values: [settingTemplateValue]
 id: ID
}  
type schemaExtension {
#Description for the schema extension.
 description: String
#Set of Microsoft Graph types (that can support extensions) that the schema extension can be applied to. Select from contact, device, event, group, message, organization, post, or user.
 targetTypes: [String]
#The collection of property names and types that make up the schema extension definition.
 properties: [extensionSchemaProperty]
#The lifecycle state of the schema extension. Possible states are InDevelopment, Available, and Deprecated. Automatically set to InDevelopment on creation. Schema extensions provides more information on the possible state transitions and behaviors.
 status: String
#The appId of the application that created the schema extension. Read-only.
 owner: String
 id: ID
}  
type attachment {
#The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 lastModifiedDateTime: String
#The attachment's file name.
 name: String
#The MIME type.
 contentType: String
#The length of the attachment in bytes.
 size: Int
#true if the attachment is an inline attachment; otherwise, false.
 isInline: Boolean
 id: ID
}  
type singleValueLegacyExtendedProperty {
 id: ID
}  
type multiValueLegacyExtendedProperty {
 id: ID
}  
type fileAttachment {
#The ID of the attachment in the Exchange store.
 contentId: String
#The Uniform Resource Identifier (URI) that corresponds to the location of the content of the attachment.
 contentLocation: String
#The binary contents of the file.
 contentBytes: String
 id: ID
 lastModifiedDateTime: String
 name: String
 contentType: String
 size: Int
 isInline: Boolean
}  
type itemAttachment {
 id: ID
 lastModifiedDateTime: String
 name: String
 contentType: String
 size: Int
 isInline: Boolean
}  
type eventMessage {
 id: ID
 receivedDateTime: String
 sentDateTime: String
 hasAttachments: Boolean
 internetMessageId: String
 subject: String
 body: itemBody
 bodyPreview: String
 importance: importance
 parentFolderId: String
 sender: recipient
 from: recipient
 toRecipients: [recipient]
 ccRecipients: [recipient]
 bccRecipients: [recipient]
 replyTo: [recipient]
 conversationId: String
 uniqueBody: itemBody
 isDeliveryReceiptRequested: Boolean
 isReadReceiptRequested: Boolean
 isRead: Boolean
 isDraft: Boolean
 webLink: String
 inferenceClassification: inferenceClassificationType
 attachments(id: ID): [attachment]
 extensions(id: ID): [extension]
 singleValueExtendedProperties(id: ID): [singleValueLegacyExtendedProperty]
 multiValueExtendedProperties(id: ID): [multiValueLegacyExtendedProperty]
 createdDateTime: String
 lastModifiedDateTime: String
 changeKey: String
 categories: [String]
}  
type referenceAttachment {
 id: ID
 lastModifiedDateTime: String
 name: String
 contentType: String
 size: Int
 isInline: Boolean
}  
type openTypeExtension {
 id: ID
}  
type post {
#The contents of the post. This is a default property. This property can be null.
 body: itemBody
#Specifies when the post was received. The DateTimeOffset type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 receivedDateTime: String
#Indicates whether the post has at least one attachment. This is a default property.
 hasAttachments: Boolean
#Used in delegate access scenarios. Indicates who posted the message on behalf of another user. This is a default property.
 from: recipient
#Contains the address of the sender. The value of Sender is assumed to be the address of the authenticated user in the case when Sender is not specified. This is a default property.
 sender: recipient
#Unique ID of the conversation thread. Read-only.
 conversationThreadId: String
#Conversation participants that were added to the thread as part of this post.
 newParticipants: [recipient]
#Unique ID of the conversation. Read-only.
 conversationId: String
#The collection of open extensions defined for the post. Read-only. Nullable.
 extensions(id: ID): [extension]
#Read-only.
 inReplyTo: post
#Read-only. Nullable.
 attachments(id: ID): [attachment]
#The collection of single-value extended properties defined for the post. Read-only. Nullable.
 singleValueExtendedProperties(id: ID): [singleValueLegacyExtendedProperty]
#The collection of multi-value extended properties defined for the post. Read-only. Nullable.
 multiValueExtendedProperties(id: ID): [multiValueLegacyExtendedProperty]
 id: ID
 createdDateTime: String
 lastModifiedDateTime: String
 changeKey: String
 categories: [String]
}  
type inferenceClassificationOverride {
#Specifies how incoming messages from a specific sender should always be classified as. Possible values are: focused, other.
 classifyAs: inferenceClassificationType
#The email address information of the sender for whom the override is created.
 senderEmailAddress: emailAddress
 id: ID
}  
type driveItem {
#Audio metadata, if the item is an audio file. Read-only.
 audio: audio
 content: String
#An eTag for the content of the item. This eTag is not changed if only the metadata is changed. Note This property is not returned if the item is a folder. Read-only.
 cTag: String
#Information about the deleted state of the item. Read-only.
 deleted: deleted
#File metadata, if the item is a file. Read-only.
 file: file
#File system information on client. Read-write.
 fileSystemInfo: fileSystemInfo
#Folder metadata, if the item is a folder. Read-only.
 folder: folder
#Image metadata, if the item is an image. Read-only.
 image: image
#Location metadata, if the item has location data. Read-only.
 location: geoCoordinates
#If present, indicates that this item is a package instead of a folder or file. Packages are treated like files in some contexts and folders in others. Read-only.
 package: package
#Photo metadata, if the item is a photo. Read-only.
 photo: photo
#Remote item data, if the item is shared from a drive other than the one being accessed. Read-only.
 remoteItem: remoteItem
#If this property is non-null, it indicates that the driveItem is the top-most driveItem in the drive.
 root: root
#Search metadata, if the item is from a search result. Read-only.
 searchResult: searchResult
#Indicates that the item has been shared with others and provides information about the shared state of the item. Read-only.
 shared: shared
#Returns identifiers useful for SharePoint REST compatibility. Read-only.
 sharepointIds: sharepointIds
#Size of the item in bytes. Read-only.
 size: String
#If the current item is also available as a special folder, this facet is returned. Read-only.
 specialFolder: specialFolder
#Video metadata, if the item is a video. Read-only.
 video: video
#WebDAV compatible URL for the item.
 webDavUrl: String
#Collection containing Item objects for the immediate children of Item. Only items representing folders have children. Read-only. Nullable.
 children(id: ID): [driveItem]
#The set of permissions for the item. Read-only. Nullable.
 permissions(id: ID): [permission]
#Collection containing ThumbnailSet objects associated with the item. For more info, see getting thumbnails. Read-only. Nullable.
 thumbnails(id: ID): [thumbnailSet]
 workbook: workbook
 id: ID
 createdBy: identitySet
 createdDateTime: String
 description: String
 eTag: String
 lastModifiedBy: identitySet
 lastModifiedDateTime: String
 name: String
 parentReference: itemReference
 webUrl: String
 createdByUser: user
 lastModifiedByUser: user
}  
type permission {
#For user type permissions, the details of the users & applications for this permission. Read-only.
 grantedTo: identitySet
#Provides a reference to the ancestor of the current permission, if it is inherited from an ancestor. Read-only.
 inheritedFrom: itemReference
#Details of any associated sharing invitation for this permission. Read-only.
 invitation: sharingInvitation
#Provides the link details of the current permission, if it is a link type permissions. Read-only.
 link: sharingLink
 roles: [String]
#A unique token that can be used to access this shared item via the **shares** API. Read-only.
 shareId: String
 id: ID
}  
type thumbnailSet {
#A 1920x1920 scaled thumbnail.
 large: thumbnail
#A 176x176 scaled thumbnail.
 medium: thumbnail
#A 48x48 cropped thumbnail.
 small: thumbnail
#A custom thumbnail image or the original image used to generate other thumbnails.
 source: thumbnail
 id: ID
}  
type workbook {
 application: workbookApplication
 names(id: ID): [workbookNamedItem]
 tables(id: ID): [workbookTable]
 worksheets(id: ID): [workbookWorksheet]
 functions: workbookFunctions
 id: ID
}  
type sharedDriveItem {
#A driveItem for the resource that was shared.  This is identical to the root property.
 driveItem: driveItem
#A collection of shared driveItem resources. This collection cannot be enumerated, but items can be accessed by their unique ID.
 items(id: ID): [driveItem]
#The top level shared driveItem. If a single file is shared, this item is the file. If a folder is shared, this item will be the folder. You can use the item's facets to determine which case applies.
 root: driveItem
#A site resource that contains the item that was shared.
 site: site
 id: ID
 createdBy: identitySet
 createdDateTime: String
 description: String
 eTag: String
 lastModifiedBy: identitySet
 lastModifiedDateTime: String
 name: String
 parentReference: itemReference
 webUrl: String
 createdByUser: user
 lastModifiedByUser: user
}  
type sharePoint {
 id: ID
}  
type list {
 id: ID
}  
type workbookApplication {
 id: ID
}  
type workbookNamedItem {
 comment: String
 name: String
 scope: String
 type: String
 value: Json
 visible: Boolean
 id: ID
}  
type workbookTable {
 highlightFirstColumn: Boolean
 highlightLastColumn: Boolean
 name: String
 showBandedColumns: Boolean
 showBandedRows: Boolean
 showFilterButton: Boolean
 showHeaders: Boolean
 showTotals: Boolean
 style: String
 columns(id: ID): [workbookTableColumn]
 rows(id: ID): [workbookTableRow]
 sort: workbookTableSort
 worksheet: workbookWorksheet
 id: ID
}  
type workbookWorksheet {
 name: String
 position: Int
 visibility: String
 charts(id: ID): [workbookChart]
 names(id: ID): [workbookNamedItem]
 pivotTables(id: ID): [workbookPivotTable]
 protection: workbookWorksheetProtection
 tables(id: ID): [workbookTable]
 id: ID
}  
type workbookFunctions {
 id: ID
}  
type workbookChart {
 height: Float
 left: Float
 name: String
 top: Float
 width: Float
 axes: workbookChartAxes
 dataLabels: workbookChartDataLabels
 format: workbookChartAreaFormat
 legend: workbookChartLegend
 series(id: ID): [workbookChartSeries]
 title: workbookChartTitle
 worksheet: workbookWorksheet
 id: ID
}  
type workbookChartAxes {
 categoryAxis: workbookChartAxis
 seriesAxis: workbookChartAxis
 valueAxis: workbookChartAxis
 id: ID
}  
type workbookChartDataLabels {
 position: String
 separator: String
 showBubbleSize: Boolean
 showCategoryName: Boolean
 showLegendKey: Boolean
 showPercentage: Boolean
 showSeriesName: Boolean
 showValue: Boolean
 id: ID
}  
type workbookChartAreaFormat {
 fill: workbookChartFill
 font: workbookChartFont
 id: ID
}  
type workbookChartLegend {
 overlay: Boolean
 position: String
 visible: Boolean
 id: ID
}  
type workbookChartSeries {
 format: workbookChartSeriesFormat
 points(id: ID): [workbookChartPoint]
 id: ID
}  
type workbookChartTitle {
 overlay: Boolean
 text: String
 visible: Boolean
 id: ID
}  
type workbookChartFill {
 id: ID
}  
type workbookChartFont {
 bold: Boolean
 color: String
 italic: Boolean
 name: String
 size: Float
 underline: String
 id: ID
}  
type workbookChartAxis {
 majorUnit: Json
 maximum: Json
 minimum: Json
 minorUnit: Json
 format: workbookChartAxisFormat
 majorGridlines: workbookChartGridlines
 minorGridlines: workbookChartGridlines
 title: workbookChartAxisTitle
 id: ID
}  
type workbookChartAxisFormat {
 font: workbookChartFont
 line: workbookChartLineFormat
 id: ID
}  
type workbookChartGridlines {
 id: ID
}  
type workbookChartAxisTitle {
 text: String
 visible: Boolean
 id: ID
}  
type workbookChartLineFormat {
 id: ID
}  
type workbookChartAxisTitleFormat {
 id: ID
}  
type workbookChartDataLabelFormat {
 fill: workbookChartFill
 font: workbookChartFont
 id: ID
}  
type workbookChartGridlinesFormat {
 id: ID
}  
type workbookChartLegendFormat {
 fill: workbookChartFill
 font: workbookChartFont
 id: ID
}  
type workbookChartPoint {
 id: ID
}  
type workbookChartPointFormat {
 id: ID
}  
type workbookChartSeriesFormat {
 fill: workbookChartFill
 line: workbookChartLineFormat
 id: ID
}  
type workbookChartTitleFormat {
 fill: workbookChartFill
 font: workbookChartFont
 id: ID
}  
type workbookFilter {
 id: ID
}  
type workbookFormatProtection {
 formulaHidden: Boolean
 locked: Boolean
 id: ID
}  
type workbookFunctionResult {
 error: String
 value: Json
 id: ID
}  
type workbookPivotTable {
 id: ID
}  
type workbookRange {
 address: String
 addressLocal: String
 cellCount: Int
 columnCount: Int
 columnHidden: Boolean
 columnIndex: Int
 formulas: Json
 formulasLocal: Json
 formulasR1C1: Json
 hidden: Boolean
 numberFormat: Json
 rowCount: Int
 rowHidden: Boolean
 rowIndex: Int
 text: Json
 valueTypes: Json
 values: Json
 format: workbookRangeFormat
 sort: workbookRangeSort
 worksheet: workbookWorksheet
 id: ID
}  
type workbookRangeFormat {
 columnWidth: Float
 horizontalAlignment: String
 rowHeight: Float
 verticalAlignment: String
 wrapText: Boolean
 borders(id: ID): [workbookRangeBorder]
 fill: workbookRangeFill
 font: workbookRangeFont
 protection: workbookFormatProtection
 id: ID
}  
type workbookRangeSort {
 id: ID
}  
type workbookRangeBorder {
 color: String
 sideIndex: String
 style: String
 weight: String
 id: ID
}  
type workbookRangeFill {
 id: ID
}  
type workbookRangeFont {
 bold: Boolean
 color: String
 italic: Boolean
 name: String
 size: Float
 underline: String
 id: ID
}  
type workbookRangeView {
 cellAddresses: Json
#Returns the number of visible columns. Read-only.
 columnCount: Int
#Represents the formula in A1-style notation.
 formulas: Json
#Represents the formula in A1-style notation, in the user's language and number-formatting locale. For example, the English "=SUM(A1, 1.5)" formula would become "=SUMME(A1; 1,5)" in German.
 formulasLocal: Json
#Represents the formula in R1C1-style notation.
 formulasR1C1: Json
#Index of the range.
 index: Int
#Represents Excel's number format code for the given cell. Read-only.
 numberFormat: Json
#Returns the number of visible rows. Read-only.
 rowCount: Int
#Text values of the specified range. The Text value will not depend on the cell width. The # sign substitution that happens in Excel UI will not affect the text value returned by the API. Read-only.
 text: Json
#Represents the type of data of each cell. Read-only. Possible values are: Unknown, Empty, String, Integer, Double, Boolean, Error.
 valueTypes: Json
#Represents the raw values of the specified range view. The data returned could be of type string, number, or a boolean. Cell that contain an error will return the error string.
 values: Json
 id: ID
}  
type workbookTableColumn {
 index: Int
 name: String
 values: Json
 id: ID
}  
type workbookTableRow {
 index: Int
 values: Json
 id: ID
}  
type workbookTableSort {
 fields: [workbookSortField]
 matchCase: Boolean
 method: String
 id: ID
}  
type workbookWorksheetProtection {
 options: workbookWorksheetProtectionOptions
 protected: Boolean
 id: ID
}  
type subscription {
#Specifies the resource that will be monitored for changes. Do not include the base URL ("https://graph.microsoft.com/v1.0/").
 resource: String
#Indicates the type of change in the subscribed resource that will raise a notification. The supported values are: created, updated, deleted. Multiple values can be combined using a comma-separated list.
 changeType: String
#Specifies the value of the clientState property sent by the service in each notification. The maximum length is 128 characters. The client can check that the notification came from the service by comparing the value of the clientState property sent with the subscription with the value of the clientState property received with each notification.
 clientState: String
#The URL of the endpoint that will receive the notifications. This URL has to make use of the HTTPS protocol.
 notificationUrl: String
#Specifies the date and time when the webhook subscription expires. The time is in UTC, and can be an amount of time from subscription creation that varies for the resource subscribed to.  See the table below for maximum values.
 expirationDateTime: String
 id: ID
}  
type invitation {
 invitedUserDisplayName: String
 invitedUserType: String
 invitedUserEmailAddress: String
 invitedUserMessageInfo: invitedUserMessageInfo
 sendInvitationMessage: Boolean
 inviteRedirectUrl: String
 inviteRedeemUrl: String
 status: String
 id: ID
}  
type plannerTask {
#Identity of the user that created the task.
 createdBy: identitySet
#Plan ID to which the task belongs.
 planId: String
#Bucket ID to which the task belongs. The bucket needs to be in the plan that the task is in. It is 28 characters long and case sensitive. Format validation is done on the service.
 bucketId: String
#Title of the task.
 title: String
#Hint used to order items of this type in a list view. The format is defined as outlined here.
 orderHint: String
#Hint used to order items of this type in a list view. The format is defined as outlined here.
 assigneePriority: String
#Percentage of task completion. When set to 100, the task is considered completed.
 percentComplete: Int
#Date and time at which the task starts. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 startDateTime: String
#Read-only. Date and time at which the task is created. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 createdDateTime: String
#Date and time at which the task is due. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 dueDateTime: String
#Read-only. Value is true if the details object of the task has a non-empty description and false otherwise.
 hasDescription: Boolean
#This sets the type of preview that shows up on the task. Possible values are: automatic, noPreview, checklist, description, reference.
 previewType: plannerPreviewType
#Read-only. Date and time at which the 'percentComplete' of the task is set to '100'. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 completedDateTime: String
#Identity of the user that completed the task.
 completedBy: identitySet
#Number of external references that exist on the task.
 referenceCount: Int
#Number of checklist items that are present on the task.
 checklistItemCount: Int
#Number of checklist items with value set to 'false', representing incomplete items.
 activeChecklistItemCount: Int
#The categories to which the task has been applied. See applied Categories for possible values.
 appliedCategories: plannerAppliedCategories
#The set of assignees the task is assigned to.
 assignments: plannerAssignments
#Thread ID of the conversation on the task. This is the ID of the conversation thread object created in the group.
 conversationThreadId: String
#Read-only. Nullable. Additional details about the task.
 details: plannerTaskDetails
#Read-only. Nullable. Used to render the task correctly in the task board view when grouped by assignedTo.
 assignedToTaskBoardFormat: plannerAssignedToTaskBoardTaskFormat
#Read-only. Nullable. Used to render the task correctly in the task board view when grouped by progress.
 progressTaskBoardFormat: plannerProgressTaskBoardTaskFormat
#Read-only. Nullable. Used to render the task correctly in the task board view when grouped by bucket.
 bucketTaskBoardFormat: plannerBucketTaskBoardTaskFormat
 id: ID
}  
type plannerPlan {
#Read-only. The user who created the plan.
 createdBy: identitySet
#Read-only. Date and time at which the plan is created. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 createdDateTime: String
#ID of the Group that owns the plan. A valid group must exist before this field can be set. Once set, this can only be updated by the owner.
 owner: String
#Required. Title of the plan.
 title: String
#Read-only. Nullable. Collection of tasks in the plan.
 tasks(id: ID): [plannerTask]
#Read-only. Nullable. Collection of buckets in the plan.
 buckets(id: ID): [plannerBucket]
#Read-only. Nullable. Additional details about the plan.
 details: plannerPlanDetails
 id: ID
}  
type planner {
#Read-only. Nullable. Returns a collection of the specified tasks
 tasks(id: ID): [plannerTask]
#Read-only. Nullable. Returns a collection of the specified plans
 plans(id: ID): [plannerPlan]
#Read-only. Nullable. Returns a collection of the specified buckets
 buckets(id: ID): [plannerBucket]
 id: ID
}  
type plannerBucket {
#Name of the bucket.
 name: String
#Plan ID to which the bucket belongs.
 planId: String
#Hint used to order items of this type in a list view. The format is defined as outlined here.
 orderHint: String
 id: ID
}  
type plannerTaskDetails {
#Description of the task
 description: String
#This sets the type of preview that shows up on the task. Possible values are: automatic, noPreview, checklist, description, reference. When set to automatic the displayed preview is chosen by the app viewing the task.
 previewType: plannerPreviewType
#The collection of references on the task.
 references: plannerExternalReferences
#The collection of checklist items on the task.
 checklist: plannerChecklistItems
 id: ID
}  
type plannerAssignedToTaskBoardTaskFormat {
#Hint value used to order the task on the AssignedTo view of the Task Board when the task is not assigned to anyone, or if the orderHintsByAssignee dictionary does not provide an order hint for the user the task is assigned to. The format is defined as outlined here.
 unassignedOrderHint: String
#Dictionary of hints used to order tasks on the AssignedTo view of the Task Board. The key of each entry is one of the users the task is assigned to and the value is the order hint. The format of each value is defined as outlined here.
 orderHintsByAssignee: plannerOrderHintsByAssignee
 id: ID
}  
type plannerProgressTaskBoardTaskFormat {
 id: ID
}  
type plannerBucketTaskBoardTaskFormat {
 id: ID
}  
type plannerPlanDetails {
#Set of user ids that this plan is shared with. If you are leveraging Office 365 Groups, use the Groups API to manage group membership to share the group's plan. You can also add existing members of the group to this collection though it is not required for them to access the plan owned by the group.
 sharedWith: plannerUserIds
#An object that specifies the descriptions of the six categories that can be associated with tasks in the plan
 categoryDescriptions: plannerCategoryDescriptions
 id: ID
}  
type onenoteEntityBaseModel {
 id: ID
}  
type onenoteEntitySchemaObjectModel {
 id: ID
}  
type onenoteEntityHierarchyModel {
 displayName: String
 createdBy: identitySet
 lastModifiedBy: identitySet
 lastModifiedDateTime: String
 id: ID
}  
type notebook {
#Indicates whether this is the user's default notebook. Read-only.
 isDefault: Boolean
#Possible values are: Owner, Contributor, Reader, None. Owner represents owner-level access to the notebook. Contributor represents read/write access to the notebook. Reader represents read-only access to the notebook. Read-only.
 userRole: onenoteUserRole
#Indicates whether the notebook is shared. If true, the contents of the notebook can be seen by people other than the owner. Read-only.
 isShared: Boolean
#The URL for the sections navigation property, which returns all the sections in the notebook. Read-only.
 sectionsUrl: String
#The URL for the sectionGroups navigation property, which returns all the section groups in the notebook. Read-only.
 sectionGroupsUrl: String
#Links for opening the notebook. The oneNoteClientURL link opens the notebook in the OneNote native client if it's installed. The oneNoteWebURL link opens the notebook in OneNote Online.
 links: notebookLinks
#The sections in the notebook. Read-only. Nullable.
 sections(id: ID): [onenoteSection]
#The section groups in the notebook. Read-only. Nullable.
 sectionGroups(id: ID): [sectionGroup]
 id: ID
 displayName: String
 createdBy: identitySet
 lastModifiedBy: identitySet
 lastModifiedDateTime: String
}  
type onenoteSection {
#Indicates whether this is the user's default section. Read-only.
 isDefault: Boolean
#Links for opening the section. The oneNoteClientURL link opens the section in the OneNote native client if it's installed. The oneNoteWebURL link opens the section in OneNote Online.
 links: sectionLinks
#The pages endpoint where you can get details for all the pages in the section. Read-only.
 pagesUrl: String
#The notebook that contains the section.  Read-only.
 parentNotebook: notebook
#The section group that contains the section.  Read-only.
 parentSectionGroup: sectionGroup
#The collection of pages in the section.  Read-only. Nullable.
 pages(id: ID): [onenotePage]
 id: ID
 displayName: String
 createdBy: identitySet
 lastModifiedBy: identitySet
 lastModifiedDateTime: String
}  
type sectionGroup {
 sectionsUrl: String
 sectionGroupsUrl: String
 parentNotebook: notebook
 parentSectionGroup: sectionGroup
 sections(id: ID): [onenoteSection]
 sectionGroups(id: ID): [sectionGroup]
 id: ID
 displayName: String
 createdBy: identitySet
 lastModifiedBy: identitySet
 lastModifiedDateTime: String
}  
type onenotePage {
#The title of the page.
 title: String
#The unique identifier of the application that created the page. Read-only.
 createdByAppId: String
#Links for opening the page. The oneNoteClientURL link opens the page in the OneNote native client if it 's installed. The oneNoteWebUrl link opens the page in OneNote Online. Read-only.
 links: pageLinks
#The URL for the page's HTML content.  Read-only.
 contentUrl: String
#The page's HTML content.
 content: String
#The date and time when the page was last modified. The timestamp represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'. Read-only.
 lastModifiedDateTime: String
#The indentation level of the page. Read-only.
 level: Int
#The order of the page within its parent section. Read-only.
 order: Int
 userTags: [String]
#The section that contains the page. Read-only.
 parentSection: onenoteSection
#The notebook that contains the page.  Read-only.
 parentNotebook: notebook
 id: ID
}  
type onenoteResource {
 content: String
 contentUrl: String
 id: ID
}  
type operation {
 status: operationStatus
 createdDateTime: String
 lastActionDateTime: String
 id: ID
}  
type onenoteOperation {
#The resource URI for the object. For example, the resource URI for a copied page or section.
 resourceLocation: String
#The resource id.
 resourceId: String
#The error returned by the operation.
 error: onenoteOperationError
#The operation percent complete if the operation is still in running status
 percentComplete: String
 id: ID
 status: operationStatus
 createdDateTime: String
 lastActionDateTime: String
}  
type alternativeSecurityId {
 type: Int
 identityProvider: String
 key: String
}  
type domainState {
#Current status of the operation.  Scheduled - Operation has been scheduled but has not started.  InProgress - Task has started and is in progress.  Failed - Operation has failed.
 status: String
#Type of asynchronous operation. The values can be ForceDelete or Verification
 operation: String
#Timestamp for when the last activity occurred. The value is updated when an operation is scheduled, the asynchronous task starts, and when the operation completes.
 lastActionDateTime: String
}  
type servicePlanInfo {
#The unique identifier of the service plan.
 servicePlanId: String
#The name of the service plan.
 servicePlanName: String
#The provisioning status of the service plan. Possible values:"Success" - Service is fully provisioned."Disabled" - Service has been disabled."PendingInput" - Service is not yet provisioned; awaiting service confirmation."PendingActivation" - Service is provisioned but requires explicit activation by administrator (for example, Intune_O365 service plan)"PendingProvisioning" - Microsoft has added a new service to the product SKU and it has not been activated in the tenant, yet.
 provisioningStatus: String
#The object the service plan can be assigned to. Possible values:"User" - service plan can be assigned to individual users."Company" - service plan can be assigned to the entire tenant.
 appliesTo: String
}  
type licenseUnitsDetail {
#The number of units that are enabled.
 enabled: Int
#The number of units that are suspended.
 suspended: Int
#The number of units that are in warning status.
 warning: Int
}  
type assignedPlan {
#The date and time at which the plan was assigned; for example: 2013-01-02T19:32:30Z. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 assignedDateTime: String
#For example, “Enabled”.
 capabilityStatus: String
#The name of the service; for example, “Exchange”.
 service: String
#A GUID that identifies the service plan.
 servicePlanId: String
}  
type provisionedPlan {
 capabilityStatus: String
 provisioningStatus: String
 service: String
}  
type verifiedDomain {
 capabilities: String
 isDefault: Boolean
 isInitial: Boolean
 name: String
 type: String
}  
type assignedLicense {
#A collection of the unique identifiers for plans that have been disabled.
 disabledPlans: [String]
#The unique identifier for the SKU.
 skuId: String
}  
type passwordProfile {
 password: String
 forceChangePasswordNextSignIn: Boolean
}  
type mailboxSettings {
#Configuration settings to automatically notify the sender of an incoming email with a message from the signed-in user.
 automaticRepliesSetting: automaticRepliesSetting
 archiveFolder: String
#The default time zone for the user's mailbox.
 timeZone: String
#The locale information for the user, including the preferred language and country/region.
 language: localeInfo
}  
type automaticRepliesSetting {
#Configurations status for automatic replies. Possible values are: disabled, alwaysEnabled, scheduled.
 status: automaticRepliesStatus
#The set of audience external to the signed-in user's organization who will receive the ExternalReplyMessage, if Status is AlwaysEnabled or Scheduled. Possible values are: none, contactsOnly, all.
 externalAudience: externalAudienceScope
#The date and time that automatic replies are set to begin, if Status is set to Scheduled.
 scheduledStartDateTime: dateTimeTimeZone
#The date and time that automatic replies are set to end, if Status is set to Scheduled.
 scheduledEndDateTime: dateTimeTimeZone
#The automatic reply to send to the audience internal to the signed-in user's organization, if Status is AlwaysEnabled or Scheduled.
 internalReplyMessage: String
#The automatic reply to send to the specified external audience, if Status is AlwaysEnabled or Scheduled.
 externalReplyMessage: String
}  
type dateTimeTimeZone {
 dateTime: String
 timeZone: String
}  
type localeInfo {
#A locale representation for the user, which includes the user's preferred language and country/region. For example, "en-us". The language component follows 2-letter codes as defined in ISO 639-1, and the country component follows 2-letter codes as defined in ISO 3166-1 alpha-2.
 locale: String
#A name representing the user's locale in natural language, for example, "English (United States)".
 displayName: String
}  
type settingValue {
#Name of the setting (as defined by the groupSettingTemplate).
 name: String
#Value of the setting.
 value: String
}  
type settingTemplateValue {
#Name of the setting.
 name: String
#Type of the setting.
 type: String
#Default value for the setting.
 defaultValue: String
#Description of the setting.
 description: String
}  
type ComplexExtensionValue {
 extension: String
}  
type extensionSchemaProperty {
#The name of the strongly-typed property defined as part of a schema extension.
 name: String
#The type of the property that is defined as part of a schema extension.  Allowed values are Binary, Boolean, DateTime, Integer or String.  See the table below for more details.
 type: String
}  
type recipient {
#The recipient's email address.
 emailAddress: emailAddress
}  
type emailAddress {
#The display name of the person or entity.
 name: String
#The email address of the person or entity.
 address: String
}  
type attendeeBase {
#The type of attendee. Possible values are: required, optional, resource. Currently if the attendee is a person, findMeetingTimes always considers the person is of the Required type.
 type: attendeeType
 emailAddress: emailAddress
}  
type meetingTimeSuggestionsResult {
#An array of meeting suggestions.
 meetingTimeSuggestions: [meetingTimeSuggestion]
#A reason for not returning any meeting suggestions. Possible values are: attendeesUnavailable, attendeesUnavailableOrUnknown, locationsUnavailable, organizerUnavailable, or unknown. This property is an empty string if the meetingTimeSuggestions property does include any meeting suggestions.
 emptySuggestionsReason: String
}  
type meetingTimeSuggestion {
#A time period suggested for the meeting.
 meetingTimeSlot: timeSlot
#A percentage that represents the likelhood of all the attendees attending.
 confidence: Float
#Availability of the meeting organizer for this meeting suggestion. Possible values are: free, tentative, busy, oof, workingElsewhere, unknown.
 organizerAvailability: freeBusyStatus
#An array that shows the availability status of each attendee for this meeting suggestion.
 attendeeAvailability: [attendeeAvailability]
#An array that specifies the name and geographic location of each meeting location for this meeting suggestion.
 locations: [location]
#Reason for suggesting the meeting time.
 suggestionReason: String
}  
type timeSlot {
#The time the period ends.
 start: dateTimeTimeZone
#The time a period begins.
 end: dateTimeTimeZone
}  
type attendeeAvailability {
#The type of attendee - whether it's a person or a resource, and whether required or optional if it's a person.
 attendee: attendeeBase
#The availability status of the attendee. Possible values are: free, tentative, busy, oof, workingElsewhere, unknown.
 availability: freeBusyStatus
}  
type location {
#The name associated with the location.
 displayName: String
#Optional email address of the location.
 locationEmailAddress: String
#The street address of the location.
 address: physicalAddress
}  
type physicalAddress {
#The street.
 street: String
#The city.
 city: String
#The state.
 state: String
#The country or region. It's a free-format string value, for example, "United States".
 countryOrRegion: String
#The postal code.
 postalCode: String
}  
type locationConstraint {
 isRequired: Boolean
 suggestLocation: Boolean
 locations: [locationConstraintItem]
}  
type locationConstraintItem {
#If set to true and the specified resource is busy, findMeetingTimes looks for another resource that is free. If set to false and the specified resource is busy, findMeetingTimes returns the resource best ranked in the user's cache without checking if it's free. Default is true.
 resolveAvailability: Boolean
 displayName: String
 locationEmailAddress: String
 address: physicalAddress
}  
type timeConstraint {
 activityDomain: activityDomain
 timeslots: [timeSlot]
}  
type reminder {
#The unique ID of the event. Read only.
 eventId: String
#The date, time, and time zone that the event starts.
 eventStartTime: dateTimeTimeZone
#The date, time and time zone that the event ends.
 eventEndTime: dateTimeTimeZone
#Identifies the version of the reminder. Every time the reminder is changed, changeKey changes as well. This allows Exchange to apply changes to the correct version of the object.
 changeKey: String
#The text of the event's subject line.
 eventSubject: String
#The location of the event.
 eventLocation: location
#The URL to open the event in Outlook on the web.The event will open in the browser if you are logged in to your mailbox via Outlook on the web. You will be prompted to login if you are not already logged in with the browser.This URL can be accessed from within an iFrame.
 eventWebLink: String
#The date, time, and time zone that the reminder is set to occur.
 reminderFireTime: dateTimeTimeZone
}  
type itemBody {
#The type of the content. Possible values are Text and HTML.
 contentType: bodyType
#The content of the item.
 content: String
}  
type responseStatus {
#The response type: None = 0, Organizer = 1, TentativelyAccepted = 2, Accepted = 3, Declined = 4, NotResponded = 5. Possible values are: None, Organizer, TentativelyAccepted, Accepted, Declined, NotResponded.
 response: responseType
#The date and time that the response was returned. It uses ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 time: String
}  
type patternedRecurrence {
 pattern: recurrencePattern
 range: recurrenceRange
}  
type recurrencePattern {
 type: recurrencePatternType
 interval: Int
 month: Int
 dayOfMonth: Int
 daysOfWeek: [dayOfWeek]
 firstDayOfWeek: dayOfWeek
 index: weekIndex
}  
type recurrenceRange {
 type: recurrenceRangeType
 startDate: String
 endDate: String
 recurrenceTimeZone: String
 numberOfOccurrences: Int
}  
type attendee {
#The attendee's response (none, accepted, declined, etc.) for the event and date-time that the response was sent.
 status: responseStatus
 type: attendeeType
 emailAddress: emailAddress
}  
type identitySet {
#Optional. The application associated with this action.
 application: identity
#Optional. The device associated with this action.
 device: identity
#Optional. The user associated with this action.
 user: identity
}  
type identity {
#The identity's display name. Note that this may not always be available or up to date. For example, if a user changes their display name, the API may show the new value in a future response, but the items associated with the user won't show up as having changed when using delta
 displayName: String
#Unique identifier for the identity.
 id: String
}  
type itemReference {
#Unique identifier of the drive instance that contains the item. Read-only.
 driveId: String
#Unique identifier of the item in the drive. Read-only.
 id: String
#The name of the item being referenced. Read-only.
 name: String
#Path that can be used to navigate to the item. Read-only.
 path: String
#A unique identifier for a shared resource that can be accessed via the Shares API.
 shareId: String
#Returns identifiers useful for SharePoint REST compatibility. Read-only.
 sharepointIds: sharepointIds
}  
type sharepointIds {
#The unique identifier (guid) for the item's list in SharePoint.
 listId: String
#An integer identifier for the item within the containing list.
 listItemId: String
#The unique identifier (guid) for the item within OneDrive for Busienss or a SharePoint site.
 listItemUniqueId: String
#The unique identifier (guid) for the item's site collection (SPSite).
 siteId: String
#The SharePoint URL for the site that contains the item.
 siteUrl: String
#The unique identifier (guid) for the item's site (SPWeb).
 webId: String
}  
type quota {
#Total space consumed by files in the recycle bin, in bytes. Read-only.
 deleted: String
#Total space remaining before reaching the quota limit, in bytes. Read-only.
 remaining: String
#Enumeration value that indicates the state of the storage space. Read-only.
 state: String
#Total allowed storage space, in bytes. Read-only.
 total: String
#Total space used, in bytes. Read-only.
 used: String
}  
type audio {
#The title of the album for this audio file.
 album: String
#The artist named on the album for the audio file.
 albumArtist: String
#The performing artist for the audio file.
 artist: String
#Bitrate expressed in kbps.
 bitrate: String
#The name of the composer of the audio file.
 composers: String
#Copyright information for the audio file.
 copyright: String
#The number of the disc this audio file came from.
 disc: Int
#The total number of discs in this album.
 discCount: Int
#Duration of the audio file, expressed in milliseconds
 duration: String
#The genre of this audio file.
 genre: String
#Indicates if the file is protected with digital rights management.
 hasDrm: Boolean
#Indicates if the file is encoded with a variable bitrate.
 isVariableBitrate: Boolean
#The title of the audio file.
 title: String
#The number of the track on the original disc for this audio file.
 track: Int
#The total number of tracks on the original disc for this audio file.
 trackCount: Int
#The year the audio file was recorded.
 year: Int
}  
type deleted {
#Represents the state of the deleted item.
 state: String
}  
type file {
#Hashes of the file's binary content, if available. Read-only.
 hashes: hashes
#The MIME type for the file. This is determined by logic on the server and might not be the value provided when the file was uploaded. Read-only.
 mimeType: String
 processingMetadata: Boolean
}  
type hashes {
#The CRC32 value of the file (if available). Read-only.
 crc32Hash: String
#A proprietary hash of the file that can be used to determine if the contents of the file have changed (if available). Read-only.
 quickXorHash: String
#SHA1 hash for the contents of the file (if available). Read-only.
 sha1Hash: String
}  
type fileSystemInfo {
#The UTC date and time the file was created on a client.
 createdDateTime: String
 lastAccessedDateTime: String
#The UTC date and time the file was last modified on a client.
 lastModifiedDateTime: String
}  
type folder {
#Number of children contained immediately within this container.
 childCount: Int
}  
type image {
#Optional. Height of the image, in pixels. Read-only.
 height: Int
#Optional. Width of the image, in pixels. Read-only.
 width: Int
}  
type geoCoordinates {
#Optional. The altitude (height), in feet,  above sea level for the item. Read-only.
 altitude: Float
#Optional. The latitude, in decimal, for the item. Read-only.
 latitude: Float
#Optional. The longitude, in decimal, for the item. Read-only.
 longitude: Float
}  
type package {
 type: String
}  
type photo {
#Camera manufacturer. Read-only.
 cameraMake: String
#Camera model. Read-only.
 cameraModel: String
#The denominator for the exposure time fraction from the camera. Read-only.
 exposureDenominator: Float
#The numerator for the exposure time fraction from the camera. Read-only.
 exposureNumerator: Float
#The F-stop value from the camera. Read-only.
 fNumber: Float
#The focal length from the camera. Read-only.
 focalLength: Float
#The ISO value from the camera. Read-only.
 iso: Int
#Represents the date and time the photo was taken. Read-only.
 takenDateTime: String
}  
type remoteItem {
#Identity of the user, device, and application which created the item. Read-only.
 createdBy: identitySet
#Date and time of item creation. Read-only.
 createdDateTime: String
#Indicates that the remote item is a file. Read-only.
 file: file
#Information about the remote item from the local file system. Read-only.
 fileSystemInfo: fileSystemInfo
#Indicates that the remote item is a folder. Read-only.
 folder: folder
#Unique identifier for the remote item in its drive. Read-only.
 id: String
#Identity of the user, device, and application which last modified the item. Read-only.
 lastModifiedBy: identitySet
#Date and time the item was last modified. Read-only.
 lastModifiedDateTime: String
#Optional. Filename of the remote item. Read-only.
 name: String
#If present, indicates that this item is a package instead of a folder or file. Packages are treated like files in some contexts and folders in others. Read-only.
 package: package
#Properties of the parent of the remote item. Read-only.
 parentReference: itemReference
#Indicates that the item has been shared with others and provides information about the shared state of the item. Read-only.
 shared: shared
#Provides interop between items in OneDrive for Business and SharePoint with the full set of item identifiers. Read-only.
 sharepointIds: sharepointIds
#Size of the remote item. Read-only.
 size: String
#If the current item is also available as a special folder, this facet is returned. Read-only.
 specialFolder: specialFolder
#DAV compatible URL for the item.
 webDavUrl: String
#URL that displays the resource in the browser. Read-only.
 webUrl: String
}  
type shared {
#The identity of the owner of the shared item. Read-only.
 owner: identitySet
#Indicates the scope of how the item is shared: anonymous, organization, or users. Read-only.
 scope: String
#The identity of the user who shared the item. Read-only.
 sharedBy: identitySet
#The UTC date and time when the item was shared. Read-only.
 sharedDateTime: String
}  
type specialFolder {
#The unique identifier for this item in the /drive/special collection
 name: String
}  
type root {
 extension: String
}  
type searchResult {
#A callback URL that can be used to record telemetry information. The application should issue a GET on this URL if the user interacts with this item to improve the quality of results.
 onClickTelemetryUrl: String
}  
type video {
#Bit rate of the video in bits per second.
 bitrate: Int
#Duration of the file in milliseconds.
 duration: String
#Height of the video, in pixels.
 height: Int
#Width of the video, in pixels.
 width: Int
}  
type sharingInvitation {
#The email address provided for the recipient of the sharing invitation. Read-only.
 email: String
#Provides information about who sent the invitation that created this permission, if that information is available. Read-only.
 invitedBy: identitySet
 redeemedBy: String
#If true the recipient of the invitation needs to sign in in order to access the shared item. Read-only.
 signInRequired: Boolean
}  
type sharingLink {
#The app the link is associated with.
 application: identity
#The scope of the link represented by this permission. Value anonymous indicates the link is usable by anyone, organization indicates the link is only usable for users signed into the same tenant.
 scope: String
#The type of the link created.
 type: String
#A URL that opens the item in the browser on the OneDrive website.
 webUrl: String
}  
type siteCollection {
#The hostname for the site collection. Read-only.
 hostname: String
}  
type thumbnail {
 content: String
#The height of the thumbnail, in pixels.
 height: Int
#The unique identifier of the item that provided the thumbnail. This is only available when a folder thumbnail is requested.
 sourceItemId: String
#The URL used to fetch the thumbnail content.
 url: String
#The width of the thumbnail, in pixels.
 width: Int
}  
type driveItemUploadableProperties {
 description: String
 fileSystemInfo: fileSystemInfo
 name: String
}  
type driveRecipient {
#The alias of the domain object, for cases where an email address is unavailable (e.g. security groups).
 alias: String
#The email address for the recipient, if the recipient has an associated email address.
 email: String
#The unique identifier for the recipient in the directory.
 objectId: String
}  
type uploadSession {
#The date and time in UTC that the upload session will expire. The complete file must be uploaded before this expiration time is reached.
 expirationDateTime: String
#A collection of byte ranges that the server is missing for the file. These ranges are zero indexed and of the format "start-end" (e.g. "0-26" to indicate the first 27 bytes of the file).
 nextExpectedRanges: [String]
#The URL endpoint that accepts PUT requests for byte ranges of the file.
 uploadUrl: String
}  
type workbookSessionInfo {
 id: String
 persistChanges: Boolean
}  
type Json {
 extension: String
}  
type workbookFilterCriteria {
 color: String
 criterion1: String
 criterion2: String
 dynamicCriteria: String
 filterOn: String
 icon: workbookIcon
 operator: String
 values: Json
}  
type workbookIcon {
 index: Int
 set: String
}  
type workbookSortField {
 ascending: Boolean
 color: String
 dataOption: String
 icon: workbookIcon
 key: Int
 sortOn: String
}  
type workbookWorksheetProtectionOptions {
 allowAutoFilter: Boolean
 allowDeleteColumns: Boolean
 allowDeleteRows: Boolean
 allowFormatCells: Boolean
 allowFormatColumns: Boolean
 allowFormatRows: Boolean
 allowInsertColumns: Boolean
 allowInsertHyperlinks: Boolean
 allowInsertRows: Boolean
 allowPivotTables: Boolean
 allowSort: Boolean
}  
type workbookFilterDatetime {
 date: String
 specificity: String
}  
type workbookRangeReference {
 address: String
}  
type invitedUserMessageInfo {
#Additional recipients the invitation message should be sent to. Currently only 1 additional recipient is supported.
 ccRecipients: [recipient]
#The language you want to send the default message in. If the customizedMessageBody is specified, this property is ignored, and the message is sent using the customizedMessageBody. The language format should be in ISO 639. The default is en-US.
 messageLanguage: String
#Customized message body you want to send if you don't want the default message.
 customizedMessageBody: String
}  
type plannerAppliedCategories {
 extension: String
}  
type plannerAssignments {
 extension: String
}  
type plannerExternalReference {
#A name alias to describe the reference.
 alias: String
#Used to describe the type of the reference. Types include: PowerPoint, Word, Excel, Other.
 type: String
#Used to set the relative priority order in which the reference will be shown as a preview on the task.
 previewPriority: String
#Read-only. User ID by which this is last modified.
 lastModifiedBy: identitySet
#Read-only. Date and time at which this is last modified. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 lastModifiedDateTime: String
}  
type plannerChecklistItem {
#Value is true if the item is checked and false otherwise.
 isChecked: Boolean
#Title of the checklist item
 title: String
#Used to set the relative order of items in the checklist. The format is defined as outlined here.
 orderHint: String
#Read-only. User ID by which this is last modified.
 lastModifiedBy: identitySet
#Read-only. Date and time at which this is last modified. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 lastModifiedDateTime: String
}  
type plannerAssignment {
#The identity of the user that performed the assignment of the task, i.e. the assignor.
 assignedBy: identitySet
#The time at which the task was assigned. The Timestamp type represents date and time information using ISO 8601 format and is always in UTC time. For example, midnight UTC on Jan 1, 2014 would look like this: '2014-01-01T00:00:00Z'
 assignedDateTime: String
#Hint used to order assignees in a task. The format is defined as outlined here.
 orderHint: String
}  
type plannerExternalReferences {
 extension: String
}  
type plannerChecklistItems {
 extension: String
}  
type plannerOrderHintsByAssignee {
 extension: String
}  
type plannerUserIds {
 extension: String
}  
type plannerCategoryDescriptions {
#The label associated with Category 1
 category1: String
#The label associated with Category 2
 category2: String
#The label associated with Category 3
 category3: String
#The label associated with Category 4
 category4: String
#The label associated with Category 5
 category5: String
#The label associated with Category 6
 category6: String
}  
type notebookLinks {
#Opens the notebook in the OneNote native client if it's installed.
 oneNoteClientUrl: externalLink
#Opens the notebook in OneNote Online.
 oneNoteWebUrl: externalLink
}  
type externalLink {
#The url of the link.
 href: String
}  
type sectionLinks {
#Opens the section in the OneNote native client if it's installed.
 oneNoteClientUrl: externalLink
#Opens the section in OneNote Online.
 oneNoteWebUrl: externalLink
}  
type pageLinks {
#Opens the page in the OneNote native client if it's installed.
 oneNoteClientUrl: externalLink
#Opens the page in OneNote Online.
 oneNoteWebUrl: externalLink
}  
type onenoteOperationError {
#The error code.
 code: String
#The error message.
 message: String
}  
type diagnostic {
 message: String
 url: String
}  
type onenotePatchContentCommand {
#The action to perform on the target element. Possible values are: replace, append, delete, insert, or prepend.
 action: onenotePatchActionType
#The element to update. Must be the #<data-id> or the generated <id> of the element, or the body or title keyword.
 target: String
#A string of well-formed HTML to add to the page, and any image or file binary data. If the content contains binary data, the request must be sent using the multipart/form-data content type with a "Commands" part.
 content: String
#The location to add the supplied content, relative to the target element. Possible values are: after (default) or before.
 position: onenotePatchInsertPosition
}  
type onenotePagePreview {
 previewText: String
 links: onenotePagePreviewLinks
}  
type onenotePagePreviewLinks {
 previewImageUrl: externalLink
}  
type recentNotebook {
 displayName: String
 lastAccessedTime: String
 links: recentNotebookLinks
 sourceService: onenoteSourceService
}  
type recentNotebookLinks {
 oneNoteClientUrl: externalLink
 oneNoteWebUrl: externalLink
}  
type Query {
 directoryObjects(id: ID): [directoryObject] 
 devices(id: ID): [device] 
 domains(id: ID): [domain] 
 domainDnsRecords(id: ID): [domainDnsRecord] 
 groups(id: ID): [group] 
 directoryRoles(id: ID): [directoryRole] 
 directoryRoleTemplates(id: ID): [directoryRoleTemplate] 
 organization(id: ID): [organization] 
 groupSettings(id: ID): [groupSetting] 
 groupSettingTemplates(id: ID): [groupSettingTemplate] 
 subscribedSkus(id: ID): [subscribedSku] 
 users(id: ID): [user] 
 contracts(id: ID): [contract] 
 schemaExtensions(id: ID): [schemaExtension] 
 drives(id: ID): [drive] 
 shares(id: ID): [sharedDriveItem] 
 sites(id: ID): [site] 
 workbooks(id: ID): [driveItem] 
 subscriptions(id: ID): [subscription] 
 invitations(id: ID): [invitation] 
 me: user 
 drive: drive 
 planner: planner 
} 
scalar Date 
scalar DateTimeOffset `;
const resolvers = {
	Query: {
		directoryObjects(obj, args, context) {
			const name = 'directoryObjects';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		devices(obj, args, context) {
			const name = 'devices';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		domains(obj, args, context) {
			const name = 'domains';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		domainDnsRecords(obj, args, context) {
			const name = 'domainDnsRecords';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		groups(obj, args, context) {
			const name = 'groups';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		directoryRoles(obj, args, context) {
			const name = 'directoryRoles';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		directoryRoleTemplates(obj, args, context) {
			const name = 'directoryRoleTemplates';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		organization(obj, args, context) {
			const name = 'organization';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		groupSettings(obj, args, context) {
			const name = 'groupSettings';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		groupSettingTemplates(obj, args, context) {
			const name = 'groupSettingTemplates';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		subscribedSkus(obj, args, context) {
			const name = 'subscribedSkus';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		users(obj, args, context) {
			const name = 'users';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		contracts(obj, args, context) {
			const name = 'contracts';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		schemaExtensions(obj, args, context) {
			const name = 'schemaExtensions';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		drives(obj, args, context) {
			const name = 'drives';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		shares(obj, args, context) {
			const name = 'shares';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		sites(obj, args, context) {
			const name = 'sites';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		workbooks(obj, args, context) {
			const name = 'workbooks';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		subscriptions(obj, args, context) {
			const name = 'subscriptions';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		invitations(obj, args, context) {
			const name = 'invitations';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		me(obj, args, context) {
			const name = 'me';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		drive(obj, args, context) {
			const name = 'drive';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		},
		planner(obj, args, context) {
			const name = 'planner';
			const requestUrl = graphRoot + "/" + name;
			return makeRequest(requestUrl, obj['__session'], args, false);
		}
	},
	entity: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	directoryObject: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	device: {
		accountEnabled(obj, args, context) {
			const name = 'accountEnabled';
			return graphqlResolve(obj, name, args);
		},
		alternativeSecurityIds(obj, args, context) {
			const name = 'alternativeSecurityIds';
			return graphqlResolve(obj, name, args);
		},
		approximateLastSignInDateTime(obj, args, context) {
			const name = 'approximateLastSignInDateTime';
			return graphqlResolve(obj, name, args);
		},
		deviceId(obj, args, context) {
			const name = 'deviceId';
			return graphqlResolve(obj, name, args);
		},
		deviceMetadata(obj, args, context) {
			const name = 'deviceMetadata';
			return graphqlResolve(obj, name, args);
		},
		deviceVersion(obj, args, context) {
			const name = 'deviceVersion';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		isCompliant(obj, args, context) {
			const name = 'isCompliant';
			return graphqlResolve(obj, name, args);
		},
		isManaged(obj, args, context) {
			const name = 'isManaged';
			return graphqlResolve(obj, name, args);
		},
		onPremisesLastSyncDateTime(obj, args, context) {
			const name = 'onPremisesLastSyncDateTime';
			return graphqlResolve(obj, name, args);
		},
		onPremisesSyncEnabled(obj, args, context) {
			const name = 'onPremisesSyncEnabled';
			return graphqlResolve(obj, name, args);
		},
		operatingSystem(obj, args, context) {
			const name = 'operatingSystem';
			return graphqlResolve(obj, name, args);
		},
		operatingSystemVersion(obj, args, context) {
			const name = 'operatingSystemVersion';
			return graphqlResolve(obj, name, args);
		},
		physicalIds(obj, args, context) {
			const name = 'physicalIds';
			return graphqlResolve(obj, name, args);
		},
		trustType(obj, args, context) {
			const name = 'trustType';
			return graphqlResolve(obj, name, args);
		},
		registeredOwners(obj, args, context) {
			const name = 'registeredOwners';
			return graphqlResolve(obj, name, args);
		},
		registeredUsers(obj, args, context) {
			const name = 'registeredUsers';
			return graphqlResolve(obj, name, args);
		},
		extensions(obj, args, context) {
			const name = 'extensions';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	extension: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	directoryRole: {
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		roleTemplateId(obj, args, context) {
			const name = 'roleTemplateId';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	directoryRoleTemplate: {
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	domain: {
		authenticationType(obj, args, context) {
			const name = 'authenticationType';
			return graphqlResolve(obj, name, args);
		},
		availabilityStatus(obj, args, context) {
			const name = 'availabilityStatus';
			return graphqlResolve(obj, name, args);
		},
		isAdminManaged(obj, args, context) {
			const name = 'isAdminManaged';
			return graphqlResolve(obj, name, args);
		},
		isDefault(obj, args, context) {
			const name = 'isDefault';
			return graphqlResolve(obj, name, args);
		},
		isInitial(obj, args, context) {
			const name = 'isInitial';
			return graphqlResolve(obj, name, args);
		},
		isRoot(obj, args, context) {
			const name = 'isRoot';
			return graphqlResolve(obj, name, args);
		},
		isVerified(obj, args, context) {
			const name = 'isVerified';
			return graphqlResolve(obj, name, args);
		},
		supportedServices(obj, args, context) {
			const name = 'supportedServices';
			return graphqlResolve(obj, name, args);
		},
		state(obj, args, context) {
			const name = 'state';
			return graphqlResolve(obj, name, args);
		},
		serviceConfigurationRecords(obj, args, context) {
			const name = 'serviceConfigurationRecords';
			return graphqlResolve(obj, name, args);
		},
		verificationDnsRecords(obj, args, context) {
			const name = 'verificationDnsRecords';
			return graphqlResolve(obj, name, args);
		},
		domainNameReferences(obj, args, context) {
			const name = 'domainNameReferences';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	domainDnsRecord: {
		isOptional(obj, args, context) {
			const name = 'isOptional';
			return graphqlResolve(obj, name, args);
		},
		label(obj, args, context) {
			const name = 'label';
			return graphqlResolve(obj, name, args);
		},
		recordType(obj, args, context) {
			const name = 'recordType';
			return graphqlResolve(obj, name, args);
		},
		supportedService(obj, args, context) {
			const name = 'supportedService';
			return graphqlResolve(obj, name, args);
		},
		ttl(obj, args, context) {
			const name = 'ttl';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	domainDnsCnameRecord: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		isOptional(obj, args, context) {
			const name = 'isOptional';
			return graphqlResolve(obj, name, args);
		},
		label(obj, args, context) {
			const name = 'label';
			return graphqlResolve(obj, name, args);
		},
		recordType(obj, args, context) {
			const name = 'recordType';
			return graphqlResolve(obj, name, args);
		},
		supportedService(obj, args, context) {
			const name = 'supportedService';
			return graphqlResolve(obj, name, args);
		},
		ttl(obj, args, context) {
			const name = 'ttl';
			return graphqlResolve(obj, name, args);
		}
	},
	domainDnsMxRecord: {
		mailExchange(obj, args, context) {
			const name = 'mailExchange';
			return graphqlResolve(obj, name, args);
		},
		preference(obj, args, context) {
			const name = 'preference';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		isOptional(obj, args, context) {
			const name = 'isOptional';
			return graphqlResolve(obj, name, args);
		},
		label(obj, args, context) {
			const name = 'label';
			return graphqlResolve(obj, name, args);
		},
		recordType(obj, args, context) {
			const name = 'recordType';
			return graphqlResolve(obj, name, args);
		},
		supportedService(obj, args, context) {
			const name = 'supportedService';
			return graphqlResolve(obj, name, args);
		},
		ttl(obj, args, context) {
			const name = 'ttl';
			return graphqlResolve(obj, name, args);
		}
	},
	domainDnsSrvRecord: {
		nameTarget(obj, args, context) {
			const name = 'nameTarget';
			return graphqlResolve(obj, name, args);
		},
		port(obj, args, context) {
			const name = 'port';
			return graphqlResolve(obj, name, args);
		},
		priority(obj, args, context) {
			const name = 'priority';
			return graphqlResolve(obj, name, args);
		},
		protocol(obj, args, context) {
			const name = 'protocol';
			return graphqlResolve(obj, name, args);
		},
		service(obj, args, context) {
			const name = 'service';
			return graphqlResolve(obj, name, args);
		},
		weight(obj, args, context) {
			const name = 'weight';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		isOptional(obj, args, context) {
			const name = 'isOptional';
			return graphqlResolve(obj, name, args);
		},
		label(obj, args, context) {
			const name = 'label';
			return graphqlResolve(obj, name, args);
		},
		recordType(obj, args, context) {
			const name = 'recordType';
			return graphqlResolve(obj, name, args);
		},
		supportedService(obj, args, context) {
			const name = 'supportedService';
			return graphqlResolve(obj, name, args);
		},
		ttl(obj, args, context) {
			const name = 'ttl';
			return graphqlResolve(obj, name, args);
		}
	},
	domainDnsTxtRecord: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		isOptional(obj, args, context) {
			const name = 'isOptional';
			return graphqlResolve(obj, name, args);
		},
		label(obj, args, context) {
			const name = 'label';
			return graphqlResolve(obj, name, args);
		},
		recordType(obj, args, context) {
			const name = 'recordType';
			return graphqlResolve(obj, name, args);
		},
		supportedService(obj, args, context) {
			const name = 'supportedService';
			return graphqlResolve(obj, name, args);
		},
		ttl(obj, args, context) {
			const name = 'ttl';
			return graphqlResolve(obj, name, args);
		}
	},
	domainDnsUnavailableRecord: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		isOptional(obj, args, context) {
			const name = 'isOptional';
			return graphqlResolve(obj, name, args);
		},
		label(obj, args, context) {
			const name = 'label';
			return graphqlResolve(obj, name, args);
		},
		recordType(obj, args, context) {
			const name = 'recordType';
			return graphqlResolve(obj, name, args);
		},
		supportedService(obj, args, context) {
			const name = 'supportedService';
			return graphqlResolve(obj, name, args);
		},
		ttl(obj, args, context) {
			const name = 'ttl';
			return graphqlResolve(obj, name, args);
		}
	},
	licenseDetails: {
		servicePlans(obj, args, context) {
			const name = 'servicePlans';
			return graphqlResolve(obj, name, args);
		},
		skuId(obj, args, context) {
			const name = 'skuId';
			return graphqlResolve(obj, name, args);
		},
		skuPartNumber(obj, args, context) {
			const name = 'skuPartNumber';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	group: {
		classification(obj, args, context) {
			const name = 'classification';
			return graphqlResolve(obj, name, args);
		},
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		groupTypes(obj, args, context) {
			const name = 'groupTypes';
			return graphqlResolve(obj, name, args);
		},
		mail(obj, args, context) {
			const name = 'mail';
			return graphqlResolve(obj, name, args);
		},
		mailEnabled(obj, args, context) {
			const name = 'mailEnabled';
			return graphqlResolve(obj, name, args);
		},
		mailNickname(obj, args, context) {
			const name = 'mailNickname';
			return graphqlResolve(obj, name, args);
		},
		onPremisesLastSyncDateTime(obj, args, context) {
			const name = 'onPremisesLastSyncDateTime';
			return graphqlResolve(obj, name, args);
		},
		onPremisesSecurityIdentifier(obj, args, context) {
			const name = 'onPremisesSecurityIdentifier';
			return graphqlResolve(obj, name, args);
		},
		onPremisesSyncEnabled(obj, args, context) {
			const name = 'onPremisesSyncEnabled';
			return graphqlResolve(obj, name, args);
		},
		proxyAddresses(obj, args, context) {
			const name = 'proxyAddresses';
			return graphqlResolve(obj, name, args);
		},
		securityEnabled(obj, args, context) {
			const name = 'securityEnabled';
			return graphqlResolve(obj, name, args);
		},
		visibility(obj, args, context) {
			const name = 'visibility';
			return graphqlResolve(obj, name, args);
		},
		allowExternalSenders(obj, args, context) {
			const name = 'allowExternalSenders';
			return graphqlResolve(obj, name, args);
		},
		autoSubscribeNewMembers(obj, args, context) {
			const name = 'autoSubscribeNewMembers';
			return graphqlResolve(obj, name, args);
		},
		isSubscribedByMail(obj, args, context) {
			const name = 'isSubscribedByMail';
			return graphqlResolve(obj, name, args);
		},
		unseenCount(obj, args, context) {
			const name = 'unseenCount';
			return graphqlResolve(obj, name, args);
		},
		members(obj, args, context) {
			const name = 'members';
			return graphqlResolve(obj, name, args);
		},
		memberOf(obj, args, context) {
			const name = 'memberOf';
			return graphqlResolve(obj, name, args);
		},
		createdOnBehalfOf(obj, args, context) {
			const name = 'createdOnBehalfOf';
			return graphqlResolve(obj, name, args);
		},
		owners(obj, args, context) {
			const name = 'owners';
			return graphqlResolve(obj, name, args);
		},
		settings(obj, args, context) {
			const name = 'settings';
			return graphqlResolve(obj, name, args);
		},
		extensions(obj, args, context) {
			const name = 'extensions';
			return graphqlResolve(obj, name, args);
		},
		threads(obj, args, context) {
			const name = 'threads';
			return graphqlResolve(obj, name, args);
		},
		calendar(obj, args, context) {
			const name = 'calendar';
			return graphqlResolve(obj, name, args);
		},
		calendarView(obj, args, context) {
			const name = 'calendarView';
			return graphqlResolve(obj, name, args);
		},
		events(obj, args, context) {
			const name = 'events';
			return graphqlResolve(obj, name, args);
		},
		conversations(obj, args, context) {
			const name = 'conversations';
			return graphqlResolve(obj, name, args);
		},
		photo(obj, args, context) {
			const name = 'photo';
			return graphqlResolve(obj, name, args);
		},
		photos(obj, args, context) {
			const name = 'photos';
			return graphqlResolve(obj, name, args);
		},
		acceptedSenders(obj, args, context) {
			const name = 'acceptedSenders';
			return graphqlResolve(obj, name, args);
		},
		rejectedSenders(obj, args, context) {
			const name = 'rejectedSenders';
			return graphqlResolve(obj, name, args);
		},
		drive(obj, args, context) {
			const name = 'drive';
			return graphqlResolve(obj, name, args);
		},
		drives(obj, args, context) {
			const name = 'drives';
			return graphqlResolve(obj, name, args);
		},
		sites(obj, args, context) {
			const name = 'sites';
			return graphqlResolve(obj, name, args);
		},
		planner(obj, args, context) {
			const name = 'planner';
			return graphqlResolve(obj, name, args);
		},
		onenote(obj, args, context) {
			const name = 'onenote';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	groupSetting: {
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		templateId(obj, args, context) {
			const name = 'templateId';
			return graphqlResolve(obj, name, args);
		},
		values(obj, args, context) {
			const name = 'values';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	conversationThread: {
		toRecipients(obj, args, context) {
			const name = 'toRecipients';
			return graphqlResolve(obj, name, args);
		},
		topic(obj, args, context) {
			const name = 'topic';
			return graphqlResolve(obj, name, args);
		},
		hasAttachments(obj, args, context) {
			const name = 'hasAttachments';
			return graphqlResolve(obj, name, args);
		},
		lastDeliveredDateTime(obj, args, context) {
			const name = 'lastDeliveredDateTime';
			return graphqlResolve(obj, name, args);
		},
		uniqueSenders(obj, args, context) {
			const name = 'uniqueSenders';
			return graphqlResolve(obj, name, args);
		},
		ccRecipients(obj, args, context) {
			const name = 'ccRecipients';
			return graphqlResolve(obj, name, args);
		},
		preview(obj, args, context) {
			const name = 'preview';
			return graphqlResolve(obj, name, args);
		},
		isLocked(obj, args, context) {
			const name = 'isLocked';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	calendar: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		color(obj, args, context) {
			const name = 'color';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		canShare(obj, args, context) {
			const name = 'canShare';
			return graphqlResolve(obj, name, args);
		},
		canViewPrivateItems(obj, args, context) {
			const name = 'canViewPrivateItems';
			return graphqlResolve(obj, name, args);
		},
		canEdit(obj, args, context) {
			const name = 'canEdit';
			return graphqlResolve(obj, name, args);
		},
		owner(obj, args, context) {
			const name = 'owner';
			return graphqlResolve(obj, name, args);
		},
		events(obj, args, context) {
			const name = 'events';
			return graphqlResolve(obj, name, args);
		},
		calendarView(obj, args, context) {
			const name = 'calendarView';
			return graphqlResolve(obj, name, args);
		},
		singleValueExtendedProperties(obj, args, context) {
			const name = 'singleValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		multiValueExtendedProperties(obj, args, context) {
			const name = 'multiValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	outlookItem: {
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		categories(obj, args, context) {
			const name = 'categories';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	event: {
		originalStartTimeZone(obj, args, context) {
			const name = 'originalStartTimeZone';
			return graphqlResolve(obj, name, args);
		},
		originalEndTimeZone(obj, args, context) {
			const name = 'originalEndTimeZone';
			return graphqlResolve(obj, name, args);
		},
		responseStatus(obj, args, context) {
			const name = 'responseStatus';
			return graphqlResolve(obj, name, args);
		},
		iCalUId(obj, args, context) {
			const name = 'iCalUId';
			return graphqlResolve(obj, name, args);
		},
		reminderMinutesBeforeStart(obj, args, context) {
			const name = 'reminderMinutesBeforeStart';
			return graphqlResolve(obj, name, args);
		},
		isReminderOn(obj, args, context) {
			const name = 'isReminderOn';
			return graphqlResolve(obj, name, args);
		},
		hasAttachments(obj, args, context) {
			const name = 'hasAttachments';
			return graphqlResolve(obj, name, args);
		},
		subject(obj, args, context) {
			const name = 'subject';
			return graphqlResolve(obj, name, args);
		},
		body(obj, args, context) {
			const name = 'body';
			return graphqlResolve(obj, name, args);
		},
		bodyPreview(obj, args, context) {
			const name = 'bodyPreview';
			return graphqlResolve(obj, name, args);
		},
		importance(obj, args, context) {
			const name = 'importance';
			return graphqlResolve(obj, name, args);
		},
		sensitivity(obj, args, context) {
			const name = 'sensitivity';
			return graphqlResolve(obj, name, args);
		},
		start(obj, args, context) {
			const name = 'start';
			return graphqlResolve(obj, name, args);
		},
		originalStart(obj, args, context) {
			const name = 'originalStart';
			return graphqlResolve(obj, name, args);
		},
		end(obj, args, context) {
			const name = 'end';
			return graphqlResolve(obj, name, args);
		},
		location(obj, args, context) {
			const name = 'location';
			return graphqlResolve(obj, name, args);
		},
		isAllDay(obj, args, context) {
			const name = 'isAllDay';
			return graphqlResolve(obj, name, args);
		},
		isCancelled(obj, args, context) {
			const name = 'isCancelled';
			return graphqlResolve(obj, name, args);
		},
		isOrganizer(obj, args, context) {
			const name = 'isOrganizer';
			return graphqlResolve(obj, name, args);
		},
		recurrence(obj, args, context) {
			const name = 'recurrence';
			return graphqlResolve(obj, name, args);
		},
		responseRequested(obj, args, context) {
			const name = 'responseRequested';
			return graphqlResolve(obj, name, args);
		},
		seriesMasterId(obj, args, context) {
			const name = 'seriesMasterId';
			return graphqlResolve(obj, name, args);
		},
		showAs(obj, args, context) {
			const name = 'showAs';
			return graphqlResolve(obj, name, args);
		},
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		attendees(obj, args, context) {
			const name = 'attendees';
			return graphqlResolve(obj, name, args);
		},
		organizer(obj, args, context) {
			const name = 'organizer';
			return graphqlResolve(obj, name, args);
		},
		webLink(obj, args, context) {
			const name = 'webLink';
			return graphqlResolve(obj, name, args);
		},
		onlineMeetingUrl(obj, args, context) {
			const name = 'onlineMeetingUrl';
			return graphqlResolve(obj, name, args);
		},
		calendar(obj, args, context) {
			const name = 'calendar';
			return graphqlResolve(obj, name, args);
		},
		instances(obj, args, context) {
			const name = 'instances';
			return graphqlResolve(obj, name, args);
		},
		extensions(obj, args, context) {
			const name = 'extensions';
			return graphqlResolve(obj, name, args);
		},
		attachments(obj, args, context) {
			const name = 'attachments';
			return graphqlResolve(obj, name, args);
		},
		singleValueExtendedProperties(obj, args, context) {
			const name = 'singleValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		multiValueExtendedProperties(obj, args, context) {
			const name = 'multiValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		categories(obj, args, context) {
			const name = 'categories';
			return graphqlResolve(obj, name, args);
		}
	},
	conversation: {
		topic(obj, args, context) {
			const name = 'topic';
			return graphqlResolve(obj, name, args);
		},
		hasAttachments(obj, args, context) {
			const name = 'hasAttachments';
			return graphqlResolve(obj, name, args);
		},
		lastDeliveredDateTime(obj, args, context) {
			const name = 'lastDeliveredDateTime';
			return graphqlResolve(obj, name, args);
		},
		uniqueSenders(obj, args, context) {
			const name = 'uniqueSenders';
			return graphqlResolve(obj, name, args);
		},
		preview(obj, args, context) {
			const name = 'preview';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	profilePhoto: {
		height(obj, args, context) {
			const name = 'height';
			return graphqlResolve(obj, name, args);
		},
		width(obj, args, context) {
			const name = 'width';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	baseItem: {
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		eTag(obj, args, context) {
			const name = 'eTag';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		parentReference(obj, args, context) {
			const name = 'parentReference';
			return graphqlResolve(obj, name, args);
		},
		webUrl(obj, args, context) {
			const name = 'webUrl';
			return graphqlResolve(obj, name, args);
		},
		createdByUser(obj, args, context) {
			const name = 'createdByUser';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedByUser(obj, args, context) {
			const name = 'lastModifiedByUser';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	drive: {
		driveType(obj, args, context) {
			const name = 'driveType';
			return graphqlResolve(obj, name, args);
		},
		owner(obj, args, context) {
			const name = 'owner';
			return graphqlResolve(obj, name, args);
		},
		quota(obj, args, context) {
			const name = 'quota';
			return graphqlResolve(obj, name, args);
		},
		sharePointIds(obj, args, context) {
			const name = 'sharePointIds';
			return graphqlResolve(obj, name, args);
		},
		items(obj, args, context) {
			const name = 'items';
			return graphqlResolve(obj, name, args);
		},
		root(obj, args, context) {
			const name = 'root';
			return graphqlResolve(obj, name, args);
		},
		special(obj, args, context) {
			const name = 'special';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		eTag(obj, args, context) {
			const name = 'eTag';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		parentReference(obj, args, context) {
			const name = 'parentReference';
			return graphqlResolve(obj, name, args);
		},
		webUrl(obj, args, context) {
			const name = 'webUrl';
			return graphqlResolve(obj, name, args);
		},
		createdByUser(obj, args, context) {
			const name = 'createdByUser';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedByUser(obj, args, context) {
			const name = 'lastModifiedByUser';
			return graphqlResolve(obj, name, args);
		}
	},
	site: {
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		root(obj, args, context) {
			const name = 'root';
			return graphqlResolve(obj, name, args);
		},
		sharepointIds(obj, args, context) {
			const name = 'sharepointIds';
			return graphqlResolve(obj, name, args);
		},
		siteCollection(obj, args, context) {
			const name = 'siteCollection';
			return graphqlResolve(obj, name, args);
		},
		drive(obj, args, context) {
			const name = 'drive';
			return graphqlResolve(obj, name, args);
		},
		drives(obj, args, context) {
			const name = 'drives';
			return graphqlResolve(obj, name, args);
		},
		sites(obj, args, context) {
			const name = 'sites';
			return graphqlResolve(obj, name, args);
		},
		onenote(obj, args, context) {
			const name = 'onenote';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		eTag(obj, args, context) {
			const name = 'eTag';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		parentReference(obj, args, context) {
			const name = 'parentReference';
			return graphqlResolve(obj, name, args);
		},
		webUrl(obj, args, context) {
			const name = 'webUrl';
			return graphqlResolve(obj, name, args);
		},
		createdByUser(obj, args, context) {
			const name = 'createdByUser';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedByUser(obj, args, context) {
			const name = 'lastModifiedByUser';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerGroup: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	onenote: {
		notebooks(obj, args, context) {
			const name = 'notebooks';
			return graphqlResolve(obj, name, args);
		},
		sections(obj, args, context) {
			const name = 'sections';
			return graphqlResolve(obj, name, args);
		},
		sectionGroups(obj, args, context) {
			const name = 'sectionGroups';
			return graphqlResolve(obj, name, args);
		},
		pages(obj, args, context) {
			const name = 'pages';
			return graphqlResolve(obj, name, args);
		},
		resources(obj, args, context) {
			const name = 'resources';
			return graphqlResolve(obj, name, args);
		},
		operations(obj, args, context) {
			const name = 'operations';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	contract: {
		contractType(obj, args, context) {
			const name = 'contractType';
			return graphqlResolve(obj, name, args);
		},
		customerId(obj, args, context) {
			const name = 'customerId';
			return graphqlResolve(obj, name, args);
		},
		defaultDomainName(obj, args, context) {
			const name = 'defaultDomainName';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	subscribedSku: {
		capabilityStatus(obj, args, context) {
			const name = 'capabilityStatus';
			return graphqlResolve(obj, name, args);
		},
		consumedUnits(obj, args, context) {
			const name = 'consumedUnits';
			return graphqlResolve(obj, name, args);
		},
		prepaidUnits(obj, args, context) {
			const name = 'prepaidUnits';
			return graphqlResolve(obj, name, args);
		},
		servicePlans(obj, args, context) {
			const name = 'servicePlans';
			return graphqlResolve(obj, name, args);
		},
		skuId(obj, args, context) {
			const name = 'skuId';
			return graphqlResolve(obj, name, args);
		},
		skuPartNumber(obj, args, context) {
			const name = 'skuPartNumber';
			return graphqlResolve(obj, name, args);
		},
		appliesTo(obj, args, context) {
			const name = 'appliesTo';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	organization: {
		assignedPlans(obj, args, context) {
			const name = 'assignedPlans';
			return graphqlResolve(obj, name, args);
		},
		businessPhones(obj, args, context) {
			const name = 'businessPhones';
			return graphqlResolve(obj, name, args);
		},
		city(obj, args, context) {
			const name = 'city';
			return graphqlResolve(obj, name, args);
		},
		country(obj, args, context) {
			const name = 'country';
			return graphqlResolve(obj, name, args);
		},
		countryLetterCode(obj, args, context) {
			const name = 'countryLetterCode';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		marketingNotificationEmails(obj, args, context) {
			const name = 'marketingNotificationEmails';
			return graphqlResolve(obj, name, args);
		},
		onPremisesLastSyncDateTime(obj, args, context) {
			const name = 'onPremisesLastSyncDateTime';
			return graphqlResolve(obj, name, args);
		},
		onPremisesSyncEnabled(obj, args, context) {
			const name = 'onPremisesSyncEnabled';
			return graphqlResolve(obj, name, args);
		},
		postalCode(obj, args, context) {
			const name = 'postalCode';
			return graphqlResolve(obj, name, args);
		},
		preferredLanguage(obj, args, context) {
			const name = 'preferredLanguage';
			return graphqlResolve(obj, name, args);
		},
		provisionedPlans(obj, args, context) {
			const name = 'provisionedPlans';
			return graphqlResolve(obj, name, args);
		},
		securityComplianceNotificationMails(obj, args, context) {
			const name = 'securityComplianceNotificationMails';
			return graphqlResolve(obj, name, args);
		},
		securityComplianceNotificationPhones(obj, args, context) {
			const name = 'securityComplianceNotificationPhones';
			return graphqlResolve(obj, name, args);
		},
		state(obj, args, context) {
			const name = 'state';
			return graphqlResolve(obj, name, args);
		},
		street(obj, args, context) {
			const name = 'street';
			return graphqlResolve(obj, name, args);
		},
		technicalNotificationMails(obj, args, context) {
			const name = 'technicalNotificationMails';
			return graphqlResolve(obj, name, args);
		},
		verifiedDomains(obj, args, context) {
			const name = 'verifiedDomains';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	user: {
		accountEnabled(obj, args, context) {
			const name = 'accountEnabled';
			return graphqlResolve(obj, name, args);
		},
		assignedLicenses(obj, args, context) {
			const name = 'assignedLicenses';
			return graphqlResolve(obj, name, args);
		},
		assignedPlans(obj, args, context) {
			const name = 'assignedPlans';
			return graphqlResolve(obj, name, args);
		},
		businessPhones(obj, args, context) {
			const name = 'businessPhones';
			return graphqlResolve(obj, name, args);
		},
		city(obj, args, context) {
			const name = 'city';
			return graphqlResolve(obj, name, args);
		},
		companyName(obj, args, context) {
			const name = 'companyName';
			return graphqlResolve(obj, name, args);
		},
		country(obj, args, context) {
			const name = 'country';
			return graphqlResolve(obj, name, args);
		},
		department(obj, args, context) {
			const name = 'department';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		givenName(obj, args, context) {
			const name = 'givenName';
			return graphqlResolve(obj, name, args);
		},
		imAddresses(obj, args, context) {
			const name = 'imAddresses';
			return graphqlResolve(obj, name, args);
		},
		jobTitle(obj, args, context) {
			const name = 'jobTitle';
			return graphqlResolve(obj, name, args);
		},
		mail(obj, args, context) {
			const name = 'mail';
			return graphqlResolve(obj, name, args);
		},
		mailNickname(obj, args, context) {
			const name = 'mailNickname';
			return graphqlResolve(obj, name, args);
		},
		mobilePhone(obj, args, context) {
			const name = 'mobilePhone';
			return graphqlResolve(obj, name, args);
		},
		onPremisesImmutableId(obj, args, context) {
			const name = 'onPremisesImmutableId';
			return graphqlResolve(obj, name, args);
		},
		onPremisesLastSyncDateTime(obj, args, context) {
			const name = 'onPremisesLastSyncDateTime';
			return graphqlResolve(obj, name, args);
		},
		onPremisesSecurityIdentifier(obj, args, context) {
			const name = 'onPremisesSecurityIdentifier';
			return graphqlResolve(obj, name, args);
		},
		onPremisesSyncEnabled(obj, args, context) {
			const name = 'onPremisesSyncEnabled';
			return graphqlResolve(obj, name, args);
		},
		passwordPolicies(obj, args, context) {
			const name = 'passwordPolicies';
			return graphqlResolve(obj, name, args);
		},
		passwordProfile(obj, args, context) {
			const name = 'passwordProfile';
			return graphqlResolve(obj, name, args);
		},
		officeLocation(obj, args, context) {
			const name = 'officeLocation';
			return graphqlResolve(obj, name, args);
		},
		postalCode(obj, args, context) {
			const name = 'postalCode';
			return graphqlResolve(obj, name, args);
		},
		preferredLanguage(obj, args, context) {
			const name = 'preferredLanguage';
			return graphqlResolve(obj, name, args);
		},
		provisionedPlans(obj, args, context) {
			const name = 'provisionedPlans';
			return graphqlResolve(obj, name, args);
		},
		proxyAddresses(obj, args, context) {
			const name = 'proxyAddresses';
			return graphqlResolve(obj, name, args);
		},
		state(obj, args, context) {
			const name = 'state';
			return graphqlResolve(obj, name, args);
		},
		streetAddress(obj, args, context) {
			const name = 'streetAddress';
			return graphqlResolve(obj, name, args);
		},
		surname(obj, args, context) {
			const name = 'surname';
			return graphqlResolve(obj, name, args);
		},
		usageLocation(obj, args, context) {
			const name = 'usageLocation';
			return graphqlResolve(obj, name, args);
		},
		userPrincipalName(obj, args, context) {
			const name = 'userPrincipalName';
			return graphqlResolve(obj, name, args);
		},
		userType(obj, args, context) {
			const name = 'userType';
			return graphqlResolve(obj, name, args);
		},
		mailboxSettings(obj, args, context) {
			const name = 'mailboxSettings';
			return graphqlResolve(obj, name, args);
		},
		aboutMe(obj, args, context) {
			const name = 'aboutMe';
			return graphqlResolve(obj, name, args);
		},
		birthday(obj, args, context) {
			const name = 'birthday';
			return graphqlResolve(obj, name, args);
		},
		hireDate(obj, args, context) {
			const name = 'hireDate';
			return graphqlResolve(obj, name, args);
		},
		interests(obj, args, context) {
			const name = 'interests';
			return graphqlResolve(obj, name, args);
		},
		mySite(obj, args, context) {
			const name = 'mySite';
			return graphqlResolve(obj, name, args);
		},
		pastProjects(obj, args, context) {
			const name = 'pastProjects';
			return graphqlResolve(obj, name, args);
		},
		preferredName(obj, args, context) {
			const name = 'preferredName';
			return graphqlResolve(obj, name, args);
		},
		responsibilities(obj, args, context) {
			const name = 'responsibilities';
			return graphqlResolve(obj, name, args);
		},
		schools(obj, args, context) {
			const name = 'schools';
			return graphqlResolve(obj, name, args);
		},
		skills(obj, args, context) {
			const name = 'skills';
			return graphqlResolve(obj, name, args);
		},
		ownedDevices(obj, args, context) {
			const name = 'ownedDevices';
			return graphqlResolve(obj, name, args);
		},
		registeredDevices(obj, args, context) {
			const name = 'registeredDevices';
			return graphqlResolve(obj, name, args);
		},
		manager(obj, args, context) {
			const name = 'manager';
			return graphqlResolve(obj, name, args);
		},
		directReports(obj, args, context) {
			const name = 'directReports';
			return graphqlResolve(obj, name, args);
		},
		memberOf(obj, args, context) {
			const name = 'memberOf';
			return graphqlResolve(obj, name, args);
		},
		createdObjects(obj, args, context) {
			const name = 'createdObjects';
			return graphqlResolve(obj, name, args);
		},
		ownedObjects(obj, args, context) {
			const name = 'ownedObjects';
			return graphqlResolve(obj, name, args);
		},
		licenseDetails(obj, args, context) {
			const name = 'licenseDetails';
			return graphqlResolve(obj, name, args);
		},
		extensions(obj, args, context) {
			const name = 'extensions';
			return graphqlResolve(obj, name, args);
		},
		messages(obj, args, context) {
			const name = 'messages';
			return graphqlResolve(obj, name, args);
		},
		mailFolders(obj, args, context) {
			const name = 'mailFolders';
			return graphqlResolve(obj, name, args);
		},
		calendar(obj, args, context) {
			const name = 'calendar';
			return graphqlResolve(obj, name, args);
		},
		calendars(obj, args, context) {
			const name = 'calendars';
			return graphqlResolve(obj, name, args);
		},
		calendarGroups(obj, args, context) {
			const name = 'calendarGroups';
			return graphqlResolve(obj, name, args);
		},
		calendarView(obj, args, context) {
			const name = 'calendarView';
			return graphqlResolve(obj, name, args);
		},
		events(obj, args, context) {
			const name = 'events';
			return graphqlResolve(obj, name, args);
		},
		contacts(obj, args, context) {
			const name = 'contacts';
			return graphqlResolve(obj, name, args);
		},
		contactFolders(obj, args, context) {
			const name = 'contactFolders';
			return graphqlResolve(obj, name, args);
		},
		inferenceClassification(obj, args, context) {
			const name = 'inferenceClassification';
			return graphqlResolve(obj, name, args);
		},
		photo(obj, args, context) {
			const name = 'photo';
			return graphqlResolve(obj, name, args);
		},
		photos(obj, args, context) {
			const name = 'photos';
			return graphqlResolve(obj, name, args);
		},
		drive(obj, args, context) {
			const name = 'drive';
			return graphqlResolve(obj, name, args);
		},
		drives(obj, args, context) {
			const name = 'drives';
			return graphqlResolve(obj, name, args);
		},
		planner(obj, args, context) {
			const name = 'planner';
			return graphqlResolve(obj, name, args);
		},
		onenote(obj, args, context) {
			const name = 'onenote';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	message: {
		receivedDateTime(obj, args, context) {
			const name = 'receivedDateTime';
			return graphqlResolve(obj, name, args);
		},
		sentDateTime(obj, args, context) {
			const name = 'sentDateTime';
			return graphqlResolve(obj, name, args);
		},
		hasAttachments(obj, args, context) {
			const name = 'hasAttachments';
			return graphqlResolve(obj, name, args);
		},
		internetMessageId(obj, args, context) {
			const name = 'internetMessageId';
			return graphqlResolve(obj, name, args);
		},
		subject(obj, args, context) {
			const name = 'subject';
			return graphqlResolve(obj, name, args);
		},
		body(obj, args, context) {
			const name = 'body';
			return graphqlResolve(obj, name, args);
		},
		bodyPreview(obj, args, context) {
			const name = 'bodyPreview';
			return graphqlResolve(obj, name, args);
		},
		importance(obj, args, context) {
			const name = 'importance';
			return graphqlResolve(obj, name, args);
		},
		parentFolderId(obj, args, context) {
			const name = 'parentFolderId';
			return graphqlResolve(obj, name, args);
		},
		sender(obj, args, context) {
			const name = 'sender';
			return graphqlResolve(obj, name, args);
		},
		from(obj, args, context) {
			const name = 'from';
			return graphqlResolve(obj, name, args);
		},
		toRecipients(obj, args, context) {
			const name = 'toRecipients';
			return graphqlResolve(obj, name, args);
		},
		ccRecipients(obj, args, context) {
			const name = 'ccRecipients';
			return graphqlResolve(obj, name, args);
		},
		bccRecipients(obj, args, context) {
			const name = 'bccRecipients';
			return graphqlResolve(obj, name, args);
		},
		replyTo(obj, args, context) {
			const name = 'replyTo';
			return graphqlResolve(obj, name, args);
		},
		conversationId(obj, args, context) {
			const name = 'conversationId';
			return graphqlResolve(obj, name, args);
		},
		uniqueBody(obj, args, context) {
			const name = 'uniqueBody';
			return graphqlResolve(obj, name, args);
		},
		isDeliveryReceiptRequested(obj, args, context) {
			const name = 'isDeliveryReceiptRequested';
			return graphqlResolve(obj, name, args);
		},
		isReadReceiptRequested(obj, args, context) {
			const name = 'isReadReceiptRequested';
			return graphqlResolve(obj, name, args);
		},
		isRead(obj, args, context) {
			const name = 'isRead';
			return graphqlResolve(obj, name, args);
		},
		isDraft(obj, args, context) {
			const name = 'isDraft';
			return graphqlResolve(obj, name, args);
		},
		webLink(obj, args, context) {
			const name = 'webLink';
			return graphqlResolve(obj, name, args);
		},
		inferenceClassification(obj, args, context) {
			const name = 'inferenceClassification';
			return graphqlResolve(obj, name, args);
		},
		attachments(obj, args, context) {
			const name = 'attachments';
			return graphqlResolve(obj, name, args);
		},
		extensions(obj, args, context) {
			const name = 'extensions';
			return graphqlResolve(obj, name, args);
		},
		singleValueExtendedProperties(obj, args, context) {
			const name = 'singleValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		multiValueExtendedProperties(obj, args, context) {
			const name = 'multiValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		categories(obj, args, context) {
			const name = 'categories';
			return graphqlResolve(obj, name, args);
		}
	},
	mailFolder: {
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		parentFolderId(obj, args, context) {
			const name = 'parentFolderId';
			return graphqlResolve(obj, name, args);
		},
		childFolderCount(obj, args, context) {
			const name = 'childFolderCount';
			return graphqlResolve(obj, name, args);
		},
		unreadItemCount(obj, args, context) {
			const name = 'unreadItemCount';
			return graphqlResolve(obj, name, args);
		},
		totalItemCount(obj, args, context) {
			const name = 'totalItemCount';
			return graphqlResolve(obj, name, args);
		},
		messages(obj, args, context) {
			const name = 'messages';
			return graphqlResolve(obj, name, args);
		},
		childFolders(obj, args, context) {
			const name = 'childFolders';
			return graphqlResolve(obj, name, args);
		},
		singleValueExtendedProperties(obj, args, context) {
			const name = 'singleValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		multiValueExtendedProperties(obj, args, context) {
			const name = 'multiValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	calendarGroup: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		classId(obj, args, context) {
			const name = 'classId';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	contact: {
		parentFolderId(obj, args, context) {
			const name = 'parentFolderId';
			return graphqlResolve(obj, name, args);
		},
		birthday(obj, args, context) {
			const name = 'birthday';
			return graphqlResolve(obj, name, args);
		},
		fileAs(obj, args, context) {
			const name = 'fileAs';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		givenName(obj, args, context) {
			const name = 'givenName';
			return graphqlResolve(obj, name, args);
		},
		initials(obj, args, context) {
			const name = 'initials';
			return graphqlResolve(obj, name, args);
		},
		middleName(obj, args, context) {
			const name = 'middleName';
			return graphqlResolve(obj, name, args);
		},
		nickName(obj, args, context) {
			const name = 'nickName';
			return graphqlResolve(obj, name, args);
		},
		surname(obj, args, context) {
			const name = 'surname';
			return graphqlResolve(obj, name, args);
		},
		title(obj, args, context) {
			const name = 'title';
			return graphqlResolve(obj, name, args);
		},
		yomiGivenName(obj, args, context) {
			const name = 'yomiGivenName';
			return graphqlResolve(obj, name, args);
		},
		yomiSurname(obj, args, context) {
			const name = 'yomiSurname';
			return graphqlResolve(obj, name, args);
		},
		yomiCompanyName(obj, args, context) {
			const name = 'yomiCompanyName';
			return graphqlResolve(obj, name, args);
		},
		generation(obj, args, context) {
			const name = 'generation';
			return graphqlResolve(obj, name, args);
		},
		emailAddresses(obj, args, context) {
			const name = 'emailAddresses';
			return graphqlResolve(obj, name, args);
		},
		imAddresses(obj, args, context) {
			const name = 'imAddresses';
			return graphqlResolve(obj, name, args);
		},
		jobTitle(obj, args, context) {
			const name = 'jobTitle';
			return graphqlResolve(obj, name, args);
		},
		companyName(obj, args, context) {
			const name = 'companyName';
			return graphqlResolve(obj, name, args);
		},
		department(obj, args, context) {
			const name = 'department';
			return graphqlResolve(obj, name, args);
		},
		officeLocation(obj, args, context) {
			const name = 'officeLocation';
			return graphqlResolve(obj, name, args);
		},
		profession(obj, args, context) {
			const name = 'profession';
			return graphqlResolve(obj, name, args);
		},
		businessHomePage(obj, args, context) {
			const name = 'businessHomePage';
			return graphqlResolve(obj, name, args);
		},
		assistantName(obj, args, context) {
			const name = 'assistantName';
			return graphqlResolve(obj, name, args);
		},
		manager(obj, args, context) {
			const name = 'manager';
			return graphqlResolve(obj, name, args);
		},
		homePhones(obj, args, context) {
			const name = 'homePhones';
			return graphqlResolve(obj, name, args);
		},
		mobilePhone(obj, args, context) {
			const name = 'mobilePhone';
			return graphqlResolve(obj, name, args);
		},
		businessPhones(obj, args, context) {
			const name = 'businessPhones';
			return graphqlResolve(obj, name, args);
		},
		homeAddress(obj, args, context) {
			const name = 'homeAddress';
			return graphqlResolve(obj, name, args);
		},
		businessAddress(obj, args, context) {
			const name = 'businessAddress';
			return graphqlResolve(obj, name, args);
		},
		otherAddress(obj, args, context) {
			const name = 'otherAddress';
			return graphqlResolve(obj, name, args);
		},
		spouseName(obj, args, context) {
			const name = 'spouseName';
			return graphqlResolve(obj, name, args);
		},
		personalNotes(obj, args, context) {
			const name = 'personalNotes';
			return graphqlResolve(obj, name, args);
		},
		children(obj, args, context) {
			const name = 'children';
			return graphqlResolve(obj, name, args);
		},
		extensions(obj, args, context) {
			const name = 'extensions';
			return graphqlResolve(obj, name, args);
		},
		singleValueExtendedProperties(obj, args, context) {
			const name = 'singleValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		multiValueExtendedProperties(obj, args, context) {
			const name = 'multiValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		photo(obj, args, context) {
			const name = 'photo';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		categories(obj, args, context) {
			const name = 'categories';
			return graphqlResolve(obj, name, args);
		}
	},
	contactFolder: {
		parentFolderId(obj, args, context) {
			const name = 'parentFolderId';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		contacts(obj, args, context) {
			const name = 'contacts';
			return graphqlResolve(obj, name, args);
		},
		childFolders(obj, args, context) {
			const name = 'childFolders';
			return graphqlResolve(obj, name, args);
		},
		singleValueExtendedProperties(obj, args, context) {
			const name = 'singleValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		multiValueExtendedProperties(obj, args, context) {
			const name = 'multiValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	inferenceClassification: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerUser: {
		tasks(obj, args, context) {
			const name = 'tasks';
			return graphqlResolve(obj, name, args);
		},
		plans(obj, args, context) {
			const name = 'plans';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	groupSettingTemplate: {
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		values(obj, args, context) {
			const name = 'values';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	schemaExtension: {
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		targetTypes(obj, args, context) {
			const name = 'targetTypes';
			return graphqlResolve(obj, name, args);
		},
		properties(obj, args, context) {
			const name = 'properties';
			return graphqlResolve(obj, name, args);
		},
		status(obj, args, context) {
			const name = 'status';
			return graphqlResolve(obj, name, args);
		},
		owner(obj, args, context) {
			const name = 'owner';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	attachment: {
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		contentType(obj, args, context) {
			const name = 'contentType';
			return graphqlResolve(obj, name, args);
		},
		size(obj, args, context) {
			const name = 'size';
			return graphqlResolve(obj, name, args);
		},
		isInline(obj, args, context) {
			const name = 'isInline';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	singleValueLegacyExtendedProperty: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	multiValueLegacyExtendedProperty: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	fileAttachment: {
		contentId(obj, args, context) {
			const name = 'contentId';
			return graphqlResolve(obj, name, args);
		},
		contentLocation(obj, args, context) {
			const name = 'contentLocation';
			return graphqlResolve(obj, name, args);
		},
		contentBytes(obj, args, context) {
			const name = 'contentBytes';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		contentType(obj, args, context) {
			const name = 'contentType';
			return graphqlResolve(obj, name, args);
		},
		size(obj, args, context) {
			const name = 'size';
			return graphqlResolve(obj, name, args);
		},
		isInline(obj, args, context) {
			const name = 'isInline';
			return graphqlResolve(obj, name, args);
		}
	},
	itemAttachment: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		contentType(obj, args, context) {
			const name = 'contentType';
			return graphqlResolve(obj, name, args);
		},
		size(obj, args, context) {
			const name = 'size';
			return graphqlResolve(obj, name, args);
		},
		isInline(obj, args, context) {
			const name = 'isInline';
			return graphqlResolve(obj, name, args);
		}
	},
	eventMessage: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		receivedDateTime(obj, args, context) {
			const name = 'receivedDateTime';
			return graphqlResolve(obj, name, args);
		},
		sentDateTime(obj, args, context) {
			const name = 'sentDateTime';
			return graphqlResolve(obj, name, args);
		},
		hasAttachments(obj, args, context) {
			const name = 'hasAttachments';
			return graphqlResolve(obj, name, args);
		},
		internetMessageId(obj, args, context) {
			const name = 'internetMessageId';
			return graphqlResolve(obj, name, args);
		},
		subject(obj, args, context) {
			const name = 'subject';
			return graphqlResolve(obj, name, args);
		},
		body(obj, args, context) {
			const name = 'body';
			return graphqlResolve(obj, name, args);
		},
		bodyPreview(obj, args, context) {
			const name = 'bodyPreview';
			return graphqlResolve(obj, name, args);
		},
		importance(obj, args, context) {
			const name = 'importance';
			return graphqlResolve(obj, name, args);
		},
		parentFolderId(obj, args, context) {
			const name = 'parentFolderId';
			return graphqlResolve(obj, name, args);
		},
		sender(obj, args, context) {
			const name = 'sender';
			return graphqlResolve(obj, name, args);
		},
		from(obj, args, context) {
			const name = 'from';
			return graphqlResolve(obj, name, args);
		},
		toRecipients(obj, args, context) {
			const name = 'toRecipients';
			return graphqlResolve(obj, name, args);
		},
		ccRecipients(obj, args, context) {
			const name = 'ccRecipients';
			return graphqlResolve(obj, name, args);
		},
		bccRecipients(obj, args, context) {
			const name = 'bccRecipients';
			return graphqlResolve(obj, name, args);
		},
		replyTo(obj, args, context) {
			const name = 'replyTo';
			return graphqlResolve(obj, name, args);
		},
		conversationId(obj, args, context) {
			const name = 'conversationId';
			return graphqlResolve(obj, name, args);
		},
		uniqueBody(obj, args, context) {
			const name = 'uniqueBody';
			return graphqlResolve(obj, name, args);
		},
		isDeliveryReceiptRequested(obj, args, context) {
			const name = 'isDeliveryReceiptRequested';
			return graphqlResolve(obj, name, args);
		},
		isReadReceiptRequested(obj, args, context) {
			const name = 'isReadReceiptRequested';
			return graphqlResolve(obj, name, args);
		},
		isRead(obj, args, context) {
			const name = 'isRead';
			return graphqlResolve(obj, name, args);
		},
		isDraft(obj, args, context) {
			const name = 'isDraft';
			return graphqlResolve(obj, name, args);
		},
		webLink(obj, args, context) {
			const name = 'webLink';
			return graphqlResolve(obj, name, args);
		},
		inferenceClassification(obj, args, context) {
			const name = 'inferenceClassification';
			return graphqlResolve(obj, name, args);
		},
		attachments(obj, args, context) {
			const name = 'attachments';
			return graphqlResolve(obj, name, args);
		},
		extensions(obj, args, context) {
			const name = 'extensions';
			return graphqlResolve(obj, name, args);
		},
		singleValueExtendedProperties(obj, args, context) {
			const name = 'singleValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		multiValueExtendedProperties(obj, args, context) {
			const name = 'multiValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		categories(obj, args, context) {
			const name = 'categories';
			return graphqlResolve(obj, name, args);
		}
	},
	referenceAttachment: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		contentType(obj, args, context) {
			const name = 'contentType';
			return graphqlResolve(obj, name, args);
		},
		size(obj, args, context) {
			const name = 'size';
			return graphqlResolve(obj, name, args);
		},
		isInline(obj, args, context) {
			const name = 'isInline';
			return graphqlResolve(obj, name, args);
		}
	},
	openTypeExtension: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	post: {
		body(obj, args, context) {
			const name = 'body';
			return graphqlResolve(obj, name, args);
		},
		receivedDateTime(obj, args, context) {
			const name = 'receivedDateTime';
			return graphqlResolve(obj, name, args);
		},
		hasAttachments(obj, args, context) {
			const name = 'hasAttachments';
			return graphqlResolve(obj, name, args);
		},
		from(obj, args, context) {
			const name = 'from';
			return graphqlResolve(obj, name, args);
		},
		sender(obj, args, context) {
			const name = 'sender';
			return graphqlResolve(obj, name, args);
		},
		conversationThreadId(obj, args, context) {
			const name = 'conversationThreadId';
			return graphqlResolve(obj, name, args);
		},
		newParticipants(obj, args, context) {
			const name = 'newParticipants';
			return graphqlResolve(obj, name, args);
		},
		conversationId(obj, args, context) {
			const name = 'conversationId';
			return graphqlResolve(obj, name, args);
		},
		extensions(obj, args, context) {
			const name = 'extensions';
			return graphqlResolve(obj, name, args);
		},
		inReplyTo(obj, args, context) {
			const name = 'inReplyTo';
			return graphqlResolve(obj, name, args);
		},
		attachments(obj, args, context) {
			const name = 'attachments';
			return graphqlResolve(obj, name, args);
		},
		singleValueExtendedProperties(obj, args, context) {
			const name = 'singleValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		multiValueExtendedProperties(obj, args, context) {
			const name = 'multiValueExtendedProperties';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		categories(obj, args, context) {
			const name = 'categories';
			return graphqlResolve(obj, name, args);
		}
	},
	inferenceClassificationOverride: {
		classifyAs(obj, args, context) {
			const name = 'classifyAs';
			return graphqlResolve(obj, name, args);
		},
		senderEmailAddress(obj, args, context) {
			const name = 'senderEmailAddress';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	driveItem: {
		audio(obj, args, context) {
			const name = 'audio';
			return graphqlResolve(obj, name, args);
		},
		content(obj, args, context) {
			const name = 'content';
			return graphqlResolve(obj, name, args);
		},
		cTag(obj, args, context) {
			const name = 'cTag';
			return graphqlResolve(obj, name, args);
		},
		deleted(obj, args, context) {
			const name = 'deleted';
			return graphqlResolve(obj, name, args);
		},
		file(obj, args, context) {
			const name = 'file';
			return graphqlResolve(obj, name, args);
		},
		fileSystemInfo(obj, args, context) {
			const name = 'fileSystemInfo';
			return graphqlResolve(obj, name, args);
		},
		folder(obj, args, context) {
			const name = 'folder';
			return graphqlResolve(obj, name, args);
		},
		image(obj, args, context) {
			const name = 'image';
			return graphqlResolve(obj, name, args);
		},
		location(obj, args, context) {
			const name = 'location';
			return graphqlResolve(obj, name, args);
		},
		package(obj, args, context) {
			const name = 'package';
			return graphqlResolve(obj, name, args);
		},
		photo(obj, args, context) {
			const name = 'photo';
			return graphqlResolve(obj, name, args);
		},
		remoteItem(obj, args, context) {
			const name = 'remoteItem';
			return graphqlResolve(obj, name, args);
		},
		root(obj, args, context) {
			const name = 'root';
			return graphqlResolve(obj, name, args);
		},
		searchResult(obj, args, context) {
			const name = 'searchResult';
			return graphqlResolve(obj, name, args);
		},
		shared(obj, args, context) {
			const name = 'shared';
			return graphqlResolve(obj, name, args);
		},
		sharepointIds(obj, args, context) {
			const name = 'sharepointIds';
			return graphqlResolve(obj, name, args);
		},
		size(obj, args, context) {
			const name = 'size';
			return graphqlResolve(obj, name, args);
		},
		specialFolder(obj, args, context) {
			const name = 'specialFolder';
			return graphqlResolve(obj, name, args);
		},
		video(obj, args, context) {
			const name = 'video';
			return graphqlResolve(obj, name, args);
		},
		webDavUrl(obj, args, context) {
			const name = 'webDavUrl';
			return graphqlResolve(obj, name, args);
		},
		children(obj, args, context) {
			const name = 'children';
			return graphqlResolve(obj, name, args);
		},
		permissions(obj, args, context) {
			const name = 'permissions';
			return graphqlResolve(obj, name, args);
		},
		thumbnails(obj, args, context) {
			const name = 'thumbnails';
			return graphqlResolve(obj, name, args);
		},
		workbook(obj, args, context) {
			const name = 'workbook';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		eTag(obj, args, context) {
			const name = 'eTag';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		parentReference(obj, args, context) {
			const name = 'parentReference';
			return graphqlResolve(obj, name, args);
		},
		webUrl(obj, args, context) {
			const name = 'webUrl';
			return graphqlResolve(obj, name, args);
		},
		createdByUser(obj, args, context) {
			const name = 'createdByUser';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedByUser(obj, args, context) {
			const name = 'lastModifiedByUser';
			return graphqlResolve(obj, name, args);
		}
	},
	permission: {
		grantedTo(obj, args, context) {
			const name = 'grantedTo';
			return graphqlResolve(obj, name, args);
		},
		inheritedFrom(obj, args, context) {
			const name = 'inheritedFrom';
			return graphqlResolve(obj, name, args);
		},
		invitation(obj, args, context) {
			const name = 'invitation';
			return graphqlResolve(obj, name, args);
		},
		link(obj, args, context) {
			const name = 'link';
			return graphqlResolve(obj, name, args);
		},
		roles(obj, args, context) {
			const name = 'roles';
			return graphqlResolve(obj, name, args);
		},
		shareId(obj, args, context) {
			const name = 'shareId';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	thumbnailSet: {
		large(obj, args, context) {
			const name = 'large';
			return graphqlResolve(obj, name, args);
		},
		medium(obj, args, context) {
			const name = 'medium';
			return graphqlResolve(obj, name, args);
		},
		small(obj, args, context) {
			const name = 'small';
			return graphqlResolve(obj, name, args);
		},
		source(obj, args, context) {
			const name = 'source';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbook: {
		application(obj, args, context) {
			const name = 'application';
			return graphqlResolve(obj, name, args);
		},
		names(obj, args, context) {
			const name = 'names';
			return graphqlResolve(obj, name, args);
		},
		tables(obj, args, context) {
			const name = 'tables';
			return graphqlResolve(obj, name, args);
		},
		worksheets(obj, args, context) {
			const name = 'worksheets';
			return graphqlResolve(obj, name, args);
		},
		functions(obj, args, context) {
			const name = 'functions';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	sharedDriveItem: {
		driveItem(obj, args, context) {
			const name = 'driveItem';
			return graphqlResolve(obj, name, args);
		},
		items(obj, args, context) {
			const name = 'items';
			return graphqlResolve(obj, name, args);
		},
		root(obj, args, context) {
			const name = 'root';
			return graphqlResolve(obj, name, args);
		},
		site(obj, args, context) {
			const name = 'site';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		eTag(obj, args, context) {
			const name = 'eTag';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		parentReference(obj, args, context) {
			const name = 'parentReference';
			return graphqlResolve(obj, name, args);
		},
		webUrl(obj, args, context) {
			const name = 'webUrl';
			return graphqlResolve(obj, name, args);
		},
		createdByUser(obj, args, context) {
			const name = 'createdByUser';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedByUser(obj, args, context) {
			const name = 'lastModifiedByUser';
			return graphqlResolve(obj, name, args);
		}
	},
	sharePoint: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	list: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookApplication: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookNamedItem: {
		comment(obj, args, context) {
			const name = 'comment';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		scope(obj, args, context) {
			const name = 'scope';
			return graphqlResolve(obj, name, args);
		},
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		value(obj, args, context) {
			const name = 'value';
			return graphqlResolve(obj, name, args);
		},
		visible(obj, args, context) {
			const name = 'visible';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookTable: {
		highlightFirstColumn(obj, args, context) {
			const name = 'highlightFirstColumn';
			return graphqlResolve(obj, name, args);
		},
		highlightLastColumn(obj, args, context) {
			const name = 'highlightLastColumn';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		showBandedColumns(obj, args, context) {
			const name = 'showBandedColumns';
			return graphqlResolve(obj, name, args);
		},
		showBandedRows(obj, args, context) {
			const name = 'showBandedRows';
			return graphqlResolve(obj, name, args);
		},
		showFilterButton(obj, args, context) {
			const name = 'showFilterButton';
			return graphqlResolve(obj, name, args);
		},
		showHeaders(obj, args, context) {
			const name = 'showHeaders';
			return graphqlResolve(obj, name, args);
		},
		showTotals(obj, args, context) {
			const name = 'showTotals';
			return graphqlResolve(obj, name, args);
		},
		style(obj, args, context) {
			const name = 'style';
			return graphqlResolve(obj, name, args);
		},
		columns(obj, args, context) {
			const name = 'columns';
			return graphqlResolve(obj, name, args);
		},
		rows(obj, args, context) {
			const name = 'rows';
			return graphqlResolve(obj, name, args);
		},
		sort(obj, args, context) {
			const name = 'sort';
			return graphqlResolve(obj, name, args);
		},
		worksheet(obj, args, context) {
			const name = 'worksheet';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookWorksheet: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		position(obj, args, context) {
			const name = 'position';
			return graphqlResolve(obj, name, args);
		},
		visibility(obj, args, context) {
			const name = 'visibility';
			return graphqlResolve(obj, name, args);
		},
		charts(obj, args, context) {
			const name = 'charts';
			return graphqlResolve(obj, name, args);
		},
		names(obj, args, context) {
			const name = 'names';
			return graphqlResolve(obj, name, args);
		},
		pivotTables(obj, args, context) {
			const name = 'pivotTables';
			return graphqlResolve(obj, name, args);
		},
		protection(obj, args, context) {
			const name = 'protection';
			return graphqlResolve(obj, name, args);
		},
		tables(obj, args, context) {
			const name = 'tables';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookFunctions: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChart: {
		height(obj, args, context) {
			const name = 'height';
			return graphqlResolve(obj, name, args);
		},
		left(obj, args, context) {
			const name = 'left';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		top(obj, args, context) {
			const name = 'top';
			return graphqlResolve(obj, name, args);
		},
		width(obj, args, context) {
			const name = 'width';
			return graphqlResolve(obj, name, args);
		},
		axes(obj, args, context) {
			const name = 'axes';
			return graphqlResolve(obj, name, args);
		},
		dataLabels(obj, args, context) {
			const name = 'dataLabels';
			return graphqlResolve(obj, name, args);
		},
		format(obj, args, context) {
			const name = 'format';
			return graphqlResolve(obj, name, args);
		},
		legend(obj, args, context) {
			const name = 'legend';
			return graphqlResolve(obj, name, args);
		},
		series(obj, args, context) {
			const name = 'series';
			return graphqlResolve(obj, name, args);
		},
		title(obj, args, context) {
			const name = 'title';
			return graphqlResolve(obj, name, args);
		},
		worksheet(obj, args, context) {
			const name = 'worksheet';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartAxes: {
		categoryAxis(obj, args, context) {
			const name = 'categoryAxis';
			return graphqlResolve(obj, name, args);
		},
		seriesAxis(obj, args, context) {
			const name = 'seriesAxis';
			return graphqlResolve(obj, name, args);
		},
		valueAxis(obj, args, context) {
			const name = 'valueAxis';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartDataLabels: {
		position(obj, args, context) {
			const name = 'position';
			return graphqlResolve(obj, name, args);
		},
		separator(obj, args, context) {
			const name = 'separator';
			return graphqlResolve(obj, name, args);
		},
		showBubbleSize(obj, args, context) {
			const name = 'showBubbleSize';
			return graphqlResolve(obj, name, args);
		},
		showCategoryName(obj, args, context) {
			const name = 'showCategoryName';
			return graphqlResolve(obj, name, args);
		},
		showLegendKey(obj, args, context) {
			const name = 'showLegendKey';
			return graphqlResolve(obj, name, args);
		},
		showPercentage(obj, args, context) {
			const name = 'showPercentage';
			return graphqlResolve(obj, name, args);
		},
		showSeriesName(obj, args, context) {
			const name = 'showSeriesName';
			return graphqlResolve(obj, name, args);
		},
		showValue(obj, args, context) {
			const name = 'showValue';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartAreaFormat: {
		fill(obj, args, context) {
			const name = 'fill';
			return graphqlResolve(obj, name, args);
		},
		font(obj, args, context) {
			const name = 'font';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartLegend: {
		overlay(obj, args, context) {
			const name = 'overlay';
			return graphqlResolve(obj, name, args);
		},
		position(obj, args, context) {
			const name = 'position';
			return graphqlResolve(obj, name, args);
		},
		visible(obj, args, context) {
			const name = 'visible';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartSeries: {
		format(obj, args, context) {
			const name = 'format';
			return graphqlResolve(obj, name, args);
		},
		points(obj, args, context) {
			const name = 'points';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartTitle: {
		overlay(obj, args, context) {
			const name = 'overlay';
			return graphqlResolve(obj, name, args);
		},
		text(obj, args, context) {
			const name = 'text';
			return graphqlResolve(obj, name, args);
		},
		visible(obj, args, context) {
			const name = 'visible';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartFill: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartFont: {
		bold(obj, args, context) {
			const name = 'bold';
			return graphqlResolve(obj, name, args);
		},
		color(obj, args, context) {
			const name = 'color';
			return graphqlResolve(obj, name, args);
		},
		italic(obj, args, context) {
			const name = 'italic';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		size(obj, args, context) {
			const name = 'size';
			return graphqlResolve(obj, name, args);
		},
		underline(obj, args, context) {
			const name = 'underline';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartAxis: {
		majorUnit(obj, args, context) {
			const name = 'majorUnit';
			return graphqlResolve(obj, name, args);
		},
		maximum(obj, args, context) {
			const name = 'maximum';
			return graphqlResolve(obj, name, args);
		},
		minimum(obj, args, context) {
			const name = 'minimum';
			return graphqlResolve(obj, name, args);
		},
		minorUnit(obj, args, context) {
			const name = 'minorUnit';
			return graphqlResolve(obj, name, args);
		},
		format(obj, args, context) {
			const name = 'format';
			return graphqlResolve(obj, name, args);
		},
		majorGridlines(obj, args, context) {
			const name = 'majorGridlines';
			return graphqlResolve(obj, name, args);
		},
		minorGridlines(obj, args, context) {
			const name = 'minorGridlines';
			return graphqlResolve(obj, name, args);
		},
		title(obj, args, context) {
			const name = 'title';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartAxisFormat: {
		font(obj, args, context) {
			const name = 'font';
			return graphqlResolve(obj, name, args);
		},
		line(obj, args, context) {
			const name = 'line';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartGridlines: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartAxisTitle: {
		text(obj, args, context) {
			const name = 'text';
			return graphqlResolve(obj, name, args);
		},
		visible(obj, args, context) {
			const name = 'visible';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartLineFormat: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartAxisTitleFormat: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartDataLabelFormat: {
		fill(obj, args, context) {
			const name = 'fill';
			return graphqlResolve(obj, name, args);
		},
		font(obj, args, context) {
			const name = 'font';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartGridlinesFormat: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartLegendFormat: {
		fill(obj, args, context) {
			const name = 'fill';
			return graphqlResolve(obj, name, args);
		},
		font(obj, args, context) {
			const name = 'font';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartPoint: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartPointFormat: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartSeriesFormat: {
		fill(obj, args, context) {
			const name = 'fill';
			return graphqlResolve(obj, name, args);
		},
		line(obj, args, context) {
			const name = 'line';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookChartTitleFormat: {
		fill(obj, args, context) {
			const name = 'fill';
			return graphqlResolve(obj, name, args);
		},
		font(obj, args, context) {
			const name = 'font';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookFilter: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookFormatProtection: {
		formulaHidden(obj, args, context) {
			const name = 'formulaHidden';
			return graphqlResolve(obj, name, args);
		},
		locked(obj, args, context) {
			const name = 'locked';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookFunctionResult: {
		error(obj, args, context) {
			const name = 'error';
			return graphqlResolve(obj, name, args);
		},
		value(obj, args, context) {
			const name = 'value';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookPivotTable: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookRange: {
		address(obj, args, context) {
			const name = 'address';
			return graphqlResolve(obj, name, args);
		},
		addressLocal(obj, args, context) {
			const name = 'addressLocal';
			return graphqlResolve(obj, name, args);
		},
		cellCount(obj, args, context) {
			const name = 'cellCount';
			return graphqlResolve(obj, name, args);
		},
		columnCount(obj, args, context) {
			const name = 'columnCount';
			return graphqlResolve(obj, name, args);
		},
		columnHidden(obj, args, context) {
			const name = 'columnHidden';
			return graphqlResolve(obj, name, args);
		},
		columnIndex(obj, args, context) {
			const name = 'columnIndex';
			return graphqlResolve(obj, name, args);
		},
		formulas(obj, args, context) {
			const name = 'formulas';
			return graphqlResolve(obj, name, args);
		},
		formulasLocal(obj, args, context) {
			const name = 'formulasLocal';
			return graphqlResolve(obj, name, args);
		},
		formulasR1C1(obj, args, context) {
			const name = 'formulasR1C1';
			return graphqlResolve(obj, name, args);
		},
		hidden(obj, args, context) {
			const name = 'hidden';
			return graphqlResolve(obj, name, args);
		},
		numberFormat(obj, args, context) {
			const name = 'numberFormat';
			return graphqlResolve(obj, name, args);
		},
		rowCount(obj, args, context) {
			const name = 'rowCount';
			return graphqlResolve(obj, name, args);
		},
		rowHidden(obj, args, context) {
			const name = 'rowHidden';
			return graphqlResolve(obj, name, args);
		},
		rowIndex(obj, args, context) {
			const name = 'rowIndex';
			return graphqlResolve(obj, name, args);
		},
		text(obj, args, context) {
			const name = 'text';
			return graphqlResolve(obj, name, args);
		},
		valueTypes(obj, args, context) {
			const name = 'valueTypes';
			return graphqlResolve(obj, name, args);
		},
		values(obj, args, context) {
			const name = 'values';
			return graphqlResolve(obj, name, args);
		},
		format(obj, args, context) {
			const name = 'format';
			return graphqlResolve(obj, name, args);
		},
		sort(obj, args, context) {
			const name = 'sort';
			return graphqlResolve(obj, name, args);
		},
		worksheet(obj, args, context) {
			const name = 'worksheet';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookRangeFormat: {
		columnWidth(obj, args, context) {
			const name = 'columnWidth';
			return graphqlResolve(obj, name, args);
		},
		horizontalAlignment(obj, args, context) {
			const name = 'horizontalAlignment';
			return graphqlResolve(obj, name, args);
		},
		rowHeight(obj, args, context) {
			const name = 'rowHeight';
			return graphqlResolve(obj, name, args);
		},
		verticalAlignment(obj, args, context) {
			const name = 'verticalAlignment';
			return graphqlResolve(obj, name, args);
		},
		wrapText(obj, args, context) {
			const name = 'wrapText';
			return graphqlResolve(obj, name, args);
		},
		borders(obj, args, context) {
			const name = 'borders';
			return graphqlResolve(obj, name, args);
		},
		fill(obj, args, context) {
			const name = 'fill';
			return graphqlResolve(obj, name, args);
		},
		font(obj, args, context) {
			const name = 'font';
			return graphqlResolve(obj, name, args);
		},
		protection(obj, args, context) {
			const name = 'protection';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookRangeSort: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookRangeBorder: {
		color(obj, args, context) {
			const name = 'color';
			return graphqlResolve(obj, name, args);
		},
		sideIndex(obj, args, context) {
			const name = 'sideIndex';
			return graphqlResolve(obj, name, args);
		},
		style(obj, args, context) {
			const name = 'style';
			return graphqlResolve(obj, name, args);
		},
		weight(obj, args, context) {
			const name = 'weight';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookRangeFill: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookRangeFont: {
		bold(obj, args, context) {
			const name = 'bold';
			return graphqlResolve(obj, name, args);
		},
		color(obj, args, context) {
			const name = 'color';
			return graphqlResolve(obj, name, args);
		},
		italic(obj, args, context) {
			const name = 'italic';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		size(obj, args, context) {
			const name = 'size';
			return graphqlResolve(obj, name, args);
		},
		underline(obj, args, context) {
			const name = 'underline';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookRangeView: {
		cellAddresses(obj, args, context) {
			const name = 'cellAddresses';
			return graphqlResolve(obj, name, args);
		},
		columnCount(obj, args, context) {
			const name = 'columnCount';
			return graphqlResolve(obj, name, args);
		},
		formulas(obj, args, context) {
			const name = 'formulas';
			return graphqlResolve(obj, name, args);
		},
		formulasLocal(obj, args, context) {
			const name = 'formulasLocal';
			return graphqlResolve(obj, name, args);
		},
		formulasR1C1(obj, args, context) {
			const name = 'formulasR1C1';
			return graphqlResolve(obj, name, args);
		},
		index(obj, args, context) {
			const name = 'index';
			return graphqlResolve(obj, name, args);
		},
		numberFormat(obj, args, context) {
			const name = 'numberFormat';
			return graphqlResolve(obj, name, args);
		},
		rowCount(obj, args, context) {
			const name = 'rowCount';
			return graphqlResolve(obj, name, args);
		},
		text(obj, args, context) {
			const name = 'text';
			return graphqlResolve(obj, name, args);
		},
		valueTypes(obj, args, context) {
			const name = 'valueTypes';
			return graphqlResolve(obj, name, args);
		},
		values(obj, args, context) {
			const name = 'values';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookTableColumn: {
		index(obj, args, context) {
			const name = 'index';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		values(obj, args, context) {
			const name = 'values';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookTableRow: {
		index(obj, args, context) {
			const name = 'index';
			return graphqlResolve(obj, name, args);
		},
		values(obj, args, context) {
			const name = 'values';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookTableSort: {
		fields(obj, args, context) {
			const name = 'fields';
			return graphqlResolve(obj, name, args);
		},
		matchCase(obj, args, context) {
			const name = 'matchCase';
			return graphqlResolve(obj, name, args);
		},
		method(obj, args, context) {
			const name = 'method';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookWorksheetProtection: {
		options(obj, args, context) {
			const name = 'options';
			return graphqlResolve(obj, name, args);
		},
		protected(obj, args, context) {
			const name = 'protected';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	subscription: {
		resource(obj, args, context) {
			const name = 'resource';
			return graphqlResolve(obj, name, args);
		},
		changeType(obj, args, context) {
			const name = 'changeType';
			return graphqlResolve(obj, name, args);
		},
		clientState(obj, args, context) {
			const name = 'clientState';
			return graphqlResolve(obj, name, args);
		},
		notificationUrl(obj, args, context) {
			const name = 'notificationUrl';
			return graphqlResolve(obj, name, args);
		},
		expirationDateTime(obj, args, context) {
			const name = 'expirationDateTime';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	invitation: {
		invitedUserDisplayName(obj, args, context) {
			const name = 'invitedUserDisplayName';
			return graphqlResolve(obj, name, args);
		},
		invitedUserType(obj, args, context) {
			const name = 'invitedUserType';
			return graphqlResolve(obj, name, args);
		},
		invitedUserEmailAddress(obj, args, context) {
			const name = 'invitedUserEmailAddress';
			return graphqlResolve(obj, name, args);
		},
		invitedUserMessageInfo(obj, args, context) {
			const name = 'invitedUserMessageInfo';
			return graphqlResolve(obj, name, args);
		},
		sendInvitationMessage(obj, args, context) {
			const name = 'sendInvitationMessage';
			return graphqlResolve(obj, name, args);
		},
		inviteRedirectUrl(obj, args, context) {
			const name = 'inviteRedirectUrl';
			return graphqlResolve(obj, name, args);
		},
		inviteRedeemUrl(obj, args, context) {
			const name = 'inviteRedeemUrl';
			return graphqlResolve(obj, name, args);
		},
		status(obj, args, context) {
			const name = 'status';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerTask: {
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		planId(obj, args, context) {
			const name = 'planId';
			return graphqlResolve(obj, name, args);
		},
		bucketId(obj, args, context) {
			const name = 'bucketId';
			return graphqlResolve(obj, name, args);
		},
		title(obj, args, context) {
			const name = 'title';
			return graphqlResolve(obj, name, args);
		},
		orderHint(obj, args, context) {
			const name = 'orderHint';
			return graphqlResolve(obj, name, args);
		},
		assigneePriority(obj, args, context) {
			const name = 'assigneePriority';
			return graphqlResolve(obj, name, args);
		},
		percentComplete(obj, args, context) {
			const name = 'percentComplete';
			return graphqlResolve(obj, name, args);
		},
		startDateTime(obj, args, context) {
			const name = 'startDateTime';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		dueDateTime(obj, args, context) {
			const name = 'dueDateTime';
			return graphqlResolve(obj, name, args);
		},
		hasDescription(obj, args, context) {
			const name = 'hasDescription';
			return graphqlResolve(obj, name, args);
		},
		previewType(obj, args, context) {
			const name = 'previewType';
			return graphqlResolve(obj, name, args);
		},
		completedDateTime(obj, args, context) {
			const name = 'completedDateTime';
			return graphqlResolve(obj, name, args);
		},
		completedBy(obj, args, context) {
			const name = 'completedBy';
			return graphqlResolve(obj, name, args);
		},
		referenceCount(obj, args, context) {
			const name = 'referenceCount';
			return graphqlResolve(obj, name, args);
		},
		checklistItemCount(obj, args, context) {
			const name = 'checklistItemCount';
			return graphqlResolve(obj, name, args);
		},
		activeChecklistItemCount(obj, args, context) {
			const name = 'activeChecklistItemCount';
			return graphqlResolve(obj, name, args);
		},
		appliedCategories(obj, args, context) {
			const name = 'appliedCategories';
			return graphqlResolve(obj, name, args);
		},
		assignments(obj, args, context) {
			const name = 'assignments';
			return graphqlResolve(obj, name, args);
		},
		conversationThreadId(obj, args, context) {
			const name = 'conversationThreadId';
			return graphqlResolve(obj, name, args);
		},
		details(obj, args, context) {
			const name = 'details';
			return graphqlResolve(obj, name, args);
		},
		assignedToTaskBoardFormat(obj, args, context) {
			const name = 'assignedToTaskBoardFormat';
			return graphqlResolve(obj, name, args);
		},
		progressTaskBoardFormat(obj, args, context) {
			const name = 'progressTaskBoardFormat';
			return graphqlResolve(obj, name, args);
		},
		bucketTaskBoardFormat(obj, args, context) {
			const name = 'bucketTaskBoardFormat';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerPlan: {
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		owner(obj, args, context) {
			const name = 'owner';
			return graphqlResolve(obj, name, args);
		},
		title(obj, args, context) {
			const name = 'title';
			return graphqlResolve(obj, name, args);
		},
		tasks(obj, args, context) {
			const name = 'tasks';
			return graphqlResolve(obj, name, args);
		},
		buckets(obj, args, context) {
			const name = 'buckets';
			return graphqlResolve(obj, name, args);
		},
		details(obj, args, context) {
			const name = 'details';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	planner: {
		tasks(obj, args, context) {
			const name = 'tasks';
			return graphqlResolve(obj, name, args);
		},
		plans(obj, args, context) {
			const name = 'plans';
			return graphqlResolve(obj, name, args);
		},
		buckets(obj, args, context) {
			const name = 'buckets';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerBucket: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		planId(obj, args, context) {
			const name = 'planId';
			return graphqlResolve(obj, name, args);
		},
		orderHint(obj, args, context) {
			const name = 'orderHint';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerTaskDetails: {
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		previewType(obj, args, context) {
			const name = 'previewType';
			return graphqlResolve(obj, name, args);
		},
		references(obj, args, context) {
			const name = 'references';
			return graphqlResolve(obj, name, args);
		},
		checklist(obj, args, context) {
			const name = 'checklist';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerAssignedToTaskBoardTaskFormat: {
		unassignedOrderHint(obj, args, context) {
			const name = 'unassignedOrderHint';
			return graphqlResolve(obj, name, args);
		},
		orderHintsByAssignee(obj, args, context) {
			const name = 'orderHintsByAssignee';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerProgressTaskBoardTaskFormat: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerBucketTaskBoardTaskFormat: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerPlanDetails: {
		sharedWith(obj, args, context) {
			const name = 'sharedWith';
			return graphqlResolve(obj, name, args);
		},
		categoryDescriptions(obj, args, context) {
			const name = 'categoryDescriptions';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	onenoteEntityBaseModel: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	onenoteEntitySchemaObjectModel: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	onenoteEntityHierarchyModel: {
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	notebook: {
		isDefault(obj, args, context) {
			const name = 'isDefault';
			return graphqlResolve(obj, name, args);
		},
		userRole(obj, args, context) {
			const name = 'userRole';
			return graphqlResolve(obj, name, args);
		},
		isShared(obj, args, context) {
			const name = 'isShared';
			return graphqlResolve(obj, name, args);
		},
		sectionsUrl(obj, args, context) {
			const name = 'sectionsUrl';
			return graphqlResolve(obj, name, args);
		},
		sectionGroupsUrl(obj, args, context) {
			const name = 'sectionGroupsUrl';
			return graphqlResolve(obj, name, args);
		},
		links(obj, args, context) {
			const name = 'links';
			return graphqlResolve(obj, name, args);
		},
		sections(obj, args, context) {
			const name = 'sections';
			return graphqlResolve(obj, name, args);
		},
		sectionGroups(obj, args, context) {
			const name = 'sectionGroups';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	onenoteSection: {
		isDefault(obj, args, context) {
			const name = 'isDefault';
			return graphqlResolve(obj, name, args);
		},
		links(obj, args, context) {
			const name = 'links';
			return graphqlResolve(obj, name, args);
		},
		pagesUrl(obj, args, context) {
			const name = 'pagesUrl';
			return graphqlResolve(obj, name, args);
		},
		parentNotebook(obj, args, context) {
			const name = 'parentNotebook';
			return graphqlResolve(obj, name, args);
		},
		parentSectionGroup(obj, args, context) {
			const name = 'parentSectionGroup';
			return graphqlResolve(obj, name, args);
		},
		pages(obj, args, context) {
			const name = 'pages';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	sectionGroup: {
		sectionsUrl(obj, args, context) {
			const name = 'sectionsUrl';
			return graphqlResolve(obj, name, args);
		},
		sectionGroupsUrl(obj, args, context) {
			const name = 'sectionGroupsUrl';
			return graphqlResolve(obj, name, args);
		},
		parentNotebook(obj, args, context) {
			const name = 'parentNotebook';
			return graphqlResolve(obj, name, args);
		},
		parentSectionGroup(obj, args, context) {
			const name = 'parentSectionGroup';
			return graphqlResolve(obj, name, args);
		},
		sections(obj, args, context) {
			const name = 'sections';
			return graphqlResolve(obj, name, args);
		},
		sectionGroups(obj, args, context) {
			const name = 'sectionGroups';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	onenotePage: {
		title(obj, args, context) {
			const name = 'title';
			return graphqlResolve(obj, name, args);
		},
		createdByAppId(obj, args, context) {
			const name = 'createdByAppId';
			return graphqlResolve(obj, name, args);
		},
		links(obj, args, context) {
			const name = 'links';
			return graphqlResolve(obj, name, args);
		},
		contentUrl(obj, args, context) {
			const name = 'contentUrl';
			return graphqlResolve(obj, name, args);
		},
		content(obj, args, context) {
			const name = 'content';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		level(obj, args, context) {
			const name = 'level';
			return graphqlResolve(obj, name, args);
		},
		order(obj, args, context) {
			const name = 'order';
			return graphqlResolve(obj, name, args);
		},
		userTags(obj, args, context) {
			const name = 'userTags';
			return graphqlResolve(obj, name, args);
		},
		parentSection(obj, args, context) {
			const name = 'parentSection';
			return graphqlResolve(obj, name, args);
		},
		parentNotebook(obj, args, context) {
			const name = 'parentNotebook';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	onenoteResource: {
		content(obj, args, context) {
			const name = 'content';
			return graphqlResolve(obj, name, args);
		},
		contentUrl(obj, args, context) {
			const name = 'contentUrl';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	operation: {
		status(obj, args, context) {
			const name = 'status';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastActionDateTime(obj, args, context) {
			const name = 'lastActionDateTime';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	onenoteOperation: {
		resourceLocation(obj, args, context) {
			const name = 'resourceLocation';
			return graphqlResolve(obj, name, args);
		},
		resourceId(obj, args, context) {
			const name = 'resourceId';
			return graphqlResolve(obj, name, args);
		},
		error(obj, args, context) {
			const name = 'error';
			return graphqlResolve(obj, name, args);
		},
		percentComplete(obj, args, context) {
			const name = 'percentComplete';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		status(obj, args, context) {
			const name = 'status';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastActionDateTime(obj, args, context) {
			const name = 'lastActionDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	alternativeSecurityId: {
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		identityProvider(obj, args, context) {
			const name = 'identityProvider';
			return graphqlResolve(obj, name, args);
		},
		key(obj, args, context) {
			const name = 'key';
			return graphqlResolve(obj, name, args);
		}
	},
	domainState: {
		status(obj, args, context) {
			const name = 'status';
			return graphqlResolve(obj, name, args);
		},
		operation(obj, args, context) {
			const name = 'operation';
			return graphqlResolve(obj, name, args);
		},
		lastActionDateTime(obj, args, context) {
			const name = 'lastActionDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	servicePlanInfo: {
		servicePlanId(obj, args, context) {
			const name = 'servicePlanId';
			return graphqlResolve(obj, name, args);
		},
		servicePlanName(obj, args, context) {
			const name = 'servicePlanName';
			return graphqlResolve(obj, name, args);
		},
		provisioningStatus(obj, args, context) {
			const name = 'provisioningStatus';
			return graphqlResolve(obj, name, args);
		},
		appliesTo(obj, args, context) {
			const name = 'appliesTo';
			return graphqlResolve(obj, name, args);
		}
	},
	licenseUnitsDetail: {
		enabled(obj, args, context) {
			const name = 'enabled';
			return graphqlResolve(obj, name, args);
		},
		suspended(obj, args, context) {
			const name = 'suspended';
			return graphqlResolve(obj, name, args);
		},
		warning(obj, args, context) {
			const name = 'warning';
			return graphqlResolve(obj, name, args);
		}
	},
	assignedPlan: {
		assignedDateTime(obj, args, context) {
			const name = 'assignedDateTime';
			return graphqlResolve(obj, name, args);
		},
		capabilityStatus(obj, args, context) {
			const name = 'capabilityStatus';
			return graphqlResolve(obj, name, args);
		},
		service(obj, args, context) {
			const name = 'service';
			return graphqlResolve(obj, name, args);
		},
		servicePlanId(obj, args, context) {
			const name = 'servicePlanId';
			return graphqlResolve(obj, name, args);
		}
	},
	provisionedPlan: {
		capabilityStatus(obj, args, context) {
			const name = 'capabilityStatus';
			return graphqlResolve(obj, name, args);
		},
		provisioningStatus(obj, args, context) {
			const name = 'provisioningStatus';
			return graphqlResolve(obj, name, args);
		},
		service(obj, args, context) {
			const name = 'service';
			return graphqlResolve(obj, name, args);
		}
	},
	verifiedDomain: {
		capabilities(obj, args, context) {
			const name = 'capabilities';
			return graphqlResolve(obj, name, args);
		},
		isDefault(obj, args, context) {
			const name = 'isDefault';
			return graphqlResolve(obj, name, args);
		},
		isInitial(obj, args, context) {
			const name = 'isInitial';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		}
	},
	assignedLicense: {
		disabledPlans(obj, args, context) {
			const name = 'disabledPlans';
			return graphqlResolve(obj, name, args);
		},
		skuId(obj, args, context) {
			const name = 'skuId';
			return graphqlResolve(obj, name, args);
		}
	},
	passwordProfile: {
		password(obj, args, context) {
			const name = 'password';
			return graphqlResolve(obj, name, args);
		},
		forceChangePasswordNextSignIn(obj, args, context) {
			const name = 'forceChangePasswordNextSignIn';
			return graphqlResolve(obj, name, args);
		}
	},
	mailboxSettings: {
		automaticRepliesSetting(obj, args, context) {
			const name = 'automaticRepliesSetting';
			return graphqlResolve(obj, name, args);
		},
		archiveFolder(obj, args, context) {
			const name = 'archiveFolder';
			return graphqlResolve(obj, name, args);
		},
		timeZone(obj, args, context) {
			const name = 'timeZone';
			return graphqlResolve(obj, name, args);
		},
		language(obj, args, context) {
			const name = 'language';
			return graphqlResolve(obj, name, args);
		}
	},
	automaticRepliesSetting: {
		status(obj, args, context) {
			const name = 'status';
			return graphqlResolve(obj, name, args);
		},
		externalAudience(obj, args, context) {
			const name = 'externalAudience';
			return graphqlResolve(obj, name, args);
		},
		scheduledStartDateTime(obj, args, context) {
			const name = 'scheduledStartDateTime';
			return graphqlResolve(obj, name, args);
		},
		scheduledEndDateTime(obj, args, context) {
			const name = 'scheduledEndDateTime';
			return graphqlResolve(obj, name, args);
		},
		internalReplyMessage(obj, args, context) {
			const name = 'internalReplyMessage';
			return graphqlResolve(obj, name, args);
		},
		externalReplyMessage(obj, args, context) {
			const name = 'externalReplyMessage';
			return graphqlResolve(obj, name, args);
		}
	},
	dateTimeTimeZone: {
		dateTime(obj, args, context) {
			const name = 'dateTime';
			return graphqlResolve(obj, name, args);
		},
		timeZone(obj, args, context) {
			const name = 'timeZone';
			return graphqlResolve(obj, name, args);
		}
	},
	localeInfo: {
		locale(obj, args, context) {
			const name = 'locale';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		}
	},
	settingValue: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		value(obj, args, context) {
			const name = 'value';
			return graphqlResolve(obj, name, args);
		}
	},
	settingTemplateValue: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		defaultValue(obj, args, context) {
			const name = 'defaultValue';
			return graphqlResolve(obj, name, args);
		},
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		}
	},
	ComplexExtensionValue: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	extensionSchemaProperty: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		}
	},
	recipient: {
		emailAddress(obj, args, context) {
			const name = 'emailAddress';
			return graphqlResolve(obj, name, args);
		}
	},
	emailAddress: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		address(obj, args, context) {
			const name = 'address';
			return graphqlResolve(obj, name, args);
		}
	},
	attendeeBase: {
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		emailAddress(obj, args, context) {
			const name = 'emailAddress';
			return graphqlResolve(obj, name, args);
		}
	},
	meetingTimeSuggestionsResult: {
		meetingTimeSuggestions(obj, args, context) {
			const name = 'meetingTimeSuggestions';
			return graphqlResolve(obj, name, args);
		},
		emptySuggestionsReason(obj, args, context) {
			const name = 'emptySuggestionsReason';
			return graphqlResolve(obj, name, args);
		}
	},
	meetingTimeSuggestion: {
		meetingTimeSlot(obj, args, context) {
			const name = 'meetingTimeSlot';
			return graphqlResolve(obj, name, args);
		},
		confidence(obj, args, context) {
			const name = 'confidence';
			return graphqlResolve(obj, name, args);
		},
		organizerAvailability(obj, args, context) {
			const name = 'organizerAvailability';
			return graphqlResolve(obj, name, args);
		},
		attendeeAvailability(obj, args, context) {
			const name = 'attendeeAvailability';
			return graphqlResolve(obj, name, args);
		},
		locations(obj, args, context) {
			const name = 'locations';
			return graphqlResolve(obj, name, args);
		},
		suggestionReason(obj, args, context) {
			const name = 'suggestionReason';
			return graphqlResolve(obj, name, args);
		}
	},
	timeSlot: {
		start(obj, args, context) {
			const name = 'start';
			return graphqlResolve(obj, name, args);
		},
		end(obj, args, context) {
			const name = 'end';
			return graphqlResolve(obj, name, args);
		}
	},
	attendeeAvailability: {
		attendee(obj, args, context) {
			const name = 'attendee';
			return graphqlResolve(obj, name, args);
		},
		availability(obj, args, context) {
			const name = 'availability';
			return graphqlResolve(obj, name, args);
		}
	},
	location: {
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		locationEmailAddress(obj, args, context) {
			const name = 'locationEmailAddress';
			return graphqlResolve(obj, name, args);
		},
		address(obj, args, context) {
			const name = 'address';
			return graphqlResolve(obj, name, args);
		}
	},
	physicalAddress: {
		street(obj, args, context) {
			const name = 'street';
			return graphqlResolve(obj, name, args);
		},
		city(obj, args, context) {
			const name = 'city';
			return graphqlResolve(obj, name, args);
		},
		state(obj, args, context) {
			const name = 'state';
			return graphqlResolve(obj, name, args);
		},
		countryOrRegion(obj, args, context) {
			const name = 'countryOrRegion';
			return graphqlResolve(obj, name, args);
		},
		postalCode(obj, args, context) {
			const name = 'postalCode';
			return graphqlResolve(obj, name, args);
		}
	},
	locationConstraint: {
		isRequired(obj, args, context) {
			const name = 'isRequired';
			return graphqlResolve(obj, name, args);
		},
		suggestLocation(obj, args, context) {
			const name = 'suggestLocation';
			return graphqlResolve(obj, name, args);
		},
		locations(obj, args, context) {
			const name = 'locations';
			return graphqlResolve(obj, name, args);
		}
	},
	locationConstraintItem: {
		resolveAvailability(obj, args, context) {
			const name = 'resolveAvailability';
			return graphqlResolve(obj, name, args);
		},
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		locationEmailAddress(obj, args, context) {
			const name = 'locationEmailAddress';
			return graphqlResolve(obj, name, args);
		},
		address(obj, args, context) {
			const name = 'address';
			return graphqlResolve(obj, name, args);
		}
	},
	timeConstraint: {
		activityDomain(obj, args, context) {
			const name = 'activityDomain';
			return graphqlResolve(obj, name, args);
		},
		timeslots(obj, args, context) {
			const name = 'timeslots';
			return graphqlResolve(obj, name, args);
		}
	},
	reminder: {
		eventId(obj, args, context) {
			const name = 'eventId';
			return graphqlResolve(obj, name, args);
		},
		eventStartTime(obj, args, context) {
			const name = 'eventStartTime';
			return graphqlResolve(obj, name, args);
		},
		eventEndTime(obj, args, context) {
			const name = 'eventEndTime';
			return graphqlResolve(obj, name, args);
		},
		changeKey(obj, args, context) {
			const name = 'changeKey';
			return graphqlResolve(obj, name, args);
		},
		eventSubject(obj, args, context) {
			const name = 'eventSubject';
			return graphqlResolve(obj, name, args);
		},
		eventLocation(obj, args, context) {
			const name = 'eventLocation';
			return graphqlResolve(obj, name, args);
		},
		eventWebLink(obj, args, context) {
			const name = 'eventWebLink';
			return graphqlResolve(obj, name, args);
		},
		reminderFireTime(obj, args, context) {
			const name = 'reminderFireTime';
			return graphqlResolve(obj, name, args);
		}
	},
	itemBody: {
		contentType(obj, args, context) {
			const name = 'contentType';
			return graphqlResolve(obj, name, args);
		},
		content(obj, args, context) {
			const name = 'content';
			return graphqlResolve(obj, name, args);
		}
	},
	responseStatus: {
		response(obj, args, context) {
			const name = 'response';
			return graphqlResolve(obj, name, args);
		},
		time(obj, args, context) {
			const name = 'time';
			return graphqlResolve(obj, name, args);
		}
	},
	patternedRecurrence: {
		pattern(obj, args, context) {
			const name = 'pattern';
			return graphqlResolve(obj, name, args);
		},
		range(obj, args, context) {
			const name = 'range';
			return graphqlResolve(obj, name, args);
		}
	},
	recurrencePattern: {
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		interval(obj, args, context) {
			const name = 'interval';
			return graphqlResolve(obj, name, args);
		},
		month(obj, args, context) {
			const name = 'month';
			return graphqlResolve(obj, name, args);
		},
		dayOfMonth(obj, args, context) {
			const name = 'dayOfMonth';
			return graphqlResolve(obj, name, args);
		},
		daysOfWeek(obj, args, context) {
			const name = 'daysOfWeek';
			return graphqlResolve(obj, name, args);
		},
		firstDayOfWeek(obj, args, context) {
			const name = 'firstDayOfWeek';
			return graphqlResolve(obj, name, args);
		},
		index(obj, args, context) {
			const name = 'index';
			return graphqlResolve(obj, name, args);
		}
	},
	recurrenceRange: {
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		startDate(obj, args, context) {
			const name = 'startDate';
			return graphqlResolve(obj, name, args);
		},
		endDate(obj, args, context) {
			const name = 'endDate';
			return graphqlResolve(obj, name, args);
		},
		recurrenceTimeZone(obj, args, context) {
			const name = 'recurrenceTimeZone';
			return graphqlResolve(obj, name, args);
		},
		numberOfOccurrences(obj, args, context) {
			const name = 'numberOfOccurrences';
			return graphqlResolve(obj, name, args);
		}
	},
	attendee: {
		status(obj, args, context) {
			const name = 'status';
			return graphqlResolve(obj, name, args);
		},
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		emailAddress(obj, args, context) {
			const name = 'emailAddress';
			return graphqlResolve(obj, name, args);
		}
	},
	identitySet: {
		application(obj, args, context) {
			const name = 'application';
			return graphqlResolve(obj, name, args);
		},
		device(obj, args, context) {
			const name = 'device';
			return graphqlResolve(obj, name, args);
		},
		user(obj, args, context) {
			const name = 'user';
			return graphqlResolve(obj, name, args);
		}
	},
	identity: {
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		}
	},
	itemReference: {
		driveId(obj, args, context) {
			const name = 'driveId';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		path(obj, args, context) {
			const name = 'path';
			return graphqlResolve(obj, name, args);
		},
		shareId(obj, args, context) {
			const name = 'shareId';
			return graphqlResolve(obj, name, args);
		},
		sharepointIds(obj, args, context) {
			const name = 'sharepointIds';
			return graphqlResolve(obj, name, args);
		}
	},
	sharepointIds: {
		listId(obj, args, context) {
			const name = 'listId';
			return graphqlResolve(obj, name, args);
		},
		listItemId(obj, args, context) {
			const name = 'listItemId';
			return graphqlResolve(obj, name, args);
		},
		listItemUniqueId(obj, args, context) {
			const name = 'listItemUniqueId';
			return graphqlResolve(obj, name, args);
		},
		siteId(obj, args, context) {
			const name = 'siteId';
			return graphqlResolve(obj, name, args);
		},
		siteUrl(obj, args, context) {
			const name = 'siteUrl';
			return graphqlResolve(obj, name, args);
		},
		webId(obj, args, context) {
			const name = 'webId';
			return graphqlResolve(obj, name, args);
		}
	},
	quota: {
		deleted(obj, args, context) {
			const name = 'deleted';
			return graphqlResolve(obj, name, args);
		},
		remaining(obj, args, context) {
			const name = 'remaining';
			return graphqlResolve(obj, name, args);
		},
		state(obj, args, context) {
			const name = 'state';
			return graphqlResolve(obj, name, args);
		},
		total(obj, args, context) {
			const name = 'total';
			return graphqlResolve(obj, name, args);
		},
		used(obj, args, context) {
			const name = 'used';
			return graphqlResolve(obj, name, args);
		}
	},
	audio: {
		album(obj, args, context) {
			const name = 'album';
			return graphqlResolve(obj, name, args);
		},
		albumArtist(obj, args, context) {
			const name = 'albumArtist';
			return graphqlResolve(obj, name, args);
		},
		artist(obj, args, context) {
			const name = 'artist';
			return graphqlResolve(obj, name, args);
		},
		bitrate(obj, args, context) {
			const name = 'bitrate';
			return graphqlResolve(obj, name, args);
		},
		composers(obj, args, context) {
			const name = 'composers';
			return graphqlResolve(obj, name, args);
		},
		copyright(obj, args, context) {
			const name = 'copyright';
			return graphqlResolve(obj, name, args);
		},
		disc(obj, args, context) {
			const name = 'disc';
			return graphqlResolve(obj, name, args);
		},
		discCount(obj, args, context) {
			const name = 'discCount';
			return graphqlResolve(obj, name, args);
		},
		duration(obj, args, context) {
			const name = 'duration';
			return graphqlResolve(obj, name, args);
		},
		genre(obj, args, context) {
			const name = 'genre';
			return graphqlResolve(obj, name, args);
		},
		hasDrm(obj, args, context) {
			const name = 'hasDrm';
			return graphqlResolve(obj, name, args);
		},
		isVariableBitrate(obj, args, context) {
			const name = 'isVariableBitrate';
			return graphqlResolve(obj, name, args);
		},
		title(obj, args, context) {
			const name = 'title';
			return graphqlResolve(obj, name, args);
		},
		track(obj, args, context) {
			const name = 'track';
			return graphqlResolve(obj, name, args);
		},
		trackCount(obj, args, context) {
			const name = 'trackCount';
			return graphqlResolve(obj, name, args);
		},
		year(obj, args, context) {
			const name = 'year';
			return graphqlResolve(obj, name, args);
		}
	},
	deleted: {
		state(obj, args, context) {
			const name = 'state';
			return graphqlResolve(obj, name, args);
		}
	},
	file: {
		hashes(obj, args, context) {
			const name = 'hashes';
			return graphqlResolve(obj, name, args);
		},
		mimeType(obj, args, context) {
			const name = 'mimeType';
			return graphqlResolve(obj, name, args);
		},
		processingMetadata(obj, args, context) {
			const name = 'processingMetadata';
			return graphqlResolve(obj, name, args);
		}
	},
	hashes: {
		crc32Hash(obj, args, context) {
			const name = 'crc32Hash';
			return graphqlResolve(obj, name, args);
		},
		quickXorHash(obj, args, context) {
			const name = 'quickXorHash';
			return graphqlResolve(obj, name, args);
		},
		sha1Hash(obj, args, context) {
			const name = 'sha1Hash';
			return graphqlResolve(obj, name, args);
		}
	},
	fileSystemInfo: {
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastAccessedDateTime(obj, args, context) {
			const name = 'lastAccessedDateTime';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	folder: {
		childCount(obj, args, context) {
			const name = 'childCount';
			return graphqlResolve(obj, name, args);
		}
	},
	image: {
		height(obj, args, context) {
			const name = 'height';
			return graphqlResolve(obj, name, args);
		},
		width(obj, args, context) {
			const name = 'width';
			return graphqlResolve(obj, name, args);
		}
	},
	geoCoordinates: {
		altitude(obj, args, context) {
			const name = 'altitude';
			return graphqlResolve(obj, name, args);
		},
		latitude(obj, args, context) {
			const name = 'latitude';
			return graphqlResolve(obj, name, args);
		},
		longitude(obj, args, context) {
			const name = 'longitude';
			return graphqlResolve(obj, name, args);
		}
	},
	package: {
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		}
	},
	photo: {
		cameraMake(obj, args, context) {
			const name = 'cameraMake';
			return graphqlResolve(obj, name, args);
		},
		cameraModel(obj, args, context) {
			const name = 'cameraModel';
			return graphqlResolve(obj, name, args);
		},
		exposureDenominator(obj, args, context) {
			const name = 'exposureDenominator';
			return graphqlResolve(obj, name, args);
		},
		exposureNumerator(obj, args, context) {
			const name = 'exposureNumerator';
			return graphqlResolve(obj, name, args);
		},
		fNumber(obj, args, context) {
			const name = 'fNumber';
			return graphqlResolve(obj, name, args);
		},
		focalLength(obj, args, context) {
			const name = 'focalLength';
			return graphqlResolve(obj, name, args);
		},
		iso(obj, args, context) {
			const name = 'iso';
			return graphqlResolve(obj, name, args);
		},
		takenDateTime(obj, args, context) {
			const name = 'takenDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	remoteItem: {
		createdBy(obj, args, context) {
			const name = 'createdBy';
			return graphqlResolve(obj, name, args);
		},
		createdDateTime(obj, args, context) {
			const name = 'createdDateTime';
			return graphqlResolve(obj, name, args);
		},
		file(obj, args, context) {
			const name = 'file';
			return graphqlResolve(obj, name, args);
		},
		fileSystemInfo(obj, args, context) {
			const name = 'fileSystemInfo';
			return graphqlResolve(obj, name, args);
		},
		folder(obj, args, context) {
			const name = 'folder';
			return graphqlResolve(obj, name, args);
		},
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		},
		package(obj, args, context) {
			const name = 'package';
			return graphqlResolve(obj, name, args);
		},
		parentReference(obj, args, context) {
			const name = 'parentReference';
			return graphqlResolve(obj, name, args);
		},
		shared(obj, args, context) {
			const name = 'shared';
			return graphqlResolve(obj, name, args);
		},
		sharepointIds(obj, args, context) {
			const name = 'sharepointIds';
			return graphqlResolve(obj, name, args);
		},
		size(obj, args, context) {
			const name = 'size';
			return graphqlResolve(obj, name, args);
		},
		specialFolder(obj, args, context) {
			const name = 'specialFolder';
			return graphqlResolve(obj, name, args);
		},
		webDavUrl(obj, args, context) {
			const name = 'webDavUrl';
			return graphqlResolve(obj, name, args);
		},
		webUrl(obj, args, context) {
			const name = 'webUrl';
			return graphqlResolve(obj, name, args);
		}
	},
	shared: {
		owner(obj, args, context) {
			const name = 'owner';
			return graphqlResolve(obj, name, args);
		},
		scope(obj, args, context) {
			const name = 'scope';
			return graphqlResolve(obj, name, args);
		},
		sharedBy(obj, args, context) {
			const name = 'sharedBy';
			return graphqlResolve(obj, name, args);
		},
		sharedDateTime(obj, args, context) {
			const name = 'sharedDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	specialFolder: {
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		}
	},
	root: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	searchResult: {
		onClickTelemetryUrl(obj, args, context) {
			const name = 'onClickTelemetryUrl';
			return graphqlResolve(obj, name, args);
		}
	},
	video: {
		bitrate(obj, args, context) {
			const name = 'bitrate';
			return graphqlResolve(obj, name, args);
		},
		duration(obj, args, context) {
			const name = 'duration';
			return graphqlResolve(obj, name, args);
		},
		height(obj, args, context) {
			const name = 'height';
			return graphqlResolve(obj, name, args);
		},
		width(obj, args, context) {
			const name = 'width';
			return graphqlResolve(obj, name, args);
		}
	},
	sharingInvitation: {
		email(obj, args, context) {
			const name = 'email';
			return graphqlResolve(obj, name, args);
		},
		invitedBy(obj, args, context) {
			const name = 'invitedBy';
			return graphqlResolve(obj, name, args);
		},
		redeemedBy(obj, args, context) {
			const name = 'redeemedBy';
			return graphqlResolve(obj, name, args);
		},
		signInRequired(obj, args, context) {
			const name = 'signInRequired';
			return graphqlResolve(obj, name, args);
		}
	},
	sharingLink: {
		application(obj, args, context) {
			const name = 'application';
			return graphqlResolve(obj, name, args);
		},
		scope(obj, args, context) {
			const name = 'scope';
			return graphqlResolve(obj, name, args);
		},
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		webUrl(obj, args, context) {
			const name = 'webUrl';
			return graphqlResolve(obj, name, args);
		}
	},
	siteCollection: {
		hostname(obj, args, context) {
			const name = 'hostname';
			return graphqlResolve(obj, name, args);
		}
	},
	thumbnail: {
		content(obj, args, context) {
			const name = 'content';
			return graphqlResolve(obj, name, args);
		},
		height(obj, args, context) {
			const name = 'height';
			return graphqlResolve(obj, name, args);
		},
		sourceItemId(obj, args, context) {
			const name = 'sourceItemId';
			return graphqlResolve(obj, name, args);
		},
		url(obj, args, context) {
			const name = 'url';
			return graphqlResolve(obj, name, args);
		},
		width(obj, args, context) {
			const name = 'width';
			return graphqlResolve(obj, name, args);
		}
	},
	driveItemUploadableProperties: {
		description(obj, args, context) {
			const name = 'description';
			return graphqlResolve(obj, name, args);
		},
		fileSystemInfo(obj, args, context) {
			const name = 'fileSystemInfo';
			return graphqlResolve(obj, name, args);
		},
		name(obj, args, context) {
			const name = 'name';
			return graphqlResolve(obj, name, args);
		}
	},
	driveRecipient: {
		alias(obj, args, context) {
			const name = 'alias';
			return graphqlResolve(obj, name, args);
		},
		email(obj, args, context) {
			const name = 'email';
			return graphqlResolve(obj, name, args);
		},
		objectId(obj, args, context) {
			const name = 'objectId';
			return graphqlResolve(obj, name, args);
		}
	},
	uploadSession: {
		expirationDateTime(obj, args, context) {
			const name = 'expirationDateTime';
			return graphqlResolve(obj, name, args);
		},
		nextExpectedRanges(obj, args, context) {
			const name = 'nextExpectedRanges';
			return graphqlResolve(obj, name, args);
		},
		uploadUrl(obj, args, context) {
			const name = 'uploadUrl';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookSessionInfo: {
		id(obj, args, context) {
			const name = 'id';
			return graphqlResolve(obj, name, args);
		},
		persistChanges(obj, args, context) {
			const name = 'persistChanges';
			return graphqlResolve(obj, name, args);
		}
	},
	Json: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookFilterCriteria: {
		color(obj, args, context) {
			const name = 'color';
			return graphqlResolve(obj, name, args);
		},
		criterion1(obj, args, context) {
			const name = 'criterion1';
			return graphqlResolve(obj, name, args);
		},
		criterion2(obj, args, context) {
			const name = 'criterion2';
			return graphqlResolve(obj, name, args);
		},
		dynamicCriteria(obj, args, context) {
			const name = 'dynamicCriteria';
			return graphqlResolve(obj, name, args);
		},
		filterOn(obj, args, context) {
			const name = 'filterOn';
			return graphqlResolve(obj, name, args);
		},
		icon(obj, args, context) {
			const name = 'icon';
			return graphqlResolve(obj, name, args);
		},
		operator(obj, args, context) {
			const name = 'operator';
			return graphqlResolve(obj, name, args);
		},
		values(obj, args, context) {
			const name = 'values';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookIcon: {
		index(obj, args, context) {
			const name = 'index';
			return graphqlResolve(obj, name, args);
		},
		set(obj, args, context) {
			const name = 'set';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookSortField: {
		ascending(obj, args, context) {
			const name = 'ascending';
			return graphqlResolve(obj, name, args);
		},
		color(obj, args, context) {
			const name = 'color';
			return graphqlResolve(obj, name, args);
		},
		dataOption(obj, args, context) {
			const name = 'dataOption';
			return graphqlResolve(obj, name, args);
		},
		icon(obj, args, context) {
			const name = 'icon';
			return graphqlResolve(obj, name, args);
		},
		key(obj, args, context) {
			const name = 'key';
			return graphqlResolve(obj, name, args);
		},
		sortOn(obj, args, context) {
			const name = 'sortOn';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookWorksheetProtectionOptions: {
		allowAutoFilter(obj, args, context) {
			const name = 'allowAutoFilter';
			return graphqlResolve(obj, name, args);
		},
		allowDeleteColumns(obj, args, context) {
			const name = 'allowDeleteColumns';
			return graphqlResolve(obj, name, args);
		},
		allowDeleteRows(obj, args, context) {
			const name = 'allowDeleteRows';
			return graphqlResolve(obj, name, args);
		},
		allowFormatCells(obj, args, context) {
			const name = 'allowFormatCells';
			return graphqlResolve(obj, name, args);
		},
		allowFormatColumns(obj, args, context) {
			const name = 'allowFormatColumns';
			return graphqlResolve(obj, name, args);
		},
		allowFormatRows(obj, args, context) {
			const name = 'allowFormatRows';
			return graphqlResolve(obj, name, args);
		},
		allowInsertColumns(obj, args, context) {
			const name = 'allowInsertColumns';
			return graphqlResolve(obj, name, args);
		},
		allowInsertHyperlinks(obj, args, context) {
			const name = 'allowInsertHyperlinks';
			return graphqlResolve(obj, name, args);
		},
		allowInsertRows(obj, args, context) {
			const name = 'allowInsertRows';
			return graphqlResolve(obj, name, args);
		},
		allowPivotTables(obj, args, context) {
			const name = 'allowPivotTables';
			return graphqlResolve(obj, name, args);
		},
		allowSort(obj, args, context) {
			const name = 'allowSort';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookFilterDatetime: {
		date(obj, args, context) {
			const name = 'date';
			return graphqlResolve(obj, name, args);
		},
		specificity(obj, args, context) {
			const name = 'specificity';
			return graphqlResolve(obj, name, args);
		}
	},
	workbookRangeReference: {
		address(obj, args, context) {
			const name = 'address';
			return graphqlResolve(obj, name, args);
		}
	},
	invitedUserMessageInfo: {
		ccRecipients(obj, args, context) {
			const name = 'ccRecipients';
			return graphqlResolve(obj, name, args);
		},
		messageLanguage(obj, args, context) {
			const name = 'messageLanguage';
			return graphqlResolve(obj, name, args);
		},
		customizedMessageBody(obj, args, context) {
			const name = 'customizedMessageBody';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerAppliedCategories: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerAssignments: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerExternalReference: {
		alias(obj, args, context) {
			const name = 'alias';
			return graphqlResolve(obj, name, args);
		},
		type(obj, args, context) {
			const name = 'type';
			return graphqlResolve(obj, name, args);
		},
		previewPriority(obj, args, context) {
			const name = 'previewPriority';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerChecklistItem: {
		isChecked(obj, args, context) {
			const name = 'isChecked';
			return graphqlResolve(obj, name, args);
		},
		title(obj, args, context) {
			const name = 'title';
			return graphqlResolve(obj, name, args);
		},
		orderHint(obj, args, context) {
			const name = 'orderHint';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedBy(obj, args, context) {
			const name = 'lastModifiedBy';
			return graphqlResolve(obj, name, args);
		},
		lastModifiedDateTime(obj, args, context) {
			const name = 'lastModifiedDateTime';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerAssignment: {
		assignedBy(obj, args, context) {
			const name = 'assignedBy';
			return graphqlResolve(obj, name, args);
		},
		assignedDateTime(obj, args, context) {
			const name = 'assignedDateTime';
			return graphqlResolve(obj, name, args);
		},
		orderHint(obj, args, context) {
			const name = 'orderHint';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerExternalReferences: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerChecklistItems: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerOrderHintsByAssignee: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerUserIds: {
		extension(obj, args, context) {
			const name = 'extension';
			return graphqlResolve(obj, name, args);
		}
	},
	plannerCategoryDescriptions: {
		category1(obj, args, context) {
			const name = 'category1';
			return graphqlResolve(obj, name, args);
		},
		category2(obj, args, context) {
			const name = 'category2';
			return graphqlResolve(obj, name, args);
		},
		category3(obj, args, context) {
			const name = 'category3';
			return graphqlResolve(obj, name, args);
		},
		category4(obj, args, context) {
			const name = 'category4';
			return graphqlResolve(obj, name, args);
		},
		category5(obj, args, context) {
			const name = 'category5';
			return graphqlResolve(obj, name, args);
		},
		category6(obj, args, context) {
			const name = 'category6';
			return graphqlResolve(obj, name, args);
		}
	},
	notebookLinks: {
		oneNoteClientUrl(obj, args, context) {
			const name = 'oneNoteClientUrl';
			return graphqlResolve(obj, name, args);
		},
		oneNoteWebUrl(obj, args, context) {
			const name = 'oneNoteWebUrl';
			return graphqlResolve(obj, name, args);
		}
	},
	externalLink: {
		href(obj, args, context) {
			const name = 'href';
			return graphqlResolve(obj, name, args);
		}
	},
	sectionLinks: {
		oneNoteClientUrl(obj, args, context) {
			const name = 'oneNoteClientUrl';
			return graphqlResolve(obj, name, args);
		},
		oneNoteWebUrl(obj, args, context) {
			const name = 'oneNoteWebUrl';
			return graphqlResolve(obj, name, args);
		}
	},
	pageLinks: {
		oneNoteClientUrl(obj, args, context) {
			const name = 'oneNoteClientUrl';
			return graphqlResolve(obj, name, args);
		},
		oneNoteWebUrl(obj, args, context) {
			const name = 'oneNoteWebUrl';
			return graphqlResolve(obj, name, args);
		}
	},
	onenoteOperationError: {
		code(obj, args, context) {
			const name = 'code';
			return graphqlResolve(obj, name, args);
		},
		message(obj, args, context) {
			const name = 'message';
			return graphqlResolve(obj, name, args);
		}
	},
	diagnostic: {
		message(obj, args, context) {
			const name = 'message';
			return graphqlResolve(obj, name, args);
		},
		url(obj, args, context) {
			const name = 'url';
			return graphqlResolve(obj, name, args);
		}
	},
	onenotePatchContentCommand: {
		action(obj, args, context) {
			const name = 'action';
			return graphqlResolve(obj, name, args);
		},
		target(obj, args, context) {
			const name = 'target';
			return graphqlResolve(obj, name, args);
		},
		content(obj, args, context) {
			const name = 'content';
			return graphqlResolve(obj, name, args);
		},
		position(obj, args, context) {
			const name = 'position';
			return graphqlResolve(obj, name, args);
		}
	},
	onenotePagePreview: {
		previewText(obj, args, context) {
			const name = 'previewText';
			return graphqlResolve(obj, name, args);
		},
		links(obj, args, context) {
			const name = 'links';
			return graphqlResolve(obj, name, args);
		}
	},
	onenotePagePreviewLinks: {
		previewImageUrl(obj, args, context) {
			const name = 'previewImageUrl';
			return graphqlResolve(obj, name, args);
		}
	},
	recentNotebook: {
		displayName(obj, args, context) {
			const name = 'displayName';
			return graphqlResolve(obj, name, args);
		},
		lastAccessedTime(obj, args, context) {
			const name = 'lastAccessedTime';
			return graphqlResolve(obj, name, args);
		},
		links(obj, args, context) {
			const name = 'links';
			return graphqlResolve(obj, name, args);
		},
		sourceService(obj, args, context) {
			const name = 'sourceService';
			return graphqlResolve(obj, name, args);
		}
	},
	recentNotebookLinks: {
		oneNoteClientUrl(obj, args, context) {
			const name = 'oneNoteClientUrl';
			return graphqlResolve(obj, name, args);
		},
		oneNoteWebUrl(obj, args, context) {
			const name = 'oneNoteWebUrl';
			return graphqlResolve(obj, name, args);
		}
	}
};
const graphRoot = 'https://graph.microsoft.com/v1.0';
const urlRoot = "https://proxy.apisandbox.msdn.microsoft.com/svc?url=";
const request = require('request-promise');
module.exports = {
	typeDefs,
	resolvers
};
function makeRequest(path, authorization, args, isSecondary) {
	let url = urlRoot + encodeURIComponent(path);
	if (args.id != null) {
		url = url + '/' + args.id;
	}
	var options = {
		url: url,
		headers: {
			'Authorization': 'Bearer ' + authorization
		}
	};
	return request(options).then(function (responseBody, error) {
		if (!error) {
			let body = JSON.parse(responseBody);
			if (Object.keys(body).includes('value')) {
				var next = body['value'];
				if (Array.isArray(next)) {
					next.map(value => value['__path'] = path + '/' + value['id']);
					next.map(value => value['__secondary'] = true);
					next.map(value => value['__session'] = authorization);
				} else {
					next['__path'] = path;
					next['__secondary'] = true;
					next['__session'] = authorization;
				}
				return next;
			} else {
				body['__session'] = authorization;
				if (isSecondary) {
					body['__secondary'] = true;
				}
				if (args.id != null) {
					body['__path'] = path + '/' + args.id;
					if (!Array.isArray(body)) {
						body = [body];
					}
				} else {
					body['__path'] = path;
				}
				return body;
			}
		} else {
			console.log(error);
			return 'error';
		}
	}).catch(function (err) {
		return {};
	});
}
function graphqlResolve(obj, name, args) {
	return parseOrRequest(obj, name, args).then(response => {
		if (Object.keys(response).includes('value')) {
			var next = response['value'];
			if (Array.isArray(next)) {
				next.map(value => value['__path'] = path);
			}
			return next;
		} else if (Object.keys(response).includes('__secondary') || Array.isArray(response)) {
			if (Object.keys(response).includes('@odata.null')) {
				return response['@odata.null'] == true ? null : response;
			} else {
				return response;
			}
		} else {
			return response[name];
		}
	});
}
function parseOrRequest(obj, currentProperty, args) {
	const nextPath = obj.__path + '/' + currentProperty;
	if (Object.keys(obj).includes(currentProperty)) {
		return new Promise((resolve, reject) => {
			resolve({
				[currentProperty]: obj[currentProperty],
				'__path': nextPath,
				'__session': obj['__session']
			});
		});
	} else {
		let auth = obj['__session'];
		let resp = makeRequest(nextPath, auth, args, true);
		return resp;
	}
}
