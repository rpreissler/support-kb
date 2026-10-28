<script lang="ts">
  // One row per problem found in the #4471 pile — computed from the export with the desk's
  // own cause logic (causes.ts: uniqueById, then groupByCause over the reports merged into 4471).
  import reports from '#lib/data/reports-4471.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  let { tickets }: { tickets: Record<string, { url: string; title: string }> } = $props();

  const lines = $derived((reports as Report[]).length);
  const merged = $derived(uniqueById(reports as Report[]).filter((r) => r.mergedInto === 4471));
  const groups = $derived(groupByCause(merged, tenantOf));
</script>

<p class="sum">
  <strong>{lines}</strong> export lines carry <strong>{merged.length}</strong> unique reports,
  and the desk's own cause logic groups them into <strong>{groups.length}</strong> problems —
  one ticket each now.
</p>

<table>
  <thead>
    <tr><th>cause</th><th>problem</th><th>reports</th><th>tenants</th><th>seen</th><th>ticket</th></tr>
  </thead>
  <tbody>
    {#each groups as g (g.cause)}
      {@const t = tickets[g.cause]}
      <tr>
        <td><code>{g.cause}</code></td>
        <td>{t?.title ?? g.cause}</td>
        <td>{g.reports.length}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>{#if t}<a href={t.url}>filed</a>{:else}no ticket{/if}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .sum { font-size: 1.05rem; }
</style>
