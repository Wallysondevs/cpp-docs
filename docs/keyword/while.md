# Palavra-chave C++: while

### Uso

  * Laço [`while`](<#/doc/language/while>): como a declaração do laço
  * Laço [`do-while`](<#/doc/language/do>): como a declaração da condição de término do laço

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    int main() noexcept
    {
        int i{3};
     
        // A seguinte instrução de laço 'while':
        // 1. (condição) Verifica se o valor da variável 'i' é maior que zero
        //                e, se não for, encerra a execução do laço neste ponto.
        //                Pós-decrementa a variável 'i' (diminui seu valor em 1).
        // 2. (instrução) Escreve o valor atual da variável 'i' para a saída padrão (stdout).
        // 3.             Retorna ao ponto 1 (condição).
     
        while (i --> 0)     // condição: i-- > 0
            std::cout << i; // instrução: std::cout << i;
    }
```

Saída:
```
    210
```

### Veja também

  * Instrução [`if`](<#/doc/language/if>): [`if`](<#/doc/keywords/if>), [`else`](<#/doc/keyword/else>)

  * Instrução `constexpr` `if` (<a href="../language/if.html#Constexpr_if" title="cpp/language/if">`constexpr` `if` statement</a>): [`constexpr`](<#/doc/keyword/constexpr>) (`constexpr` `if` statement)

| (desde C++17)

  * Instrução `consteval` `if` (<a href="../language/if.html#Consteval_if" title="cpp/language/if">`consteval` `if` statement</a>): [`consteval`](<#/doc/keyword/consteval>) (`consteval` `if` statement)

| (desde C++23)

  * Instrução [`switch`](<#/doc/language/switch>): [`switch`](<#/doc/keyword/switch>), [`case`](<#/doc/keyword/case>)
  * [`default`](<#/doc/language/switch>) (como declaração de rótulo de case) etc: [`default`](<#/doc/keyword/default>)
  * Instrução [`goto`](<#/doc/language/goto>): [`goto`](<#/doc/keyword/goto>)
  * Instrução [`continue`](<#/doc/language/continue>): [`continue`](<#/doc/keyword/continue>)
  * Instrução [`break`](<#/doc/language/break>): [`break`](<#/doc/keyword/break>)
  * Instrução [`return`](<#/doc/language/return>): [`return`](<#/doc/keyword/return>)

  * Instrução [`co_return`](<#/doc/language/return>) (retorno de uma coroutine): [`co_return`](<#/doc/keyword/co_return>)

| (desde C++20)

  * Laço [`do-while`](<#/doc/language/do>) e laço [`while`](<#/doc/language/while>): [`do`](<#/doc/keyword/do>)
  * Laço [`for`](<#/doc/language/for>) e laço `for` baseado em range (<a href="../language/range-for.html" title="cpp/language/range-for">range-based `for` loop</a>): [`for`](<#/doc/keyword/for>)
