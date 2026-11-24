import { SOCIALS } from "@/lib/data";
import { SOCIAL_ICONS } from "./Icons";

export default function SocialLinks({ className = "social" }: { className?: string }) {
  return (
    <ul className={className} aria-label="Profiles">
      {SOCIALS.map((s) => {
        const Icon = SOCIAL_ICONS[s.label];
        return (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener noreferrer">
              <Icon />
              <span>{s.label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
