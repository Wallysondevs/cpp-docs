# laço while

Executa uma instrução repetidamente, condicionalmente.

### Sintaxe

---
attr (opcional) `while (` condition `)` statement
- **attr** — (desde C++11) qualquer número de [atributos](<#/doc/language/attributes>)
- **condition** — uma [condição](<#/doc/language/while>)
- **statement** — uma [instrução](<#/doc/language/statements>) (tipicamente uma instrução composta)

### Condição

Uma condição pode ser uma [expressão](<#/doc/language/expressions>) ou uma [declaração simples](<#/doc/language/declarations>).

* Se puder ser sintaticamente resolvida como uma declaração de [structured binding](<#/doc/language/structured_binding>), ela é interpretada como uma declaração de structured binding.

| (desde C++26)

* Se puder ser sintaticamente resolvida como uma expressão, ela é tratada como uma expressão. Caso contrário, é tratada como uma declaração que não é uma declaração de structured binding (desde C++26).

Quando o controle atinge a condição, a condição produzirá um valor, que é usado para determinar se a instrução será executada.

#### Expressão

Se a condição for uma expressão, o valor que ela produz é o valor da expressão convertido contextualmente para bool. Se essa conversão for malformada, o programa é malformado.

#### Declaração

Se a condição for uma declaração simples, o valor que ela produz é o valor da variável de decisão (veja abaixo) convertido contextualmente para bool. Se essa conversão for malformada, o programa é malformado.

##### Declaração de non-structured binding

A declaração possui as seguintes restrições:

* Conforma-se sintaticamente à seguinte forma:

    

  * type-specifier-seq declarator `=` assignment-expression

| (até C++11)

    

  * attribute-specifier-seq(opcional) decl-specifier-seq declarator brace-or-equal-initializer

| (desde C++11)

* O declarator não pode especificar uma [função](<#/doc/language/function>) ou um [array](<#/doc/language/array>).
* A [sequência de especificadores de tipo](<#/doc/language/declarations>)(até C++11)[sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr, e ela (desde C++11) não pode definir uma [classe](<#/doc/language/class>) ou [enumeração](<#/doc/language/enum>).

A variável de decisão da declaração é a variável declarada.

##### Declaração de structured binding

A declaração possui as seguintes restrições:

* A expressão em seu [inicializador](<#/doc/language/initialization>) não pode ser de um tipo array.
* A [sequência de especificadores de declaração](<#/doc/language/declarations>) pode conter apenas especificadores de tipo e constexpr.

A variável de decisão da declaração é a variável inventada e [introduzida pela declaração](<#/doc/language/structured_binding>). | (desde C++26)

### Explicação

Uma instrução while é equivalente a
---
/* label */ `:`
`{`

    `if (` condition `)`

    `{`

    statement

    `goto` /* label */ `;`

    `}`

`}`

Se a condição for uma declaração, a variável que ela declara é destruída e criada a cada iteração do laço.

Se o laço precisar ser terminado dentro da instrução, uma [instrução break](<#/doc/language/break>) pode ser usada como instrução de terminação.

Se a iteração atual precisar ser terminada dentro da instrução, uma [instrução continue](<#/doc/language/continue>) pode ser usada como atalho.

### Observações

Independentemente de a instrução ser uma instrução composta, ela sempre introduz um [escopo de bloco](<#/doc/language/scope>). Variáveis declaradas nela são visíveis apenas no corpo do laço, em outras palavras,
```cpp
    while (--x >= 0)
        int i;
    // i goes out of scope
```

é o mesmo que
```cpp
    while (--x >= 0)
    {
        int i;
    } // i goes out of scope
```

Como parte da [garantia de progresso](<#/doc/language/multithread>) do C++, o comportamento é [indefinido](<#/doc/language/ub>) se um laço que não é um [laço infinito trivial](<#/doc/language/multithread>)(desde C++26) sem [comportamento observável](<#/doc/language/as_if>) não terminar. Compiladores têm permissão para remover tais laços.

### Palavras-chave

[`while`](<#/doc/keyword/while>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    int main()
    {
        // while loop with a single statement
        int i = 0;
        while (i < 10)
             i++;
        std::cout << i << '\n';
    
        // while loop with a compound statement
        int j = 2;
        while (j < 9)
        {
            std::cout << j << ' ';
            j += 2;
        }
        std::cout << '\n';
    
        // while loop with a declaration condition
        char cstr[] = "Hello";
        int k = 0;
        while (char c = cstr[k++])
            std::cout << c;
        std::cout << '\n';
    }
```

Saída:
```
    10
    2 4 6 8
    Hello
```

### Veja também

[Documentação C](<#/>) para while
---