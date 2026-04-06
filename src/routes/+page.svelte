<script lang="ts">
	import CardRow from '../components/CardRow.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentPage = 0;
	const perPage = 6;

	$: cards = data.cards;
	$: totalPages = Math.ceil(cards.length / perPage);
	$: paginatedCards = cards.slice(currentPage * perPage, (currentPage + 1) * perPage);
	$: hasPrev = currentPage > 0;
	$: hasNext = currentPage < totalPages - 1;

	function nextPage() {
		if (hasNext) currentPage++;
	}

	function prevPage() {
		if (hasPrev) currentPage--;
	}
</script>

<div class="container">
	<header class="page-header">
		<h1 class="comic-title">Trading Card <br />Collection</h1>
		<div class="comic-subtitle">THE HERO ARCHIVE</div>

	</header>

	{#if cards.length === 0}
		<p class="message">No heroes detected in this sector.</p>
	{:else}
		<div class="cards-grid">
			<nav class="pagination" aria-label="Card pages">
				<button class="pagination-btn" disabled={!hasPrev} on:click={prevPage}>
					PREVIOUS
				</button>
				<span class="page-indicator">PAGE {currentPage + 1} OF {totalPages}</span>
				<button class="pagination-btn" disabled={!hasNext} on:click={nextPage}>
					NEXT
				</button>
			</nav>

		<CardRow cards={paginatedCards} />
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 1300px;
		margin: 0 auto;
		padding: 3rem 2rem;
		min-height: 100vh;
	}

	.page-header {
		text-align: center;
		margin-bottom: 4rem;
		position: relative;
	}

	.comic-title {
		font-size: clamp(1.76rem, 4.8vw, 4rem);
		margin: 0;
		color: var(--color-hero-yellow);
		-webkit-text-stroke: clamp(1.5px, 0.4vw, 3px) var(--color-hero-black);
		text-shadow: 6px 6px 0px var(--color-hero-black), 8px 8px 0px;
		transform: skew(-5deg) rotate(-2deg);
		line-height: 1;
	}

	.comic-subtitle {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		background: var(--color-hero-black);
		color: var(--color-hero-white);
		display: inline-block;
		padding: 0.2rem 1.5rem;
		margin-top: -1rem;
		transform: skew(15deg);
		border: 2px solid var(--color-hero-yellow);
	}

	.message {
		text-align: center;
		font-size: 1.5rem;
		font-family: var(--font-heading);
		color: var(--color-hero-black);
		padding: 4rem;
	}

	.cards-grid {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
		max-width: 75%;
		margin-inline: auto;
	}

	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
	}

	.pagination-btn {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		-webkit-tap-highlight-color: transparent;
		color: var(--color-hero-black);
		background: var(--color-hero-white);
		border: 3px solid var(--color-hero-black);
		padding: 0.5rem 1.2rem;
		cursor: pointer;
		transition:
			color 0.2s ease-out,
			background-color 0.2s ease-out,
			border-color 0.2s ease-out;
	}

	.pagination-btn:hover:not(:disabled) {
		color: var(--color-hero-white);
		background-color: var(--color-hero-red);
		border-color: var(--color-hero-red);
	}

	.pagination-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.page-indicator {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		color: var(--color-hero-black);
	}

	@media (max-width: 1024px) {
		.comic-title {
			text-shadow: none;
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 2rem 1rem;
		}

		.page-header {
			margin-bottom: 2.5rem;
		}

		.comic-subtitle {
			font-size: 1.1rem;
			padding: 0.15rem 1rem;
		}

		.pagination {
			gap: 1rem;
		}

		.pagination-btn {
			font-size: 0.95rem;
			padding: 0.4rem 0.8rem;
		}

		.page-indicator {
			font-size: 1rem;
		}
	}

	@media (max-width: 480px) {
		.container {
			padding: 1.5rem 0.75rem;
		}

		.page-header {
			margin-bottom: 2rem;
		}

		.comic-subtitle {
			font-size: 0.9rem;
		}

		.pagination {
			flex-wrap: wrap;
			gap: 0.75rem;
		}

		.pagination-btn {
			font-size: 0.9rem;
			padding: 0.35rem 0.7rem;
			border-width: 2px;
		}
	}
</style>
