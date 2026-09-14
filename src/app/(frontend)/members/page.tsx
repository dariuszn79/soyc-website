import { redirect } from "next/navigation";

/** Legacy route — the members area now lives at /members-area. */
export default function MembersPage() {
  redirect("/members-area");
}
