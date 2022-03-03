<script lang='ts'>
	import Plotly from '$lib/Plotly.svelte';
	import type { Data, Layout } from 'plotly.js';
	import { range } from 'it-range';
	import { afterUpdate, onMount } from 'svelte';
	import { Table } from 'sveltestrap';

	onMount(() => {
		// @ts-expect-error
		MathJax?.typeset?.();
	});

	afterUpdate(() => {
		// @ts-expect-error
		MathJax?.typeset?.();
	});

	function makeData(x: Iterable<number>, y: Iterable<number>, shape: 'linear' | 'spline' | 'hv' | 'vh' | 'hvh' | 'vhv' = 'linear', name: string = '', rest: Data = {}): Data {
		return {
			x: [...x],
			y: [...y],
			mode: 'lines+markers',
			name,
			line: { shape },
			type: 'scatter',
			...rest,
		} as unknown as Data;
	}

	const x0To100By5 = [...range(0, 101, 5)];

	function minBound(bound: number): (points: number[]) => number[] {
		return points => points.map(n => Math.max(bound, n));
	}

	function capAt(point: number): (bound: number) => (points: number[]) => number[] {
		return bound => points => points.map((n, idx) => 5 * idx <= point ? bound : n);
	}

	function linear(a: [number, number], b: [number, number]): number[] {
		// y = (bx - dx - bc + ad)/(a - c)
		const y = (x: number) => (a[1] * x - b[1] * x - a[1] * b[0] + a[0] * b[1]) / (a[0] - b[0]);
		return x0To100By5.map(y);
	}

	function bilinear(a: [number, number], b: [number, number], c: [number, number]): number[] {
		// y = (bx - dx - bc + ad)/(a - c)
		const y1 = (x: number) => (a[1] * x - b[1] * x - a[1] * b[0] + a[0] * b[1]) / (a[0] - b[0]);
		const y2 = (x: number) => (b[1] * x - c[1] * x - b[1] * c[0] + b[0] * c[1]) / (b[0] - c[0]);
		return x0To100By5.map(n => n > b[0] ? y1(n) : y2(n));
	}

	function quadratic([x1, y1]: [number, number], [x2, y2]: [number, number], [x3, y3]: [number, number]): number[] {
		const a = (y1 * (x2 - x3) + y2 * (x3 - x1) + y3 * (x1 - x2)) / ((x1 - x2) * (x2 - x3) * (x1 - x3));
		const b = (y1 - y2 - a * ((x1 ** 2) - (x2 ** 2))) / (x1 - x2);
		const c = y1 - a * (x1 ** 2) - b * x1;
		const y = (x: number) => {
			return a * x * x + b * x + c;
		}
		return x0To100By5.map(y);
	}

	const linear60 = minBound(2)(linear([100, 10], [60, 6]));
	const linear70 = minBound(2)(linear([100, 10], [70, 6]));
	const linear80 = minBound(2)(linear([100, 10], [80, 6]));

	const bilinear70 = minBound(2)(bilinear([100, 10], [70, 6], [20, 2]));
	const bilinear80 = minBound(2)(bilinear([100, 10], [80, 6], [20, 2]));

	const bilinear70_40 = minBound(2)(bilinear([100, 10], [70, 6], [40, 2]));
	const bilinear80_40 = minBound(2)(bilinear([100, 10], [80, 6], [40, 2]));

	const quadratic70 = capAt(20)(2)(quadratic([100, 10], [70, 6], [20, 2]));
	const quadratic80 = minBound(2)(capAt(20)(2)(quadratic([100, 10], [80, 6], [20, 2])));
	const quadratic80_40 = capAt(40)(2)(quadratic([100, 10], [80, 6], [40, 2]));

	const bilinear70Map = (() => {
		const y1 = (x: number) => (10 * x - 6 * x - 10 * 70 + 100 * 6) / (100 - 70);
		const y2 = (x: number) => (6 * x - 2 * x - 6 * 20 + 70 * 2) / (70 - 20);

		const map = [...range(0, 61)].map(points => {
			const perc = points * 100 / 60;
			if (perc <= 20) return [points, 2];
			if (perc <= 70) return [points, y2(perc)];
			return [points, y1(perc)];
		}).map(([points, vote]) => [points, Math.round(vote * 2) / 2]);

		const out: [[number, number], number][] = [];
		let currentRun: number = -1;
		for (const [points, vote] of map) {
			if (vote === currentRun) {
				out.at(-1)[0][1] = points;
			} else {
				currentRun = vote;
				out.push([[points, points], vote]);
			}
		}

		return out.map(([points, vote]) => [points[0] === points[1] ? points[0].toString() : `${points[0]} - ${points[1]}`, vote === Math.floor(vote) ? vote.toString() : `${Math.floor(vote)}½`]);
	})();

	const layout: Partial<Layout> = {
		legend: {
			y: 0.5,
		},
		title: {
			yref: 'paper',
		},
		// height: 500,
		xaxis: {
			autotick: false,
			ticks: 'outside',
			tick0: 0,
			dtick: 5,
			title: 'Percentuale (100 * punti ottenuti / punti massimi)',
			range: [0, 104],
		},
		yaxis: {
			autotick: false,
			ticks: 'outside',
			tick0: 0,
			dtick: 1,
			title: 'Voto (decimi)',
			range: [0, 10.5],
		},
		
	};
</script>

<svelte:head>
	<title>Il problema dei voti</title>

	<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
</svelte:head>

<article>
	<h1>Il problema dei voti</h1>
	<h6 class='text-muted'>2022-02-02, di TG</h6>

	<hr class='mx-5 my-3' />

	<p class='lead'>
		Nel corso di questo primo quadrimestre, le nostre verifiche ed interrogazioni sono state nei modi più disparati. Sicuramente, però, si possono identificare 
		delle somiglianze, o almeno, si spera, considerando che l'uniformità nei criteri e nella modalità di valutazione dovrebbe essere una priorità per qualsiasi dipartimento.
	</p>

	<p>
		Prima di tutto, c'è la classica <strong>sufficienza al 60%</strong>, quella a cui siamo abituati dalle medie. Essenzialmente, al 100% va il 10 (ovviamente), 
		al 90% il 9, all'80% l'8, eccetera. (Sono inclusi dei grafici carini perchè si capisca meglio di cosa sto parlando)
	</p>

	<Plotly {layout} data={[makeData(x0To100By5, linear60)]} />

	<p>
		Anche qui, però, c'è dell'ambiguità. Mettiamo caso che abbia fatto un punteggio pari al 72%. Secondo questo grafico, il mio voto sarebbe 7⅖. Ho preso 7? Ho preso 7½? 
		Si puó arrotondare in modo classico matematico:
	</p>

	<Plotly {layout} data={[makeData(x0To100By5, linear60, 'hvh')]} />

	<p>
		o per difetto:
	</p>

	<Plotly {layout} data={[makeData(x0To100By5, linear60, 'hv')]} />

	<p>
		o, sicuramente più raramente, per eccesso:
	</p>

	<Plotly {layout} data={[makeData(x0To100By5, linear60, 'vh')]} />

	<p>
		Spesso, però, il criterio per questa decisione è costante, lo chiedi a settembre al professore e sei a posto per cinque anni.
	</p>

	<p>
		Purtroppo, la sufficienza al 60% è virtualmente impossibile: ne ho vista una con il sostituto di educazione fisica, e basta. 
		Non l'hanno mai vista le statisticamente molto poco valide (ma ormai gliel'ho chiesto) 27 persone scelte a caso sul pullman oggi pomeriggio. 
		A volte si trova <strong>66%</strong>, più spesso <strong>70% o anche 80%</strong>. In questo caso, la situazione diventa molto ambigua: 
		non c'è un collegamento intuitivo tra i due dati che ci sono stati dati al momento della verifica (100% → 10, 70% → 6) ed una griglia completa di valutazione.
	</p>

	<p>
		Se consideriamo solo i due punti sopra menzionati, l'unica conclusione univoca che si puó raggiungere é un'altra retta, questa volta però 
		che passa per i due punti \( (100, 10) \) e \( (70, 6) \) é la seguente:
	</p>

	<Plotly {layout} data={[makeData(x0To100By5, linear70)]} />

	<p>
		2 dal 40% in giù sembra ancora accettabile, ma guardiamo ora la sufficienza all'80%:
	</p>

	<Plotly {layout} data={[makeData(x0To100By5, linear80)]} />

	<p>
		Il 60%, quello che una volta era il 6, ora è diventato 2. È chiaro che questo non sia il metodo migliore. Possiamo però scegliere un terzo punto: ad esempio,
		fissiamo <strong>il 2 al 20%</strong>. Ora si aprono diverse strade. La più semplice è quella di utilizzare due rette:
	</p>

	<Plotly {layout} data={[makeData(x0To100By5, bilinear70, 'linear', '6 = 70%'), makeData(x0To100By5, bilinear80, 'linear', '6 = 80%')]} />

	<p>
		Se il 2 al 20% è una soglia troppo bassa, possiamo anche considerare il 40%:
	</p>

	<Plotly {layout} data={[makeData(x0To100By5, bilinear70_40, 'linear', '6 = 70%'), makeData(x0To100By5, bilinear80_40, 'linear', '6 = 80%')]} />

	<p>
		Notiamo comunque come (almeno nel caso dell'80%) la retta che va dalla sufficienza al 10 è "più ripida".
	</p>

	<p>
		In alternativa, ora che abbiamo tre punti, abbiamo anche l'univocità in una parabola:
	</p>

	<Plotly {layout} data={[
		makeData(x0To100By5, quadratic70, 'spline', '6 = 70%, 2 = 20%'),
		makeData(x0To100By5, quadratic80, 'spline', '6 = 80%, 2 = 20%'),
		makeData(x0To100By5, bilinear70_40, 'spline', '6 = 70%, 2 = 40%'),
		makeData(x0To100By5, quadratic80_40, 'spline', '6 = 80%, 2 = 40%'),
	]} />

	<p>
		Anche in questo caso, similmente, vediamo che la parabola è "più ripida" (questa volta incrementalmente) all'aumentare della percentuale. Ragioniamo su questa osservazione:
		prendiamo, per esempio, la griglia bilineare a \( (100, 10) \), \( (70, 6) \) e \( (20, 2) \), arrotondata "alla matematica":
	</p>

	<Plotly {layout} data={[
		makeData(x0To100By5, bilinear70, 'hvh', 'Arrotondata'),
		makeData(x0To100By5, bilinear70, 'linear', 'Assoluta', { mode: 'lines', line: { dash: 'dot' } })
	]} />

	<p>
		su una verifica di 60 punti (2 al 20% = 12 punti, 6 al 70% = 42 punti, 10 al 100% = 60 punti). Questa è la griglia completa (per semplicità, ignoriamo i mezzi punti):
	</p>

	<center>
		<Table striped hover size='sm' style='width: unset !important;'>
			<thead>
				<tr>
					<th>Punti</th>
					<th>Voto</th>
				</tr>
			</thead>
			<tbody>
				{#each bilinear70Map as pair}
					<tr>
						<td>{pair[0]}</td>
						<td>{pair[1]}</td>
					</tr>
				{/each}
			</tbody>
		</Table>
	</center>

	<p>
		Solo io noto qualcosa di strano? Ignorando i cambiamenti manuali che potrebbero essere fatti (ad esempio portare i 59 al 9½, o i 41 al 5½), la falla più grande è che
		<strong>più si è bravi, più è facile che il proprio voto migliori</strong>. Facciamo un esempio specifico: se ho fatto 46 punti = soglia del 7, nella verifica successiva 
		mi bastano due punti in più perchè il mio voto aumenti di mezzo decimo, se ne ho fatti 18 = soglia del 3, devo guadagnarne ben quattro! Non dovrebbe forse essere il contrario?
		Non dovrebbe essere più difficile migliorare per chi già è messo bene? Anche se adesso abbiamo solo considerato la formula che io ho chiamato "bilineare", quelle basate
		sulla quadratica hanno lo stesso problema, anzi, non solo c'è discrepanza tra sotto e sopra la sufficienza, ma con un numero adeguato di punti ogni voto avrà una quantità
		diversa di punti associatigli.
	</p>

	<p>
		Se proprio non vogliamo rispettare quello che ci dice la logica ed usare una lineare al 60%, possiamo almeno <strong>abbassare la soglia di sufficienza</strong>, invece di
		aumentarla? Certo, suona controproducente, quello che farebbe non sarebbe rendere più facile la sufficienza, sarebbe rendere più facile il miglioramento, sarebbe riportare la
		bilancia dalla parte di chi ne ha bisogno, sarebbe togliere «tanto ho preso 2, al massimo se mi impegno prendo 4 o 4½, come recupero? prendo il debito che faccio prima, 
		non ho medie da salvare, si parte da zero» e portare «ho preso 2, se mi impegno magari riesco ad arrivare alla sufficienza, poi se mi impegno ancora un po' magari riesco anche
		a recuperare senza debito, o magari almeo arrivo al 5».
	</p>

	<p>
		A tutti i dipartimenti, per favore, smettete di facilitare le cose a chi già prende voti buoni.
	</p>
</article>

<style lang='scss'>
	
</style>