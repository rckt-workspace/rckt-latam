<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

Campaign routes under /lp/ stay outside shared site navigation and the sitemap; campaign-only scoring and analytics live in client-side rckt components so the existing lead submission remains unchanged.

Sales Flow campaign card reveals and number counts use a route-local, one-shot IntersectionObserver so shared site cards and form behavior remain untouched.
