# loop for

Executa condicionalmente uma instrução repetidamente, onde a instrução não precisa gerenciar a condição do loop.

### Sintaxe

---
attr (opcional) `for (` init-statement condition (opcional) `;` expression (opcional) `)` statement
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)
- **init-statement** — um de

  * uma [instrução de expressão](<#/doc/language/statements>) (que pode ser uma instrução nula ;)
  * uma [declaração simples](<#/doc/language/declarations>) (tipicamente uma declaração de uma variável de contador de loop com inicializador), ela pode declarar um número arbitrário de variáveis ou [structured bindings](<#/doc/language/structured_binding>)(desde C++17)

|

  * uma [declaração de alias](<#/doc/language/type_alias>)

| (desde C++23)

Note que qualquer init-statement deve terminar com um ponto e vírgula. É por isso que é frequentemente descrito informalmente como uma expressão ou uma declaração seguida por um ponto e vírgula.

- **condition** — uma [condition](<#/doc/language/for>)
- **expression** — uma [expression](<#/doc/language/expressions>) (tipicamente uma expression que incrementa o contador do loop)
- **statement** — uma [statement](<#/doc/language/statements>) (tipicamente uma compound statement)

### Condição

Uma condition pode ser uma [expression](<#/doc/language/expressions>) ou uma [declaração simples](<#/doc/language/declarations>).

  * Se puder ser sintaticamente resolvida como uma declaração de [structured binding](<#/doc/language/structured_binding>), ela é interpretada como uma declaração de structured binding.

| (desde C++26)

  * Se puder ser sintaticamente resolvida como uma expression, ela é tratada como uma expression. Caso contrário, é tratada como uma declaração que não é uma declaração de structured binding (desde C++26).

Quando o controle atinge a condition, a condition produzirá um valor, que é usado para determinar se a statement será executada.

#### Expressão

Se a condition for uma expression, o valor que ela produz é o valor da expression contextualmente convertido para bool. Se essa conversão for malformada, o programa é malformado.

#### Declaração

Se a condition for uma declaração simples, o valor que ela produz é o valor da variável de decisão (veja abaixo) contextualmente convertido para bool. Se essa conversão for malformada, o programa é malformado.

##### Declaração não-structured binding

A declaração possui as seguintes restrições:

  * Conforma sintaticamente à seguinte forma:

    

  * type-specifier-seq declarator `=` assignment-expression

| (ate C++11)

    

  * attribute-specifier-seq(opcional) decl-specifier-seq declarator brace-or-equal-initializer

| (desde C++11)

  * O declarator não pode especificar uma [função](<#/doc/language/function>) ou um [array](<#/doc/language/array>).
  * A [sequência de especificadores de tipo](<#/doc/language/declarations>)(ate C++11)[sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr, e ela (desde C++11) não pode definir uma [class](<#/doc/language/class>) ou [enumeration](<#/doc/language/enum>).

A variável de decisão da declaração é a variável declarada.

##### Declaração de structured binding

A declaração possui as seguintes restrições:

  * A expression em seu [inicializador](<#/doc/language/initialization>) não pode ser de um tipo array.
  * A [sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr.

A variável de decisão da declaração é a variável inventada e [introduzida pela declaração](<#/doc/language/structured_binding>). | (desde C++26)

### Explicação

Uma instrução for equivalente a:

---
`{`

    init-statement

    `while (` condition `)`

    `{`

    statement

    expression `;`

    `}`
`}`

Exceto que

  * O escopo de init-statement e o escopo de condition são os mesmos.
  * O escopo de statement e o escopo de expression são disjuntos e aninhados dentro do escopo de init-statement e condition.
  * A execução de uma [instrução continue](<#/doc/language/continue>) na statement avaliará a expression.
  * Uma condition vazia é equivalente a true.

Se o loop precisar ser terminado dentro da statement, uma [instrução break](<#/doc/language/break>) pode ser usada como instrução de término.

Se a iteração atual precisar ser terminada dentro da statement, uma [instrução continue](<#/doc/language/continue>) pode ser usada como atalho.

### Notas

Assim como no loop [`while`](<#/doc/language/while>), se a statement não for uma compound statement, o escopo das variáveis declaradas nela é limitado ao corpo do loop como se fosse uma compound statement.
```cpp
    for (;;)
        int n;
    // n sai do escopo
```

Como parte da [garantia de progresso](<#/doc/language/multithread>) do C++, o comportamento é [indefinido](<#/doc/language/ub>) se um loop que não é um [loop infinito trivial](<#/doc/language/multithread>)(desde C++26) sem [comportamento observável](<#/doc/language/as_if>) não terminar. Compiladores têm permissão para remover tais loops.

Enquanto em C nomes declarados no escopo de init-statement e condition podem ser sombreados no escopo de statement, isso é proibido em C++:
```cpp
    for (int i = 0;;)
    {
        long i = 1;   // C válido, C++ inválido
        // ...
    }
```

### Palavras-chave

[`for`](<#/doc/keyword/for>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <vector>
    
    int main()
    {
        std::cout << "1) loop típico com uma única statement como corpo:\n";
        for (int i = 0; i < 10; ++i)
            std::cout << i << ' ';
    
        std::cout << "\n\n" "2) init-statement pode declarar múltiplos nomes, contanto\n"
                     "que possam usar a mesma decl-specifier-seq:\n";
        for (int i = 0, *p = &i; i < 9; i += 2)
            std::cout << i << ':' << *p << ' ';
    
        std::cout << "\n\n" "3) condition pode ser uma declaração:\n";
        char cstr[] = "Hello";
        for (int n = 0; char c = cstr[n]; ++n)
            std::cout << c;
    
        std::cout << "\n\n" "4) init-statement pode usar o especificador de tipo auto:\n";
        std::vector<int> v = {3, 1, 4, 1, 5, 9};
        for (auto iter = v.begin(); iter != v.end(); ++iter)
            std::cout << *iter << ' ';
    
        std::cout << "\n\n" "5) init-statement pode ser uma expression:\n";
        int n = 0;
        for (std::cout << "Loop start\n";
             std::cout << "Loop test\n";
             std::cout << "Iteration " << ++n << '\n')
        {
            if (n > 1)
                break;
        }
    
        std::cout << "\n" "6) construtores e destrutores de objetos criados\n"
                     "no corpo do loop são chamados a cada iteração:\n";
        struct S
        {
            S(int x, int y) { std::cout << "S::S(" << x << ", " << y << "); "; }
            ~S() { std::cout << "S::~S()\n"; }
        };
        for (int i{0}, j{5}; i < j; ++i, --j)
            S s{i, j};
    
        std::cout << "\n" "7) init-statement pode usar structured bindings:\n";
        long arr[]{1, 3, 7};
        for (auto [i, j, k] = arr; i + j < k; ++i)
            std::cout << i + j << ' ';
        std::cout << '\n';
    }
```

Saída:
```
    1) loop típico com uma única statement como corpo:
    0 1 2 3 4 5 6 7 8 9
    
    2) init-statement pode declarar múltiplos nomes, contanto
    que possam usar a mesma decl-specifier-seq:
    0:0 2:2 4:4 6:6 8:8
    
    3) condition pode ser uma declaração:
    Hello
    
    4) init-statement pode usar o especificador de tipo auto:
    3 1 4 1 5 9
    
    5) init-statement pode ser uma expression:
    Loop start
    Loop test
    Iteration 1
    Loop test
    Iteration 2
    Loop test
    
    6) construtores e destrutores de objetos criados
    no corpo do loop são chamados a cada iteração:
    S::S(0, 5); S::~S()
    S::S(1, 4); S::~S()
    S::S(2, 3); S::~S()
    
    7) init-statement pode usar structured bindings:
    4 5 6
```

### Veja também

[ loop range-for](<#/doc/language/range-for>)(C++11) | executa loop sobre um range
[documentação C](<#/>) para for