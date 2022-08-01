import {
    NewChangesetWithCommit,
    VersionType,
    ChangelogFunctions,
    ModCompWithPackage,
} from '@changesets/types';
import gitCommitInfo from 'git-commit-info';

const getReleaseLine = async (
    changeset: NewChangesetWithCommit,
    _type: VersionType,
    options: Record<string, any> | null,
) => {
    if (!options || !options.repo) {
        throw new Error(
            'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]',
        );
    }

    const { shortHash } = gitCommitInfo({ cwd: './' });

    let prFromSummary: number | undefined;
    let commitFromSummary: string | undefined = shortHash;
    let usersFromSummary: string[] = [options.author];

    const replacedChangelog = changeset.summary
        .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
            let num = Number(pr);
            if (!isNaN(num)) prFromSummary = num;
            return '';
        })
        .trim();

    const [firstLine, ...futureLines] = replacedChangelog.split('\n').map((l) => l.trimRight());

    const links = {
        commit: `[\`${commitFromSummary}\`](https://github.com/${options.repo}/commit/${commitFromSummary})`,
    };

    const users = usersFromSummary
        .map((userFromSummary) => `[@${userFromSummary}](https://github.com/${userFromSummary})`)
        .join(', ');

    const prefix = [
        links.commit === null ? '' : ` ${links.commit}`,
        users === null ? '' : ` Thanks ${users}!`,
    ].join('');

    return `\n\n-${prefix ? `${prefix} -` : ''} ${firstLine}\n${futureLines
        .map((l) => `  ${l}`)
        .join('\n')}`;
};

const getDependencyReleaseLine = async (
    changesets: NewChangesetWithCommit[],
    dependenciesUpdated: ModCompWithPackage[],
) => {
    if (dependenciesUpdated.length === 0) return '';

    const changesetLinks = changesets.map(
        (changeset) => `- Updated dependencies${changeset.commit ? ` [${changeset.commit}]` : ''}`,
    );

    const updatedDepenenciesList = dependenciesUpdated.map(
        (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
    );

    return [...changesetLinks, ...updatedDepenenciesList].join('\n');
};

const defaultChangelogFunctions: ChangelogFunctions = {
    getReleaseLine,
    getDependencyReleaseLine,
};

export default defaultChangelogFunctions;
