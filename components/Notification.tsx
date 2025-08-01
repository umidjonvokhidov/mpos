import icons from '@/public/icons';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from './ui/separator';
import { twMerge } from 'tailwind-merge';
import { useAuth, useNotification } from '@/stores';

const Notification = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useNotification();
  const { user } = useAuth();
  const unreadNotificationsLength = notifications?.filter(
    (notification) => notification.status === 'unread',
  ).length;

  return (
    <>
      <div className="hidden md:block">
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center justify-center border border-grey-100 rounded-[6px] p-2 cursor-pointer hover:bg-grey-50/80 transition-all duration-300 ease-in-out">
              <Image
                src={unreadNotificationsLength! > 0 ? icons.notificationDot : icons.notification}
                width={20}
                height={20}
                alt="notification"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            sideOffset={8}
            align="end"
            className="w-screen md:max-w-lg lg:w-[470px] sm:right-0 left-0 sm:inset-x-auto mt-2.5"
          >
            <h3 className="text-sm font-medium leading-[18px] tracking-tight text-[#0B0B0B] py-2 px-3  lg:py-3 lg:px-4">
              Notification
            </h3>
            <Separator className="w-full" />
            <div className="flex flex-col py-1.5 px-2 lg:py-2.5 lg:px-3 gap-y-2.5">
              <div className="flex w-full items-center justify-between">
                <h3 className="text-sm font-medium leading-[18px] tracking-tight text-[#0B0B0B]">
                  {notifications ? notifications.length : 0} Notifications
                </h3>
                <h3
                  className={twMerge(
                    'text-sm font-medium leading-[18px] tracking-tight text-[#0B0B0B]',
                    unreadNotificationsLength! > 0 && 'cursor-pointer',
                  )}
                  onClick={async () => {
                    if (unreadNotificationsLength! > 0) {
                      await markAllNotificationsRead(user?._id!);
                    }
                  }}
                >
                  ({unreadNotificationsLength}) Read all
                </h3>
              </div>
              <ScrollArea className="flex max-h-[300px] flex-col gap-y-2.5">
                {notifications?.map(({ _id, title, message, status }: Notification) => (
                  <div
                    key={_id}
                    className={twMerge(
                      'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                      status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                    )}
                    onClick={() => {
                      if (status === 'unread') {
                        markNotificationRead(_id!, user?._id!);
                      }
                    }}
                  >
                    <div className="p-[7px] rounded-full bg-black/5">
                      <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                    </div>
                    <div className="flex flex-col items-start gap-y-1">
                      <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                        {title}
                      </h5>
                      <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                        {message}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="block md:hidden">
        <Sheet>
          <SheetTrigger>
            <div className="flex items-center justify-center border border-grey-100 rounded-[6px] p-2 cursor-pointer hover:bg-grey-50/80 transition-all duration-300 ease-in-out">
              <Image
                src={unreadNotificationsLength! > 0 ? icons.notificationDot : icons.notification}
                width={20}
                height={20}
                alt="notification"
              />
            </div>
          </SheetTrigger>
          <SheetContent className="w-full" side="left">
            <SheetHeader className=''>
              <SheetTitle className="text-sm font-medium leading-[18px] tracking-tight text-[#0B0B0B]" />
              <h3 className="text-sm font-medium leading-[18px] tracking-tight text-[#0B0B0B] py-2 px-3  lg:py-3 lg:px-4">
                Notification
              </h3>
              <Separator className="w-full" />
              <div className="flex flex-col py-1.5 px-2 lg:py-2.5 lg:px-3 gap-y-2.5">
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-sm font-medium leading-[18px] tracking-tight text-[#0B0B0B]">
                    {notifications ? notifications.length : 0} Notifications
                  </h3>
                  <h3
                    className={twMerge(
                      'text-sm font-medium leading-[18px] tracking-tight text-[#0B0B0B]',
                      unreadNotificationsLength! > 0 && 'cursor-pointer',
                    )}
                    onClick={async () => {
                      if (unreadNotificationsLength! > 0) {
                        await markAllNotificationsRead(user?._id!);
                      }
                    }}
                  >
                    ({unreadNotificationsLength}) Read all
                  </h3>
                </div>
                <ScrollArea className="flex flex-col max-h-[800px] gap-y-2.5">
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifications?.map(({ _id, title, message, status }: Notification) => (
                    <div
                      key={_id}
                      className={twMerge(
                        'py-3 px-4 rounded-[8px] flex items-center gap-x-2 transition-all hover:translate-x-0.5',
                        status === 'read' ? 'bg-transparent' : 'bg-[#F8F8F8] cursor-pointer',
                      )}
                      onClick={() => {
                        if (status === 'unread') {
                          markNotificationRead(_id!, user?._id!);
                        }
                      }}
                    >
                      <div className="p-[7px] rounded-full bg-black/5">
                        <Image src={icons.notIcon} alt="Notification" width={24} height={24} />
                      </div>
                      <div className="flex flex-col items-start gap-y-1">
                        <h5 className="text-xs font-medium leading-4 tracking-tight text-base-black">
                          {title}
                        </h5>
                        <p className="text-[#828896] text-xs font-normal leading-4 tracking-tight">
                          {message}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Notification;
