import java.util.*;

public class Main {
	public static void main(String[] args) {
    	Scanner scanner = new Scanner(System.in);
    	boolean keepRunning = true;

    	while (keepRunning) {
        	System.out.println("Choose an operation:");
        	System.out.println("1. Modular Arithmetic");
        	System.out.println("2. Relation");
        	System.out.println("3. Function");
        	System.out.println("4. Graph");
        	System.out.println("5. Exit");
        	System.out.print("Enter your choice: ");
        	int choice = scanner.nextInt();
        	scanner.nextLine(); // Consume newline left-over

        	switch (choice) {
            	case 1:
                	modularArithmetic(scanner);
                	break;
            	case 2:
                	relation(scanner);
                	break;
            	case 3:
                	function(scanner);
                	break;
            	case 4:
                	graph(scanner);
                	break;
            	case 5:
                	keepRunning = false;
                	break;
            	default:
                	System.out.println("Invalid choice. Please try again.");
        	}
    	}

    	scanner.close();
    	System.out.println("Goodbye!");
	}

	// Modular Arithmetic
	public static void modularArithmetic(Scanner scanner) {
    	System.out.println("Enter the integers (enter a non-integer to stop):");
    	List<Integer> numbers = new ArrayList<>();
   	 
    	while (scanner.hasNextInt()) {
        	numbers.add(scanner.nextInt());
    	}
    	scanner.nextLine(); // Consume newline left-over

    	if (numbers.isEmpty()) {
        	System.out.println("No integers provided.");
        	return;
    	}

    	int maxModulus = numbers.stream().max(Integer::compare).get(); // Maximum integer in the list

    	for (int mod = 2; mod <= maxModulus; mod++) { // Start from modulus 2
        	Map<Integer, List<Integer>> congruenceGroups = new HashMap<>();

        	// Group numbers by their congruence modulo 'mod'
        	for (Integer number : numbers) {
            	int congruence = ((number % mod) + mod) % mod; // Ensure positive congruence
            	if (!congruenceGroups.containsKey(congruence)) {
                	congruenceGroups.put(congruence, new ArrayList<>());
            	}
            	congruenceGroups.get(congruence).add(number);
        	}

        	// Print groups of numbers that are congruent modulo 'mod'
        	for (List<Integer> group : congruenceGroups.values()) {
            	if (group.size() > 1) { // Only print groups with more than one number
                	System.out.println(group + " are congruent modulo " + mod + ".");
            	}
        	}
    	}
	}

	// Relation
	public static void relation(Scanner scanner) {
    	System.out.print("Enter a set (space-separated integers): ");
    	String[] setElements = scanner.nextLine().split(" ");
    	Set<Integer> set = new HashSet<>();
    	for (String element : setElements) {
        	set.add(Integer.parseInt(element));
    	}

    	System.out.print("Enter ordered pairs (space-separated, e.g., 1 1 1 2 1 3): ");
    	String[] pairElements = scanner.nextLine().split(" ");
    	Set<Pair> relation = new HashSet<>();
    	for (int i = 0; i < pairElements.length; i += 2) {
        	int a = Integer.parseInt(pairElements[i]);
        	int b = Integer.parseInt(pairElements[i + 1]);
        	relation.add(new Pair(a, b));
    	}

    	// Check properties
    	boolean isReflexive = checkReflexive(set, relation);
    	boolean isIrreflexive = checkIrreflexive(set, relation);
    	boolean isSymmetric = checkSymmetric(relation);
    	boolean isAsymmetric = checkAsymmetric(relation);
    	boolean isAntisymmetric = checkAntisymmetric(relation);
    	boolean isTransitive = checkTransitive(relation);
    	boolean isEquivalence = isReflexive && isSymmetric && isTransitive;

    	// Output the results
    	System.out.println("Properties identified are:");
    	if (isReflexive) System.out.println("Reflexive");
    	if (isIrreflexive) System.out.println("Irreflexive");
    	if (isSymmetric) System.out.println("Symmetric");
    	if (isAsymmetric) System.out.println("Asymmetric");
    	if (isAntisymmetric) System.out.println("Antisymmetric");
    	if (isTransitive) System.out.println("Transitive");
    	if (isEquivalence) System.out.println("Equivalence");
	}

	private static boolean checkReflexive(Set<Integer> set, Set<Pair> relation) {
    	for (int element : set) {
        	if (!relation.contains(new Pair(element, element))) {
            	return false;
        	}
    	}
    	return true;
	}

	private static boolean checkIrreflexive(Set<Integer> set, Set<Pair> relation) {
    	for (int element : set) {
        	if (relation.contains(new Pair(element, element))) {
            	return false;
        	}
    	}
    	return true;
	}

	private static boolean checkSymmetric(Set<Pair> relation) {
    	for (Pair pair : relation) {
        	if (!relation.contains(new Pair(pair.b, pair.a))) {
            	return false;
        	}
    	}
    	return true;
	}

	private static boolean checkAsymmetric(Set<Pair> relation) {
    	for (Pair pair : relation) {
        	if (!pair.equals(new Pair(pair.b, pair.a)) && relation.contains(new Pair(pair.b, pair.a))) {
            	return false;
        	}
    	}
    	return true;
	}

	private static boolean checkAntisymmetric(Set<Pair> relation) {
    	for (Pair pair : relation) {
        	if (!pair.equals(new Pair(pair.b, pair.a)) && relation.contains(new Pair(pair.b, pair.a))) {
            	return false;
        	}
    	}
    	return true;
	}

	private static boolean checkTransitive(Set<Pair> relation) {
    	for (Pair pair1 : relation) {
        	for (Pair pair2 : relation) {
            	if (pair1.b == pair2.a && !relation.contains(new Pair(pair1.a, pair2.b))) {
                	return false;
            	}
        	}
    	}
    	return true;
	}

	static class Pair {
    	int a, b;

    	Pair(int a, int b) {
        	this.a = a;
        	this.b = b;
    	}

    	@Override
    	public boolean equals(Object o) {
        	if (this == o) return true;
        	if (o == null || getClass() != o.getClass()) return false;
        	Pair pair = (Pair) o;
        	return a == pair.a && b == pair.b;
    	}

    	@Override
    	public int hashCode() {
        	return 31 * a + b;
    	}
	}

	// Function
	public static void function(Scanner scanner) {
    	System.out.print("Enter input, X (space-separated integers): ");
    	String[] domainElements = scanner.nextLine().split(" ");
    	Set<Integer> domain = new HashSet<>();
    	for (String element : domainElements) {
        	try {
            	domain.add(Integer.parseInt(element));
        	} catch (NumberFormatException e) {
            	System.out.println("Invalid integer: " + element);
            	return;
        	}
    	}

    	System.out.print("Enter output, Y (space-separated characters): ");
    	String[] codomainElements = scanner.nextLine().split(" ");
    	Set<Character> codomain = new HashSet<>();
    	for (String element : codomainElements) {
        	if (element.length() != 1) {
            	System.out.println("Invalid character: " + element);
            	return;
        	}
        	codomain.add(element.charAt(0));
    	}

    	System.out.print("Enter ordered pairs (e.g., 1 a 2 b 3 c): ");
    	String[] pairs = scanner.nextLine().split(" ");
    	if (pairs.length % 2 != 0) {
        	System.out.println("Invalid number of elements in ordered pairs.");
        	return;
    	}

    	Map<Integer, Character> function = new HashMap<>();
    	try {
        	for (int i = 0; i < pairs.length; i += 2) {
            	int a = Integer.parseInt(pairs[i]);
            	char b = pairs[i + 1].charAt(0);
            	function.put(a, b);
        	}
    	} catch (NumberFormatException e) {
        	System.out.println("Invalid integer in ordered pairs.");
        	return;
    	} catch (IndexOutOfBoundsException e) {
        	System.out.println("Invalid character in ordered pairs.");
        	return;
    	}

    	calculateAndDisplayProperties(domain, codomain, function);
	}

	private static void calculateAndDisplayProperties(Set<Integer> domain, Set<Character> codomain, Map<Integer, Character> function) {
    	boolean isEverywhereDefined = checkEverywhereDefined(domain, function);
    	boolean isInjective = checkInjective(function);
    	boolean isSurjective = checkSurjective(codomain, function);
    	boolean isBijective = isInjective && isSurjective;
    	boolean isInvertible = isBijective; // A function is invertible if and only if it is bijective

    	// Output the results
    	System.out.println("Properties identified are:");
    	if (isEverywhereDefined) System.out.println("Everywhere Defined");
    	if (isInjective) System.out.println("Injective");
    	if (isSurjective) System.out.println("Surjective");
    	if (isBijective) System.out.println("Bijective");
    	if (isInvertible) System.out.println("Invertible");
	}

	private static boolean checkEverywhereDefined(Set<Integer> domain, Map<Integer, Character> function) {
    	return function.keySet().equals(domain);
	}

	private static boolean checkInjective(Map<Integer, Character> function) {
    	Set<Character> values = new HashSet<>(function.values());
    	return values.size() == function.size();
	}

	private static boolean checkSurjective(Set<Character> codomain, Map<Integer, Character> function) {
    	return new HashSet<>(function.values()).containsAll(codomain);
	}

	// Graph
	public static void graph(Scanner scanner) {
    	System.out.println("Enter a graph (set of edges e.g. 1 2 1 4 2 3 3 4):");
    	String[] edgesInput = scanner.nextLine().split(" ");
    	List<int[]> edgesList = new ArrayList<>();
    	for (int i = 0; i < edgesInput.length; i += 2) {
        	int[] edge = new int[]{Integer.parseInt(edgesInput[i]), Integer.parseInt(edgesInput[i + 1])};
        	edgesList.add(edge);
    	}

    	// Construct adjacency matrix from edges list
    	int numVertices = 0;
    	for (int[] edge : edgesList) {
        	numVertices = Math.max(numVertices, Math.max(edge[0], edge[1]));
    	}
    	int[][] graph = new int[numVertices][numVertices];
    	for (int[] edge : edgesList) {
        	int vertex1 = edge[0] - 1;
        	int vertex2 = edge[1] - 1;
        	graph[vertex1][vertex2] = 1;
        	graph[vertex2][vertex1] = 1;
    	}

    	System.out.println("The graph G = " + Arrays.deepToString(edgesList.toArray()));

    	if (hasEulerCircuit(graph)) {
        	System.out.println("There is an Euler circuit");
    	} else {
        	System.out.println("There is no Euler circuit");
    	}

    	if (hasEulerPath(graph)) {
        	System.out.println("There is an Euler path");
    	} else {
        	System.out.println("There is no Euler path");
    	}
	}

	// Function to check if the graph contains an Euler circuit
	public static boolean hasEulerCircuit(int[][] graph) {
    	int numVertices = graph.length;
    	for (int i = 0; i < numVertices; i++) {
        	int degree = 0;
        	for (int j = 0; j < numVertices; j++) {
            	degree += graph[i][j];
        	}
        	if (degree % 2 != 0) {
            	return false;
        	}
    	}
    	return true;
	}

	// Function to check if the graph contains an Euler path
	public static boolean hasEulerPath(int[][] graph) {
    	int numVertices = graph.length;
    	int oddDegreeVertices = 0;
    	for (int i = 0; i < numVertices; i++) {
        	int degree = 0;
        	for (int j = 0; j < numVertices; j++) {
            	degree += graph[i][j];
        	}
        	if (degree % 2 != 0) {
            	oddDegreeVertices++;
        	}
    	}
    	return oddDegreeVertices == 0 || oddDegreeVertices == 2;
	}
}