import { ReleaseTrain } from './ReleaseTrain';
import { MigrationPath } from './MigrationPath';
import { DependabotFlow } from './DependabotFlow';

/**
 * Case notes opt into a figure by setting `visual` in src/data/resume2.ts.
 * Unknown or missing values render nothing, so adding a figure to the data
 * is the only step needed to show one.
 */
export function Visual({ kind }: { kind?: string }) {
  if (kind === 'release-train') return <ReleaseTrain />;
  if (kind === 'migration') return <MigrationPath />;
  if (kind === 'dependabot') return <DependabotFlow />;
  return null;
}
