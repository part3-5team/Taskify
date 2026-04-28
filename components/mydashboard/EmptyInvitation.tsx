import IconEmptyInvite from '@/assets/imgs/img_empty_invite.svg'

export default function EmptyInvitation() {
  return (
    <div className="bg-black-400 text-2lg-18-bold flex flex-col items-center justify-center gap-2.5 rounded-[30px] border-1 border-gray-700 py-10">
      <IconEmptyInvite className="h-25 w-25" />
      <p className="pb-2.5 text-gray-400">아직 초대받은 대시보드가 없습니다.</p>
    </div>
  )
}
